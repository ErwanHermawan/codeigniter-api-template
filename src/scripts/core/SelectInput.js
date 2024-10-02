/* ------------------------------------------------------------------------------
@name: SelectInput
@description: SelectInput
--------------------------------------------------------------------------------- */

const SelectInput = (() => {
  // SelectInput
  const handleRunSelectInput = () => {
    // SelectInput
    $(".js-select-input").select2();
    $("body").on("change", ".js-select-input", function () {
      $(".js-select-input").select2();
    });
  };

  const init = () => {
    if ($(".js-select-input").length) {
      handleRunSelectInput();
    }
  };

  return {
    init,
  };
})();

export default SelectInput;
