import React, { useState } from "react";
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
import Logo from "../../images/logo.png";
import img1 from "../../images/african1.jpg";
import img2 from "../../images/african2.jpg";
import LogoDark from "../../images/logo-dark.png";
// import Logo from "../../images/logo/logo.png";
import axios from "axios";

import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../../constants";
import { LOGIN_USER } from './queries'

const SignupTake = () => {

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const { errors, register, handleSubmit } = useForm();

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: ({login}) => {
      localStorage.setItem(AUTH_TOKEN, login.jwt);     
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 2000);
    },
    onError: (({ response, operation }) => {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 2000);    
    }),
  });

  const onFormSubmit = (formData) => {
    setLoading(true);
    
    localStorage.setItem("accessToken", "token");
    setTimeout(() => {
      window.history.pushState(
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
        "auth-login",
        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
      );
      window.location.reload();
    }, 2000);
  }
  return (
    <React.Fragment>
      <Head title="SignupType" />
      <PageContainer>
        <Block className="signup-content nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            </Link>
          </div>

          <PreviewCard className="card-bordered signup-type-content" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockDes>
                  <p className="sign-type-title text-center">Are you from South Africa or Other Nation?</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <div className="select-nation">
              <Link className="link link-primary link-sm " to={`${process.env.PUBLIC_URL}/auth-signupAfrican`}>
                    <img className="african-img" src={img1}></img><br/>
                    South Africa
              </Link>

              <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-signupOthernation`}>
                    <img className="african-img" src={img2}></img><br/>
                    Other Nation
              </Link>
            </div>
            
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default SignupTake;
