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
		if (sortSetting) {
			$("#" + sortSetting.id).on(sortSetting.event, (e) => {
				let value = $(e.currentTarget).val();
				table.page.len(value).draw();
			});
		}

		// --- setting visibility column
		if (columnVisibleSetting) {
			table
				.columns(columnVisibleSetting.target)
				.visible(columnVisibleSetting.visble);
		}

		var selectedRows = [];
		const deleteButton = `<button type="button" class="btn btn-danger waves-effect w-md waves-light" id="deleteBatch"><i class="mdi mdi-trash-can-outline"></i> Delete Batch</button>`;

		// Handle 'Select All' checkbox
		$("#selectAll").on("click", function () {
			var rows = table.rows({ search: "applied" }).nodes();
			$('input[type="checkbox"]', rows).prop("checked", this.checked);

			// Add or remove row IDs from selectedRows
			if (this.checked) {
				$('input[type="checkbox"]', rows).each(function () {
					var id = $(this).val();
					if (!selectedRows.includes(id)) {
						selectedRows.push(id);
					}
				});
				$("body").find(".form-inline").prepend(deleteButton);
			} else {
				$('input[type="checkbox"]', rows).each(function () {
					var id = $(this).val();
					selectedRows = selectedRows.filter((item) => item !== id);
				});
				$("body").find(".form-inline").find("#deleteBatch").remove();
			}
		});

		// Handle individual row checkboxes
		$("." + dataSetting.selector + " tbody").on(
			"change",
			'input[type="checkbox"]',
			function () {
				var id = $(this).val();
				if (this.checked) {
					if (!selectedRows.includes(id)) {
						selectedRows.push(id);
					}
					$("body").find(".form-inline").prepend(deleteButton);
				} else {
					selectedRows = selectedRows.filter((item) => item !== id);
					$("#selectAll").prop("checked", false);
					$("body").find(".form-inline").find("#deleteBatch").remove();
				}
			}
		);

		// Example of getting selected rows when form is submitted
		$("body")
			.find("#deleteBatch")
			.on("click", function () {
				console.log("Selected Row IDs:", selectedRows);
			});
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
