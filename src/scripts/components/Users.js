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
				targets: 0,
				orderable: false,
				render: (data) => {
					return `<div class="custom-checkbox">
										<label class="custom-checkbox__wrapper">
											<input type="checkbox" value="${data}" />
											<div class="custom-checkbox__checkmark"></div>
										</label>
									</div>`;
				},
			},
			{
				targets: 1,
				render: (data) => {
					return `<span class="user-avatar">
										<img class="user-avatar__img" src="${data}" />
									</span>`;
				},
			},
			{
				targets: 6,
				className: "text-center",
				render: (data) => {
					return `<button type="button" data-toggle="tooltip" data-placement="left" title="Edit" class="btn btn-icon waves-effect btn-primary btn-trans js-edit-data" data-id="${data}"><i class="mdi mdi-pencil-outline"></i></button>
					<button type="button" data-toggle="tooltip" data-placement="left" title="Delete" class="btn btn-icon waves-effect btn-danger btn-trans js-delete-data" data-id="${data}"><i class="mdi mdi-trash-can-outline"></i></button>`;
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

	const selectCheckbox = () => {
		$(".js-select-all-checkbox input").on("click", (e) => {
			const _this = $(e.currentTarget);
			if (_this.is(":checked")) {
				console.log(1);
			} else {
				console.log(2);
			}
		});
	};

	const init = () => {
		handleRunDataTable();
	};

	return {
		init,
	};
})();

export default Users;
