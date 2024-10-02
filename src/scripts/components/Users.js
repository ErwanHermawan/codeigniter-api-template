/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables
import { API_URL, WHITESPACE } from "../variables";

// --- utilities
import { FilterData, DeleteData, SweetAlert, Validation } from "../utilities";

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
  // handleRunValidation
  const handleRunValidation = () => {
    Validation.config(ElementEvents, UserSelector);
  };

  // handleClickValidation
  const handleClickValidation = () => {
    $('.js-form-user button[type="submit"]').on("click", (e) => {
      var _user_id = $('input[name="user_id"]').val();
      $.each(UserSelector, (i, v) => {
        $("#" + v.id).blur();
      });

      if (!WHITESPACE.test(_user_id)) {
        $('input[name="password"]').parents(".error").removeClass("error");
        $('input[name="password"]').next(".form-alert").removeClass("error");
        $('input[name="confirm_password"]')
          .parents(".error")
          .removeClass("error");
        $('input[name="confirm_password"]')
          .next(".form-alert")
          .removeClass("error");
      }

      if ($(".error").length === 0) {
        handleFormData();
      }
      e.preventDefault();
    });
  };

  // handleGetData
  const handleGetData = (_filter) => {
    $.ajax({
      url: API_URL.usersPage(_filter.startPage),
      method: "GET",
      dataType: "JSON",
      data: {
        start_page: _filter.startPage,
        limit_page: _filter.limitPage,
        keyword: _filter.keyword,
      },
      beforeSend: () => {
        var _loader = `<tr>
                        <td colspan="8" class="text-center">
                          <div class="spinner-border text-custom m-2" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>`;
        $(".js-user-result").html(_loader);
      },
      success: (response) => {
        var _response = response;
        var _data = _response.data.user;
        var _pagination = _response.data.pagination;
        var _start_page = _response.data.start_page;
        var _status = _response.status;

        if (_status) {
          var _content = "";
          if (_data.length) {
            $.each(_data, (i, v) => {
              // -- number
              var _number = i + 1;
              if (_start_page != 1) {
                _number = _start_page + i + 1;
              }
              // -- role
              var _role = "";
              if (v.role == 1) {
                _role = "Administrator";
              } else if (v.role == 2) {
                _role = "User";
              }
              // -- status
              var _status =
                '<span data-toggle="tooltip" data-placement="left" title="Aktif" class="badge badge-success"><i class="mdi mdi-power"></i></span>';
              if (v.status == 0) {
                _status =
                  '<span data-toggle="tooltip" data-placement="left" title="Tidak Aktif" class="badge badge-danger"><i class="mdi mdi-power"></i></span>';
              }
              if ($(".js-user-result").length) {
                _content += `<tr>
                              <td class="text-center">
                                <div class="custom-control custom-checkbox">
                                  <input type="checkbox" class="custom-control-input js-select-data" id="check-${_number}" value="${
                  v.user_id
                }"/>
                                  <label class="custom-control-label" for="check-${_number}"></label>
                                </div>
                              </td>
                              <td class="text-center">
                                <span class="user-avatar">
                                  <img class="user-avatar__img" src="${
                                    v.photo
                                  }" alt="${v.name}" />
                                </span>
                              </td>
                              <td>${v.name}</td>
                              <td>${v.email}</td>
                              <td>${v.phone !== null ? v.phone : "-"}</td>
                              <td>${_role}</td>
                              <td class="text-center">${_status}</td>
                              <td class="text-center">
                                <button type="button" data-toggle="tooltip" data-placement="left" title="Edit" class="btn btn-icon btn-primary btn-trans js-edit-data" data-id="${
                                  v.user_id
                                }"><i class="mdi mdi-circle-edit-outline"></i></button>
                                <button type="button" data-toggle="tooltip" data-placement="left" title="Delete" class="btn btn-icon btn-danger btn-trans js-delete-data" data-id="${
                                  v.user_id
                                }"><i class="mdi mdi-trash-can-outline"></i></button>
                              </td>
                            </tr>`;
              }
            });
          } else {
            _content += `<tr>
                          <td colspan="8" class="text-center">
                            <span>Data not found</span>
                          </td>
                        </tr>`;
          }
          $(".js-user-result").html(_content);
          // pagination
          if (_pagination !== undefined) {
            $(".js-pagination").html(_pagination);
          } else {
            $(".pagination").remove();
          }
        }
      },
    });
  };

  // handleDeleteData
  const handleDeleteData = (id) => {
    $.ajax({
      url: API_URL.users,
      method: "DELETE",
      dataType: "JSON",
      data: {
        user_id: id,
      },
      success: (response) => {
        FilterData.handleLoadData();
        var _type = "error";
        if (response.status) {
          _type = "success";
        }
        swal({
          title: "Deleted!",
          text: response.message,
          type: _type,
          timer: 1500,
        });
      },
      error: (response) => {
        var _response = response.responseJSON;
        var _type = "error";
        if (_response.status) {
          _type = "success";
        }
        swal({
          title: "Deleted!",
          text: _response.message,
          type: _type,
          timer: 1500,
        });
      },
    });
  };

  // handlePostData
  const handlePostData = (form_data, method) => {
    $.ajax({
      url: API_URL.users,
      method: method,
      dataType: "JSON",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      beforeSend: () => {
        var _loader = `<span class="custom-loader"><span></span><span></span><span></span><span></span></span> Mengirim ....`;
        $(".js-form-user button[type='submit']").html(_loader);
      },
      success: (response) => {
        var _status = response.status;
        var _message = response.message;
        if (_status) {
          $(".js-form-user button[type='submit']").html(
            `<i class="mdi mdi-content-save-outline"></i> Simpan`
          );
          $(".modal").modal("hide");
          handleRemoveData();
          SweetAlert.config(_message);
          setTimeout(() => {
            FilterData.handleLoadData();
          }, 800);
        }
      },
    });
  };

  // handleUpdateData
  const handleUpdateData = () => {
    $("body").on("click", ".js-edit-data", (e) => {
      const _this = $(e.currentTarget);
      var _user_id = _this.attr("data-id");
      $("#modal-users").modal("show");
      $.ajax({
        url: API_URL.users,
        method: "GET",
        dataType: "JSON",
        data: {
          user_id: _user_id,
        },
        success: (response) => {
          var _data = response.data;
          var _status = response.status;
          var _photo = `<span class="user-avatar user-avatar--detail m-b-10">
                          <img class="user-avatar__img" src="${_data.photo}" alt="${_data.name}" />
                        </span>`;
          if (_status) {
            if (_data.photo) {
              $('label[for="photo"]')
                .parent()
                .find(".col-sm-8")
                .prepend(_photo);
            }
            $('input[name="user_id"]').val(_data.user_id);
            $('input[name="name"]').val(_data.name);
            $('input[name="email"]').val(_data.email);
            $('input[name="phone"]').val(_data.phone);
            $('select[name="role"] option').each((i, e) => {
              var _this = $(e);
              if (_this.val() == _data.role) {
                _this.attr("selected", "selected");
              }
            });
            if (_data.status == 1) {
              $('input[name="status"]').trigger("click");
              $('input[name="status"]').prop("checked", true);
            }
            if (_data.email_verified == 1) {
              $('input[name="email_verified"]').trigger("click");
              $('input[name="email_verified"]').prop("checked", true);
            }
          }
        },
      });
    });
  };

  // handleFormData
  const handleFormData = () => {
    var _id = $('input[name="user_id"]').val();
    var _photo = $('input[name="photo"]').prop("files")[0];
    var _name = $('input[name="name"]').val();
    var _email = $('input[name="email"]').val();
    var _phone = $('input[name="phone"]').val();
    var _password = $('input[name="password"]').val();
    var _confirmPassword = $('input[name="confirm_password"]').val();
    var _role = $('select[name="role"]').val();
    if ($('input[name="status"]:checked').length == 1) {
      var _status = $('input[name="status"]').val();
    } else {
      var _status = $('input[name="status"]').val(0);
    }
    if ($('input[name="email_verified"]:checked').length == 1) {
      var _email_verified = $('input[name="email_verified"]').val();
    } else {
      var _email_verified = $('input[name="email_verified"]').val(0);
    }

    if (
      !WHITESPACE.test(_name) &&
      !WHITESPACE.test(_email) &&
      !WHITESPACE.test(_role) &&
      !WHITESPACE.test(_status)
    ) {
      var form_data = new FormData();
      form_data.append("user_id", _id);
      form_data.append("photo", _photo);
      form_data.append("name", _name);
      form_data.append("email", _email);
      if (!WHITESPACE.test(_phone)) {
        form_data.append("phone", _phone);
      }
      if (!WHITESPACE.test(_password) && !WHITESPACE.test(_confirmPassword)) {
        form_data.append("password", _confirmPassword);
      }
      form_data.append("role", _role);
      form_data.append("status", _status);
      form_data.append("email_verified", _email_verified);

      handlePostData(form_data, "POST");
    }
  };

  // handleRemoveData
  const handleRemoveData = () => {
    $('label[for="photo"]').parent().find(".user-avatar").remove();
    $('input[name="user_id"]').removeAttr("value");
    $('input[name="name"]').val("");
    $('input[name="email"]').val("");
    $('input[name="phone"]').val("");
    $('input[name="password"]').val("");
    $('input[name="confirm_password"]').val("");
    $('select[name="role"] option').removeAttr("selected");
    if ($('input[name="status"]').prop("checked", true)) {
      $('input[name="status"]').trigger("click");
      $('input[name="status"]').prop("checked", false);
    }
    if ($('input[name="email_verified"]').prop("checked", true)) {
      $('input[name="email_verified"]').trigger("click");
      $('input[name="email_verified"]').prop("checked", false);
    }
  };

  // handleResetData
  const handleResetData = () => {
    $('button[data-dismiss="modal"]').on("click", (e) => {
      handleRemoveData();
      $(".js-form-user").find(".error").removeClass("error");
    });

    // handle click body
    $("body").on("click", (e) => {
      handleRemoveData();
      $(".js-form-user").find(".error").removeClass("error");
    });

    // stop progation
    $("body").on("click", ".modal-content", (e) => {
      e.stopPropagation();
    });
  };

  const init = () => {
    if ($(".js-form-user").length) {
      handleRunValidation();
      handleClickValidation();
    }
    if ($(".js-user-result").length) {
      // Filter Data
      FilterData.init();
      // Delete Data
      DeleteData.delete();
      DeleteData.deleteAll();
      // users
      handleUpdateData();
      handleResetData();
    }
  };

  return {
    init,
    handleGetData,
    handleDeleteData,
  };
})();

export default Users;
