import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown,Form, FormGroup, Spinner, Input } from "reactstrap";

import { Icon, Button, RSelect } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { productSelect } from "../../../pages/components/forms/SelectData";
const FilterDropDown = () => {
  const [sm, updateSm] = useState(false);
 
  const [errorVal, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (formData) => {
    setLoading(true);
  };

  const closeDropDown = () => {
    document.querySelectorAll(".filter-dropdown-menu")[0].classList.remove("show");
  }
  return (
    <UncontrolledDropdown className="filter-drop">
      <DropdownToggle tag="a" href="#dropdown" onClick={(ev) => ev.preventDefault()} className="nk-quick-nav-icon">
        <Button color="" className="btn-icon">
            <Icon name="filter"></Icon>
            <span>Filters</span>
        </Button>
      </DropdownToggle>
      <DropdownMenu right className="filter-dropdown-menu dropdown-menu-xl">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">Apply Filters</span>
          <Button
            size="lg"
            className="icon ni ni-cross-sm"
            type="submit"
            color=""
            onClick={closeDropDown}
          ></Button>
        </div>
        <div className="dropdown-body">
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-control-wrap">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Product Name 
                    </label>
                  </div>
                  <RSelect options={productSelect} placeholder="Enter/Select Product Name"/>
                </div>
              </FormGroup>
              <FormGroup className="">
                <label htmlFor="default-4" className="form-label">
                  Company Name 
                </label>
                <div className="form-control-wrap">
                  <RSelect options={productSelect} placeholder="Enter/Select Company Name"/>
                </div>
              </FormGroup>
              <FormGroup className="">
                <label htmlFor="default-4" className="form-label">
                  Category Name
                </label>
                <div className="form-control-wrap">
                  <RSelect options={productSelect} placeholder="Enter/Select Sub Category Name"/>
                </div>
              </FormGroup>
              <FormGroup className="">
                <label htmlFor="default-4" className="form-label">
                  Sub Category Name
                </label>
                <div className="form-control-wrap">
                  <RSelect options={productSelect} placeholder="Enter/Select Company Name"/>
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  size="lg"
                  className="btn-large"
                  type="submit"
                  color="primary"
                >
                  {loading ? <Spinner size="sm" color="light" /> : "Apply Filters"}
                </Button>
              </FormGroup>
              {/* <FormGroup>
                <div className="form-control-wrap">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                    Policy Name
                    </label>
                  </div>
                  <input
                    type={"text"}
                    id="companyName"
                    name="companyname"
                    placeholder="Enter policy name"
                    className={`form-control-lg form-control is-hidden company-name item-name`}
                  />
                  {errors.passnew && (
                    <span className="invalid">{errors.passnew.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-control-wrap">
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Product Name
                    </label>
                  </div>
                  <input
                    type={"text"}
                    id="companyName"
                    name="companyname"
                    placeholder="Enter product name"
                    className={`form-control-lg form-control is-hidden company-name item-name`}
                  />
                  {errors.passnew && (
                    <span className="invalid">{errors.passnew.message}</span>
                  )}
                </div>
              </FormGroup>
              <div className="type-amount d-flex">
                <FormGroup>
                  <div className="form-control-wrap">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Type
                      </label>
                    </div>
                    <input
                      type={"text"}
                      id="companyName"
                      name="companyname"
                      placeholder="Enter type"
                      className={`form-control-lg form-control is-hidden company-name item-name`}
                    />
                    {errors.passnew && (
                      <span className="invalid">{errors.passnew.message}</span>
                    )}
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="form-control-wrap">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Amount
                      </label>
                    </div>
                    <input
                      type={"text"}
                      id="companyName"
                      name="companyname"
                      placeholder="Enter amount"
                      className={`form-control-lg form-control is-hidden company-name item-name`}
                    />
                    {errors.passnew && (
                      <span className="invalid">{errors.passnew.message}</span>
                    )}
                  </div>
                </FormGroup>
              </div> */}
              
          </Form>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(FilterDropDown);
