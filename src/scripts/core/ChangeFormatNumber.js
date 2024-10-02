/* ------------------------------------------------------------------------------
@name: ChangeFormatNumber
@description: ChangeFormatNumber
--------------------------------------------------------------------------------- */

// --- utilities
import { Currency } from "utilities";

// --- ChangeFormatNumber
const ChangeFormatNumber = (() => {
  // -- handleChangeFormatNumber
  const handleChangeFormatNumber = () => {
    $("body").on("input", ".js-format-number", (e) => {
      const _this = $(e.currentTarget);
      var _value = _this.val();
      _value = String(
        parseInt(
          _value.replace(/\./gi, "").replace(/r/gi, "").replace(/p/gi, "")
        )
      );
      if (_value !== 0) {
        _this.val(Currency.format_rp(_value));
      }
    });

    if ($("input").hasClass("js-format-number")) {
      $(".js-format-number").each((i, e) => {
        const _id = $(e).attr("id");
        var _value = $("#" + _id).val();
        if (_value !== undefined) {
          const _prefix = _value.substring(0, 2);

          if (_prefix !== "Rp") {
            _value = String(
              parseInt(
                _value.replace(/\./gi, "").replace(/r/gi, "").replace(/p/gi, "")
              )
            );

            if (_value !== 0 && !isNaN(_value)) {
              $("#" + _id).val(Currency.format_rp(_value));
            }
          }
        }
      });
    }
  };

  // --- init
  const init = () => {
    handleChangeFormatNumber();
  };

  // --- return
  return {
    init,
  };
})();

export default ChangeFormatNumber;
