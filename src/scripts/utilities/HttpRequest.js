/* ------------------------------------------------------------------------------
@name: HttpRequest
@description: HttpRequest Activate
--------------------------------------------------------------------------------- */

// --- utilities
import { SweetAlert, Form } from "utilities";

const HttpRequest = (() => {
	// handleRequestDefault
	const handleRequestDefault = (
		data,
		element = "#dataTable",
		ElementSelector = false
	) => {
		$.ajax({
			url: data.url,
			method: data.method,
			dataType: "JSON",
			cache: false,
			async: false,
			contentType: false,
			processData: false,
			data: data.data,
			beforeSend: function () {
				var _loader = `<span class="custom-loader"><span></span><span></span><span></span><span></span></span> Mengirim ....`;

				$(".js-button-loader").attr("disabled", true);
				$(".js-button-loader").html(_loader);
			},
			success: (response) => {
				let status = "success";
				if (response.code !== 200) {
					status = "error";
				}
				$(".js-button-loader").attr("disabled", false);
				$(".js-button-loader").html(
					`<i class="mdi mdi-content-save-outline"></i> Simpan`
				);

				$(".modal").modal("hide");
				SweetAlert.config(response.message, status);
				$(element).DataTable().ajax.reload();
				if (ElementSelector) {
					Form.emptyData(ElementSelector);
				}
			},
			error: (response) => {
				SweetAlert.config(response.message, "error");
				$(".js-button-loader").attr("disabled", false);
				$(".js-button-loader").html(
					`<i class="mdi mdi-content-save-outline"></i> Simpan`
				);
				return response;
			},
		});
	};

	// handleRequestCustom
	const handleRequestCustom = (data, beforeSend = undefined) => {
		let result;
		$.ajax({
			url: data.url,
			method: data.method,
			dataType: "JSON",
			cache: false,
			async: false,
			contentType: false,
			processData: false,
			data: data.data,
			beforeSend: () => {
				if (beforeSend) {
					beforeSend();
				}
			},
			success: (response) => {
				result = response;
			},
			error: (response) => {
				SweetAlert.config(response.message, "error");
			},
		});

		return result;
	};

	const handleRequestSS = async (data) => {
		let result;
		await $.ajax({
			type: "POST",
			url: data.url,
			data: data.data,
			dataType: "JSON",
			success: (response) => {
				result = response;
			},
			error: (response) => {
				SweetAlert.config(response.message, "error");
			},
		});
	};

	return {
		default: handleRequestDefault,
		custom: handleRequestCustom,
		ss: handleRequestSS,
	};
})();

export default HttpRequest;
