/* ------------------------------------------------------------------------------
@name: CheckBox
@description: CheckBox
--------------------------------------------------------------------------------- */

// --- CheckBox
const CheckBox = (() => {
  // handle back
  const handleBack = () => {
    $(".js-checkbox").on("change", (e) => {
      const _this = $(e.currentTarget);
      var _label = _this.siblings(".custom-control-label");

      if (_this.is(":checked")) {
        _label.text("Ya");
      } else {
        _label.text("Tidak");
      }
    });
  };

  const init = () => {
    if ($(".js-checkbox").length) {
      handleBack();
    }
  };

  return {
    init,
  };
})();

export default CheckBox;
