import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "../../layout/head/Head";
import { Form, FormGroup, Spinner, Input} from "reactstrap";
import {
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  Button,
  ReactDataTable
} from "../../components/Component";
import Nouislider from "nouislider-react";
import { useForm } from "react-hook-form";
import { DataTableData, dataTableColumns, dataTableColumns11, TableColumns_allpolicy} from "../../pages/components/table/TableData";
import Content from "../../layout/content/Content";

const ViewAllPolicies = (props) => {
  const [rangeValue, setRangeValue] = useState([10, 50]);

  const rangeChange = (e) => {
    setRangeValue(e);
  }

  return (
    <React.Fragment>
      <Head title="App Messages"></Head>
      <Content>
        <div className="main-manage-content policy-manage-content view-policies-page">
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                View All Policies
                </BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <div className="view-policy-content policy-view-page">
            <div className="policy-info">
              <Form className="is-alter">
                <div className="sub-group">
                  <div className="sub-form d-flex">
                    <FormGroup className="d-flex">
                      <label htmlFor="default-4" className="form-label">
                        Lookup Policy Name
                      </label>
                      <div className="form-control-wrap">
                        <div className="form-control-select">
                          <Input type="select" name="select" id="default-4" placeholder="Select Category">
                            <option value="default_option">Default Option</option>
                            <option value="option_select_name">Option select name</option>
                            <option value="option_select_name">Option select name</option>
                          </Input>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex">
                      <label htmlFor="default-4" className="form-label">
                        Lookup Product Name
                      </label>
                      <div className="form-control-wrap">
                        <div className="form-control-select">
                          <Input type="select" name="select" id="default-4" placeholder="Select Category">
                            <option value="default_option">Default Option</option>
                            <option value="option_select_name">Option select name</option>
                            <option value="option_select_name">Option select name</option>
                          </Input>
                        </div>
                      </div>
                    </FormGroup>
                  </div>
                  <div className="sub-form d-flex">
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Lookup Company Name
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          <option value="default_option">Default Option</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Lookup By Category
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          <option value="default_option">Default Option</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  </div>
                  <div className="price-filter d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Price Range
                    </label>
                    <Nouislider
                        className="form-range-slider"
                        accessibility
                        connect={true}
                        start={[10, 50]}
                        tooltips={true}
                        step={1}
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
                </div>
              </Form>
            </div>
            <div className="">
              <ReactDataTable data={DataTableData} columns={TableColumns_allpolicy} expandableRows pagination className="view-allpolicy-table"/> 
            </div>
          </div>
        </div>
      </Content>
      
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps,{
})(ViewAllPolicies);

