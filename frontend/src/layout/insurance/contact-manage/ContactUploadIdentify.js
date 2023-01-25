import React, { Fragment, useEffect, useState, forwardRef } from "react";
import {Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import { Icon, Button, ProjectHead } from "../../../components/Component";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { getaddressType, AddContactUploadId, UpdateContactUploadId } from "../../../actions/tutorials";

let sessiontoken = sessionStorage.getItem("token");

const ContactUploadIdentify = (props) => {

  const { errors, register, handleSubmit } = useForm();
  const [contactId, setContactId] = useState(0);
  const [userImageFile, setUserImageFile] = useState();
  const [userImageFileName, setUserImageFileName] = useState("");
  
  const [idFile, setIdFile] = useState();
  const [idFileName, setIdFileName] = useState("");

  const [addressFile, setAddressFile] = useState();
  const [addressFileName, setAddressFileName] = useState("");

  if (props.activeTab == 4 && document.getElementById('contactSubTab')) {

    let tabNav = document.getElementById('contactSubTab').children;
    let tabConent = document.getElementById('contactSubTabContent').children;

    for (let i = 0; i < 4; i++) {
        if (props.activeTab == i + 1) {
            tabNav[i].children[0].classList.remove('nav-link');
            tabNav[i].children[0].classList.add('active');
            tabNav[i].children[0].classList.add('nav-link');
            tabConent[i].classList.add('active');
        } else {
            tabNav[i].children[0].classList.remove('active');
            tabConent[i].classList.remove('active');
        } 
    }

  }

  useEffect(() => {
    props.getaddressType();
  }, []);

  useEffect(() => {
    setContactId(props.currentcontact)
  }, [props]);

  const setUserImageFiles = (e) => {
    setUserImageFile(e.target.files[0]);
    setUserImageFileName(e.target.files[0].name);
  }

  const setIDFiles = (e) => {
    setIdFile(e.target.files[0]);
    setIdFileName(e.target.files[0].name);
  }

  const setAddressFiles = (e) => {
    setAddressFile(e.target.files[0]);
    setAddressFileName(e.target.files[0].name);
  }

  const proceedUploadID = () => {

    let idType = document.getElementById("identificatioinType").value;
    let addressType = document.getElementById("identificationType2").value;
    let personalID = document.getElementById("contactveriID").value;
    let addressID = document.getElementById("contactaddrID").value;

    let formData = new FormData();
    
    formData.append("c_img", userImageFile);
    formData.append("n_idfile", idFile);
    formData.append("n_addfile", addressFile);
    formData.append("n_contactid", contactId);
    formData.append("n_idtype", idType);
    formData.append("n_idnum", personalID);
    formData.append("n_addresstype", addressType);
    formData.append("n_addressnum", addressID);

    if (props.updateStatus && props.contactData[0].kycinfo[0] != undefined) {
        props.UpdateContactUploadId(sessiontoken, props.contactData[0].kycinfo[0].id, formData);
    } else {
        props.AddContactUploadId(sessiontoken, formData);
    }
    
  }

  return (
    <Fragment>
        <div className="contact-content contact-upload-identify">
            <div className="upload-info">
                <FormGroup className="upload-top">
                    <div className="form-control-wrap user-image-upload d-flex pb-3">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                                User Image<span className="red">*</span>
                            </label>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" accept=".png, .jpg" 
                                onChange={(e) => setUserImageFiles(e)} />
                            <label className="custom-file-label" htmlFor="customFile">
                                {userImageFileName === "" ? "Choose files" : userImageFileName}
                            </label>
                        </div>
                        <button className="btn zoom-btn">
                            <Icon name="user-fill"/>
                            <Icon name="zoom-in"/>
                        </button>
                    </div>
                </FormGroup>
                <div className="upload-bottom">
                    <div className="identify-upload upload-line d-flex">
                        <FormGroup className="d-flex">
                            <label htmlFor="default-4" className="form-label" style={{marginLeft:'1rem'}}>
                                Identification Type : 
                            </label>
                            <div className="form-control-wrap">
                            <div className="form-control-select">
                                <Input type="select" name="select" id="identificatioinType" placeholder="Select" style={{width:'9rem'}}>
                                    <option value={0}>-- select --</option>
                                    {
                                        props.idtypelist && props.idtypelist.length > 0 ? props.idtypelist.map((item, index) => {
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
                                    <label className="form-label" htmlFor="default-01" style={{marginLeft:'1.5rem'}}>
                                        ID # : 
                                    </label>
                                </div>
                                <input type={"text"} id="contactveriID" name="contactveriID" placeholder="Enter Verificatoin ID"
                                    ref={register({ required: "This field is required" })} style={{width:'12rem', marginLeft:0, marginRight: '1rem'}}
                                    className={`form-control-lg form-control is-hidden company-name item-name`}/>
                                    {errors.contactveriID && (
                                        <span className="invalid">{errors.contactveriID.message}</span>
                                    )}
                            </div>
                        </FormGroup>
                        <FormGroup className="identify-upload upload-file">
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                <label className="form-label" htmlFor="default-01">
                                Upload File : 
                                </label>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept=".docx, .pdf, .png, .jpg"
                                        onChange={(e) => setIDFiles(e)}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {idFileName === "" ? "Choose files" : idFileName}
                                    </label>
                                </div>
                            </div>
                        </FormGroup>
                        <button className="btn zoom-btn">
                            <Icon name="user-fill"/>
                            <Icon name="zoom-in"/>
                        </button>
                    </div>
                    <div className="address-proof-upload upload-line d-flex">
                        <FormGroup className="d-flex">
                            <label htmlFor="default-4" className="form-label" style={{marginLeft:'1rem'}}>
                            AddressProof Type : 
                            </label>
                            <div className="form-control-wrap">
                            <div className="form-control-select">
                                <Input type="select" name="select" id="identificationType2" placeholder="Select" style={{width:'9rem'}}>
                                <option value={0}>-- select --</option>
                                {
                                    props.addresstypelist && props.addresstypelist.length > 0 ? props.addresstypelist.map((item, index)=>{
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
                                    <label className="form-label" htmlFor="default-01" style={{marginLeft:'1.5rem'}}>
                                        ID # : 
                                    </label>
                                </div>
                                <input type={"text"} id="contactaddrID" name="contactaddrID" placeholder="Enter Verificatoin ID"
                                ref={register({ required: "This field is required" })} style={{width:'12rem', marginLeft:0, marginRight: '1rem'}}
                                className={`form-control-lg form-control is-hidden company-name item-name`}/>
                                    {errors.contactaddrID && (
                                        <span className="invalid">{errors.contactaddrID.message}</span>
                                    )}
                            </div>
                        </FormGroup>
                        <FormGroup className="identify-upload upload-file">
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                <label className="form-label" htmlFor="default-01">
                                Upload File : 
                                </label>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept=".docx, .pdf, .png, .jpg"
                                        onChange={(e) => setAddressFiles(e)}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        {addressFileName === "" ? "Choose files" : addressFileName}
                                    </label>
                                </div>
                            </div>
                        </FormGroup>
                        <button className="btn zoom-btn">
                            <Icon name="user-fill"/>
                            <Icon name="zoom-in"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="d-flex btn-group mt-5">
                <FormGroup>
                    <Button
                        size="lg"
                        className="btn-large"
                        type=""
                        color="primary"
                    >
                        {"Submit for Approval"}
                    </Button>    
                </FormGroup> 
                <FormGroup>
                    <Button
                        size="lg"
                        className="btn-large"
                        type="submit"
                        color="primary"
                        onClick={()=>proceedUploadID()}
                    >
                        {"Save & Proceed"}
                    </Button>    
                </FormGroup>  
            </div>
        </div>
    </Fragment>
  );
};



const mapStateToProps = (state) => {
    return {
        activeTab: state.contactReducer.activeTab,
        idtypelist: state.idtypeReducer,
        addresstypelist: state.contactReducer.addresstypelist,
        currentcontact: state.contactReducer.contact,
        updateStatus: state.contactReducer.updateStatus,
        contactData: state.contactReducer.contactdata
    };
  };

export default connect(mapStateToProps,{
    getaddressType,
    AddContactUploadId,
    UpdateContactUploadId
})(ContactUploadIdentify);
  
