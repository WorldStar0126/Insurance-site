import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {FormGroup} from "reactstrap";

import {Button, Icon} from "../../../components/Component";
import http from "../../../http-common";
import {formatDate} from "../../../utils/Utils";

import {getUserById} from "../../../actions/tutorials"

const sessionToken = sessionStorage.getItem("token");
const avatar = sessionStorage.getItem('avatar');

const PreviewInfo = (props) => {

    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [createOn, setCreateOn] = useState("");
    const [submitOn, setSubmitOn] = useState("");
    const [veriId, setVeriId] = useState("");
    const [veriIdNum, setVeriIdNum] = useState("");
    const [email, setEmail] = useState("");
    const [telphone, setTelphone] = useState("");
    const [cell, setCell] = useState("");
    const [addLine1, setAddLine1] = useState("");
    const [addLine2, setAddLine2] = useState("");
    const [region, setRegion] = useState("");
    const [circuit, setCircuit] = useState("");
    const [temple, setTemple] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");

    const [image, setImage] = useState("");

    useEffect(() => {
        props.getUserById(sessionToken);
    }, [])

    useEffect(() => {

        if (props.userInfo[0] != null) {

            let data = props.userInfo[0][0];

            setTitle(data.title);
            setFirstName(data.firstname);
            setLastName(data.lastname);
            setGender(["Male", "Female", "Unknown"][data.gender]);
            setBirthday(formatDate(data.dob));
            setEmail(data.email);
            setTelphone(data.telephone);
            setCell(data.contact);
            setCreateOn(formatDate(data.createdAt));
            setSubmitOn(formatDate(data.updatedAt));
            setVeriIdNum(data.idNumber);
            for (let i = 0; i < props.idtypelist.length; i++) {
                if (props.idtypelist[i].id == data.n_idtype) {
                    setVeriId(props.idtypelist[i].c_name);
                    break;
                }
            }
            setImage(avatar);
            setAddLine1(data.c_phy_add_l1);
            setAddLine2(data.c_phy_add_l2);

            for (let i = 0; i < props.regionlist.length; i++) {
                if (props.regionlist[i].id == data.c_phy_region) {
                    setRegion(props.regionlist[i].c_name);
                    break;
                }
            }

            for (let i = 0; i < props.circuitlist.length; i++) {
                if (props.circuitlist[i].id == data.c_phy_circuit) {
                    setCircuit(props.circuitlist[i].c_name);
                    break;
                }
            }

            for (let i = 0; i < props.templelist.length; i++) {
                if (props.templelist[i].id == data.c_phy_temple) {
                    setTemple(props.templelist[i].c_name);
                    break;
                }
            }

            for (let i = 0; i < props.countrylist.length; i++) {
                if (props.countrylist[i].id == data.n_phy_country) {
                    setCountry(props.countrylist[i].c_name);
                    break;
                }
            }

            setPostal(data.n_phy_postal_code);

        }

    }, [props])


    return (
        <Fragment>
            <div className="contact-content preview-contact-info">
                <div className="row">
                    <div className="col-4 left-side">
                        <div className="userInfo">
                            <div className="person-info d-flex">
                                <img src={image} alt={''}/>
                                <div className="info-detail">
                                    <p className="username">{firstName} {lastName}</p>
                                    <p className="email">{email}</p>
                                    <p className="phonenumber">{telphone}</p>
                                </div>
                            </div>
                            <p className="createon">Created On : &nbsp;&nbsp;&nbsp;&nbsp; {createOn}</p>
                            <p className="submiton">Submitted On :&nbsp; {submitOn}</p>
                        </div>
                    </div>
                    <div className="col-8 right-side info-group">
                        <div className="info-part name-info">
                            <div className="row">
                                <div className="col-4">
                                    <div className="item">
                                        <p className="label">Title</p>
                                        <p className="txt">{title}</p>
                                    </div>
                                    <div className="item">
                                        <p className="label">Gender</p>
                                        <p className="txt">{gender}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="item">
                                        <p className="label">First Name</p>
                                        <p className="txt">{firstName}</p>
                                    </div>
                                    <div className="item">
                                        <p className="label">Date of Birth</p>
                                        <p className="txt">{birthday}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="item">
                                        <p className="label">Last Name</p>
                                        <p className="txt">{lastName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-group mt-3">
                    <div className="info-part email-info">
                        <div className="row">
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Verification ID</p>
                                    <p className="txt">{veriId}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Telephone Home</p>
                                    <p className="txt">{telphone}</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Verification ID #</p>
                                    <p className="txt">{veriIdNum}</p>
                                </div>
                                <div className="item">
                                    <p className="label"/>
                                    <p className="txt"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Email Address</p>
                                    <p className="txt">{email}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Cell</p>
                                    <p className="txt">{cell}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-part address-info">
                        <p className="lable info-top">Residential Address</p>
                        <div className="item d-flex">
                            <div className="d-flex">
                                <p className="label">Line 1:&nbsp;&nbsp;</p>
                                <p className="txt">{addLine1}&nbsp;&nbsp;||&nbsp;&nbsp;</p>
                            </div>
                            <div className="d-flex">
                                <p className="label">Line 2:&nbsp;&nbsp;</p>
                                <p className="txt">{addLine2}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Region</p>
                                    <p className="txt">{region}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Country</p>
                                    <p className="txt">{country}</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Circuit</p>
                                    <p className="txt">{circuit}</p>
                                </div>
                                <div className="item">
                                    <p className="label"></p>
                                    <p className="txt"></p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="item">
                                    <p className="label">Temple</p>
                                    <p className="txt">{temple}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Postal Code</p>
                                    <p className="txt">{postal}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-part kyc-info">
                        <p className="info-top">KYC Status</p>
                        <div className="">
                            <div className="item d-flex">
                                <p className="txt">Identification Type</p>
                                <p className="approve-status"><span className="icon ni ni-check-circle-fill"/>APPROVED
                                </p>
                            </div>
                            <div className="item d-flex">
                                <p className="txt">Address Proof Type</p>
                                <p className="approve-status"><span className="icon ni ni-check-circle-fill"/>APPROVED
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        regionlist: state.contactReducer.regionlist,
        circuitlist: state.contactReducer.allcircuits,
        templelist: state.contactReducer.alltemples,
        countrylist: state.contactReducer.countrylist,
        idtypelist: state.idtypeReducer,
        userInfo: state.userinfoReducer,
    };
};

export default connect(mapStateToProps, {
    getUserById,
})(PreviewInfo);

