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
			error: function (xhr, status, error) {
				// Show a popup when the API request fails
				// showErrorPopup(xhr.status, error);
				SweetAlert.config(error, "error");
			},
			columnDefs: columnSetting,
			processing: true,
			language: {
				processing: '<div class="loader"></div>',
			},
		};

		const table = $("." + dataSetting.selector).DataTable(tableSetting);

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

		// --- Handle row selection and batch deletion
		let selectedRows = [];
		const deleteButtonHtml = `<button type="button" class="btn btn-danger waves-effect w-md waves-light" id="deleteBatch"><i class="mdi mdi-trash-can-outline"></i> Delete Batch</button>`;

		const updateDeleteButton = () => {
			if (selectedRows.length > 0) {
				if (!$("body").find("#deleteBatch").length) {
					$("body").find(".form-inline").prepend(deleteButtonHtml);
				}
			} else {
				$("body").find(".form-inline").find("#deleteBatch").remove();
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
			$("body").find(".form-inline").find("#deleteBatch").remove();
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
