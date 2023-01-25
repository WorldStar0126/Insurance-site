import React, {useState, useEffect} from "react";
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
import LogoDark from "../../images/logo-dark.png";
// import Logo from "../../images/logo/logo.png";
import axios from "axios";

import {Form, FormGroup, Spinner, Alert} from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {AUTH_TOKEN} from "../../constants";
import {LOGIN_USER} from './queries'

import http from "../../../src/http-common";
import Swal from "sweetalert2";
import {setSourceMapRange} from "typescript";

const PhoneVerificaiton = () => {
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(false);
    const [timeState, setTimeState] = useState(60);
    const [errorVal, setError] = useState("");
    const {errors, register, handleSubmit} = useForm();
    let sessionvalue = JSON.parse(sessionStorage.getItem("sign_usertype"));

    let interval, time = 60;

    useEffect(() => {
        interval = setInterval(() => {
            setTimeState(timeState => timeState - 1);
            time--;
            if (time < 0) {
                clearInterval(interval);
                document.getElementById("verifybtn").setAttribute("disabled", "disabled");
            }
        }, 1000);
    }, []);

    const resendOTP = () => {

        http.post(`/auth/resend_otp`,
            {idNumber: sessionvalue.idnumber, contact: sessionvalue.contact}
        ).then((res) => {
            if (res.data.status) {
                time = 60;
                setTimeState(time);
                setInterval(interval, 1000);
                document.getElementById("verifybtn").removeAttribute("disabled", );
            } else {
                setLoading(false);
                Swal.fire({
                    title: res.data.message,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            }
        }).catch(err => {
            setLoading(false);
            Swal.fire({
                title: err.message,
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        });

    };

    const onFormSubmit = (formData) => {

        setLoading(true);

        if (sessionvalue.type == 'SA') {
            http.post(`/auth/verifyOTP`,
                {idNumber: sessionvalue.idNumber, otp: formData.verificode}
            ).then((res) => {
                if (res.data.status) {
                    window.location.href = '/auto-confirm';
                } else {
                    setLoading(false);
                    Swal.fire({
                        title: "Please enter correct Verification Code.",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }).catch(() => {
                setLoading(false);
                Swal.fire({
                    title: "Please enter correct Verification Code.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                })
            });
        } else {
            http.post(`/auth/verifyOTP`,
                {idnumber: sessionvalue.idnumber, contact: sessionvalue.contact, otp: formData.verificode}
            ).then((res) => {
                if (res.data.status) {
                    window.location.href = '/auth-confirm';
                } else {
                    setLoading(false);
                    Swal.fire({
                        title: "Please enter correct Verification Code.",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }).catch(() => {
                setLoading(false);
                Swal.fire({
                    title: "Please enter correct Verification Code.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                })
            });

        }
    }

    return (
        <React.Fragment>
            <Head title="Login"/>
            <PageContainer>
                <Block className="nk-block-middle nk-auth-body  wide-xs">
                    <div className="brand-logo pb-4 text-center">
                        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        </Link>
                    </div>
                    <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                        <BlockHead>
                            <BlockContent>
                                <BlockDes>
                                    <p>Please enter verification code in {timeState > 0 ? timeState : 0} seconds.</p>
                                </BlockDes>
                            </BlockContent>
                        </BlockHead>
                        {errorVal && (
                            <div className="mb-3">
                                <Alert color="danger" className="alert-icon">
                                    {" "}
                                    <Icon name="alert-circle"/> Unable to login with credentials{" "}
                                </Alert>
                            </div>
                        )}
                        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                            <FormGroup>
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                        Verification Code
                                    </label>
                                </div>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        id="verificode"
                                        name="verificode"
                                        ref={register({required: "This field is required"})}
                                        defaultValue=""
                                        placeholder="Enter your verification code."
                                        className="form-control-lg form-control"
                                    />
                                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button size="lg" id="verifybtn" className="btn-block" type="submit" color="primary">
                                    {loading ? <Spinner size="sm" color="light"/> : "VERIFY"}
                                </Button>
                            </FormGroup>
                        </Form>
                        <FormGroup style={{float:'right'}}>
                            <span>If you don't get OTP code, please </span>
                            <a href='#' onClick={() => resendOTP()}>Resend OTP</a>
                        </FormGroup>
                    </PreviewCard>
                </Block>
                <AuthFooter/>
            </PageContainer>
        </React.Fragment>
    );
};
export default PhoneVerificaiton;
