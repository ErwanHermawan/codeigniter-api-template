/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */

// --- variables
import {
  WHITESPACE,
  EMAIL,
  NUMBERIC,
  PHONE_NUMBER,
  FULL_NAME,
  PERSON_NAME,
} from "variables";

const Validation = (() => {
  // - handleInput
  const handleInput = (eventsEl, selectorEl) => {
    $.each(eventsEl, (ie, ve) => {
      $.each(selectorEl, (i, v) => {
        $("#" + v.id).on(ve, (e) => {
          const _this = $(e.currentTarget),
            _val = _this.val(),
            _target = _this.attr("data-target"),
            _alertEl = $("#" + _target);
          let _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");

          // Minimum Validation
          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Maximum Validation
          if (v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Minimum Validation
          if (v.validation.name) {
            if (!PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Email validation
          if (v.validation.email) {
            if (!EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Numeric validation
          if (v.validation.phone) {
            if (!PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid-phone");
            }
          }

          // Required validation
          if (WHITESPACE.test(_val)) {
            _errorMessage = _alertEl.attr("data-req");
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass("error");
            _this.parent().addClass("error");
          }
        });
      });
    });

    // Return Handle keypress
    handleKeypress();
  };

  // handleKeypress
  const handleKeypress = () => {
    $(".number-only").on("keypress", (e) => {
      const _this = $(e.currentTarget),
        _val = _this.val(),
        _target = _this.attr("data-target"),
        _alertEl = $("#" + _target);
      let _errorMessage;
      if (!NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr("data-invalid");
        _alertEl.text(_errorMessage);
        _alertEl.addClass("error");
        _this.parent().addClass("error");
        // remove error after few second
        setTimeout(() => {
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");
        }, 2000);
        e.preventDefault();
      }
    });
  };

  return {
    config: handleInput,
  };
})();

export default Validation;
