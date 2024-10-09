/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WHITESPACE } from "../variables";

// --- utilities
import { Session, Form, SweetAlert } from "utilities";

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
		id: "phone",
		validation: {
			required: false,
			phone: true,
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
				// handlePostData();
				console.log(1);
			}
			e.preventDefault();
		});
	};

	// init
	const init = () => {
		handleRunDataTable();
		handleRunValidation();
		handleClickValidation();
	};

	return {
		init,
	};
})();

export default Users;
