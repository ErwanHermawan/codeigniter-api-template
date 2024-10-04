/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WEB_URL } from "variables";

// --- utilities
import { Session, SweetAlert } from "utilities";

const _userData = JSON.parse(Session.get("userData"));

// --- Header
const Header = (() => {
	// handleCheckSession
	const handleCheckSession = () => {
		Session.timeout(() => {
			Session.remove("userData");
			location.reload();
		}, 3600);
	};

	// handleLogout
	const handleLogout = () => {
		$(".js-logout").on("click", (e) => {
			e.preventDefault();
			Session.remove("userData");
			location.href = WEB_URL.login;
		});
	};

	// -init
	const init = () => {
		handleCheckSession();
		handleLogout();
	};

	return {
		init,
	};
})();

export default Header;
