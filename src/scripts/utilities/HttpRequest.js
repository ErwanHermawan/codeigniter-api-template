/* ------------------------------------------------------------------------------
@name: HttpRequest
@description: HttpRequest Activate
--------------------------------------------------------------------------------- */

// --- utilities
import { Session, SweetAlert } from "utilities";

const HttpRequest = (() => {
	// handlePostRequest
	const handlePostRequest = async (data, token, beforeSend = false) => {
		try {
			const headers = {};

			// Add the Authorization header if token is provided
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}
			const response = await $.ajax({
				url: data.url,
				method: data.method,
				dataType: "JSON",
				cache: false,
				contentType: false,
				processData: false,
				data: data.data,
				headers: headers, // Use dynamic headers
				beforeSend: () => {
					if (beforeSend && typeof beforeSend === "function") {
						beforeSend(); // Execute callback if provided
					}
				},
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

	// handlePostRequest
	const handleGetRequest = async (data, token, beforeSend = false) => {
		try {
			const headers = {};

			// Add the Authorization header if token is provided
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await $.ajax({
				url: data.url,
				method: "GET",
				dataType: "application/json",
				data: data.data,
				headers: {
					Authorization: `Bearer ${token}`, // Pass token in the headers
				},
				beforeSend: () => {
					if (beforeSend && typeof beforeSend === "function") {
						beforeSend(); // Execute callback if provided
					}
				},
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
		post: handlePostRequest,
		get: handleGetRequest,
	};
})();

export default HttpRequest;
