/* ------------------------------------------------------------------------------
@name: Meta
@description: Meta
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WEB_URL, WHITESPACE } from "../variables";

// --- utilities
import { Form, HttpRequest, SweetAlert } from "../utilities";

// Form ElementSelector
const ElementSelector = [
	{
		id: "meta_id",
	},
	{
		id: "og_image",
		type: "file",
	},
	{
		id: "twitter_image",
		type: "file",
	},
	{
		id: "logo",
		type: "file",
	},
	{
		id: "robots",
	},
	{
		id: "refresh",
	},
	{
		id: "title",
	},
	{
		id: "description",
	},
	{
		id: "keywords",
	},
	{
		id: "author",
	},
	{
		id: "copyright",
	},
	{
		id: "theme_color",
	},
	{
		id: "domain_name",
	},
	{
		id: "twitter_account",
	},
	{
		id: "facebook_account",
	},
	{
		id: "instagram_account",
	},
	{
		id: "email_account",
	},
];

const Meta = (() => {
	// Handle Click Validation
	const handleClickValidation = () => {
		$('.js-form-meta button[type="submit"]').on("click", (e) => {
			e.preventDefault();

			$.each(ElementSelector, (i, v) => {
				$("#" + v.id).blur();
			});

			if ($(".error").length === 0) {
				handleSaveData();
			}
		});
	};

	// handleSaveData
	const handleSaveData = async () => {
		const dataCollection = Form.dataCollection(ElementSelector, "multipart");
		const endpoint = API_URL.META;

		const requestData = {
			url: endpoint,
			method: "POST",
			data: dataCollection,
			elementSelector: ElementSelector,
		};

		const response = await HttpRequest.multipartData(requestData);
		if (response.status) {
			SweetAlert.config(response.message, "success");
			location.href = WEB_URL.meta;
		} else {
			SweetAlert.config(response.message, "error");
		}
	};

	const init = () => {
		if ($(".js-form-meta").length) {
			handleClickValidation();
		}
	};

	return {
		init,
	};
})();

export default Meta;
