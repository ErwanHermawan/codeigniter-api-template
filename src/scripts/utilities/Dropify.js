/* ------------------------------------------------------------------------------
@name: Dropify
@description: Dropify Activate
--------------------------------------------------------------------------------- */

const Dropify = (() => {
	// Handle Run DataTable
	const handleRunDropify = () => {
		$(".js-dropify").dropify({
			messages: {
				default: "Seret dan lepas file di sini atau klik",
				replace: "Seret dan lepas atau klik untuk mengganti",
				remove: "Remove",
				error: "Ups, ada yang salah ditambahkan.",
			},
			error: {
				fileSize: "Ukuran file terlalu besar.",
			},
		});
	};

	// init
	const init = () => {
		handleRunDropify();
	};

	return {
		init,
	};
})();

export default Dropify;
