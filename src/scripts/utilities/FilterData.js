// --- variables
import { WHITESPACE } from "../variables";

// --- components
import {
	Product,
	Type,
	Category,
	Unit,
	Addon,
	Supplier,
	Customer,
	Users,
	Table,
	TableDetail,
	SalesPeriode,
	SalesProduct,
	SalesCustomer,
	SalesCategory,
	SalesPayment,
	SalesType,
	SalesServed,
	PurchaseOrder,
	StockIn,
	StockOut,
	StockOpname,
	StockCard,
	Sale,
	Tax,
	Outlet,
	Employee,
	CashFlow,
	CashDetail,
	CashNetprofit,
	Cash,
	CashCategory,
	PaymentAccount,
	Device,
	Invoice,
} from "../components";

/* ------------------------------------------------------------------------------
@name: FilterData
@description: FilterData
--------------------------------------------------------------------------------- */

const FilterData = (() => {
	// --- handleDateRange
	const handleDateRange = (date) => {
		return date.replace(" - ", "-").split("-");
	};

	// --- handleFormatDate
	const handleFormatDate = (date) => {
		var _date = date.split(/\//);
		return [_date[0], _date[1], _date[2]].join("-");
	};

	const handleGetData = (_filter) => {
		if ($(".js-product-result").length) {
			Product.handleGetData(_filter);
		}
		if ($(".js-type-result").length) {
			Type.handleGetData(_filter);
		}
		if ($(".js-category-result").length) {
			Category.handleGetData(_filter);
		}
		if ($(".js-unit-result").length) {
			Unit.handleGetData(_filter);
		}
		if ($(".js-addon-result").length) {
			Addon.handleGetData(_filter);
		}
		if ($(".js-supplier-result").length) {
			Supplier.handleGetData(_filter);
		}
		if ($(".js-customer-result").length) {
			Customer.handleGetData(_filter);
		}
		if ($(".js-user-result").length) {
			Users.handleGetData(_filter);
		}
		if ($(".js-table-result").length) {
			Table.handleGetData(_filter);
		}
		if ($(".js-table-detail-result").length) {
			TableDetail.handleGetData(_filter);
		}
		if ($(".js-sales-periode").length) {
			SalesPeriode.handleGetData(_filter);
		}
		if ($(".js-sales-product").length) {
			SalesProduct.handleGetData(_filter);
		}
		if ($(".js-sales-customer").length) {
			SalesCustomer.handleGetData(_filter);
		}
		if ($(".js-sales-category").length) {
			SalesCategory.handleGetData(_filter);
		}
		if ($(".js-sales-payment").length) {
			SalesPayment.handleGetData(_filter);
		}
		if ($(".js-sales-type").length) {
			SalesType.handleGetData(_filter);
		}
		if ($(".js-sales-served").length) {
			SalesServed.handleGetData(_filter);
		}
		if ($(".js-po-result").length) {
			PurchaseOrder.handleGetData(_filter);
		}
		if ($(".js-stock-in-result").length) {
			StockIn.handleGetData(_filter);
		}
		if ($(".js-stock-out-result").length) {
			StockOut.handleGetData(_filter);
		}
		if ($(".js-stock-opname-result").length) {
			StockOpname.handleGetData(_filter);
		}
		if ($(".js-stock-card-result").length) {
			StockCard.handleGetData(_filter);
		}
		if ($(".js-sale-result").length) {
			Sale.handleGetData(_filter);
		}
		if ($(".js-tax-result").length) {
			Tax.handleGetData(_filter);
		}
		if ($(".js-outlet-result").length) {
			Outlet.handleGetData(_filter);
		}
		if ($(".js-employee-result").length) {
			Employee.handleGetData(_filter);
		}
		if ($(".js-cash-flow").length) {
			CashFlow.handleGetData(_filter);
		}
		if ($(".js-cash-detail").length) {
			CashDetail.handleGetData(_filter);
		}
		if ($(".js-cash-netprofit").length) {
			CashNetprofit.handleGetData(_filter);
		}
		if ($(".js-cash-result").length) {
			Cash.handleGetData(_filter);
		}
		if ($(".js-cash-category").length) {
			CashCategory.handleGetData(_filter);
		}
		if ($(".js-payment-account").length) {
			PaymentAccount.handleGetData(_filter);
		}
		if ($(".js-device-result").length) {
			Device.handleGetData(_filter);
		}
		if ($(".js-invoice-result").length) {
			Invoice.handleGetData(_filter);
		}
	};

	const handleChangePage = () => {
		$("body").on("click", ".js-pagination a", (e) => {
			e.preventDefault();
			const _this = $(e.currentTarget);
			var _startPage = _this.data("ci-pagination-page");
			var _showPerPage = $(".js-show-per-page").val();
			var _keyword = $(".js-keyword").val();
			var _filter = {
				startPage: _startPage,
				limitPage: _showPerPage,
				keyword: _keyword,
			};

			if ($(".js-date-range-picker").length) {
				var _date = $(".js-date-range-picker").val();
				var _dateRange = handleDateRange(_date);
				var _startDate = handleFormatDate(_dateRange[0]);
				var _endDate = handleFormatDate(_dateRange[1]);

				// filter join
				var _filter1 = _filter;
				var _filter2 = {
					startDate: _startDate,
					endDate: _endDate,
				};

				var _filter = {
					..._filter1,
					..._filter2,
				};
				if ($(".js-change-type").length) {
					var _type = $(".js-change-type").val();
					// filter join
					var _filter1 = _filter;
					var _filter2 = {
						type: _type,
					};

					var _filter = {
						..._filter1,
						..._filter2,
					};
				}
			}

			handleGetData(_filter);
		});
	};

	const handleChangeSort = () => {
		$(".js-show-per-page").on("change", () => {
			handleLoadData();
		});
	};

	const handleFilterData = () => {
		$(".js-filter-data").on("click", () => {
			handleLoadData();
		});
	};

	const handleKeyupKeyword = () => {
		$(".js-keyword").on("keyup", (e) => {
			const _this = $(e.currentTarget);
			if (e.which == 13 && !WHITESPACE.test(_this.val())) {
				if ($(".js-pagination a").data("ci-pagination-page") !== undefined) {
					var _startPage = $(".js-pagination a").data("ci-pagination-page");
				} else {
					var _startPage = 1;
				}
				var _showPerPage = $(".js-show-per-page").val();
				var _keyword = _this.val();

				var _filter = {
					startPage: _startPage,
					limitPage: _showPerPage,
					keyword: _keyword,
				};

				if ($(".js-date-range-picker").length) {
					var _date = $(".js-date-range-picker").val();
					var _dateRange = handleDateRange(_date);
					var _startDate = handleFormatDate(_dateRange[0]);
					var _endDate = handleFormatDate(_dateRange[1]);

					// filter join
					var _filter1 = _filter;
					var _filter2 = {
						startDate: _startDate,
						endDate: _endDate,
					};

					var _filter = {
						..._filter1,
						..._filter2,
					};
				}

				if ($(".js-change-type").length) {
					var _type = $(".js-change-type").val();
					// filter join
					var _filter1 = _filter;
					var _filter2 = {
						type: _type,
					};

					var _filter = {
						..._filter1,
						..._filter2,
					};
				}

				handleGetData(_filter);
			}
		});
	};

	const handleResetData = () => {
		$(".js-reset-data").on("click", () => {
			var _dateRange = $(".js-date-range-picker").attr("data-date");
			$(".js-show-per-page").val("10");
			$(".js-keyword").val("");
			$(".js-change-type").find(`[value="All"]`).attr("selected", "selected");
			$(".js-date-range-picker").val(_dateRange);

			handleLoadData();
		});
	};

	// handleLoadData
	const handleLoadData = () => {
		if ($(".js-pagination a").data("ci-pagination-page") !== undefined) {
			var _startPage = $(".js-pagination a").data("ci-pagination-page");
		} else {
			var _startPage = 1;
		}
		var _showPerPage = $(".js-show-per-page").val();
		var _keyword = $(".js-keyword").val() !== "" ? $(".js-keyword").val() : 0;
		var _is_sale =
			$(".js-status-stock").val() !== "" ? $(".js-status-stock").val() : "All";

		var _filter = {
			startPage: _startPage,
			limitPage: _showPerPage,
			keyword: _keyword,
			is_sale: _is_sale,
		};

		if ($(".js-date-range-picker").length) {
			var _date = $(".js-date-range-picker").val();
			var _dateRange = handleDateRange(_date);
			var _startDate = handleFormatDate(_dateRange[0]);
			var _endDate = handleFormatDate(_dateRange[1]);

			// filter join
			var _filter1 = _filter;
			var _filter2 = {
				startDate: _startDate,
				endDate: _endDate,
			};

			var _filter = {
				..._filter1,
				..._filter2,
			};
		}

		if ($(".js-change-type").length) {
			var _type = $(".js-change-type").val();
			// filter join
			var _filter1 = _filter;
			var _filter2 = {
				type: _type,
			};

			var _filter = {
				..._filter1,
				..._filter2,
			};
		}

		handleGetData(_filter);
	};

	const init = () => {
		if ($(".js-filter-data").length) {
			handleChangeSort();
			handleChangePage();
			handleFilterData();
			handleKeyupKeyword();
			handleResetData();
			handleLoadData();
		}
	};

	return {
		init,
		handleDateRange,
		handleFormatDate,
		handleLoadData,
	};
})();

export default FilterData;
