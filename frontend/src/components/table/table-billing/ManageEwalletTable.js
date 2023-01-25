import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Button from "../../button/Button";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
import {
  Icon,
} from "../../Component";
import { useForm } from "react-hook-form";
import avata from "../../../images/avatar/c-sm.jpg"

const ManageEwalletTable = (props) => {
  const [collapseEwalletMana, setCollapseEwalletMana] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  
  const onFormSubmit = (formData) => {
    setLoading(true);
  };
  const changeIcon = (classname) => {
    if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
      document.querySelectorAll(classname)[0].classList.remove("ni-plus");
      document.querySelectorAll(classname)[0].classList.add("ni-minus");
    }else{
      document.querySelectorAll(classname)[0].classList.remove("ni-minus");
      document.querySelectorAll(classname)[0].classList.add("ni-plus");
    }
  }
  const toggleWalletMana = () => {
    setCollapseEwalletMana(!collapseEwalletMana);
    changeIcon(".walletmana-status");
  }
  return (
    <Fragment >
      <div id="WalletManaPanel" className="manage-collapse mana-wallet-collapse" onClick={toggleWalletMana}>ADD/MANAGE EWALLETS<span className="item-status walletmana-status icon ni ni-plus"></span><span className="product-cnt count"></span></div>
      <Collapse isOpen={collapseEwalletMana} className="wallet-collapse">
        <div className="wallet-edit" > 
          <Card className="card-bordered card-preview">
            <div className="ewallet-content row">
                <div className="wallet-balence col-lg-6 col-12 pb-5">
                    <div className="balence-header sub-header d-flex">
                        <div className="d-flex">
                            <h4>eWallet</h4>
                            <Icon name="wallet"></Icon>                            
                        </div>
                        <span>Wallet Balence RA 1000</span>
                    </div>
                    <div className="add-amount mt-5 d-flex">
                        <FormGroup>
                            <div className="form-control-wrap d-flex">
                                <div className="add-amount-input">
                                    <input
                                        type={"text"}
                                        id="addamount"
                                        name="addamount"
                                        ref={register({ required: "This field is required" })}
                                        placeholder="Enter Amount to add money to eWallet"
                                        className={`product-name form-control-lg form-control is-hidden item-name`}
                                    />
                                    {errors.passnew && (
                                        <span className="invalid">{errors.passnew.message}</span>
                                    )}
                                </div>
                            </div>
                        </FormGroup>
                        <Button
                            size="lg"
                            className="btn-large"
                            type="submit"
                            color="primary"
                        >
                            {"Add"}
                        </Button> 
                    </div>
                    <div className="user-info d-flex mt-3">
                        <img className="user-avata" src={avata} alt="img"></img>
                        <div className="info-detail">
                            <p className="username">User Name</p>
                            <p className="email_phone">email.example@gmail.com | Phone Number</ p>
                        </div>
                    </div>
                    <div className="operation-group mt-5">
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

                        <div className="row operation-item">
                            <div className="col-8 d-flex">
                                <Icon name="send-alt"></Icon>
                                <p className="operation-txt"><strong className="strong">PayDirect</strong> on behalf of a user</p>
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
                </div>
                <div className="wallet-link col-lg-6 col-12 pb-5">
                    <div className="link-header sub-header d-flex">
                        <div className="d-flex">
                            <h4>Link an existing eWallet</h4>
                            <Icon name="wallet"></Icon>
                        </div>        
                    </div>
                    <Form className="is-alter mt-5" onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="sub-group">
                        <FormGroup>
                            <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="default-01">
                                Wallet Name <span className="red">*</span>
                                </label>
                            </div>
                            <div className="cardnum-input">
                                <input
                                    type={"text"}
                                    id="walletname"
                                    name="walletname"
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
                                Link to eWallet Name <span className="red">*</span>
                                </label>
                            </div>
                            <input
                                type={"text"}
                                id="linkwallet"
                                name="linkwallet"
                                ref={register({ required: "This field is required" })}
                                placeholder="Link to eWallet"
                                className={`product-name form-control-lg form-control is-hidden item-name`}
                            />
                            {errors.passnew && (
                                <span className="invalid">{errors.passnew.message}</span>
                            )}
                            </div>
                        </FormGroup>
                        </div>
                        <FormGroup>
                            <Button
                                size="lg"
                                className="btn-large"
                                type="submit"
                                color="primary"
                            >
                                {"Link"}
                            </Button>   
                        </FormGroup>
                    </Form>
                </div>
                <div className="wallet-footer d-flex">
                    <span className="icon ni ni-link">Copy link</span>
                    <span className="icon ni ni-help">Learn more about eWallets</span>
                </div>
            </div>
          </Card>
        </div>
      </Collapse>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, {
  
})(ManageEwalletTable);