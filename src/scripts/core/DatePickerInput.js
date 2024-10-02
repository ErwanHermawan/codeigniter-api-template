/* ------------------------------------------------------------------------------
@name: DatePickerInput
@description: DatePickerInput Activate
--------------------------------------------------------------------------------- */

const DatePickerInput = (() => {
  // handlRunDatePicker
  const handlRunDatePicker = () => {
    $(".js-date-picker").datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true,
    });
  };

  // handldeDateRengePicker
  const handldeDateRengePicker = () => {
    var start = moment().subtract(29, "days");
    var end = moment();

    function cb(start, end) {
      $(".js-date-range-picker").val(
        start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY")
      );
    }

    $(".js-date-range-picker").daterangepicker(
      {
        // timePicker: true,
        startDate: start,
        endDate: end,
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
        },
        ranges: {
          "Hari ini": [moment(), moment()],
          Kemarin: [moment().subtract(1, "days"), moment().subtract(1, "days")],
          "7 hari terakhir": [moment().subtract(6, "days"), moment()],
          "30 hari terakhir": [moment().subtract(29, "days"), moment()],
          "Bulan ini": [moment().startOf("month"), moment().endOf("month")],
          "Bulan lalu": [
            moment().subtract(1, "month").startOf("month"),
            moment().subtract(1, "month").endOf("month"),
          ],
          "Tahun ini": [moment().startOf("year"), moment().endOf("year")],
          "Tahun lalu": [
            moment().subtract(1, "year").startOf("year"),
            moment().subtract(1, "year").endOf("year"),
          ],
        },
      },
      cb
    );

    cb(start, end);
    var _dateRange = $(".js-date-range-picker").val();
    $(".js-date-range-picker").attr("data-date", _dateRange);
  };

  const init = () => {
    if ($(".js-date-picker").length || $(".js-date-range-picker").length) {
      handlRunDatePicker();
      handldeDateRengePicker();
    }
  };

  return {
    init,
  };
})();

export default DatePickerInput;
