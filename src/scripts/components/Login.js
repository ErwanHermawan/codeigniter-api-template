/* ------------------------------------------------------------------------------
@name: Login
@description: Login
--------------------------------------------------------------------------------- */

// --- variables
import { WEB_URL, API_URL } from "../variables";

// --- utilities
import { Alert, Validation, Session } from "../utilities";

const _userData = JSON.parse(Session.get("userData"));

const ElementSelector = [
  {
    id: "email",
    validation: {
      required: true,
      email: true,
    },
  },
  {
    id: "password",
    validation: {
      required: true,
      minimum: true,
      minimumChar: 5,
    },
  },
];
const ElementEvents = ["input", "blur"];

const Login = (() => {
  // handleCheckLogged
  const handleCheckLogged = () => {
    if (_userData) {
      if (_userData.logged) {
        location.href = WEB_URL.base;
      }
    }
  };

  // handleRunValidation
  const handleRunValidation = () => {
    Validation.config(ElementEvents, ElementSelector);
  };

  // Handle Click Validation
  const handleClickValidation = () => {
    $('.js-auth-login button[type="submit"]').on("click", (e) => {
      $.each(ElementSelector, (i, v) => {
        $("#" + v.id).blur();
      });

      if ($(".error").length === 0) {
        handleLogin();
      }
      e.preventDefault();
    });
  };

  // handleLogin
  const handleLogin = () => {
    var _email = $(".js-auth-login").find("#email").val();
    var _password = $(".js-auth-login").find("#password").val();
    $.ajax({
      url: API_URL.login,
      method: "POST",
      dataType: "JSON",
      data: {
        email: _email,
        password: _password,
      },
      beforeSend: () => {
        var _loader = `<span class="loader"><span></span><span></span><span></span><span></span></span> Mengirim ....`;
        $(".js-auth-login button[type='submit']").html(_loader);
      },
      success: (response) => {
        var _data = response.data;
        var _status = response.status;
        var _message = response.message;
        if (_status) {
          Session.set("userData", JSON.stringify(_data));
          location.href = WEB_URL.base;
        } else {
          Alert.enable(_message, "error");
        }
        $(".js-auth-login button[type='submit']").html(`Masuk`);
      },
      error: (response) => {
        var _response = response.responseJSON;
        var _message = _response.message;
        Alert.enable(_message, "error");
        $(".js-auth-login button[type='submit']").html(`Masuk`);
      },
    });
  };

  const init = () => {
    if ($(".js-auth-login").length) {
      handleCheckLogged();
      handleRunValidation();
      handleClickValidation();
    }
  };

  return {
    init,
  };
})();

export default Login;
