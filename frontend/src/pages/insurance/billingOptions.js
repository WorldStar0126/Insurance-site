import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup,
        Spinner, Label, Input, Modal, ModalBody, ModalHeader,} from "reactstrap";
import {
  ManageCardTable,
  ManageAccountTable,
  ManageEwalletTable,
  PaymentTable,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
} from "../../components/Component";
import FilterDropDown from "../../layout/insurance/product-manage/FilterDropDown";
import SortDropDown from "../../layout/insurance/product-manage/SortDropDown";
import { useForm } from "react-hook-form";

import { getBankAccount } from "../../actions/tutorials";

let sessiontoken = sessionStorage.getItem("token");
const BillingOptons = (props) => {
  
  useEffect(() => {
    props.getBankAccount(sessiontoken);
  }, [])

  const [collapseView, setCollapseView] = useState(true);
  const [collapseManage, setCollapseManage] = useState(true);

  const toggleView = () => {
    setCollapseView(!collapseView);
  }
  const toggleManage = () => {
    setCollapseManage(!collapseManage);
  }
 
  const [sm, updateSm] = useState(false);
 
  const [errorVal, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (formData) => {
    setLoading(true);
  };

  return (
    <React.Fragment>
      
      <Head title="App Messages"></Head>
      <Content>
        <div className="main-manage-content billing-manage-content">
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                  Billing Options
                </BlockTitle>
              </BlockHeadContent>
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                  <Button
                    className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                    onClick={() => updateSm(!sm)}
                  >
                    <Icon name="more-v" />
                  </Button>
                  
                  <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <FilterDropDown/>
                      </li>
                      <li>
                        <SortDropDown/>
                      </li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>View all products</span>
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <div className="payment-table-collapse submain-collapse" onClick={toggleView} style={{ marginBottom: '1rem' }}><span className="icon ni ni-chevron-down"></span>All Payment Options </div>
          <Collapse isOpen={collapseView}>
            <div className="payment-table" >
              <Card className="card-bordered card-preview">
                <PaymentTable/>
              </Card>
            </div>
          </Collapse>
          <div className="manage-payment-collapse submain-collapse mt-5" onClick={toggleManage} style={{ marginBottom: '1rem' }}><span className="icon ni ni-chevron-down"></span>Manage Payment Options </div>
          <Collapse isOpen={collapseManage}>
            <div className="manage-content" >
              <Card className="card-bordered card-preview">
                <div className="mana-card mana-item">
                  <ManageCardTable/>
                </div>
                <div className="mana-account mana-item">
                  <ManageAccountTable/>
                </div>
                <div className="mana-wallet mana-item">
                  <ManageEwalletTable/>
                </div>
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
    bankaccounts: state.bankaccountReducer,
  };
};

export default connect(mapStateToProps,{
  getBankAccount
})(BillingOptons);

