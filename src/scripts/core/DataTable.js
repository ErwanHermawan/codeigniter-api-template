/* ------------------------------------------------------------------------------
@name: DataTable
--------------------------------------------------------------------------------- */

// --- utilities
import { Form, SweetAlert } from "utilities";

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
		// --- DataTable settings
		const tableSetting = {
			info: false,
			processing: true,
			serverSide: true,
			responsive: true,
			autoWidth: false,
			stateSave: true,
			dom: '<"float-right"f>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
			ajax: {
				url: dataSetting.url,
				type: dataSetting.method,
				data: dataSetting.data,
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", "Bearer " + dataSetting.token);
				},
				error: function (xhr, status, error) {
					console.log("Error: " + xhr.status + " - " + error);
					SweetAlert.config(error, "error");
				},
			},

			columnDefs: columnSetting,
			language: {
				processing: '<div class="table-loader"></div>',
			},
		};

		const table = $("." + dataSetting.selector).DataTable(tableSetting);

		// --- Filter setting
		filterSetting.forEach((filter) => {
			$("#" + filter.id).on(filter.event, function (e) {
				let value = $(e.currentTarget).val();
				filter.event === "change" ? table.draw() : table.search(value).draw();
			});
		});

		// --- Sort setting
		if (sortSetting) {
			$("#" + sortSetting.id).on(sortSetting.event, function (e) {
				table.page.len($(e.currentTarget).val()).draw();
			});
		}

		// --- Column visibility
		if (columnVisibleSetting) {
			table
				.columns(columnVisibleSetting.target)
				.visible(columnVisibleSetting.visble);
		}

		// --- Handle row selection and batch deletion
		let selectedRows = [];
		const deleteButtonHtml = `<button type="button" class="btn btn-danger waves-effect w-md waves-light" id="deleteBatch"><i class="mdi mdi-trash-can-outline"></i> Delete Batch</button>`;

		const updateDeleteButton = () => {
			if (selectedRows.length > 0) {
				if (!$("#deleteBatch").length) {
					$(".form-inline").prepend(deleteButtonHtml);
				}
			} else {
				$("#deleteBatch").remove();
			}
		};

		// Handle 'Select All' checkbox
		$("#selectAll").on("click", function () {
			const rows = table.rows({ search: "applied" }).nodes();
			const isChecked = this.checked;
			$('input[type="checkbox"]', rows).prop("checked", isChecked);

			selectedRows = isChecked
				? [
						...new Set(
							selectedRows.concat(
								$(rows)
									.map((i, el) => $(el).val())
									.get()
							)
						),
				  ]
				: [];

			updateDeleteButton();
		});

		// Handle individual row checkboxes
		$("." + dataSetting.selector + " tbody").on(
			"change",
			'input[type="checkbox"]',
			function () {
				const id = $(this).val();
				if (this.checked) {
					if (!selectedRows.includes(id)) {
						selectedRows.push(id);
					}
				} else {
					selectedRows = selectedRows.filter((item) => item !== id);
					$("#selectAll").prop("checked", false);
				}
				updateDeleteButton();
			}
		);

		// Handle batch delete button click
		$("body").on("click", "#deleteBatch", function () {
			console.log(selectedRows);
			const deleteData = {
				url: dataSetting.url,
				method: "DELETE",
				data: { user_id: selectedRows },
			};
			Form.deleteData(deleteData);
			$("#deleteBatch").remove();
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
