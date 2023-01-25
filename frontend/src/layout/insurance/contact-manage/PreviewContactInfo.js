import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown,Form, FormGroup, Spinner, Util } from "reactstrap";

import { Icon, Button } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import user from "../../../images/avatar/c-sm.jpg";
import http from "../../../http-common";
import { formatDate } from "../../../utils/Utils";

import { getcontactdata } from "../../../actions/tutorials"

let sessiontoken = sessionStorage.getItem("token");

const PreviewContactInfo = (props) => {

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [createOn, setCreateOn] = useState("");
  const [submitOn, setSubmitOn] = useState("");
  const [relationship, setRelationship] = useState("");
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

  const mimeType = "image/png";
  const [image, setImage] = useState("");

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

    if (props.activeTab == 4 && props.currentcontact && typeof(props.currentcontact) == 'number'){

      http.get(
        `/get/contactsdata?id=${props.currentcontact}`, 
        {headers: { "x-access-token": sessiontoken }})
      .then((res) => {

        if (res.data.status) {
          
          let data = res.data.data[0];

          setTitle(data.c_title);
          setFirstName(data.c_firstname);
          setLastName(data.c_lastname);
          setGender(data.gender);
          setBirthday(formatDate(data.d_dob));
          setRelationship(data.relation_name);
          setEmail(data.c_email);
          setTelphone(data.n_tel_home);
          setCell(data.n_cell);
          setCreateOn(formatDate(data.createdAt));
          setSubmitOn(formatDate(data.updatedAt));
          if(data.kycinfo && data.kycinfo.length > 0){
           
            let buffer = data.kycinfo[0].c_img.data;
            let length = buffer.length;
            let arrayBuffer = new Uint8Array(length);

            for (let i = 0; i < length; i++) arrayBuffer[i] = buffer[i];
            setImage(new TextDecoder().decode(arrayBuffer));
            
            for(let i = 0; i < props.idtypelist.length; i ++){
              if(props.idtypelist[i].id == data.kycinfo[0].n_idtype)
                setVeriId(props.idtypelist[i].c_name);
            }
            
            setVeriIdNum(data.kycinfo[0].n_idnum);
          }

          if(data.addressinfo && data.addressinfo.length > 0){

            setAddLine1(data.addressinfo[0].c_phy_add_l1);
            setAddLine2(data.addressinfo[0].c_phy_add_l2);

            for(let i = 0; i < props.regionlist.length; i ++){
              if(props.regionlist[i].id == data.addressinfo[0].c_phy_region)
                setRegion(props.regionlist[i].c_name);
            }

            for(let i = 0; i < props.circuitlist.length; i ++){
              if(props.circuitlist[i].id == data.addressinfo[0].c_phy_circuit)
                setCircuit(props.circuitlist[i].c_name);
            }

            for(let i = 0; i < props.templelist.length; i ++){
              if(props.templelist[i].id == data.addressinfo[0].c_phy_temple)
                setTemple(props.templelist[i].c_name);
            }

            for(let i = 0; i < props.countrylist.length; i ++){
              if(props.countrylist[i].id == data.addressinfo[0].n_phy_country)
                setCountry(props.countrylist[i].c_name);
            }
            
            setPostal(data.addressinfo[0].n_phy_postal_code);
          }
              
        }
      });
    
    }
  }, [props])

  const referMessage = () => {
    let name = `${firstName} ${lastName}`;
    let message = "Please join this Insurance as Main Member.";
    let title = "IMS Insurance";
    http.post(`/send/refer_email`, {name: name, email: email, title: title, message: message}).then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <Fragment>
        <h3 className="tab-title">Preview Contact Information</h3>
        <div className="contact-content preview-contact-info">
          <div className="row">
            <div className="col-4 left-side">
              <div className="userInfo">
                <div className="person-info d-flex">
                  {/* <img src={image} /> */}
                  <img src={image} />
                  <div className="info-detail">
                    <p className="username"></p>
                    <p className="email">{email}</p>
                    <p className="phonenumber">{telphone}</p>
                  </div>
                </div>
                <p className="createon">Created On: {createOn}</p>
                <p className="submiton">Submitted On: {submitOn}</p>
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
                      <div className="item">
                        <p className="label">Relationship</p>
                        <p className="txt">{relationship}</p>
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
                      <p className="label"></p>
                      <p className="txt"></p>
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
                    <p className="approve-status"><span className="icon ni ni-check-circle-fill"></span>APPROVED</p>
                  </div>
                  <div className="item d-flex">
                    <p className="txt">Address Proof Type</p>
                    <p className="approve-status"><span className="icon ni ni-check-circle-fill"></span>APPROVED</p>
                  </div>
                </div>
            </div>
            <div className="btn-group">
            <FormGroup>
              <Button
                  size="lg"
                  className="btn-large btn-upload"
                  type=""
                  color="primary"
                  onClick={()=>referMessage()}
              >
                  <Icon name="share" className="mr-1"></Icon>
                  {"Refer Contact"}
              </Button>    
            </FormGroup>
            <FormGroup>
              <Button
                  size="lg"
                  className="btn-large btn-upload"
                  type=""
                  color="primary"
              >
                  {"Edit"}
              </Button>    
            </FormGroup>
            </div>
          </div> 
        </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
      currentcontact: state.contactReducer.contact,
      previewstatus: state.contactReducer.previewstatus,
      regionlist: state.contactReducer.regionlist,
      circuitlist: state.contactReducer.allcircuits,
      templelist: state.contactReducer.alltemples,
      countrylist: state.contactReducer.countrylist,
      idtypelist: state.idtypeReducer,
  };
};

export default connect(mapStateToProps,{
  getcontactdata,
})(PreviewContactInfo);

