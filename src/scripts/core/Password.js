/* ------------------------------------------------------------------------------
@name: Password
@description: Password
--------------------------------------------------------------------------------- */

// --- Password
const Password = (() => {
  const handleShowPassword = () => {
    $(".js-show-password").on("click", (e) => {
      const _this = $(e.currentTarget);
      const _parent = _this.parent();

      if (_parent.hasClass("show--password")) {
        _parent.removeClass("show--password");
        _parent.find(".password").attr("type", "password");
        _this.removeClass("pi-eye");
        _this.addClass("pi-eye-off");
      } else {
        _parent.addClass("show--password");
        _parent.find(".password").attr("type", "text");
        _this.removeClass("pi-eye-off");
        _this.addClass("pi-eye");
      }
    });
  };

  // handle back
  const handleConfirmPassword = () => {
    $(".js-confirm-password").on("input", (e) => {
      const _this = $(e.currentTarget);
      const _parent = _this.parent();
      const _val = _this.val();
      const _password = _this.parents("body").find("#password").val();
      const _text = _parent.find(".form-alert").attr("data-invalid");

      if (_val == _password) {
        _parent.removeClass("error");
        _parent.find(".form-alert").removeClass("error").text("");
      } else {
        _parent.addClass("error");
        _parent.find(".form-alert").addClass("error").text(_text);
      }
    });
  };

  const init = () => {
    if ($(".js-confirm-password").length) {
      // handleShowPassword();
      // handleConfirmPassword();
    }
  };

  return {
    init,
  };
})();

export default Password;
