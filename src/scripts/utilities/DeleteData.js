// --- components
import {
  Product,
  Type,
  Category,
  Unit,
  Supplier,
  Customer,
  Users,
  Table,
  PurchaseOrder,
  StockIn,
  StockOut,
  StockOpname,
  Sale,
  Tax,
  Outlet,
  Employee,
  Addon,
  Cash,
  CashCategory,
  PaymentAccount,
} from "../components";

/* ------------------------------------------------------------------------------
@name: DeleteData
@description: DeleteData Activate
--------------------------------------------------------------------------------- */

const DeleteData = (() => {
  const handleGetData = (id) => {
    if ($(".js-product-result").length) {
      Product.handleDeleteData(id);
    }
    if ($(".js-type-result").length) {
      Type.handleDeleteData(id);
    }
    if ($(".js-category-result").length) {
      Category.handleDeleteData(id);
    }
    if ($(".js-unit-result").length) {
      Unit.handleDeleteData(id);
    }
    if ($(".js-supplier-result").length) {
      Supplier.handleDeleteData(id);
    }
    if ($(".js-customer-result").length) {
      Customer.handleDeleteData(id);
    }
    if ($(".js-user-result").length) {
      Users.handleDeleteData(id);
    }
    if ($(".js-table-result").length) {
      Table.handleDeleteData(id);
    }
    if ($(".js-po-result").length) {
      PurchaseOrder.handleDeleteData(id);
    }
    if ($(".js-stock-in-result").length) {
      StockIn.handleDeleteData(id);
    }
    if ($(".js-stock-out-result").length) {
      StockOut.handleDeleteData(id);
    }
    if ($(".js-stock-opname-result").length) {
      StockOpname.handleDeleteData(id);
    }
    if ($(".js-sale-result").length) {
      Sale.handleDeleteData(id);
    }
    if ($(".js-tax-result").length) {
      Tax.handleDeleteData(id);
    }
    if ($(".js-outlet-result").length) {
      Outlet.handleDeleteData(id);
    }
    if ($(".js-employee-result").length) {
      Employee.handleDeleteData(id);
    }
    if ($(".js-addon-result").length) {
      Addon.handleDeleteData(id);
    }
    if ($(".js-cash-result").length) {
      Cash.handleDeleteData(id);
    }
    if ($(".js-cash-category").length) {
      CashCategory.handleDeleteData(id);
    }
    if ($(".js-payment-account").length) {
      PaymentAccount.handleDeleteData(id);
    }
  };

  // handle run detele
  const handleRunDelete = () => {
    //delete single data
    $("body").on("click", ".js-delete-data", (e) => {
      const _this = $(e.currentTarget);
      var _id = _this.attr("data-id");
      swal({
        title: "Apakah Anda yakin?",
        text: "Tindakan ini tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false,
      }).then(
        () => {
          // Run API Delete Data
          handleGetData(_id);
        },
        (dismiss) => {
          if (dismiss === "cancel") {
            swal("Batal", "Data Anda aman :)", "error");
          }
        }
      );
    });
  };

  // handleRunDeleteAll
  const handleRunDeleteAll = () => {
    // delete multiple data
    $(".js-delete-all").on("click", (e) => {
      let _productIDArray = [];

      $(".js-select-data:checked").each((i, e) => {
        const _value = $(e).val();
        _productIDArray.push(_value);
      });

      swal({
        title: "Apakah Anda yakin?",
        text: "Tindakan ini tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false,
      }).then(
        () => {
          // Run API Delete Data
          handleGetData(_productIDArray);

          $(".js-delete-all").addClass("d-none");
          $(".js-select-all").prop("checked", false);
        },
        (dismiss) => {
          if (dismiss === "cancel") {
            swal("Batal", "Data Anda aman :)", "error");
          }
        }
      );
    });
  };

  const init = () => {
    handleRunDelete();
  };

  return {
    init,
    delete: handleRunDelete,
    deleteAll: handleRunDeleteAll,
  };
})();

export default DeleteData;
