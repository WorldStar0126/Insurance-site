import React, { Fragment, useEffect, useState, forwardRef } from "react";
import {Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import { Icon, Button } from "../../../components/Component";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import { AddContactBaseInfo, UpdateContactBaseInfo } from "../../../actions/tutorials";

let sessiontoken = sessionStorage.getItem("token");

const MainContactInfo = (props) => {

  const { errors, register, handleSubmit } = useForm();
  const [startIconDate, setStartIconDate] = useState(new Date());

  if (props.activeTab == 2 && document.getElementById('contactSubTab')) {
    
    let tabNav = document.getElementById('contactSubTab').children;
    let tabContent = document.getElementById('contactSubTabContent').children;

    for (let i = 0; i < 4; i++) {
        if (props.activeTab == i + 1) {
            tabNav[i].children[0].classList.remove('nav-link' );
            tabNav[i].children[0].classList.add('active');
            tabNav[i].children[0].classList.add('nav-link');
            tabContent[i].classList.add('active');
        } else {
            tabNav[i].children[0].classList.remove('active');
            tabContent[i].classList.remove('active');
        } 
    }

  }
  
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <div onClick={onClick} ref={ref}>
      <div className="form-icon form-icon-left">
        <Icon name="calendar"/>
      </div>
      <input id="contact-birthday" className="form-control date-picker" type="text" value={value} onChange={onChange} />
    </div>
  ));

  const onFormSubmit = (formData) => {

    let title = "";
    if(document.getElementById(`titleradio-mr`).checked) title = "mr";
    else if(document.getElementById(`titleradio-mrs`).checked) title = "mrs";
    else if(document.getElementById(`titleradio-ms`).checked) title = "ms"
    
    let gender = document.getElementById(`contactgender`).value;
    let relation = document.getElementById(`relamainmem`).value;
    let birthday = document.getElementById(`contact-birthday`).value;

    let contactId = props.contactId;

    if (contactId == undefined || contactId == 0) {
        props.AddContactBaseInfo(sessiontoken, title, formData.contactinitial, formData.contactfirstname, 
            formData.contactlastname, gender, birthday, relation, formData.contactemail, 
            formData.contactelphone, formData.contactcell);
    } else {
        props.UpdateContactBaseInfo(sessiontoken, contactId, title, formData.contactinitial, formData.contactfirstname, 
            formData.contactlastname, gender, birthday, relation, formData.contactemail, 
            formData.contactelphone, formData.contactcell);
    }
    
  }

  return (
    <Fragment>
        <div className="contact-content main-contact-info">
            <Form className="form-contact-info" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="d-flex personal-info">
                    <FormGroup className="d-flex">
                        <label className="form-label" htmlFor="default-01">
                            Title<span className="red">*</span>
                        </label>
                        <div className="custom-control custom-control-sm custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input form-control"
                                name="genderradio"
                                id="titleradio-mr"
                            />
                            <label className="custom-control-label" htmlFor="titleradio-mr">
                                Mr
                            </label>
                        </div>
                        <div className="custom-control custom-control-sm custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input form-control"
                                name="genderradio"
                                id="titleradio-mrs"
                            />
                            <label className="custom-control-label" htmlFor="titleradio-mrs">
                                Mrs
                            </label>
                        </div>
                        <div className="custom-control custom-control-sm custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input form-control"
                                name="genderradio"
                                id="titleradio-ms"
                            />
                            <label className="custom-control-label" htmlFor="titleradio-ms">
                                Ms
                            </label>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Initials<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactinitial"
                            name="contactinitial"
                            placeholder="Initials"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            First Name<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactfirstname"
                            name="contactfirstname"
                            placeholder="Enter your name"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Last Name<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactlastname"
                            name="contactlastname"
                            placeholder="Enter your surname"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <label htmlFor="default-4" className="form-label">
                        gender <span className="red">*</span>
                        </label>
                        <div className="form-control-wrap">
                        <div className="form-control-select">
                            <Input type="select" name="select" id="contactgender" placeholder="Select">
                            <option value={0}>-- select --</option>    
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                            <option value={3}>unknown</option>
                            </Input>
                        </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex date-fromgroup">
                        <label htmlFor="default-4" className="form-label">
                        Date of Birth <span className="red">*</span>
                        </label>
                        <div className="form-control-wrap">
                        <DatePicker
                            dateFormat="yyyy-MM-dd"
                            id="contactbirth"
                            selected={startIconDate}
                            className="form-control date-picker"
                            onChange={setStartIconDate}
                            customInput={<ExampleCustomInput />}
                        />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <label htmlFor="default-4" className="relationship-member form-label">
                        Relationship with Main member <span className="red">*</span>
                        </label>
                        <div className="form-control-wrap">
                        <div className="form-control-select">
                            <Input type="select" name="select" id="relamainmem" placeholder="Select" className="select-input">
                            <option value={0}>-- select --</option>    
                            {
                                props.relationshiplist && props.relationshiplist.length > 0 ? props.relationshiplist.map((item, index)=>{
                                    return(<option value={item.id} key={index}>{item.relation_name}</option>)
                                })
                                :
                                <></>
                            }
                            </Input>
                        </div>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Email ID<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactemail"
                            name="contactemail"
                            placeholder="Enter Email ID"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Telephone Home<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactelphone"
                            name="contactelphone"
                            placeholder="Enter Valid Telephone Number"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Cell<span className="red">*</span>
                            </label>
                            </div>
                            <input
                            type={"text"}
                            id="contactcell"
                            name="contactcell"
                            placeholder="Enter Cell Number"
                            ref={register({ required: "This field is required" })}
                            className={`form-control-lg form-control is-hidden company-name item-name`}
                            />
                            {errors.passnew && (
                            <span className="invalid">{errors.passnew.message}</span>
                            )}
                        </div>
                    </FormGroup>
                </div>
                <div className="d-flex btn-group">
                    <FormGroup>
                        <Button size="lg" className="btn-large" type="submit" color="primary">
                            {"Save & Proceed"}
                        </Button>    
                    </FormGroup> 
                </div> 
            </Form>
        </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
    return {
        activeTab: state.contactReducer.activeTab,
        relationshiplist: state.contactReducer.relationshiplist,
        contactId: state.contactReducer.contactId
    };
  };

export default connect(mapStateToProps,{
    AddContactBaseInfo,
    UpdateContactBaseInfo
})(MainContactInfo);
  
