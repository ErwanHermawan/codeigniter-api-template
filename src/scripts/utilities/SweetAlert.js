/* ------------------------------------------------------------------------------
@name: SweetAlert
--------------------------------------------------------------------------------- */

const SweetAlert = (() => {
  const handleRunSweetAlert = (message, status = "success") => {
    switch (status) {
      case "warning":
        swal({
          title: "Peringatan!",
          text: message,
          type: "warning",
          confirmButtonClass: "btn btn-warning",
          timer: 3000,
        });
        break;
      case "error":
        swal({
          title: "Gagal!",
          text: message,
          type: "error",
          confirmButtonClass: "btn btn-danger",
          timer: 3000,
        });
        break;
      default:
        swal({
          title: "Berhasil!",
          text: message,
          type: "success",
          confirmButtonClass: "btn btn-custom",
          timer: 3000,
        });
        break;
    }
  };

  return {
    config: handleRunSweetAlert,
  };
})();

export default SweetAlert;
