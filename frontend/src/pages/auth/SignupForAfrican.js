import React, { useState } from "react";
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
import { Spinner, FormGroup, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory  } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from './queries'
import http from "../../../src/http-common";
import Swal from "sweetalert2";


const SignupForAfrican = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorVal, setError] = useState("");
  const { errors, register, handleSubmit } = useForm();
  
  var history = useHistory();
  const handleFormSubmit = (formData) => {
    setLoading(true);
    http.post(`/auth/verifyid`, 
      {n_citizentype : 1, idNumber : formData.idnumber, contact : formData.telephoneNumber}
    ).then((res) => {
        if(res.data.status){
          sessionStorage.setItem("sign_usertype", JSON.stringify({type: "SA", idNumber: formData.idnumber}))
          history.push("/auth-verify");
        }
        else if(!res.data.status){
          setLoading(false);
          Swal.fire({
            title: "Please enter correct ID Number and Telephone Number.",
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
    });
  };

  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-xs">
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
                  <label className="form-label" htmlFor="phone">
                    Enter Your South African ID No. 
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="idnumber"
                    name="idnumber"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="7894561234567"
                  />
                  {errors.phone && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="phone">
                    Enter Your Telephone Number. 
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="number"
                    bssize="lg"
                    id="telephoneNumber"
                    name="telephoneNumber"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="27782807022"
                  />
                  {errors.phone && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
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
export default SignupForAfrican;
