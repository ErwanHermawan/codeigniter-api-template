/* ------------------------------------------------------------------------------
@name: BackButton
@description: BackButton
--------------------------------------------------------------------------------- */

// --- BackButton
const BackButton = (() => {
  // --- handleBackButton
  const handleBackButton = () => {
    $(".js-back-btn").on("click", (e) => {
      window.history.back();
      e.preventDefault();
    });
  };

  // --- init
  const init = () => {
    if ($(".js-back-btn").length) {
      handleBackButton();
    }
  };

  // --- return
  return {
    init,
  };
})();

export default BackButton;
