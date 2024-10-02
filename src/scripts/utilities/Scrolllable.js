/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */

// --- Scrolllable
const Scrolllable = (() => {
  // --- handleEnable
  const handleEnable = () => {
    $("body").removeClass("rm-scroll");
    // --- vendor scrollLock for solve (position changed when on hover) in window/mac show scrollbar
    scrollLock.enablePageScroll();
  };

  // --- handleDisable
  const handleDisable = () => {
    if ($(window).width() <= 1200) {
      $("body").addClass("rm-scroll");
    } else {
      // --- vendor scrollLock for solve (position changed when on hover) in window/mac show scrollbar
      scrollLock.setFillGapMethod("padding");
      // handle fill gap header
      var _fillGapHeader = document.querySelector(".header");
      scrollLock.addFillGapTarget(_fillGapHeader);
      // handle fill gap order
      var _fillGapOrder = document.querySelector(".order");
      scrollLock.addFillGapTarget(_fillGapOrder);

      scrollLock.disablePageScroll();
    }
  };

  // --- return
  return {
    enable: handleEnable,
    disable: handleDisable,
  };
})();

export default Scrolllable;
