import React, {Fragment, useEffect, useState, forwardRef} from "react";
import {Form, FormGroup, Input} from "reactstrap";
import {connect} from "react-redux";
import {Icon, Button} from "../../../components/Component";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {addPolicyMember, updatePolicyMember} from "../../../actions/tutorials";

let sessionToken = sessionStorage.getItem("token");

const PersonalInfo = (props) => {

    const {errors, register, handleSubmit} = useForm();
    const [startIconDate, setStartIconDate] = useState(new Date());
    const [userImageFile, setUserImageFile] = useState();
    const [userImageFileName, setUserImageFileName] = useState("");

    const setUserImageFiles = (e) => {
        setUserImageFile(e.target.files[0]);
        setUserImageFileName(e.target.files[0].name);
    }

    const onFormSubmit = (formData) => {

        let title = "";
        if(document.getElementById(`title_radio_mr`).checked) title = "mr";
        else if(document.getElementById(`title_radio_mrs`).checked) title = "mrs";
        else if(document.getElementById(`title_radio_ms`).checked) title = "ms"

        const gender = document.getElementById(`member_gender`).value;
        const birthday = document.getElementById(`member_birthday`).value;

        let submitData = new FormData();
        submitData.append('n_policyid', props.policyId);
        submitData.append('c_title', title);
        submitData.append('c_initials', formData.c_initials);
        submitData.append('c_firstname', formData.c_firstname);
        submitData.append('c_lastname', formData.c_lastname);
        submitData.append('n_gender', gender);
        submitData.append('d_dob', birthday);
        submitData.append('c_tel_home', formData.c_tel_home);
        submitData.append('c_email', formData.c_email);
        submitData.append('c_profile', userImageFile);
        submitData.append('c_cell', formData.c_cell);

        if (props.mainMemberData == null || props.mainMemberData.id == null) {
            props.addPolicyMember(sessionToken, submitData);
        } else {
            props.updatePolicyMember(sessionToken, props.mainMemberData.id, submitData);
        }

    };

    const DatePickInput = forwardRef(({value, onClick, onChange}, ref) => (
        <div onClick={onClick} ref={ref}>
            <div className="form-icon form-icon-left">
                <Icon name="calendar"/>
            </div>
            <input id='member_birthday' className="form-control date-picker" type="text" value={value} onChange={onChange}/>
        </div>
    ));

    return (
        <Fragment>
            <div className="contact-content main-contact-info">
                <Form className={'form-contact-info'} onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="d-flex personal-info">
                        <FormGroup className="d-flex">
                            <label className="form-label" htmlFor="default-01">
                                Title<span className="red">*</span>
                            </label>
                            <div className="custom-control custom-control-sm custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input form-control"
                                    name="title-radio"
                                    id="title_radio_mr"
                                />
                                <label className="custom-control-label" htmlFor="title_radio_mr">
                                    Mr
                                </label>
                            </div>
                            <div className="custom-control custom-control-sm custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input form-control"
                                    name="title-radio"
                                    id="title_radio_mrs"
                                />
                                <label className="custom-control-label" htmlFor="title_radio_mrs">
                                    Mrs
                                </label>
                            </div>
                            <div className="custom-control custom-control-sm custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input form-control"
                                    name="title-radio"
                                    id="title_radio_ms"
                                />
                                <label className="custom-control-label" htmlFor="title_radio_ms">
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
                                    id="member_initials"
                                    name="c_initials"
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
                                    id="member_firstname"
                                    name="c_firstname"
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
                                    id="member_lastname"
                                    name="c_lastname"
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
                                Gender <span className="red">*</span>
                            </label>
                            <div className="form-control-wrap">
                                <div className="form-control-select">
                                    <Input type="select" name="select" id="member_gender" placeholder="Select">
                                        <option value={0}>Male</option>
                                        <option value={1}>Female</option>
                                        <option value={2}>Unknown</option>
                                    </Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex date-fromgroup">
                            <label htmlFor="member_birthday" className="form-label">
                                Date of Birth <span className="red">*</span>
                            </label>
                            <div className="form-control-wrap">
                                <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    id="member_date"
                                    selected={startIconDate}
                                    className="form-control date-picker"
                                    onChange={setStartIconDate}
                                    customInput={<DatePickInput/>}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="member_telephone">
                                        Telephone Home<span className="red">*</span>
                                    </label>
                                </div>
                                <input
                                    type={"text"}
                                    id="member_telephone"
                                    name="c_tel_home"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Valid Telephone Number"
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
                                    <label className="form-label" htmlFor="member_email">
                                        Email ID<span className="red">*</span>
                                    </label>
                                </div>
                                <input
                                    type={"text"}
                                    id="member_email"
                                    name="c_email"
                                    placeholder="Enter Email ID"
                                    ref={register({ required: "This field is required" })}
                                    className={`form-control-lg form-control is-hidden company-name item-name`}
                                />
                                {errors.passnew && (
                                    <span className="invalid">{errors.passnew.message}</span>
                                )}
                            </div>
                        </FormGroup>
                        <FormGroup className="identify-upload upload-file">
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                        User Profile Picture <span className="red">*</span>
                                    </label>
                                </div>
                                <div className="custom-file" style={{width:'15.5rem'}}>
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept=".png, .jpg"
                                        onChange={(e) => setUserImageFiles(e)} />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {userImageFileName === "" ? "Choose files" : userImageFileName}
                                    </label>
                                </div>
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
                                    id="member_cell"
                                    name="c_cell"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Cell Number"
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
                            <Button
                                size="lg"
                                className="btn-large"
                                type="submit"
                                color="primary"
                            >
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
        mainMemberData: state.policyReducer.mainMember
    };
};

export default connect(mapStateToProps, {
    addPolicyMember,
    updatePolicyMember
})(PersonalInfo);
  
