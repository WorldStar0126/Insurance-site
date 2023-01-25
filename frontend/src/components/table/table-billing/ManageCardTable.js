import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Button from "../../button/Button";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
import {
  Icon,
} from "../../Component";
import { useForm } from "react-hook-form";
import { orderData } from "../TableData";
import visacard from "../../../images/card/visa.jpg"

const ManageCardTable = (props) => {
  const [collapseCardMana, setCollapseCardMana] = useState(false);
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
  const toggleCardMana = () => {
    setCollapseCardMana(!collapseCardMana);
    changeIcon(".cardmana-status");
  }

  const selectAll = () => {

  }

  const selectone = (id) => {

  }

  return (
    <Fragment >
      <div id="CardManaPanel" className="manage-collapse mana-card-collapse" onClick={toggleCardMana}>ADD/MANAGE DEBIT/ CREDIT CARDS<span className="item-status cardmana-status icon ni ni-plus"></span><span className="product-cnt count"></span></div>
      <Collapse isOpen={collapseCardMana} className="card-collapse">
        <div className="card-edit" > 
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="sub-group d-flex">
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Card Number <span className="red">*</span>
                        </label>
                      </div>
                      <div className="cardnum-input">
                        <input
                            type={"text"}
                            id="cardnumber"
                            name="cardnumber"
                            ref={register({ required: "This field is required" })}
                            placeholder="Enter Card Number"
                            className={`product-name form-control-lg form-control is-hidden item-name`}
                        />
                        {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                        )}
                        <Icon name="cc cardnum-icon"></Icon>
                      </div>
                      <img className="card-num-icon" src={visacard} alt="img"></img>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Name on Card <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="nameoncard"
                        name="nameoncard"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter Name on Card"
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
                          CVV <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="cvvnumber"
                        name="cvvnumber"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter CVV Number"
                        className={`product-name form-control-lg form-control is-hidden item-name`}
                      />
                      {errors.passnew && (
                        <span className="invalid">{errors.passnew.message}</span>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Card Expiry Date <span className="red">*</span>
                    </label>
                    <div className="form-control-wrap d-flex">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="carddate" placeholder="Select Subcategory">
                          <option value="default_option">Month</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                      </div>
                      <div className="form-control-select ml-3">
                        <Input type="select" name="select" id="default-4" placeholder="Select Subcategory">
                          <option value="default_option">Year</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  
                </div>
                <div className="checkbox-group d-flex isact-check">
                    <label htmlFor="setdefaultpay" className="form-label">
                    Set as Default Payment Option <span className="red">*</span>
                    </label>
                    <Input type="checkbox" name="check" id="setdefaultpay" ></Input>
                </div>
                <div className="btn-group d-flex mt-3 justify-content-start">
                    <FormGroup>
                        <Button
                            size="lg"
                            className="btn-large"
                            type="submit"
                            color="primary"
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
                        >
                            {"Save"}
                        </Button>   
                    </FormGroup>
                </div>
            </Form>
            <table className="table table-orders">
                <thead className="tb-odr-head">
                    <tr className="tb-odr-item">
                    <th className="tb-odr-info">
                        <div className="tb-tnx-desc">
                            <Input type="checkbox" name="check" id="productcheckall" className="checkall" onChange={selectAll}></Input>
                        </div>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">card details</span>
                        <span className="tb-odr-date d-none d-md-inline-block">type</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">name on card</span>
                        <span className="tb-odr-date d-none d-md-inline-block">cvv</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">expiry date</span>
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
                                <Input type="checkbox" name="check" id={"productcheck"+item.id} onChange={()=>{selectone("productcheck"+item.id)}} ></Input>
                            </div>
                        </td>
                        <td className="tb-odr-info">
                            <span className="tb-odr-id">
                            {item.id}
                            </span>
                            <img className="table-card-item" src={visacard} alt="img"></img>
                        </td>
                        <td className="tb-odr-info">
                            <span className="tb-odr-id">
                                {item.id}
                            </span>
                            <span className="tb-odr-id">
                                {item.id}
                            </span>
                        </td>
                        <td className="tb-odr-info">
                            <span className="tb-odr-id">
                                {item.id}
                            </span>
                            <span
                            className={`badge badge-${
                                item.status === "Active" ? "success" : item.status === "InActive" ? "warning" : "danger"
                            }`}
                            >
                            {item.status}
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
  
})(ManageCardTable);