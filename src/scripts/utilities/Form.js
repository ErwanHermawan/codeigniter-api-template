/* ------------------------------------------------------------------------------
@name: Form
@description: Form
--------------------------------------------------------------------------------- */

// --- variables
import {
	WHITESPACE,
	EMAIL,
	NUMBERIC,
	PHONE_NUMBER,
	FULL_NAME,
	PERSON_NAME,
} from "variables";

// --- utilities
import { HttpRequest, Session, SweetAlert } from "utilities";

const Form = (() => {
	// - handleValidation
	const handleValidation = (eventsEl, selectorEl) => {
		$.each(eventsEl, (ie, ve) => {
			$.each(selectorEl, (i, v) => {
				$("#" + v.id).on(ve, (e) => {
					const _this = $(e.currentTarget),
						_val = _this.val(),
						_target = _this.attr("data-target"),
						_alertEl = $("#" + _target);
					let _errorMessage;

					// Condition if validation does not error
					_alertEl.removeClass("error");
					_this.parent().removeClass("error");

					// confirmPassword Validation
					if (v.validation !== undefined && v.validation.confirmPassword) {
						if (_val !== $("#password").val()) {
							_errorMessage = _alertEl.attr("data-invalid-confirm");
						}
					}

					// Minimum Validation
					if (v.validation !== undefined && v.validation.minimum) {
						if (_val.length < v.validation.minimumChar) {
							_errorMessage = _alertEl.attr("data-invalid");
						}
					}

					// Maximum Validation
					if (v.validation !== undefined && v.validation.maximum) {
						if (_val.length < v.validation.maximumChar) {
							_errorMessage = _alertEl.attr("data-invalid");
						}
					}

					// Minimum Validation
					if (v.validation !== undefined && v.validation.name) {
						if (!PERSON_NAME.test(_val)) {
							_errorMessage = _alertEl.attr("data-invalid");
						}
					}

					// Email validation
					if (v.validation !== undefined && v.validation.email) {
						if (!EMAIL.test(_val)) {
							_errorMessage = _alertEl.attr("data-invalid");
						}
					}

					// Numeric validation
					if (v.validation !== undefined && v.validation.phone) {
						if (!PHONE_NUMBER.test(_val)) {
							_errorMessage = _alertEl.attr("data-invalid");
						}
					}

					// Required validation
					if (WHITESPACE.test(_val) || _val === null) {
						_errorMessage = _alertEl.attr("data-req");
					}

					// Error Message
					if (_errorMessage !== undefined) {
						_alertEl.text(_errorMessage);
						_alertEl.addClass("error");
						_this.parent().addClass("error");
					}
				});
			});
		});

		// Return Handle keypress
		handleKeypress();
		// Return Handle confirm password
		handleConfirmPassword();
	};

	// handleKeypress
	const handleKeypress = () => {
		$(".number-only").on("keypress", (e) => {
			const _this = $(e.currentTarget),
				_val = _this.val(),
				_target = _this.attr("data-target"),
				_alertEl = $("#" + _target);
			let _errorMessage;
			if (!NUMBERIC.test(e.key)) {
				_errorMessage = _alertEl.attr("data-invalid");
				_alertEl.text(_errorMessage);
				_alertEl.addClass("error");
				_this.parent().addClass("error");
				// remove error after few second
				setTimeout(() => {
					_alertEl.removeClass("error");
					_this.parent().removeClass("error");
				}, 2000);
				e.preventDefault();
			}
		});
	};

	// handleConfirmPassword
	const handleConfirmPassword = () => {
		$(".js-confirm-password").on("input", (e) => {
			const _this = $(e.currentTarget);
			const _parent = _this.parent();
			const _val = _this.val();
			const _password = _this.parents("body").find("#password").val();
			const _text = _parent.find(".form-alert").attr("data-invalid");

			if (_val == _password) {
				_parent.removeClass("error");
				_parent.find(".form-alert").removeClass("error").text("");
			} else {
				_parent.addClass("error");
				_parent.find(".form-alert").addClass("error").text(_text);
			}
		});
	};

	// handleRunEmpty
	const handleRunEmpty = (selectorEl, isAlert) => {
		if (isAlert) {
			swal({
				title: "Apakah Anda yakin?",
				text: "Tindakan ini tidak dapat diurungkan!",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "Ya",
				cancelButtonText: "Batal",
				confirmButtonClass: "btn btn-success",
				cancelButtonClass: "btn btn-danger m-l-10",
				buttonsStyling: false,
			}).then(
				() => {
					// Run Empty data
					handleEmptyData(selectorEl);
					// hide modal
					$(".modal").modal("hide");
				},
				(dismiss) => {
					if (dismiss === "cancel") {
						swal("Batal", "Data Anda aman :)", "error");
					}
				}
			);
		} else {
			// Run Empty data
			handleEmptyData(selectorEl);
		}
	};

	// handleEmptyData
	const handleEmptyData = (selectorEl) => {
		$.each(selectorEl, (i, v) => {
			const _target = $("#" + v.id).attr("data-target"),
				_alertEl = $("#" + _target);

			// Condition if validation does not error
			_alertEl.removeClass("error");
			$("#" + v.id)
				.parent()
				.removeClass("error");
			if (v.validation !== undefined && v.validation.selectOption) {
				if ($("#" + v.id).hasClass("js-select2")) {
					const _select = $(`#${v.id} option[value=0]`).text();
					$(`#${v.id} option[value=0]`).attr("selected", "selected");
					$("#" + v.id)
						.parent()
						.find(".select2")
						.find(".select2-selection__rendered")
						.text(_select);
				}
				const _value = $("#" + v.id + " option:first-child").val();
				$("#" + v.id).val(_value);
			} else if (v.validation !== undefined && v.validation.attrId) {
				$("#" + v.id).attr("data-id", "");
			} else if (v.emptydata) {
			} else {
				$("#" + v.id).val("");
			}
			if ($("#" + v.id + "[type='file']")) {
				$('label[for="photo"]').parent().find(".user-avatar").remove();
				$(".dropify-preview").hide();
				$(".form-horizontal .img-preview").hide();
			}
		});
	};

	// handleDataColletion
	const handleDataColletion = (selectorEl) => {
		let formData = new FormData();
		$.each(selectorEl, (i, v) => {
			let inputValue = "";
			if (v.type !== undefined && v.type == "file") {
				inputValue = $("#" + v.id).prop("files")[0];
			} else if (v.type !== undefined && v.type == "checkbox") {
				if ($("#" + v.id).is(":checked")) {
					inputValue = "1";
				} else {
					inputValue = "0";
				}
			} else if (v.dataValueId !== undefined) {
				inputValue = $("#" + v.id).attr("data-id");
			} else {
				inputValue = $("#" + v.id).val();
			}

			if (!WHITESPACE.test(inputValue)) {
				if (inputValue !== null) {
					let keyValue = v.alias === undefined ? v.id : v.alias;
					formData.append(keyValue, inputValue);
				}
			}
		});

		return formData;
	};

	// handleGetFormData
	const handleGetFormData = async (data, modalShow = null) => {
		// Ensure userData and token are available
		const userData = JSON.parse(Session.get("userData")); // Assuming this is how userData is retrieved
		const token = userData?.token;

		if (!token) {
			SweetAlert.config("Authorization token is missing", "error");
			return;
		}
		// Get data from API
		const response = await HttpRequest.get(data, token);
		console.log(response);

		if (response.status) {
			// Show the modal
			if (modalShow) {
				$(modalShow).modal("show");
			} else {
				$(".modal").modal("show");
			}

			// Iterate through element selectors
			$.each(data.elementSelector, (index, field) => {
				let element = field.alias ? $("#" + field.alias) : $("#" + field.id);
				let elementId = field.alias || field.id;

				// Match API response data to form fields
				$.each(response.data, (responseKey, responseValue) => {
					if (elementId == responseKey) {
						if (modalShow) {
							element = $(modalShow).find("#" + field.id); // Target element within modal
						}

						// Handle different input types
						switch (field.type) {
							case "file":
								if (responseValue) {
									element.parents(".form-group").find(".img-preview").show();
									element
										.parents(".form-group")
										.find(".img-preview__el")
										.attr("src", responseValue);
								}
								break;

							case "checkbox":
								element.prop("checked", responseValue == 1);
								break;

							case "custom-select-input":
								element.val(responseValue).trigger("change");
								break;

							default:
								// Handle selectOption for select2 dropdowns
								if (
									field.validation?.selectOption &&
									element.hasClass("js-select2")
								) {
									const [text, value] = responseValue.split("value: ");
									element
										.parent()
										.find(".select2-selection__rendered")
										.text(text);
									element.val(value).trigger("change");
								}
								// Handle custom attributes (attrId)
								else if (field.validation?.attrId) {
									const attrValue = responseValue
										.split(" - ")
										.map((val) => val.split(",")[0])
										.join(", ");
									element.attr("data-id", attrValue).val(responseValue);
								}
								// Handle dataValueId fields
								else if (field.dataValueId !== undefined) {
									const [id, value] = responseValue.split("-");
									element.attr("data-id", id).val(value);
									$(`#${responseKey}`)
										.parent(".form-dropdown")
										.find(".js-reset-dropdown")
										.show();
								}
								// Default case for regular form inputs
								else if (typeof responseValue !== "object") {
									element.val(responseValue);
								}
								break;
						}
					}
				});
			});
		} else {
			// If the response is unsuccessful, hide modal and show a warning
			$(".modal").modal("hide");
			SweetAlert.config(response.message, "warning");
		}

		return response;
	};

	// handlePostRequest
	const handlePostRequest = async (data) => {
		// Ensure userData and token are available
		const userData = JSON.parse(Session.get("userData")); // Assuming this is how userData is retrieved
		const token = userData?.token;

		if (!token) {
			SweetAlert.config("Authorization token is missing", "error");
			return;
		}

		const beforeSend = () => {
			const loader = `
      <span class="custom-loader">
        <span></span><span></span><span></span><span></span>
      </span> Mengirim ....`;
			$(".js-button-loader").attr("disabled", true).html(loader);
		};

		// Call the AJAX request with token and beforeSend callback
		const response = await HttpRequest.post(data, token, beforeSend);

		if (response && response.status) {
			const status = response.status ? "success" : "error";

			$(".js-button-loader")
				.attr("disabled", false)
				.html(`<i class="mdi mdi-content-save-outline"></i> Simpan`);

			$(".modal").modal("hide");
			SweetAlert.config(response.message, status);
			$("#dataTable").DataTable().ajax.reload();

			if (data.elementSelector) {
				Form.emptyData(data.elementSelector); // Clear form data if selector is provided
			}
		} else {
			SweetAlert.config(response?.message || "An error occurred", "error"); // Use response message or a fallback
			$(".js-button-loader")
				.attr("disabled", false)
				.html(`<i class="mdi mdi-content-save-outline"></i> Simpan`);
		}
	};

	// handleDeleteData
	const handleDeleteData = (data) => {
		swal({
			title: "Apakah Anda yakin?",
			text: "Tindakan ini tidak dapat diurungkan!",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Ya, Hapus",
			cancelButtonText: "Batal",
			confirmButtonClass: "btn btn-success",
			cancelButtonClass: "btn btn-danger m-l-10",
			buttonsStyling: false,
		}).then(
			() => {
				// Ensure userData and token are available
				const userData = JSON.parse(Session.get("userData")); // Assuming this is how userData is retrieved
				const token = userData?.token;

				if (!token) {
					SweetAlert.config("Authorization token is missing", "error");
					return;
				}

				// Run API Delete Data
				const response = HttpRequest.post(data, token);
				$(".modal").modal("hide");
				SweetAlert.config("success", response.status);
				$("#dataTable").DataTable().ajax.reload();
			},
			(dismiss) => {
				if (dismiss === "cancel") {
					swal("Batal", "Data Anda aman :)", "error");
				}
			}
		);
	};

	return {
		validation: handleValidation,
		emptyData: handleRunEmpty,
		dataColletion: handleDataColletion,
		getData: handleGetFormData,
		postData: handlePostRequest,
		deleteData: handleDeleteData,
	};
})();

export default Form;
