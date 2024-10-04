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
import { HttpRequest, SweetAlert } from "utilities";

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
	const handleGetFormData = (data, modalShow) => {
		// handleRunEmpty(data.elementSelector);
		// get data from API
		const response = HttpRequest.custom(data);
		if (response.code === 200) {
			// show form modal
			if (modalShow !== undefined) {
				// for examination modal
				if (modalShow === "examination") {
					const data = response.data;
					if (data.examinationNurse === "1" && data.doctorId === undefined) {
						modalShow = "#modalExaminationNurse";
						$(modalShow).modal("show");
					} else {
						modalShow = "#modalExamination";
						$(modalShow).modal("show");
					}
					// end for examination modal
				} else {
					$(modalShow).modal("show");
				}
			} else {
				$(".modal").modal("show");
			}
			// set input data
			$.each(data.elementSelector, (i, v) => {
				let _element = v.alias !== undefined ? $("#" + v.alias) : $("#" + v.id);
				let _elementId = v.alias !== undefined ? v.alias : v.id;

				$.each(response.data, (iD, vD) => {
					if (modalShow !== undefined) {
						_element = $(modalShow).find("#" + v.id);
					}
					if (_elementId == iD) {
						if (v.type !== undefined && v.type == "file") {
							if (vD !== null) {
								_element.parents(".form-group").find(".img-preview").show();
								_element.parents(".form-group").find(".img-preview__el").attr({
									src: vD,
								});
							}
						} else if (v.type !== undefined && v.type == "checkbox") {
							if (vD == 1) {
								_element.attr("checked", "checked");
							} else {
								_element.removeAttr("checked");
							}
						} else if (
							v.type !== undefined &&
							v.type == "custom-select-input"
						) {
							_element.val(vD);
							_element.trigger("change");
						} else if (
							v.validation !== undefined &&
							v.validation.selectOption
						) {
							if (_element.hasClass("js-select2")) {
								const _dataSelect = vD.split("value: ");
								const _text = _dataSelect[0];
								const _val = _dataSelect[1];
								_element
									.parent()
									.find(".select2")
									.find(".select2-selection__rendered")
									.text(_text);

								$(`#${v.id} option[value="${_val}"]`).attr(
									"selected",
									"selected"
								);
								_element.val(_val);
							} else {
								_element.val(vD);
							}
						} else if (v.validation !== undefined && v.validation.attrId) {
							const _arr = vD.split(" - ");
							let _val = "";
							for (let i = 0; i < _arr.length; i++) {
								_val += _arr[i].split(",")[0] + ", ";
							}
							_element.attr("data-id", _val.slice(0, -1));
							_element.val(vD);
						} else if (v.dataValueId !== undefined) {
							const _dataSelect = vD.split("-");
							_element.attr("data-id", _dataSelect[0]);
							_element.val(_dataSelect[1]);

							$(`#${iD}`)
								.parent(".form-dropdown")
								.find(".js-reset-dropdown")
								.show();
						} else {
							if (typeof vD !== "object") {
								_element.val(vD);
							}
						}
					}
				});
			});
		} else {
			$(".modal").modal("hide");
			SweetAlert.config(response.message, "warning");
		}

		return response;
	};

	// handleDeleteData
	const handleDeleteData = (data, element) => {
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
				// Run API Delete Data
				HttpRequest.default(data, element);
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
		deleteData: handleDeleteData,
		getFormData: handleGetFormData,
	};
})();

export default Form;
