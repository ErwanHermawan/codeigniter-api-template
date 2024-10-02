/* ------------------------------------------------------------------------------
@name: Alert
@description: Alert Activate
--------------------------------------------------------------------------------- */

import Scrolllable from "./Scrolllable.js";

const Alert = (() => {
  // --- handleEnable
  const handleEnable = (message, status) => {
    if (status === "success") {
      $(".alert")
        .removeClass("alert--failed")
        .addClass("alert--success show-alert");
      $(".alert").find(".alert__title").text("Berhasil!");
      $(".alert").find(".alert__desc").text(message);
      Scrolllable.enable();
    }
    if (status === "error") {
      $(".alert").addClass("alert--failed show-alert");
      $(".alert").find(".alert__title").text("Gagal!");
      $(".alert").find(".alert__desc").text(message);
      Scrolllable.disable();
    }
    setTimeout(() => {
      handleDisable();
    }, 2000);
    handleHideAlert();
  };

  const handleDisable = () => {
    Scrolllable.enable();
    if ($(".alert").hasClass("show-alert")) {
      $(".alert").removeClass("show-alert");
    }
    if ($(".alert").hasClass("alert--success")) {
      $(".alert").removeClass("alert--success");
    } else {
      $(".alert").removeClass("alert--failed");
    }
  };

  const handleHideAlert = () => {
    $(".js-alert-close").on("click", () => {
      handleDisable();
    });
  };

  return {
    enable: handleEnable,
    disable: handleDisable,
  };
})();

export default Alert;
