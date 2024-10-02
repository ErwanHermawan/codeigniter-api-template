/* ------------------------------------------------------------------------------
@name: Temporary Alert
@description: Temporary Alert Activate
--------------------------------------------------------------------------------- */

const TemporaryAlert = (() => {
  // handle run Temporary alert
  const handleRunTemporaryAlert = () => {
    setTimeout(() => {
      $(".js-temporary-alert").slideUp(300);
    }, 3000);
    setTimeout(() => {
      $(".js-temporary-alert").remove();
    }, 3350);
  };

  const init = () => {
    if ($(".js-temporary-alert").length) {
      handleRunTemporaryAlert();
    }
  };

  return {
    init,
  };
})();

export default TemporaryAlert;
