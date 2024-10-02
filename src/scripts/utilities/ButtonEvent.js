/* ------------------------------------------------------------------------------
@name: ButtonEvent
@description: ButtonEvent
--------------------------------------------------------------------------------- */

// --- ButtonEvent
const ButtonEvent = (() => {
	// --- handleBackButton
	const handleBackButton = () => {
		$(".js-back-btn").on("click", (e) => {
			window.history.back();
			e.preventDefault();
		});
	};

	const handleRefreshDataTable = () => {
		$(".js-refresh-data").on("click", () => {
			$("#dataTable").DataTable().ajax.reload();
		});
	};

	// --- init
	const init = () => {
		if ($(".js-back-btn").length) {
			handleBackButton();
		}
		if ($(".js-refresh-data").length) {
			handleRefreshDataTable();
		}
	};

	// --- return
	return {
		init,
	};
})();

export default ButtonEvent;
