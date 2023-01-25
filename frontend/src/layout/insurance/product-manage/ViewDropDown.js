import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, Form, FormGroup, Spinner } from "reactstrap";
import { Icon, Button } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

const ViewDropDown = () => {
  const { errors, register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = (formData) => {
    setLoading(true);
  };

  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" href="#dropdown" onClick={(ev) => ev.preventDefault()} className="nk-quick-nav-icon">
        <Button color="" className="btn-icon">
            <Icon name="eye"></Icon>
            <span>View</span>
        </Button>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl view-dropdown">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">View as a user</span>
            
        </div>
        <div className="dropdown-body">
        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
          <FormGroup>
            <div className="form-control-wrap d-flex">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  User Name <span className="red">*</span>
                </label>
              </div>
              <input
                type={"text"}
                id="title"
                name="title"
                ref={register({ required: "This field is required" })}
                placeholder="Enter user's name"
                className={`form-control-lg form-control is-hidden company-name item-name`}
              />
              {errors.passnew && (
                <span className="invalid">{errors.passnew.message}</span>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <div className="form-control-wrap d-flex">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  User Email Id <span className="red">*</span>
                </label>
              </div>
              <input
                type={"text"}
                id="initials"
                name="initials"
                ref={register({ required: "This field is required" })}
                placeholder="Enter user's email id"
                className={`form-control-lg form-control is-hidden company-name item-name`}
              />
              {errors.passnew && (
                <span className="invalid">{errors.passnew.message}</span>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <Button
              size="lg"
              className="btn-large"
              type="submit"
              color="primary"
            >
              {loading ? <Spinner size="sm" color="light" /> : "Import Information"}
            </Button>
          </FormGroup>
        </Form>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(ViewDropDown);
