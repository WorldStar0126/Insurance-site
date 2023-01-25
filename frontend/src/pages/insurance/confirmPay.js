import {BlockBetween, BlockHead, BlockHeadContent, BlockTitle} from "../../components/block/Block";
import React, {useState} from "react";
import Content from "../../layout/content/Content";
import {connect} from "react-redux";
import {Button, Icon} from "../../components/Component";
import {Link} from "react-router-dom";

const ConfirmPay = (props) => {

    const [paymentType, setPaymentType] = useState(0);

    const redirectPayPage = () => {


        if (document.getElementById('btnOnlyIconRadio1').checked) {

            if (document.getElementById('btnRadio1').checked) {
                window.location.href = 'https://paystack.com/pay/wrk5yct0be';
            } else if (document.getElementById('btnRadio2').checked) {
                alert('peach payment');
            } else if (document.getElementById('btnRadio3').checked) {
                alert('stich.money');
            }

        } else if (document.getElementById('btnOnlyIconRadio2').checked) {

        } else if (document.getElementById('btnOnlyIconRadio3').checked) {

        } else if (document.getElementById('btnOnlyIconRadio4').checked) {

        }


    }

    return (
        <React.Fragment>
            <Content>
                <div className="main-manage-content billing-manage-content">
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    Confirm & Pay
                                </BlockTitle>
                            </BlockHeadContent>
                            <BlockHeadContent>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                </div>
                <div className="manage-content" >
                    <div>
                        <ul className="custom-control-group m-2">
                            <li>
                                <div className="custom-control custom-radio custom-control-pro no-control" color="primary">
                                    <input type="radio" className="custom-control-input" id="btnOnlyIconRadio1" name="radio-input"/>
                                    <label className="custom-control-label" htmlFor="btnOnlyIconRadio1">
                                        Debit / Credit card
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-radio custom-control-pro no-control">
                                    <input type="radio" className="custom-control-input" id="btnOnlyIconRadio2" name="radio-input"/>
                                    <label className="custom-control-label" htmlFor="btnOnlyIconRadio2">
                                        Bank Account
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-radio custom-control-pro no-control">
                                    <input type="radio" className="custom-control-input" id="btnOnlyIconRadio3" name="radio-input"/>
                                    <label className="custom-control-label" htmlFor="btnOnlyIconRadio3">
                                        e-Wallet
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-radio custom-control-pro no-control">
                                    <input type="radio" className="custom-control-input" id="btnOnlyIconRadio4" name="radio-input"/>
                                    <label className="custom-control-label" htmlFor="btnOnlyIconRadio4">
                                        By Cash
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="custom-control-group m-3">
                            <li>
                                <div className="custom-control custom-radio custom-control-sm">
                                    <input type="radio" className="custom-control-input" id="btnRadio1" name="radio-pay"/>
                                    <label className="custom-control-label" htmlFor="btnRadio1">
                                        Paystack
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-radio custom-control-sm">
                                    <input type="radio" className="custom-control-input" id="btnRadio2" name="radio-pay"/>
                                    <label className="custom-control-label" htmlFor="btnRadio2">
                                        Peach Payment
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div className="custom-control custom-radio custom-control-sm">
                                    <input type="radio" className="custom-control-input" id="btnRadio3" name="radio-pay"/>
                                    <label className="custom-control-label" htmlFor="btnRadio3">
                                        Stich.Money
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div style={{marginLeft:'3rem'}}>
                        <Button color={'primary'} size={'lg'} className={'btn-large'}
                                onClick={() => {redirectPayPage();}}>
                            Confirm & Pay
                        </Button>
                    </div>
                </div>
            </Content>
        </React.Fragment>
    );

}


const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps,{

})(ConfirmPay);