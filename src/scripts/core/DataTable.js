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
			const rows = table.rows({ search: "applied" }).nodes(); // Get the nodes of rows
			const isChecked = this.checked; // Determine if "Select All" is checked or unchecked

			// Set the checkboxes in the rows to the state of "Select All"
			$('input[type="checkbox"]', rows).prop("checked", isChecked);

			if (isChecked) {
				// If "Select All" is checked, add all row values to selectedRows
				selectedRows = [
					...new Set(
						selectedRows.concat(
							$(rows)
								.map((i, el) => $(el).find('input[type="checkbox"]').val()) // Ensure we're capturing checkbox values
								.get()
						)
					),
				];
			} else {
				// If "Select All" is unchecked, clear selectedRows
				selectedRows = [];
			}

			updateDeleteButton(); // Update the UI with the delete button if needed
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
					// Remove the unchecked row from selectedRows
					selectedRows = selectedRows.filter((item) => item !== id);
					// Uncheck the "Select All" checkbox if any row is unchecked
					$("#selectAll").prop("checked", false);
				}

				updateDeleteButton(); // Update the state of the delete button
			}
		);

		// Handle batch delete button click
		$("body").on("click", "#deleteBatch", function () {
			const propsDelete = $("." + dataSetting.selector)
				.find(".js-select-all-checkbox")
				.attr("data-delete");

			const _data = { [propsDelete]: selectedRows };

			const deleteData = {
				url: dataSetting.url,
				method: "DELETE",
				data: _data,
			};

			Form.deleteData(deleteData);
			selectedRows = []; // Clear selectedRows after successful deletion
			$("#selectAll").prop("checked", false); // Uncheck selectAll checkbox
			$("#deleteBatch").remove(); // Remove the delete button
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
