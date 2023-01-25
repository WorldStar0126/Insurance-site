import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Card, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {Block, Icon,} from "../../../components/Component";
import http from "../../../http-common";
import PersonalInfo from "../../../layout/insurance/user-profile/PersonalInfo";
import AddressInfo from "../../../layout/insurance/user-profile/AddressInfo";
import PreviewInfo from "../../../layout/insurance/user-profile/PreviewInfo";
import classnames from "classnames";

let sessiontoken = sessionStorage.getItem("token");

const UserProfileRegularPage = ({sm, updateSm, setProfileName}) => {


    const [subActiveTab, setSubActiveTab] = useState("1");

    const togglesub = (tab) => {
        if (subActiveTab !== tab) setSubActiveTab(tab);
    };

    return (
        <React.Fragment>
            <Block>
                <div className="manage-content">
                    <div className="mana-member mana-item">
                        <div className="manage-content contact-main">
                            <Card className="card-bordered card-preview">
                                <Nav tabs className="mt-n3 custom-tab">
                                    <NavItem className="subnav mt-3">
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({active: subActiveTab === "1"})}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                togglesub("1");
                                            }}
                                        >
                                            <Icon name="user-circle" className="mr-1"/>
                                            Your Personal Info
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="subnav mt-3">
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({active: subActiveTab === "2"})}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                togglesub("2");
                                            }}
                                        >
                                            <Icon name="home" className="mr-1"/>
                                            Your Address Info
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="subnav mt-3">
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({active: subActiveTab === "3"})}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                togglesub("3");
                                            }}
                                        >
                                            <Icon name="camera" className="mr-1"></Icon>
                                            Preview Your Saved Info
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={subActiveTab}>
                                    <TabPane tabId="1">
                                        <PersonalInfo/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <AddressInfo/>
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <PreviewInfo/>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </Block>
        </React.Fragment>
    );
};


const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(UserProfileRegularPage);

