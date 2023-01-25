import React, {Fragment, useState} from "react";
import {FormGroup, Input} from "reactstrap";
import {connect} from "react-redux";
import {Button, Icon} from "../../../components/Component";
import {useForm} from "react-hook-form";


const KYCStatus = (props) => {
    const {errors, register, handleSubmit} = useForm();
    const [startIconDate, setStartIconDate] = useState(new Date());
    const [defaultFiles, setDefaultFiles] = useState("");

    return (
        <Fragment>
            <div className="contact-content contact-upload-identify">
                <div className="upload-info">
                    <div className="upload-bottom">
                        <div className="identify-upload upload-line d-flex">
                            <div className="custom-control custom-control-sm custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input form-control"
                                    name="identity-upload-statu"
                                    id="identity-upload-statu"
                                />
                                <label className="custom-control-label" htmlFor="identity-upload-statu"/>
                            </div>
                            <FormGroup className="d-flex">
                                <label htmlFor="default-4" className="form-label"
                                       style={{marginLeft: '1rem', width: '8rem'}}>
                                    Identification Type :
                                </label>
                                <div className="form-control-wrap">
                                    <div className="form-control-select">
                                        <Input type="select" name="select" id="identificationKyc1" placeholder="Select"
                                               style={{width: '9rem'}}>
                                            <option value="default_option">Type1</option>
                                            <option value="option_select_name">Type2</option>
                                            <option value="option_select_name">Type3</option>
                                        </Input>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-control-wrap d-flex">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="default-01" style={{marginLeft: '1rem'}}>
                                            ID Number :
                                        </label>
                                    </div>
                                    <input
                                        type={"text"}
                                        id="contactkycID"
                                        name="contactkycID"
                                        placeholder="Enter Verificatoin ID" style={{margin: 0, width: '11rem'}}
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
                                            Upload File :
                                        </label>
                                    </div>
                                    <div className="custom-file" style={{width: '12rem'}}>
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                            accept=".docx, .pdf, .png, .jpg"
                                            // onChange={(e) => setDefaultFiles(e.target.files[0].name)}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            {defaultFiles === "" ? "Choose files" : defaultFiles}
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                            <Button color="" className="zoom-btn">
                                <Icon name="trash"/>
                            </Button>
                        </div>
                        <div className="address-proof-upload upload-line d-flex">
                            <div className="custom-control custom-control-sm custom-radio">
                                <input
                                    type="radio"
                                    className="custom-control-input form-control"
                                    name="address-proof-statu"
                                    id="address-proof-statu"
                                />
                                <label className="custom-control-label" htmlFor="address-proof-statu"/>
                            </div>
                            <FormGroup className="d-flex">
                                <label htmlFor="default-4" className="form-label"
                                       style={{marginLeft: '1rem', width: '8rem'}}>
                                    AddressProof Type :
                                </label>
                                <div className="form-control-wrap">
                                    <div className="form-control-select">
                                        <Input type="select" name="select" id="identificationKyc2" placeholder="Select"
                                               style={{width: '9rem'}}>
                                            <option value="default_option">Type1</option>
                                            <option value="option_select_name">Type2</option>
                                            <option value="option_select_name">Type3</option>
                                        </Input>
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-control-wrap d-flex">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="default-01" style={{marginLeft: '1rem'}}>
                                            ID Number :
                                        </label>
                                    </div>
                                    <input
                                        type={"text"}
                                        id="contactkyc2ID"
                                        name="contactkyc2ID"
                                        placeholder="Enter Verificatoin ID" style={{margin: 0, width: '11rem'}}
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
                                            Upload File :
                                        </label>
                                    </div>
                                    <div className="custom-file" style={{width: '12rem'}}>
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                            accept=".docx, .pdf, .png, .jpg"
                                            // onChange={(e) => setDefaultFiles(e.target.files[0].name)}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            {defaultFiles === "" ? "Choose files" : defaultFiles}
                                        </label>
                                    </div>
                                </div>
                            </FormGroup>
                            <Button color="" className="zoom-btn">
                                <Icon name="trash"/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="d-flex btn-group mt-5">
                    <FormGroup>
                        <Button
                            size="lg"
                            className="btn-large"
                            type="submit"
                            color="primary"
                        >
                            {"Request for Approval"}
                        </Button>
                    </FormGroup>
                </div>
            </div>
        </Fragment>
    );
};


const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(KYCStatus);
  
