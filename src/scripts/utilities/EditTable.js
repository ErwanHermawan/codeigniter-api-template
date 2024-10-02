/* ------------------------------------------------------------------------------
@name: EditTable
@description: EditTable
--------------------------------------------------------------------------------- */

const EditTable = (() => {
  // ajax
  const handleRunEditTable = (url, data) => {
    if (!$(".js-editable").hasClass("error")) {
      $.ajax({
        url: url,
        type: "POST",
        dataType: "JSON",
        data: data,
        success: (response) => {
          if (response.code == 200) {
            toastr.success(response.message);
          } else {
            toastr.error(response.message);
          }
        },
        error: (response) => {
          toastr.error(response.message);
        },
      });
    }
  };

  return {
    handleRunEditTable,
  };
})();

export default EditTable;
