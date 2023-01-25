import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup,
        Spinner, Label, Input, Modal, ModalBody, ModalHeader,} from "reactstrap";
import {
  ProductTable,
  ManageCompanyTable,
  ManageCategoryTable,
  ManageSubcategoryTable,
  ManageProductTable,
  ManagePolicyTable,
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
  ViewPolicyTable,
  ReactDataTable
} from "../../components/Component";
import { policyData, dataTableColumns3 } from "../../pages/components/table/TableData";
import FilterDropDown from "../../layout/insurance/product-manage/FilterDropDown";
import SortDropDown from "../../layout/insurance/product-manage/SortDropDown";
import { useForm } from "react-hook-form";
import { AddCompany, getCompany, updateCompany, AddCategory, getCategory, sortData, getProductView} from "../../actions/tutorials";
import { DataTableData, dataTableColumns, dataTableColumns11} from "../../pages/components/table/TableData";
const ProductManage = (props) => {
  const [collapseView, setCollapseView] = useState(true);
  const [collapseManage, setCollapseManage] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [myProductList, setMyProductList] = useState([]);
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

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setMyProductList(props.productlist);
    var productsData = [];
    var temp = {}
    if(props.productlist.length > 0 && props.productlist[0].length > 0){
      var cnt = 0
        props.productlist[0].map((item, index)=> {
        temp.id = item.id;
        temp.c_productname = item.c_productname;
        temp.company = item.company;
        temp.category = item.category;
        temp.subcat = item.subcat;
        temp.policycnt = 5;
        productsData.push({...temp});
        cnt ++;
      })
      setTableData(productsData);
    }
  }, [props])

  return (
    <React.Fragment>
      
      <Head title="App Messages"></Head>
      <Content>
        <div className="main-manage-content product-manage-content">
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                  Product Management
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
                                    toggle();
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
          <ProductTable />
          <div className="manage-product-collapse submain-collapse" onClick={toggleManage} style={{ marginBottom: '1rem' }}><span className="icon ni ni-chevron-down"></span>Manage Products </div>
          <Collapse isOpen={collapseManage}>
            <div className="manage-content" >
              <Card className="card-bordered card-preview">
                <div className="mana-company mana-item">
                  <ManageCompanyTable/>
                </div>
                <div className="mana-category mana-item">
                  <ManageCategoryTable/>
                </div>
                <div className="mana-subcategory mana-item">
                  <ManageSubcategoryTable/>
                </div>
                <div className="mana-product mana-item">
                  <ManageProductTable/>
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      </Content>

      <Modal isOpen={modal} toggle={toggle} className="modal-md">
        <ModalHeader toggle={toggle}>View All products</ModalHeader>
        <ModalBody>
          <div className="policy-info">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="sub-group">
                <div className="sub-form d-flex">
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
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Lookup Category Name
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
                    Lookup SubCategory Name
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
                
                
                <FormGroup>
                    <Button
                      size="lg"
                      className="btn-large"
                      type="submit"
                      color="primary"
                    >
                      {loading ? <Spinner size="sm" color="light" /> : "Search"}
                    </Button>    
                </FormGroup>
              </div>
            </Form>
          </div>
          <div className="">
            <ReactDataTable data={tableData} columns={dataTableColumns11} expandableRows pagination className="view-product-table"/> 
          </div>
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.companyReducer,
    productlist: state.productViewReducer,
    updateStatus: state.updateReducer
  };
};

export default connect(mapStateToProps,{
  AddCompany,
  getCompany,
  updateCompany,
  AddCategory,
  getCategory,
  sortData,
  getProductView,
})(ProductManage);

