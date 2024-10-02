/* ------------------------------------------------------------------------------
@name: Meta
@description: Meta
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WEB_URL, WHITESPACE } from "../variables";

// --- utilities
import { SweetAlert } from "../utilities";

const Meta = (() => {
  // handleClickMeta
  const handleClickMeta = () => {
    $('.js-form-meta button[type="submit"]').on("click", (e) => {
      handleFormData();
      e.preventDefault();
    });
  };

  // handleFormData
  const handleFormData = () => {
    var _meta_id = $('input[name="meta_id"]').val();
    var _og_image = $('input[name="og_image"]').prop("files")[0];
    var _twitter_image = $('input[name="twitter_image"]').prop("files")[0];
    var _robots = $('input[name="robots"]').val();
    var _refresh = $('input[name="refresh"]').val();
    var _title = $('input[name="title"]').val();
    var _description = $('input[name="description"]').val();
    var _keywords = $('input[name="keywords"]').val();
    var _author = $('input[name="author"]').val();
    var _copyright = $('input[name="copyright"]').val();
    var _theme_color = $('input[name="theme_color"]').val();
    var _domain_name = $('input[name="domain_name"]').val();
    var _twitter_account = $('input[name="twitter_account"]').val();
    var _facebook_account = $('input[name="facebook_account"]').val();
    var _instagram_account = $('input[name="instagram_account"]').val();
    var _email_account = $('input[name="email_account"]').val();

    if (
      !WHITESPACE.test(_robots) &&
      !WHITESPACE.test(_refresh) &&
      !WHITESPACE.test(_title) &&
      !WHITESPACE.test(_description) &&
      !WHITESPACE.test(_keywords) &&
      !WHITESPACE.test(_author) &&
      !WHITESPACE.test(_copyright) &&
      !WHITESPACE.test(_theme_color) &&
      !WHITESPACE.test(_domain_name) &&
      !WHITESPACE.test(_twitter_account) &&
      !WHITESPACE.test(_facebook_account) &&
      !WHITESPACE.test(_instagram_account) &&
      !WHITESPACE.test(_email_account)
    ) {
      var form_data = new FormData();
      form_data.append("meta_id", _meta_id);
      form_data.append("og_image", _og_image);
      form_data.append("twitter_image", _twitter_image);
      form_data.append("robots", _robots);
      form_data.append("refresh", _refresh);
      form_data.append("title", _title);
      form_data.append("description", _description);
      form_data.append("keywords", _keywords);
      form_data.append("author", _author);
      form_data.append("copyright", _copyright);
      form_data.append("theme_color", _theme_color);
      form_data.append("domain_name", _domain_name);
      form_data.append("twitter_account", _twitter_account);
      form_data.append("facebook_account", _facebook_account);
      form_data.append("instagram_account", _instagram_account);
      form_data.append("email_account", _email_account);

      handlePostData(form_data);
    }
  };

  // handlePostData
  const handlePostData = (form_data) => {
    $.ajax({
      url: API_URL.meta,
      method: "POST",
      dataType: "JSON",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      beforeSend: () => {
        var _loader = `<span class="custom-loader"><span></span><span></span><span></span><span></span></span> Mengirim ....`;
        $(".js-form-meta button[type='submit']").html(_loader);
      },
      success: (response) => {
        var _status = response.status;
        var _message = response.message;
        if (_status) {
          $(".js-form-meta button[type='submit']").html(
            `<i class="mdi mdi-content-save-outline"></i> Simpan`
          );
          SweetAlert.config(_message);
          setTimeout(() => {
            location.href = WEB_URL.meta;
          }, 800);
        }
      },
    });
  };

  const init = () => {
    if ($(".js-form-meta").length) {
      handleClickMeta();
    }
  };

  return {
    init,
  };
})();

export default Meta;
