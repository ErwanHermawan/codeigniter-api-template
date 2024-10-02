/* ------------------------------------------------------------------------------
@name: SweetAlert
@description: SweetAlert Activate
--------------------------------------------------------------------------------- */

const SweetAlert = (() => {
  // handle run detele
  const handleRunDelete = () => {
    //Parameter
    $("body").on("click", ".js-delete", (e) => {
      e.preventDefault();
      var url = e.currentTarget.getAttribute("href");
      swal({
        title: "Apa Anda yakin?",
        text: "Tindakan Anda tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus!",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-custom",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false,
      }).then(
        () => {
          swal({
            title: "Deleted!",
            text: "Data Anda telah dihapus.",
            type: "success",
            timer: 1500,
          });
          handleSuccess(url);
        },
        (dismiss) => {
          if (dismiss === "cancel") {
            swal("Dibatalkan", "Data Anda aman :)", "error");
          }
        }
      );
    });
  };

  // handle success
  const handleSuccess = (url) => {
    setTimeout(() => {
      window.location.href = url;
    }, 800);
  };

  const init = () => {
    handleRunDelete();
  };

  return {
    init,
  };
})();

export default SweetAlert;
