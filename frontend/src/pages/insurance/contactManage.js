import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane, FormGroup, Input, Collapse, Card,
    DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Form} from "reactstrap";
import { PreviewCard, CodeBlock } from "../../components/preview/Preview";
import { connect } from "react-redux";
import MainContactInfo from "../../layout/insurance/contact-manage/MainContactInfo";
import ContactAddressInfo from "../../layout/insurance/contact-manage/ContactAddressInfo";
import ContactUploadIdentify from "../../layout/insurance/contact-manage/ContactUploadIdentify";
import DropFiles from "../../layout/insurance/contact-manage/DropFiles";
import PreviewContactInfo from "../../layout/insurance/contact-manage/PreviewContactInfo";
import ViewContactList from "../../layout/insurance/contact-manage/ViewContactList";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import FilterDropDown from "../../layout/insurance/product-manage/FilterDropDown";
import SortDropDown from "../../layout/insurance/product-manage/SortDropDown";
import { 
    ContactTable, 
    Icon, 
    Button, 
    BlockContent, 
    BlockHead,
    BlockTitle,
    BlockBetween,
    BlockHeadContent } from "../../components/Component";

const ContactManage = (props) => {

    const [sm, updateSm] = useState(false);

    const [collapseView, setCollapseView] = useState(true);
    const [collapseManage, setCollapseManage] = useState(true);
    const [subActiveTab, setSubActiveTab] = useState("1");
    const [contactPageStatus, setContactPageStatus] = useState(1);
    const { contactPage } = props;
    const { errors, register, handleSubmit } = useForm();
    
    const toggleView = () => {
        setCollapseView(!collapseView);
    }
 
    const toggleManage = () => {
        setCollapseManage(!collapseManage);
    }
    
    const togglesub = (tab) => {
        if (subActiveTab != tab) {
            setSubActiveTab(tab);
            setTimeout(() => {
                let tabNav = document.getElementById('contactSubTab').children;
                let tabConent = document.getElementById('contactSubTabContent').children;
            
                for (let i = 0; i < 4; i++) {
                    if (tab == i + 1) {
                        tabNav[i].children[0].classList.remove('nav-link' );
                        tabNav[i].children[0].classList.add('active');
                        tabNav[i].children[0].classList.add('nav-link');
                        tabConent[i].classList.add('active');
                    } else {
                        tabNav[i].children[0].classList.remove('active');
                        tabConent[i].classList.remove('active');
                    } 
                }
            }, 50);
        }
    };

    const ChangeContactPage = (page) => {
        setContactPageStatus(page);
    }

  return (
    <React.Fragment>
        
      <Head title="App Messages"/>
      <Content>
        <div className="main-manage-content contact-manage-content" id="contactPanel">
            <BlockHead size="sm">
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle page tag="h3">
                            Contact Management
                        </BlockTitle>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
            <div className="payment-table-collapse submain-collapse" onClick={toggleView} style={{ marginBottom: '1rem' }}>
                <span className="icon ni ni-chevron-down"></span>Manage Contact
            </div>
            <Collapse isOpen={collapseView}>
                <div className="manage-content contact-main">
                    <Card className="card-bordered card-preview">
                        <div className="mana-card mana-item">
                            <Nav id="contactSubTab" tabs className="mt-n3 custom-tab">
                                <NavItem className="subnav">
                                    <NavLink tag="a" href="#tab" className={classnames({ active: subActiveTab === "1" })}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            togglesub("1");
                                        }}
                                    >
                                        <Icon name="user-circle" className="mr-1"></Icon>
                                        Contact's Personal Info
                                    </NavLink>
                                </NavItem>
                                <NavItem className="subnav">
                                    <NavLink tag="a" href="#tab" className={classnames({ active: subActiveTab === "2" })}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            togglesub("2");
                                        }}
                                    >
                                        <Icon name="home" className="mr-1"></Icon>
                                        Contact's Address Info
                                    </NavLink>
                                </NavItem>
                                <NavItem className="subnav">
                                    <NavLink tag="a" href="#tab" className={classnames({ active: subActiveTab === "3" })}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            togglesub("3");
                                        }}
                                    >
                                        <Icon name="camera" className="mr-1"></Icon>
                                        Contact's Identification
                                    </NavLink>
                                </NavItem>
                                <NavItem className="subnav">
                                    <NavLink tag="a" href="#tab" className={classnames({ active: subActiveTab === "4" })}
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            togglesub("4");
                                        }}
                                    >
                                        <Icon name="eye" className="mr-1"></Icon>
                                        Preview Saved Info
                                    </NavLink>
                                </NavItem>

                            </Nav>
                            <TabContent id="contactSubTabContent" activeTab={subActiveTab}>
                                <TabPane tabId="1">
                                    <MainContactInfo activeTab={subActiveTab}/>                        
                                </TabPane>
                                <TabPane tabId="2">
                                    <ContactAddressInfo activeTab={subActiveTab}/>
                                </TabPane>
                                <TabPane tabId="3">
                                    <ContactUploadIdentify activeTab={subActiveTab}/>
                                </TabPane>
                                <TabPane tabId="4">
                                    <PreviewContactInfo activeTab={subActiveTab}/>
                                </TabPane>
                            </TabContent>
                        </div>
                    </Card>
                </div>
            </Collapse>
            <div className="manage-payment-collapse submain-collapse mt-5" onClick={toggleManage} style={{ marginBottom: '1rem' }}>
                <span className="icon ni ni-chevron-down"></span>View Contact
            </div>
            <Collapse isOpen={collapseManage}>
                <div className="payment-table" >
                    <Card className="card-bordered card-preview">
                        <ViewContactList/>
                    </Card>
                </div>
            </Collapse>
        </div>
      </Content>
    </React.Fragment>
    
  );
};

const mapStateToProps = (state) => {
    return {
      contactPage: state.contactPageReducer,
    };
  };

export default connect(mapStateToProps, {})(ContactManage);
  
