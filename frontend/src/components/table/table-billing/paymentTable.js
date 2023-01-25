import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginData, orderData, transactionData } from "../TableData";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";

const PaymentTable = (props) => {
  const [myBankAccounts, setMyBankAccounts] = useState([]);
  
  useEffect(() => {
    setMyBankAccounts(props.bankaccounts);
  }, [props])

  const selectAll = () => {
    if(document.getElementById("paymentcheckall").checked){
      if(myBankAccounts.length > 0){
        myBankAccounts[0].map((item, index)=>{
          var id = "paymentcheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myBankAccounts.length > 0){
        myBankAccounts[0].map((item, index)=>{
          var id = "paymentcheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }

  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("paymentcheckall").checked = false;
    }
  }

  return (
    <table className="table table-orders">
      <thead className="tb-odr-head">
        <tr className="tb-odr-item">
          <th className="tb-odr-info">
              <div className="tb-tnx-desc">
                  <Input type="checkbox" name="check" id="paymentcheckall" className="checkall" onChange={selectAll}></Input>
              </div>
          </th>
          <th className="tb-odr-info">
            <span className="tb-odr-id">Verify status</span>
            <span className="tb-odr-date d-none d-md-inline-block">option name</span>
          </th>
          <th className="tb-odr-info">
            <span className="tb-odr-id">details</span>
            <span className="tb-odr-date d-none d-md-inline-block">type</span>
          </th>
          <th className="tb-odr-amount">
            <span className="tb-odr-total">last used</span>
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
                      <Input type="checkbox" name="check" id={"paymentcheck"+item.id} onChange={()=>{selectone("paymentcheck"+item.id)}}></Input>
                  </div>
              </td>
              <td className="tb-odr-info">
                <span className="tb-odr-id">
                  {
                    item.status === "Active" ? <Icon name="check-circle"></Icon> : <Icon name="cross-circle"></Icon>
                  }
                </span>
                <span className="tb-odr-date">Bank Account</span>
              </td>
              <td className="tb-odr-info">
                <span className="tb-odr-id">
                    {item.c_bank_name}
                </span>
                <span
                  className={`badge badge-${
                    item.is_active === 1 ? "success" : "warning"
                  }`}
                >
                  {item.is_active === 1 ? "Active" : "InActive"}
                </span>
              </td>
              <td className="tb-odr-amount">
                <span className="tb-odr-total">
                  <span className="amount">{item.updatedAt}</span>
                </span>
              </td>
              <td className="tb-odr-action">
                <div className="tb-odr-btns d-md-inline dropdown">
                  <Button color="" className="btn-icon">
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
  );
};

const mapStateToProps = (state) => {
    return {
      bankaccounts: state.bankaccountReducer,
    };
  };
  
  export default connect(mapStateToProps,{
  })(PaymentTable);
  
  