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

const UserLogs = (() => {
	// Handle Run DataTable
	const handleRunDataTable = () => {
		const dataSetting = {
			selector: "js-data-user-logs",
			url: API_URL.USER_LOGS,
			method: "GET",
			token: userData.token,
		};

		const columnSetting = [
			{
				targets: 0,
				orderable: false,
			},
		];

		DataTable.server(dataSetting, columnSetting);
	};

	// init
	const init = () => {
		if ($(".js-data-user-logs").length) {
			handleRunDataTable();
		}
	};

	return {
		init,
	};
})();

export default UserLogs;
