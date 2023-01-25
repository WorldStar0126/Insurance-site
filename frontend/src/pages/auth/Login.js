import React, {useState} from "react";
import {connect} from "react-redux";
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

import {Alert, Form, FormGroup, Spinner} from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import http from "../../../src/http-common";
import Swal from "sweetalert2";

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [passState, setPassState] = useState(false);
    const [errorVal, setError] = useState("");
    const {errors, register, handleSubmit} = useForm();

    const onFormSubmit = (formData) => {
        setLoading(true);
        http.post(`/auth/signin?emailOrPhone=${formData.emailorphone}&password=${formData.password}`)
            .then((res) => {
                if (res.data.status) {

                    let data = res.data.data;

                    sessionStorage.setItem('userId', data.id);
                    sessionStorage.setItem("usertype", data.n_utype == 0 ? "User" : "Admin");
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("loggedAt", new Date().getTime());
                    sessionStorage.setItem('email', data.email == null ? "" : data.email);
                    sessionStorage.setItem('username', data.username == null ? "" : data.username);
                    sessionStorage.setItem('avatar', data.avatar);

                    localStorage.setItem("accessToken", "token");
                    window.location.href = data.is_first == 1 ? "/user-profile-regular" : "/";

                } else {
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

    }

    return (
        <React.Fragment>
            <Head title="Login"/>
            <PageContainer>
                <Block className="login-page nk-block-middle nk-auth-body  wide-xs">
                    <div className="brand-logo pb-4 text-center">
                        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        </Link>
                    </div>

                    <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                        <BlockHead>
                            <BlockContent>
                                <BlockTitle tag="h4">Log-In</BlockTitle>
                                <BlockDes>
                                    <p>Please enter your phone number.</p>
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
                                    <label className="form-label" htmlFor="loginemailorphone">
                                        Email or Phone Number
                                    </label>
                                </div>
                                <div className="form-control-wrap">
                                    <input
                                        type="text"
                                        id="loginemailorphone"
                                        name="emailorphone"
                                        ref={register({required: "This field is required"})}
                                        placeholder="Enter your email or phone number"
                                        className="form-control-lg form-control"
                                    />
                                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="loginpass">
                                        Password
                                    </label>
                                </div>
                                <div className="form-control-wrap">
                                    <input
                                        type="password"
                                        id="loginpass"
                                        name="password"
                                        ref={register({required: "This field is required"})}
                                        placeholder="Enter your password"
                                        className="form-control-lg form-control"
                                    />
                                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button size="lg" className="btn-block" type="submit" color="primary">
                                    {loading ? <Spinner size="sm" color="light"/> : "Log in"}
                                </Button>
                            </FormGroup>
                        </Form>
                        <div className="form-note-s2 text-center pt-4 d-flex justify-content-between">
                            <Link to={`${process.env.PUBLIC_URL}/auth-signupType`}>Create an account</Link>
                            <Link to={`${process.env.PUBLIC_URL}/auth-forgot`}>Forgot Password</Link>
                        </div>
                    </PreviewCard>
                </Block>
                <AuthFooter/>
            </PageContainer>
        </React.Fragment>
    );
};


const mapStateToProps = (state) => {
    return {
        userinfo: state.userinfoReducer,
    };
};

export default connect(mapStateToProps, {
})(Login);
