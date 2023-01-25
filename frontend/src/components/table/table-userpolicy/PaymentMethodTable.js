import React, { Fragment, useEffect, useState, forwardRef }from "react";
import { connect } from "react-redux";
import { loginData, orderData, transactionData } from "../TableData";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Modal, ModalBody, ModalHeader, FormGroup} from "reactstrap";
import Button from "../../button/Button";
import Icon from "../../icon/Icon";

const PaymentMethodTable = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const selectAll = () => {
    if(document.getElementById("benificiarycheckall").checked){
      
    }else{
      
    }
  }

  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("benificiarycheckall").checked = false;
    }
  }

  const aaa=()=>{
    console.log("adsf");
  }
  return (
    <Fragment>
      <UncontrolledDropdown className="pay-method-dropdown mb-3">
          <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger btn-title mt-n1 mr-n1">
          <span className="">Pull Payment Information</span>
          </DropdownToggle>
          <DropdownMenu right>
            <ul className="link-list-opt no-bdr">
              <li>
                <DropdownItem
                  tag="a"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  <span>Pay from an Existing Method</span>
                </DropdownItem>
              </li>
              <li>
                <DropdownItem
                  tag="a"
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleModal();
                  }}
                >
                  <span>Add a New Payment Method</span>
                </DropdownItem>
              </li>
            </ul>
          </DropdownMenu>
      </UncontrolledDropdown>
      <table className="table table-orders">
        <thead className="tb-odr-head">
          <tr className="tb-odr-item">
            <th className="tb-odr-info">
              <div className="tb-tnx-desc">
                  <Input type="checkbox" name="check" id="benificiarycheckall" className="checkall" onChange={selectAll}></Input>
              </div>
            </th>
            <th className="tb-odr-info">
              <span className="tb-odr-id">option name</span>
              <span className="tb-odr-date d-none d-md-inline-block">detail</span>
            </th>
            <th className="tb-odr-amount">
              <span className="tb-odr-total">type</span>
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
          {orderData.map((item) => {
            return (
              <tr className="tb-odr-item" key={item.id}>
                <td className="tb-odr-info">
                  <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id={"benificiarycheck"+item.id} onChange={()=>{selectone("benificiarycheck"+item.id)}}></Input>
                  </div>
                </td>
                <td className="tb-odr-info">
                  <span className="tb-odr-id">
                    {item.id}
                  </span>
                  <span className="tb-odr-date">{item.id}</span>
                </td>
                <td className="tb-odr-amount">
                  <span className="tb-odr-total">
                    <span className="amount">{item.date}</span>
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
          })}
        </tbody>
      </table>
      <Modal isOpen={modal} toggle={toggleModal} className="modal-payment">
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody>
          <div className="payment-content">
            <h3 className="modal-title text-center">Amount to be paid: R41.00</h3>
            <div className="modal-top mt-3">
              <FormGroup className="d-flex">
                  <label htmlFor="paymentschedule" className="form-label">
                  Payment Schedule<span className="red">*</span>
                  </label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                        <Input type="select" name="select" id="paymentschedule" placeholder="Select Type">
                          <option value="default_option">Default Option</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                    </div>
                  </div>
              </FormGroup>
              <FormGroup>
                  <label className="form-label" htmlFor="default-01">
                      Select your payment type based on the Information you have added in our Billing System
                  </label>
                  <div className="d-flex justify-content-around">
                    <div className="custom-control custom-control-sm custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="fullpay"
                            id="fullpay"
                        />
                        <label className="custom-control-label" htmlFor="fullpay">
                            Pay in Full
                        </label>
                    </div>
                    <div className="custom-control custom-control-sm custom-radio">
                        <input
                            type="radio"
                            className="custom-control-input form-control"
                            name="installpay"
                            id="installpay"
                        />
                        <label className="custom-control-label" htmlFor="installpay">
                            Pay in Installments
                        </label>
                    </div>
                  </div>
              </FormGroup>
            </div>
            <div className="modal-bottom d-flex mt-5">
              <div className="pay-item">
                <h4 className="item-title">Debit/ Credit Cards</h4>
                <p className="item-detail">Please choose from the list of your added & verified Debit/ Credit Cards</p>
                <div className="radio-group">
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="creditcardradio"
                          id="creditcardradio"
                      />
                      <label className="custom-control-label" htmlFor="creditcardradio">
                        African Bank's Credit Card ending with 1128
                      </label>
                  </div>
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="debitcardradio"
                          id="debitcardradio"
                      />
                      <label className="custom-control-label" htmlFor="debitcardradio">
                          African Bank's Debit Card ending with 0047
                      </label>
                  </div>
                </div>
                <FormGroup className="select-btn">
                    <Button
                        size="lg"
                        className="btn-large apply-btn"
                        type="submit"
                        color="primary"
                    >
                        {"Select"}
                    </Button>
                </FormGroup>
              </div>
              <div className="pay-item">
                <h4 className="item-title">Bank Account</h4>
                <p className="item-detail">Please choose from the list of your added & verified Bank Accounts</p>
                <div className="radio-group">
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="banksaving"
                          id="banksaving"
                      />
                      <label className="custom-control-label" htmlFor="banksaving">
                        African Bank's Savings Account ending with 2789
                      </label>
                  </div>
                </div>
                <FormGroup className="select-btn">
                    <Button
                        size="lg"
                        className="btn-large apply-btn"
                        type="submit"
                        color="primary"
                    >
                        {"Select"}
                    </Button>
                </FormGroup>
              </div>
              <div className="pay-item">
                <h4 className="item-title">eWallets</h4>
                <p className="item-detail">Please choose from the list of your added/linked & verified e-Wallets</p>
                <div className="radio-group">
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="payoneerE"
                          id="payoneerE"
                      />
                      <label className="custom-control-label" htmlFor="payoneerE">
                        Payoneer's e-Wallet<br/>
                        <span className="pay-addre">(id-carol123@payoneer.com)</span>
                      </label>
                      <span className="balance">Balance RA 1000</span>
                  </div>
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="paystackE"
                          id="paystackE"
                      />
                      <label className="custom-control-label" htmlFor="paystackE">
                          Paystack's e-Wallet<br/>
                          <span className="pay-addre">(id-carol123@paystack.co.za)</span>
                      </label>
                      <span className="balance">Balance RA 1000</span>
                  </div>
                  <div className="custom-control custom-control-sm custom-radio">
                      <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="imsE"
                          id="imsE"
                      />
                      <label className="custom-control-label" htmlFor="imsE">
                          IMS's e-Wallet<br/>
                          <span className="pay-addre">(id-carol123@ims.co.za)</span>
                      </label>
                      <span className="balance">Balance RA 1000</span>
                  </div>
                </div>
                <div className="operation-group mt-3">
                    <div className="row operation-item">
                        <div className="col-8 d-flex">
                            <Icon name="money"></Icon>
                            <p className="operation-txt"><strong className="strong">Send</strong> money to an existing user</p>
                        </div>
                        <div className="col-4">
                            <Button
                                size="lg"
                                className="btn-large"
                                type="submit"
                                color="primary"
                            >
                                {"Send"}
                            </Button> 
                        </div>
                    </div>

                    <div className="row operation-item">
                        <div className="col-8 d-flex">
                            <Icon name="tranx"></Icon>
                            <p className="operation-txt"><strong className="strong">Transfer</strong> funds to the bank</p>
                        </div>
                        <div className="col-4">
                            <Button
                                size="lg"
                                className="btn-large"
                                type="submit"
                                color="primary"
                            >
                                {"Transfer"}
                            </Button> 
                        </div>
                    </div>
                </div>
                <FormGroup className="select-btn">
                    <Button
                        size="lg"
                        className="btn-large apply-btn"
                        type="submit"
                        color="primary"
                    >
                        {"Select"}
                    </Button>
                </FormGroup>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps,{
})(PaymentMethodTable);
  
  