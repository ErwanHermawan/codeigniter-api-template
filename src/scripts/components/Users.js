/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WHITESPACE } from "../variables";

// --- utilities
import { Session, Form, HttpRequest, SweetAlert } from "utilities";

// --- core
import { DataTable } from "core";

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
		id: "password",
		validation: {
			minimum: true,
			minimumChar: 5,
		},
	},
	{
		id: "username",
		validation: {
			required: true,
		},
	},
	{
		id: "role",
		validation: {
			selectRequired: true,
		},
	},
	{
		id: "photo",
		type: "file",
	},
];
const ElementEvents = ["input", "blur"];

const Users = (() => {
	// Handle Run DataTable
	const handleRunDataTable = () => {
		const dataSetting = {
			selector: "js-data-users",
			url: API_URL.USERS,
			method: "GET",
			token: userData.token,
		};

		const columnSetting = [
			{
				targets: [5, 6],
				className: "text-center",
			},
			{
				targets: 0,
				orderable: false,
			},
		];

		const filterSetting = [
			{
				id: "dateRange",
				event: "change",
			},
			{
				id: "status",
				event: "change",
			},
			{
				id: "search",
				event: "keyup",
			},
		];

		const sortSetting = {
			id: "sort",
			event: "change",
		};

		DataTable.server(dataSetting, columnSetting, filterSetting, sortSetting);
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
				handlePostData();
			}
			e.preventDefault();
		});
	};

	const handlePostData = () => {
		const formData = Form.dataColletion(ElementSelector);
		console.log(formData);
		const userId = $("#user_id").val();

		const endpoint = API_URL.USERS;
		const method = userId.length ? "PUT" : "POST";

		const requestData = {
			url: endpoint,
			method: method,
			data: formData,
			elementSelector: ElementSelector,
		};

		Form.postData(requestData);
	};

	const handleEditData = () => {
		$("body").on("click", ".js-edit-data", (e) => {
			const _this = $(e.currentTarget);
			const userId = _this.attr("data-id");

			const data = {
				url: API_URL.USERS,
				data: { user_id: userId },
				elementSelector: ElementSelector,
			};

			Form.getData(data);
		});
	};

	// handleDeleteData
	const handleDeleteData = () => {
		$("body").on("click", ".js-delete-data", (e) => {
			const _this = $(e.currentTarget);
			const userId = _this.attr("data-id");

			const sendData = JSON.stringify({ user_id: userId });

			const data = {
				url: API_URL.USERS,
				method: "DELETE",
				data: sendData,
			};

			Form.deleteData(data);
		});
	};

	// init
	const init = () => {
		if ($(".js-data-users").length) {
			handleRunDataTable();
			handleRunValidation();
			handleClickValidation();
			handleEditData();
			handleDeleteData();
		}
	};

	return {
		init,
	};
})();

export default Users;
