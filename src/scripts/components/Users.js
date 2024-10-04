/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WHITESPACE } from "../variables";

// --- utilities
import { Session, SweetAlert } from "utilities";

// --- core
import { DataTable } from "core";

const userData = JSON.parse(Session.get("userData"));

// Form UserSelector
const UserSelector = [
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
		id: "confirm_password",
		validation: {
			confirmPassword: true,
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
				targets: 1,
				render: (dataSetting) => {
					return `<span class="user-avatar">
										<img class="user-avatar__img" src="${dataSetting}" />
									</span>`;
				},
			},
			{
				targets: 6,
				className: "text-center",
				render: (dataSetting) => {
					return `<button type="button" data-toggle="tooltip" data-placement="left" title="Edit" class="btn btn-icon waves-effect btn-primary btn-trans js-edit-data" data-id="${dataSetting}"><i class="mdi mdi-pencil-outline"></i></button>
					<button type="button" data-toggle="tooltip" data-placement="left" title="Delete" class="btn btn-icon waves-effect btn-danger btn-trans js-delete-data" data-id="${dataSetting}"><i class="mdi mdi-trash-can-outline"></i></button>`;
				},
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

	const init = () => {
		handleRunDataTable();
	};

	return {
		init,
	};
})();

export default Users;
