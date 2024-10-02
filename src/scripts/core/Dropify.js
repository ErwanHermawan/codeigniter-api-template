/* ------------------------------------------------------------------------------
@name: Dropify
@description: Dropify Activate
--------------------------------------------------------------------------------- */

const Dropify = (() => {
  // dropify
  const handleRunDropify = () => {
    $(".js-dropify").dropify({
      messages: {
        default: "Seret dan lepas file di sini atau klik",
        replace: "Seret dan lepas atau klik untuk mengganti",
        remove: "Remove",
        error: "Ups, ada yang salah ditambahkan.",
      },
      error: {
        fileSize: "Ukuran file terlalu besar.",
      },
    });
  };

  const init = () => {
    if ($(".js-dropify").length) {
      handleRunDropify();
    }
  };

  return {
    init,
  };
})();

export default Dropify;
