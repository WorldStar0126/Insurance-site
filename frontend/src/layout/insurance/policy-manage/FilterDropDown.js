import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown,Form, FormGroup, Spinner, Input } from "reactstrap";

import { Icon, Button, RSelect } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { productSelect } from "../../../pages/components/forms/SelectData";
import Nouislider from "nouislider-react";

const FilterDropDown = () => {
  const [sm, updateSm] = useState(false);
  const [rangeValue, setRangeValue] = useState([10, 50]);
  const [errorVal, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (formData) => {
    setLoading(true);
  };

  const closeDropDown = () => {
    document.querySelectorAll(".filter-dropdown-menu")[0].classList.remove("show");
  }

  const rangeChange = (e) => {
    setRangeValue(e);
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
                      Policy Name 
                    </label>
                  </div>
                  <RSelect options={productSelect} placeholder="Enter/Select Policy Name"/>
                </div>
              </FormGroup>
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
                  <RSelect options={productSelect} placeholder="Enter/Select Insurance Company Name"/>
                </div>
              </FormGroup>
              <FormGroup className="">
                <label htmlFor="default-4" className="form-label">
                  Category Name
                </label>
                <div className="form-control-wrap">
                  <RSelect options={productSelect} placeholder="Enter/Select Category Name"/>
                </div>
              </FormGroup>
              <div className="price-filter filter-range mb-5">
                  <label htmlFor="default-4" className="form-label mb-3">
                    Price Range
                  </label>
                  <Nouislider
                      className="form-range-slider"
                      accessibility
                      connect={true}
                      tooltips={true}
                      step={1}
                      start={[10, 50]}
                      range={{
                        min: 0,
                        max: 100,
                      }}
                      onSlide={(e)=>rangeChange(e)}
                  ></Nouislider>
                  <div className="reange-value d-flex">
                    <span>{`min : ${rangeValue[0]}`}</span>
                    <span className="ml-3 mr-3">-</span>
                    <span>{`max : ${rangeValue[1]}`}</span>
                  </div>
              </div>        
              <FormGroup>
                <Button
                  size="lg"
                  className="btn-large"
                  type="submit"
                  color="primary"
                >
                  {"Search"}
                </Button>
              </FormGroup>
              
          </Form>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(FilterDropDown);
