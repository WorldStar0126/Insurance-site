import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Button from "../../button/Button";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
import {
  Icon,
} from "../../Component";
import { useForm } from "react-hook-form";

import {
  
} from "../../../actions/tutorials";
import { interactionSettingsStore } from "@fullcalendar/core";
import { loginData, orderData, transactionData } from "../TableData";
import avata from "../../../images/avatar/c-sm.jpg"

export const ContactTable = ({ action, isCompact, data }) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {
    setLoading(true);
  };
  
  const selectAll = () => {
    
  }
  const selectone = (id) => {
    
  }
  return (
    <Fragment >
        <div className="product-edit" >
          <Card className="card-bordered card-preview">
            <table className={`table table-tranx`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id checkbox-filed">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">NAME</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">AGE</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">RELATIONSHIP</span>
                  </th>
                  <th className="tb-tnx-id more-detail">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#delete"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="trash"></Icon>
                                <span>Delete Selected Items</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionData.data.map((item) => {
                    return (
                        <tr key={item.id} className="tb-tnx-item">
                            <td className="tb-tnx-id checkbox-filed">
                                <div className="tb-tnx-desc">
                                    <Input type="checkbox" name="check" id={"productcheck1"+item.id} onChange={()=>{selectone("productcheck1"+item.id)}} ></Input>
                                </div>
                            </td>
                            <td className="tb-tnx-id name-field">
                                <a
                                href="#id"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                }}
                                >
                                <img src={avata} alt="img"></img>
                                <span>{item.id }</span>
                                </a>
                            </td>
                            <td className="tb-tnx-info ">
                                <div className="tb-tnx-desc">
                                <span className="title">{item.bill}</span>
                                </div>
                            </td>
                            <td className="tb-tnx-info">
                                <div className="tb-tnx-desc">
                                <span className="title">{item.bill}</span>
                                </div>
                            </td>
                            <td className="btn-group">
                                <div>
                                    <Button color="" className="btn-icon">
                                        <span>Edit</span>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    );
                    })}
              </tbody>
            </table>
          </Card>
        </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, {
})(ContactTable);