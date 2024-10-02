/* ------------------------------------------------------------------------------
@name: FormatDate
--------------------------------------------------------------------------------- */

const FormatDate = (() => {
	// --- handle format custom date
	const handleFormatCustomDate = (_date) => {
		var dd = String(_date.getDate()).padStart(2, "0");
		var mm = String(_date.getMonth() + 1).padStart(2, "0");
		var yyyy = _date.getFullYear();
		_date = dd + "-" + mm + "-" + yyyy;

		return _date;
	};

	// --- handle split date range
	const handleSplitDateRange = (date) => {
		return date.replace(" - ", "-").split("-");
	};

	// --- handle format date renge
	const handleFormatRangeDate = (date) => {
		const _date = handleSplitDateRange(date);
		return {
			startDate: _date[0].replaceAll("/", "-"),
			endDate: _date[1].replaceAll("/", "-"),
		};
	};

	// --- handle format dash date
	const handleFormatDashDate = (date) => {
		return date.replaceAll("/", "-");
	};

	return {
		custom: handleFormatCustomDate,
		range: handleFormatRangeDate,
		dash: handleFormatDashDate,
	};
})();

export default FormatDate;
