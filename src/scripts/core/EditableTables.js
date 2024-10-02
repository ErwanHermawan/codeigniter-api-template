/* ------------------------------------------------------------------------------
@name: Data Table Editable
@description: Data Table Editable Activate
--------------------------------------------------------------------------------- */

// --- variables
import { NUMBERIC } from "../variables";

const EditableTables = (() => {
  const handleCheckEditTable = () => {
    $("body").on("click", 'td[data-editable="true"]', (e) => {
      const _this = $(e.currentTarget);
      const _id = _this.attr("data-id");
      $(".js-editable").attr("data-id", _id);
    });
  };

  const handleValidationEditTable = () => {
    $("body").on("keypress", ".js-editable", (e) => {
      const _this = $(e.currentTarget);
      if (!NUMBERIC.test(e.key)) {
        _this.addClass("error");
        e.preventDefault();
      } else {
        _this.removeClass("error");
      }
    });
  };

  // run datatable
  const handleRunDataTable = () => {
    // data table default
    $(".js-editable-table").editableTableWidget();
  };

  const init = () => {
    if ($("body").find(".js-editable-table").length) {
      handleCheckEditTable();
      handleValidationEditTable();
      handleRunDataTable();
    }
  };

  return {
    init,
  };
})();

export default EditableTables;
