/* ------------------------------------------------------------------------------
@name: DataTable
--------------------------------------------------------------------------------- */

const DataTable = (() => {
	const handleDataTable = () => {
		// data table defautl
		$(".js-datatable").DataTable({
			responsive: true,
			autoWidth: false,
			stateSave: true,
		});
	};

	const handleRunDataTableServer = (
		dataSetting,
		columnSetting = [],
		filterSetting = [],
		sortSetting = null,
		columnVisibleSetting = null
	) => {
		// --- datatable setting
		const tableSetting = {
			// bLengthChange: false,
			// ordering: false,
			info: false,
			processing: true,
			serverSide: true,
			responsive: true,
			autoWidth: false,
			stateSave: true,
			dom: '<"float-right"f>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
			// buttons: ["copy", "excel", "pdf"],
			ajax: {
				url: dataSetting.url,
				type: dataSetting.method,
				data: dataSetting ? dataSetting.data : "",
				beforeSend: function (xhr) {
					// Add Bearer token to the request headers
					xhr.setRequestHeader("Authorization", "Bearer " + dataSetting.token);
				},
			},
			columnDefs: columnSetting,
			processing: true,
			language: {
				processing: '<div class="loader"></div>',
			},
		};

		let table = $("." + dataSetting.selector).DataTable(tableSetting);

		// --- filter setting
		$.each(filterSetting, (i, v) => {
			if (v.event === "change") {
				$("#" + v.id).on(v.event, (e) => {
					table.draw();
				});
			} else {
				$("#" + v.id).on(v.event, (e) => {
					let value = $(e.currentTarget).val();
					table.search(value).draw();
				});
			}
		});

		// --- sort setting
		if (sortSetting !== 0) {
			$("#" + sortSetting.id).on(sortSetting.event, (e) => {
				let value = $(e.currentTarget).val();
				table.page.len(value).draw();
			});
		}

		// --- setting visibility column
		if (columnVisibleSetting !== 0) {
			table
				.columns(columnVisibleSetting.target)
				.visible(columnVisibleSetting.visble);
		}
	};

	// -- init
	const init = () => {
		handleDataTable();
	};

	return {
		init,
		server: handleRunDataTableServer,
	};
})();

export default DataTable;
