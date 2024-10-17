/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL } from "../variables";

// --- utilities
import { Session, Form, HttpRequest, SweetAlert } from "utilities";

const userData = JSON.parse(Session.get("userData"));

// Form ElementSelector
const ElementSelector = [
	{
		id: "user_id",
	},
	{
		id: "name",
		validation: {
			required: true,
		},
	},
	{
		id: "username",
		validation: {
			required: true,
		},
	},
	{
		id: "email",
		validation: {
			required: true,
			email: true,
		},
	},
	{
		id: "phone",
		validation: {
			required: true,
			phone: true,
		},
	},
];
const ElementEvents = ["input", "blur"];

const Profile = (() => {
	// handleGetData
	const handleGetData = async () => {
		const userData = JSON.parse(Session.get("userData"));
		const userId = userData.user_id;
		const token = userData.token;
		const data = {
			url: API_URL.PROFILE,
			method: "GET",
			data: { user_id: userId },
		};

		const response = await HttpRequest.data(data, token);
		const _data = response.data;
		if (response.status) {
			$(".account-profile__img").attr({
				src: _data.photo,
				alt: _data.name,
			});
			$(".js-profile-name").text(`${_data.name}`);
			$(".js-profile-username").text(`${_data.username}`);
			$(".js-profile-email").text(`${_data.email}`);
			$(".js-profile-phone").text(`${_data.phone}`);
			$(".js-profile-role").text(`${_data.role}`);
			$(".js-profile-cd").text(`${_data.created_date}`);

			$("#user_id").val(`${_data.user_id}`);
			$("#name").val(`${_data.name}`);
			$("#username").val(`${_data.username}`);
			$("#email").val(`${_data.email}`);
			$("#phone").val(`${_data.phone}`);

			$(".js-profile-page").find(".skeleton-text").removeClass("skeleton");
		}
	};

	// handleChangeProfile
	const handleChangeProfile = () => {
		$(".js-change-profile .account-profile__input").on("change", (e) => {
			$(".account-profile__img").attr(
				"src",
				window.URL.createObjectURL(e.currentTarget.files[0])
			);
		});
	};

	// Handle Run Validation
	const handleRunValidation = () => {
		Form.validation(ElementEvents, ElementSelector);
	};

	// Handle Click Validation
	const handleClickValidation = () => {
		$('button[type="submit"]').on("click", (e) => {
			$.each(ElementSelector, (i, v) => {
				$("#" + v.id).blur();
			});

			if ($(".error").length === 0) {
				handleSaveData();
			}
			e.preventDefault();
		});
	};

	// handleSaveData
	const handleSaveData = () => {
		const dataCollection = Form.dataCollection(ElementSelector);
		const endpoint = API_URL.PROFILE;

		const requestData = {
			url: endpoint,
			method: "PUT",
			data: dataCollection,
			elementSelector: ElementSelector,
		};

		Form.sendData(requestData);
	};

	// handleEmptyInput
	const handleEmptyInput = () => {
		$('button[data-dismiss="modal"]').on("click", (e) => {
			Form.emptyData(ElementSelector);
		});
	};

	// init
	const init = () => {
		if ($(".js-profile-page").length) {
			handleGetData();
			handleRunValidation();
			handleClickValidation();
			handleEmptyInput();
			handleChangeProfile();
		}
	};

	return {
		init,
	};
})();

export default Profile;
