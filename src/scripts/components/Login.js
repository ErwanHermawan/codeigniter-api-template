/* ------------------------------------------------------------------------------
@name: Login
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WEB_URL } from "variables";

// --- utilities
import { Form, Session, HttpRequest, SweetAlert } from "utilities";

// Form Validation
const ElementSelector = [
	{
		id: "email",
		validation: {
			required: true,
			email: true,
			invalid: true,
		},
	},
	{
		id: "password",
		validation: {
			required: true,
			minimum: true,
			minimumChar: 5,
		},
	},
];

const ElementEvents = ["input", "blur"];

const Login = (() => {
	// Handle Run Validation
	const handleRunValidation = () => {
		Form.validation(ElementEvents, ElementSelector);
	};

	// Handle Click Validation
	const handleClickValidation = () => {
		$('.js-auth-login button[type="submit"]').on("click", (e) => {
			e.preventDefault();

			$.each(ElementSelector, (i, v) => {
				$("#" + v.id).blur();
			});

			if ($(".error").length === 0) {
				handleLoginUser();
			}
		});
	};

	const handleLoginUser = async () => {
		const username = $(".js-auth-login").find("#username").val();
		const password = $(".js-auth-login").find("#password").val();
		let formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);

		const data = {
			url: API_URL.login,
			method: "POST",
			data: formData,
		};

		const response = await HttpRequest.ajax(data);

		if (response.status) {
			Session.set("userData", JSON.stringify(response.data));
			location.href = WEB_URL.dashboard;
		} else {
			SweetAlert.config(response.message, "error");
		}
	};

	// initx
	const init = () => {
		if ($(".js-auth-login").length) {
			handleClickValidation();
			handleRunValidation();
		}
	};

	return {
		init,
	};
})();

export default Login;
