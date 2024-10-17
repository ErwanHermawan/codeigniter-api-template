// --- core
import {
	SweetAlert,
	Dropify,
	TemporaryAlert,
	BackButton,
	DatePickerInput,
	SelectInput,
	EditableTables,
	ChangeFormatNumber,
	Password,
	Dropdown,
	CheckBox,
	DataTable,
	Modal,
} from "./core";

// --- components
import { Header, Login, Users, Meta, Profile } from "./components";

// --- App
const App = (() => {
	// --- run transition
	const runTransition = () => {
		$("body").removeClass("hold-transition");
	};

	// --- show site content
	const showSiteContent = () => {
		$(".js-main-site").removeClass("main-site--hide");
		// --- disable scroll
		Scrolllable.enable();
	};

	// --- ready
	const ready = () => {
		(($) => {
			// -- core initialization
			SweetAlert.init();
			Dropify.init();
			TemporaryAlert.init();
			BackButton.init();
			DatePickerInput.init();
			SelectInput.init();
			EditableTables.init();
			ChangeFormatNumber.init();
			Password.init();
			Dropdown.init();
			CheckBox.init();
			DataTable.init();
			Modal.init();

			// -- components initialization
			Header.init();
			Login.init();
			Users.init();
			Meta.init();
			Profile.init();
		})(jQuery);
	};

	// --- load
	const load = () => {
		(($) => {
			$(window).on("load", () => {});
		})(jQuery);
	};

	// --- init
	const init = () => {
		load();
		ready();
	};

	// --- return
	return {
		init,
	};
})();

// ---  run main js
App.init();
