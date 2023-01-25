import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Button from "../../button/Button";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
import {
  Icon,
} from "../../Component";
import { useForm } from "react-hook-form";

import {
  getBankAccount,
  AddBankAccount,
  UpdateBankAccount,
  DeleteBankAccount
} from "../../../actions/tutorials";
import http from "../../../http-common";
import { flattenDiagnosticMessageText } from "typescript";

let sessiontoken = sessionStorage.getItem("token");

export const ManageAccountTable = (props) => {
  const [collapseAccountMana, setCollapseAccountMana] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  
  const [myBankAccounts, setMyBankAccounts] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [verifyStatus, setVerifyStatus] = useState(0);
  
  useEffect(() => {
    setMyBankAccounts(props.bankaccounts);
  }, [props])
  
  const changeIcon = (classname) => {
    if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
      document.querySelectorAll(classname)[0].classList.remove("ni-plus");
      document.querySelectorAll(classname)[0].classList.add("ni-minus");
    }else{
      document.querySelectorAll(classname)[0].classList.remove("ni-minus");
      document.querySelectorAll(classname)[0].classList.add("ni-plus");
    }
  }
  const toggleAccountMana = () => {
    setCollapseAccountMana(!collapseAccountMana);
    changeIcon(".accountmana-status");
  }
  
  const selectAll = () => {
    if(document.getElementById("bankcheckall").checked){
      if(myBankAccounts.length > 0){
        myBankAccounts[0].map((item, index)=>{
          var id = "bankcheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myBankAccounts.length > 0){
        myBankAccounts[0].map((item, index)=>{
          var id = "bankcheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }

  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("bankcheckall").checked = false;
    }
  }

  const updateBankAccount = (item) => {
    setUpdateStatus(true);
    setUpdateId(item.id);
    document.getElementById("accountholder").value = item.c_payee_name;
    document.getElementById("bankname").value = item.c_bank_name;
    document.getElementById("accountnumber").value = item.c_account_number;
    document.getElementById("confirmaccountnum").value = item.c_account_number;
    document.getElementById("accounttype").value = item.n_account_type;
    document.getElementById("branchcode").value = item.c_branch_code;
    document.getElementById("banklocation").value = item.c_bank_location;
    document.getElementById("setisactive").checked = (item.is_active == 1 ? true : false);
  }

  const VerifyBankAccount = () => {
    let payeename = document.getElementById("accountholder").value;
    let bankname = document.getElementById("bankname").value;
    let accountnum = document.getElementById("accountnumber").value;
    let accounttype = document.getElementById("accounttype").value;
    let branchcode = document.getElementById("branchcode").value;
    http.post(`/verify/bank_account?c_bank_name=${bankname}&c_payee_name=${payeename}&c_account_number=${accountnum}&n_account_type=${accounttype}&c_branch_code=${branchcode}`, 
    {}, {headers: { "x-access-token": sessiontoken }}
    )
    .then((res) => {
        console.log(res.data)
        if(res.data.status){
          setVerifyStatus(1);
          Swal.fire({
            title: "You have successfully Verified.",
            icon: "success",
            showCancelButton: false,
          })
        }
        else{
          Swal.fire({
            title: res.data.message,
            icon: "warning",
            showCancelButton: false,
          })
        }
    }).catch(error => {
        Swal.fire({
          title: "Verification Failed",
          icon: "error",
          showCancelButton: false,
        })
    });
  }
  const onFormSubmit = (formData) => {
    console.log(formData)
    let accounttype = document.getElementById("accounttype").value;
    let setisactive = document.getElementById("setisactive").value;
    if(updateStatus){
      Swal.fire({
        title: "Are you sure to update this bankaccount?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
          if (result.isConfirmed) {
            props.UpdateBankAccount(updateId, sessiontoken, formData.accountholder, formData.bankname, formData.accountnumber, 
              accounttype, formData.branchcode, formData.banklocation, setisactive, verifyStatus);
            props.getBankAccount(sessiontoken);
            setUpdateStatus(false);
          }
      });
    }
    else{
      Swal.fire({
        title: "Are you sure to add new bank account?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
      }).then((result) => {
          if (result.isConfirmed) {
            props.AddBankAccount(sessiontoken, formData.accountholder, formData.bankname, formData.accountnumber, 
              accounttype, formData.branchcode, formData.banklocation, setisactive, verifyStatus);
            props.getBankAccount(sessiontoken);
          }
      });
    }
    setLoading(true);
  };
  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myBankAccounts.length > 0){
      myBankAccounts[0].map((item, index)=>{
        var id = "bankcheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete this bank account?` : `Are you sure to delete these ${selectCnt} bankaccounts?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myBankAccounts.length > 0){
              myBankAccounts[0].map((item, index)=>{
                var id = "bankcheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeleteBankAccount(item.id, sessiontoken);
                }
        
              })
            }
            props.getBankAccount(sessiontoken);
            document.getElementById("bankcheckall").checked = false;
            myBankAccounts[0].map((item, index)=>{
              var id = "bankcheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "Bank account has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select bank account to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
  }
  const editBankAccount = () => {
    
  }

  return (
    <Fragment >
      <div id="AccountManaPanel" className="manage-collapse mana-account-collapse" onClick={toggleAccountMana}>ADD/ MANAGE BANK ACCOUNT<span className="item-status accountmana-status icon ni ni-plus"></span><span className="product-cnt count"></span></div>
      <Collapse isOpen={collapseAccountMana} className="account-collapse">
        <div className="account-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="sub-group d-flex">
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Account Holder <span className="red">*</span>
                        </label>
                      </div>
                      <div className="cardnum-input">
                        <input
                            type={"text"}
                            id="accountholder"
                            name="accountholder"
                            ref={register({ required: "This field is required" })}
                            placeholder="Enter Payee Name"
                            className={`product-name form-control-lg form-control is-hidden item-name`}
                        />
                        {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Bank Name <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="bankname"
                        name="bankname"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter Name of Bank"
                        className={`product-name form-control-lg form-control is-hidden item-name`}
                      />
                      {errors.passnew && (
                        <span className="invalid">{errors.passnew.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </div>
                <div className="sub-group d-flex">
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Account Number <span className="red">*</span>
                        </label>
                      </div>
                      <div className="cardnum-input">
                        <input
                            type={"text"}
                            id="accountnumber"
                            name="accountnumber"
                            ref={register({ required: "This field is required" })}
                            placeholder="Enter Account #"
                            className={`product-name form-control-lg form-control is-hidden item-name`}
                        />
                        {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Confirm Account Number <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="confirmaccountnum"
                        name="confirmaccountnum"
                        ref={register({ required: "This field is required" })}
                        placeholder="Confirm Account #"
                        className={`product-name form-control-lg form-control is-hidden item-name`}
                      />
                      {errors.passnew && (
                        <span className="invalid">{errors.passnew.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </div>
                <div className="sub-group d-flex">
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Account Type <span className="red">*</span>
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="accounttype" placeholder="Select Subcategory">
                          <option value={0}>Personal</option>
                          <option value={1}>Business</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Branch Code <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="branchcode"
                        name="branchcode"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter Branch Code"
                        className={`product-name form-control-lg form-control is-hidden item-name`}
                      />
                      {errors.passnew && (
                        <span className="invalid">{errors.passnew.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </div>
                <div className="sub-group d-flex">
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Bank Location <span className="red">*</span>
                        </label>
                      </div>
                      <div className="cardnum-input">
                        <input
                            type={"text"}
                            id="banklocation"
                            name="banklocation"
                            ref={register({ required: "This field is required" })}
                            placeholder="Enter Bank Location"
                            className={`product-name form-control-lg form-control is-hidden item-name`}
                        />
                        {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                  <div className="checkbox-group d-flex isact-check">
                    <label htmlFor="setdefaultpay" className="form-label">
                        is Active <span className="red">*</span>
                    </label>
                    <Input type="checkbox" name="check" id="setisactive" ></Input>
                  </div>
                </div>
                
                <div className="btn-group d-flex justify-content-start">
                    <FormGroup>
                        <Button
                            size="lg"
                            className="btn-large"
                            // type="submit"
                            color="primary"
                            onClick={VerifyBankAccount}
                        >
                            {"Verify"}
                        </Button>   
                    </FormGroup>
                    <FormGroup className="ml-3">
                        <Button
                            size="lg"
                            className="btn-large"
                            type="submit"
                            color="primary"
                            // onClick={editBankAccount}
                        >
                            {"Save"}
                        </Button>   
                    </FormGroup>
                </div>
            </Form>
            <table className="table table-orders table-bankaccount">
                <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                    <th className="tb-odr-info">
                        <div className="tb-tnx-desc">
                            <Input type="checkbox" name="check" id="bankcheckall" className="checkall" onChange={selectAll}></Input>
                        </div>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">bank name</span>
                        <span className="tb-odr-date d-none d-md-inline-block">type</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">account number</span>
                        <span className="tb-odr-date d-none d-md-inline-block">payee name</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">branch code</span>
                        <span className="tb-odr-date d-none d-md-inline-block">vaerification status</span>
                    </th>   
                    <th className="tb-odr-action">
                        <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                            <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <ul className="link-list-plain">
                            <li>
                                <DropdownItem
                                tag="a"
                                href="#dropdownitem"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    deleteItem();
                                }}
                                >
                                Delete selected option
                                </DropdownItem>
                            </li>
                            </ul>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </th>
                    </tr>
                </thead>
                <tbody className="tb-odr-body">
                  {
                    myBankAccounts.length > 0 ? myBankAccounts[0].map((item, index) => {
                      return (
                          <tr className="tb-odr-item" key={index}>
                          <td className="tb-odr-info">
                              <div className="tb-tnx-desc">
                                  <Input type="checkbox" name="check" id={"bankcheck"+item.id} onChange={()=>{selectone("bankcheck"+item.id)}} ></Input>
                              </div>
                          </td>
                          <td className="tb-odr-info">
                              <span className="tb-odr-id">
                              {item.c_bank_name}
                              </span>
                              <span className="tb-odr-date">{item.n_account_type == 0 ? "Personal" : "Business"}</span>
                          </td>
                          <td className="tb-odr-info">
                              <span className="tb-odr-id">
                                  {item.c_account_number}
                              </span>
                              <span className="tb-odr-id">
                                  {item.c_payee_name}
                              </span>
                          </td>
                          <td className="tb-odr-info">
                              <span className="tb-odr-id">
                                  {item.c_branch_code}
                              </span>
                              <span
                              className={`badge badge-${
                                  item.n_verification_status === 1 ? "success" : "warning"
                              }`}
                              >
                              {item.n_verification_status === 1 ? "Verified" : "Not Verified"}
                              </span>
                          </td>
                          <td className="tb-odr-action">
                              <div className="tb-odr-btns d-md-inline dropdown">
                              <Button color="" className="btn-icon" onClick={() => { updateBankAccount(item)}}>
                                  <span>Edit</span>
                              </Button>
                              </div>
                          </td>
                          </tr>
                      );
                      })
                      :
                      <></>
                  }
                </tbody>
            </table>
          </Card>
        </div>
      </Collapse>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    bankaccounts: state.bankaccountReducer,
  };
};

export default connect(mapStateToProps, {
  getBankAccount,
  AddBankAccount,
  UpdateBankAccount,
  DeleteBankAccount
})(ManageAccountTable);