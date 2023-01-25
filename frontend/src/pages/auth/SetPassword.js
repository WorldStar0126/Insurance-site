import React, {useState} from "react";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {Form, FormGroup} from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import http from "../../http-common";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const {errors, register, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);
    const onFormSubmit = (formData) => {

        let path = window.location.href;
        let substr = '/auth-active?token=';
        let token = path.slice(path.indexOf(substr) + substr.length, path.length);

        http.post(`/auth/set_password`
            , {email: formData.email, password: formData.password}, {
                headers: {token: token}
            }).then((res) => {
            if (res.data.status) {
                setLoading(false);
                window.location.href = '/auto-login';
            } else {
                setLoading(false);
                Swal.fire({
                    title: res.data.message,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });
            }
        }).catch(error => {
            setLoading(false);
            Swal.fire({
                title: "Please enter correct Email.",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        });
    }

    return (
        <React.Fragment>
            <Head title="Forgot-Password"/>
            <PageContainer>
                <Block className="nk-block-middle nk-auth-body  wide-xs">
                    <div className="brand-logo pb-4 text-center">
                        <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                        </Link>
                    </div>
                    <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                        <BlockHead>
                            <BlockContent>
                                <BlockTitle tag="h5">Your account activated.</BlockTitle>
                                <BlockDes>
                                </BlockDes>
                            </BlockContent>
                        </BlockHead>
                        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                            <FormGroup>
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    ref={register({required: "This field is required"})}
                                    placeholder="Enter your email address"
                                />
                                {errors.name && <span className="invalid">{errors.name.message}</span>}
                            </FormGroup>
                            <FormGroup>
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    id="password"
                                    name="password"
                                    ref={register({required: "This field is required"})}
                                    placeholder="Enter your password"
                                />
                                {errors.name && <span className="invalid">{errors.name.message}</span>}
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" size="lg" className="btn-block" type="submit">
                                    Set Password
                                </Button>
                            </FormGroup>
                        </Form>
                    </PreviewCard>
                </Block>
                <AuthFooter/>
            </PageContainer>
        </React.Fragment>
    );
};
export default ResetPassword;
