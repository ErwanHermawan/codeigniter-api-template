/* ------------------------------------------------------------------------------
@name: HttpRequest
@description: HttpRequest Activate
--------------------------------------------------------------------------------- */

// --- utilities
import { SweetAlert } from "utilities";

const HttpRequest = (() => {
	// handleAjaxRequest
	const handleAjaxRequest = async (data) => {
		try {
			const response = await $.ajax({
				url: data.url,
				method: data.method,
				dataType: "JSON",
				cache: false,
				contentType: false,
				processData: false,
				data: data.data,
			});

			return response;
		} catch (error) {
			SweetAlert.config(
				error.responseJSON?.message || "Error during the request",
				"error"
			);
			return null;
		}
	};

	return {
		ajax: handleAjaxRequest,
	};
})();

export default HttpRequest;
