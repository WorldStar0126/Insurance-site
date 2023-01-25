import React, { useState, useEffect, forwardRef } from "react";
import {connect } from "react-redux"
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, FormGroup, Input,  Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from './queries'
import http from "../../../src/http-common";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const SignupForNation = ({ history, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const [idType, setIdType] = useState([]);
  const [selectIdType, setSelectIdType] = useState(1);
  const { errors, register, handleSubmit } = useForm();
  const [defaultFiles, setDefaultFiles] = useState("");
  let uploadfile;
  const handleFormSubmit = (formData) => {
    setLoading(true);
    let birthday = document.getElementById("nationbirthday").value;
    let gender = document.getElementById("nationgender").value;
    let idtype = parseInt(document.getElementById("idtype").value);

    const filedata = new FormData() 
    filedata.append('file', defaultFiles)
    let data = {};
    switch (idtype) {
      case 1:
        data = {n_citizentype : 0, firstname: formData.firstname, lastname: formData.lastname, birthday: birthday, gender: gender,
          contact: formData.phonenumber, emailaddress: formData.email, n_idtype: idtype, passportid: formData.passportid};
        break;
      case 3:
        data = {n_citizentype : 0, firstname: formData.firstname, lastname: formData.lastname, birthday: birthday, gender: gender,
          contact: formData.phonenumber, emailaddress: formData.email, n_idtype: idtype, uploadfile};
        break;
      case 4:
        data = {n_citizentype : 0, firstname: formData.firstname, lastname: formData.lastname, birthday: birthday, gender: gender,
          contact: formData.phonenumber, emailaddress: formData.email, n_idtype: idtype, driveLicenseNumber: formData.drivernumber};
        break;
      case 5:
        data = {n_citizentype : 0, firstname: formData.firstname, lastname: formData.lastname, birthday: birthday, gender: gender,
          contact: formData.phonenumber, emailaddress: formData.email, n_idtype: idtype, asylumNumber: formData.asylumnumber};
        break;
      case 6:
        data = {n_citizentype : 0, firstname: formData.firstname, lastname: formData.lastname, birthday: birthday, gender: gender,
          contact: formData.phonenumber, emailaddress: formData.email, n_idtype: idtype, voterIdNum: formData.voteridnumber};
    }

    http.post(`/auth/verifyid`, data
    ).then((res) => {
        if(res.data.status === true){
          sessionStorage.setItem("sign_usertype", JSON.stringify({type: "Nation", idnumber: formData.passportid, contact: formData.phonenumber}))
          history.push("/auth-verify");
        }
        if(res.data.status === false){  
          setLoading(false);
          Swal.fire({
            title: "Please enter correct Information",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          })

        }
    }).catch(error => {
          setLoading(false);
          Swal.fire({
            title: "Please enter correct Infomation.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          })
    });;
  };

  useEffect(() => {
    setIdType(props.idtype);
  }, [props])
  const [startIconDate, setStartIconDate] = useState(new Date());
  const changeSelectIdType = (e) =>{
    setSelectIdType(e.target.value);
  }
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <div onClick={onClick} ref={ref}>
      <div className="form-icon form-icon-left">
        <Icon name="calendar"></Icon>
      </div>
      <input className="form-control date-picker" type="text" id="nationbirthday" value={value} onChange={onChange} />
    </div>
  ));
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-xs nation-signup">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign Up</BlockTitle>
                <BlockDes>
                  <p>Create New Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to register with credentials{" "}
                </Alert>
              </div>
            )}
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="firstname">
                    First Name
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="firstname"
                    name="firstname"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter you first name"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="lastname">
                    Last Name
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="lastname"
                    name="lastname"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter you last name"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup className="date-fromgroup">
                  <label htmlFor="birthday" className="form-label">
                  Date of Birth 
                  </label>
                  <div className="form-control-wrap">
                  <DatePicker
                      dateFormat="yyyy-MM-dd"
                      id="birthday"
                      selected={startIconDate}
                      className="form-control date-picker"
                      onChange={setStartIconDate}
                      customInput={<ExampleCustomInput />}
                  />
                  </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="nationgender">
                    Gender
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                      <Input type="select" name="gender" id="nationgender" placeholder="Select">
                      <option value={1}>Male</option>
                      <option value={2}>Female</option>
                      <option value={3}>Unkown</option>
                      </Input>
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="nationphone">
                    Phone Number
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    bssize="lg"
                    id="nationphone"
                    name="phonenumber"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="27782807022"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="nationemail">
                    Email Address
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="nationemail"
                    name="email"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="my_email@outlook.com"
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="idtype">
                    Identification Type
                  </label>
                </div>
                <div className="form-control-wrap">
                    <Input type="select" name="idtype" id="idtype" placeholder="Select ID Type" onChange={(e)=>changeSelectIdType(e)}>
                      {
                        idType.length > 0 ? idType.map((item, index)=>{
                          return(
                            <option value={item.id} key={index}>{item.c_name}</option>   
                          )
                        })
                        :
                        <></>
                      }
                    </Input>
                  {errors.idtype && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              {
                selectIdType == 1 ? 
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="nationpassportid">
                      Passport ID
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="nationpassportid"
                      name="passportid"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="7607076490189"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
                : selectIdType == 3 ? 
                <FormGroup className="file-upload">
                    <div className="form-control-wrap">
                        <div className="form-label-group">
                        <label className="form-label" htmlFor="baptismfile">
                        Baptism Certificate
                        </label>
                        </div>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="baptismfile"
                                name="baptismfile"
                                accept=".txt, .docx"
                                onChange={(e) => setDefaultFiles(e.target.files[0].name)}
                            />
                            <label className="custom-file-label" htmlFor="customFile">
                                {defaultFiles === "" ? "Choose files" : defaultFiles}
                            </label>
                        </div>
                    </div>
                </FormGroup>
                : selectIdType == 4 ? 
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="nationdrivernum">
                      Drivers License Number
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="nationdrivernum"
                      name="drivernumber"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="7607076490189"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
                : selectIdType == 5 ? 
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="nationasylumnum">
                      Asylum Number
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="nationasylumnum"
                      name="asylumnumber"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="7607076490189"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
                : selectIdType == 6 ? 
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="nationvoterid">
                      Voter ID Card Number
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="nationvoterid"
                      name="voteridnumber"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="7607076490189"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
                :<></>

              }
              
              <FormGroup>
                {/* <Link to={`${process.env.PUBLIC_URL}/auth-verify`} className="go-verify"> */}
                  <Button type="submit" color="primary" size="lg" className="btn-block">
                    {loading ? <Spinner size="sm" color="light" /> : "Sign Up"}
                  </Button>
                {/* </Link> */}
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Log in instead</strong>
              </Link>
            </div>
            
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    premium: state.premiumReducer,
    productlist: state.productViewReducer,
    idtype: state.idtypeReducer
  };
};

export default connect(mapStateToProps,{
  
})(SignupForNation);


