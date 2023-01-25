import React, {Fragment, useEffect, useState, forwardRef} from "react";
import {Form, FormGroup, Input} from "reactstrap";
import {connect} from "react-redux";
import {Icon, Button} from "../../../components/Component";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {updateUserBaseInfo, getUserById, getidType} from "../../../actions/tutorials";
import {formatDate} from "../../../utils/Utils";

const sessionToken = sessionStorage.getItem('token');

const PersonalInfo = (props) => {

    const {errors, register, handleSubmit} = useForm();
    const [userImageFile, setUserImageFile] = useState();
    const [userImageFileName, setUserImageFileName] = useState("");
    const [startIconDate, setStartIconDate] = useState(new Date());

    useEffect(() => {
        props.getUserById(sessionToken);
    }, []);

    useEffect(() => {

        let userInfo = props.userInfo[0];
        if (userInfo != null) {

            userInfo = userInfo[0];

            if (userInfo.title == 'mr') document.getElementById('title_radio_mr').checked = true;
            else if (userInfo.title == 'mrs') document.getElementById('title_radio_mrs').checked = true;
            else if (userInfo.title == 'ms') document.getElementById('title_radio_ms').checked = true;

            document.getElementById('profile_firstname').value = userInfo.firstname;
            document.getElementById('profile_lastname').value = userInfo.lastname;
            document.getElementById('profile_initials').value = userInfo.initials;
            document.getElementById('profile_gender').value = userInfo.gender;
            document.getElementById('profile_birthday').value = formatDate(userInfo.dob);
            document.getElementById('profile_id_type').value = userInfo.n_idtype;
            document.getElementById('profile_id').value = userInfo.idNumber;
            document.getElementById('profile_telephone').value = userInfo.telephone;
            document.getElementById('profile_email').value = userInfo.email;
            document.getElementById('profile_contact').value = userInfo.contact;
        }

    }, [props])

    const ExampleCustomInput = forwardRef(({value, onClick, onChange}, ref) => (
        <div onClick={onClick} ref={ref}>
            <div className="form-icon form-icon-left">
                <Icon name="calendar"/>
            </div>
            <input className="form-control date-picker" type="text" value={value} onChange={onChange}
                   id={'profile_birthday'} style={{width: '11rem'}}/>
        </div>
    ));

    const setUserImageFiles = (e) => {
        setUserImageFile(e.target.files[0]);
        setUserImageFileName(e.target.files[0].name);
    }

    const onFormSubmit = (formData) => {

        let title = "";
        if(document.getElementById(`title_radio_mr`).checked) title = "mr";
        else if(document.getElementById(`title_radio_mrs`).checked) title = "mrs";
        else if(document.getElementById(`title_radio_ms`).checked) title = "ms"

        const gender = document.getElementById(`profile_gender`).value;
        const birthday = document.getElementById(`profile_birthday`).value;
        const idType = document.getElementById(`profile_id_type`).value;

        let submitData = new FormData();
        submitData.append('title', title);
        submitData.append('initials', formData.initials);
        submitData.append('firstname', formData.firstname);
        submitData.append('lastname', formData.lastname);
        submitData.append('gender', gender);
        submitData.append('birthday', birthday);
        submitData.append('telephone', formData.telephone);
        submitData.append('idNumber', formData.idNumber);
        submitData.append('n_idtype', idType);
        submitData.append('email', formData.email);
        submitData.append('profile', userImageFile);
        submitData.append('contact', formData.contact);

        props.updateUserBaseInfo(sessionToken, submitData);

    }

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
                                    name="title_radio"
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
                                    name="title_radio"
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
                                    name="title_radio"
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
                                    id="profile_initials"
                                    name="initials"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Initials" style={{width: '12rem'}}
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
                                    id="profile_firstname"
                                    name="firstname"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter your name" style={{width: '12rem'}}
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
                                    id="profile_lastname"
                                    name="lastname"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter your surname" style={{width: '12rem'}}
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
                                <div className="form-control-select" style={{width: '12rem'}}>
                                    <Input type="select" name="gender" id="profile_gender" placeholder="Select"
                                           style={{width: '12rem'}}>
                                        <option value="-1">-- select --</option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                        <option value="2">Unknown</option>
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
                                    selected={startIconDate}
                                    className="form-control date-picker"
                                    onChange={setStartIconDate}
                                    customInput={<ExampleCustomInput/>}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex">
                            <label htmlFor="default-4" className="form-label">
                                Verification ID Type <span className="red">*</span>
                            </label>
                            <div className="form-control-wrap">
                                <div className="form-control-select" style={{width: '12rem'}}>
                                    <Input type="select" name="idtype" id="profile_id_type" placeholder="Select"
                                           style={{width: '12rem'}}>
                                        <option value={0}>-- select --</option>
                                        {
                                            props.idTypeList && props.idTypeList.length > 0 ? props.idTypeList.map((item, index) => {
                                                    return(<option value={item.id} key={index}>{item.c_name}</option>)
                                                })
                                                : <></>
                                        }
                                    </Input>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                        Verification ID#<span className="red">*</span>
                                    </label>
                                </div>
                                <input
                                    type={"text"}
                                    id="profile_id"
                                    name="idNumber"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Verification ID" style={{width: '12rem'}}
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
                                    id="profile_telephone"
                                    name="telephone"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Valid Telephone Number" style={{width: '12rem'}}
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
                                        Email ID<span className="red">*</span>
                                    </label>
                                </div>
                                <input
                                    type={"text"}
                                    id="profile_email"
                                    name="email"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Email ID" style={{width: '12rem'}}
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
                                        User Profile Picture
                                    </label>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile" style={{width: '12rem'}}
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
                                    id="profile_contact"
                                    name="contact"
                                    ref={register({ required: "This field is required" })}
                                    placeholder="Enter Cell Number" style={{width: '12rem'}}
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
        userInfo: state.userinfoReducer,
        idTypeList: state.idtypeReducer,
    };
};

export default connect(mapStateToProps, {
    updateUserBaseInfo,
    getUserById,
    getidType
})(PersonalInfo);
  
