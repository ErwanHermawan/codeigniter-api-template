/* ------------------------------------------------------------------------------
@name: Modal
@description: Modal Activate
--------------------------------------------------------------------------------- */

const Modal = (() => {
	// handleShowModal
	const handleShowModal = () => {
		$(".modal").on("shown.bs.modal", function () {
			// Focus on the element with 'autofocus' attribute
			$(this).find("[autofocus]").focus();

			// Ensure the 'selected' attribute is properly set for options
			$(this).find("[selected]").prop("selected", true);

			// Find all input fields inside the modal and disable autocomplete
			$(this)
				.find("input, textarea, select")
				.each(function () {
					$(this).attr("autocomplete", "off");
				});
		});
	};

	// Handle Run DataTable
	const handleDisableClick = () => {
		$(".disable-click-outside").modal({
			show: false,
			backdrop: "static",
			keyboard: false,
		});
	};

	const handleMultipleModal = () => {
		$('button[data-dismiss="modal"]').on("click", (e) => {
			$("body").find(".modal-backdrop").removeAttr("style");
		});

		$(".js-multiple-modal").on("click", (e) => {
			const _this = $(e.currentTarget);
			const _target = _this.attr("data-target");
			$(_target).attr("style", "z-index: 1052");
			setTimeout(() => {
				if ($("body").hasClass("modal-open")) {
					$("body").find(".modal-backdrop").attr("style", "z-index: 1051");
				}
			}, 300);
		});
	};

	// init
	const init = () => {
		if ($(".disable-click-outside").length) {
			handleDisableClick();
		}
		handleMultipleModal();
		handleShowModal();
	};

	return {
		init,
	};
})();

export default Modal;
