/* ------------------------------------------------------------------------------
@name: Dropdown
@description: Dropdown
--------------------------------------------------------------------------------- */

const Dropdown = (() => {
  // handle back
  const handleShow = () => {
    $("body").on("click", ".fi-dropdown input", (e) => {
      const _this = $(e.currentTarget);
      if (_this.parents(".fi-dropdown").hasClass("fi-dropdown--show")) {
        _this.parents(".fi-dropdown").removeClass("fi-dropdown--show");
      } else {
        _this.parents(".fi-dropdown").addClass("fi-dropdown--show");
      }
    });

    // handle click body
    $("body").on("click", (e) => {
      if (
        $(".fi-dropdown input")
          .parents(".fi-dropdown")
          .hasClass("fi-dropdown--show")
      ) {
        $(".fi-dropdown input")
          .parents(".fi-dropdown")
          .removeClass("fi-dropdown--show");
      }
    });

    // stop progation
    $("body").on("click", ".fi-dropdown", (e) => {
      e.stopPropagation();
    });
  };

  const handleSelect = () => {
    $("body").on("click", ".fi-dropdown .fi-dropdown-item", (e) => {
      const _this = $(e.currentTarget);
      const _val = _this.text();
      const _id = _this.attr("data-id");

      if (!_this.hasClass("selected")) {
        $(".fi-dropdown-item").removeClass("selected");
        _this.addClass("selected");
        _this.parents(".fi-dropdown").find(".form-control").val(_val);
        _this
          .parents(".fi-dropdown")
          .find(".form-control")
          .attr("data-id", _id);
      }
      $(".fi-dropdown").removeClass("fi-dropdown--show");
    });
  };

  const init = () => {
    if ($("body").find(".fi-dropdown").length) {
      handleShow();
      handleSelect();
    }
  };

  return {
    init,
  };
})();

export default Dropdown;
