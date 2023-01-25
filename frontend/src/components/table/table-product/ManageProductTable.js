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
  getCategory, getCompany,getSubCategory, getProduct, getProductView, AddProduct, UpdateProduct, DeleteProduct
} from "../../../actions/tutorials";
export const ManageProductTable = (props) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [myCompanyList, setMyCompanyList] = useState([]);
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [mySubCategoryList, setMySubCategoryList] = useState([]);
  const [myProductList, setMyProductList] = useState([]);
  const [collapseProduct, setCollapseProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {
    setLoading(true);

    let productname = formData.productname.trim();
    let companyid = parseInt(document.querySelectorAll(".select-pro-company")[0].value);
    let catid = parseInt(document.querySelectorAll(".select-pro-cat")[0].value);
    let subcatid = parseInt(document.querySelectorAll(".select-pro-subcat")[0].value);
    if(productname == "" || companyid == 0 || catid == 0 || subcatid == 0){
      Swal.fire({
        title: "Please enter correct information.(product, company, category and sub category name)",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    else{
      if(updateStatus == true){
        Swal.fire({
          title: "Are you sure to update this product?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.UpdateProduct(updateId, productname, companyid, catid, subcatid);
              props.getProduct();
              props.getProductView();
              setUpdateStatus(false);
              // Swal.fire("Updated!", "product has been updated.", "success");
            }
        });
      }else{
        Swal.fire({
          title: "Are you sure to add new product?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.AddProduct(productname, companyid, catid, subcatid);
              props.getProduct();
              props.getProductView(); 
              // Swal.fire("Added!", `${productname} has been added.`, "success");
            }
        });
      }
  
    }
  };
  const [selectCat, setselectCat] = useState(1);
  const changeCat = () => {
    setselectCat(document.querySelectorAll(".select-pro-cat")[0].value);
  }

  // getCompany();

  useEffect(() => {
    setMyCompanyList(props.companylist);
  }, [props])
  
  // getCategory();
  
  useEffect(() => {
    setMyCategoryList(props.categorylist);
    setselectCat(myCategoryList.length > 0 && myCategoryList[0].length > 0 ? myCategoryList[0][0].id : 0);
  }, [props])

  useEffect(() => {
    setselectCat(myCategoryList.length > 0 && myCategoryList[0].length > 0 ? myCategoryList[0][0].id : 0);
  }, [myCategoryList])

  // getSubCategory();
  
  useEffect(() => {
    setMySubCategoryList(props.subcategorylist);
  }, [props])
  
  // getProduct();
  
  useEffect(() => {
    setMyProductList(props.productlist);
    if(props.productlist.length > 0 && props.productlist[0].length > 0 ){
      document.querySelectorAll(".table-product")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-product")[0].style.display = "table";
    }
  }, [props])

  const changeIcon = (classname) => {
    if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
      document.querySelectorAll(classname)[0].classList.remove("ni-plus");
      document.querySelectorAll(classname)[0].classList.add("ni-minus");
    }else{
      document.querySelectorAll(classname)[0].classList.remove("ni-minus");
      document.querySelectorAll(classname)[0].classList.add("ni-plus");
    }
  }
  const toggleProduct = () => {
    setCollapseProduct(!collapseProduct);
    changeIcon(".product-status");
  }

  const editProduct = () => {
    
  }

  const updateProduct = (id, name, companyid, catid, subcatid) => {
    document.querySelectorAll(".product-name")[0].focus();
    document.querySelectorAll(".product-name")[0].value = name;
    document.querySelectorAll(".select-pro-company")[0].value = companyid;
    document.querySelectorAll(".select-pro-cat")[0].value = catid;
    document.querySelectorAll(".select-pro-subcat")[0].value = subcatid;
    setUpdateStatus(true);
    setUpdateId(id);
  }
  
  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myProductList.length > 0){
      myProductList[0].map((item, index)=>{
        var id = "productcheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.c_productname;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete ${selectName}?` : `Are you sure to delete these ${selectCnt} products?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myProductList.length > 0){
              myProductList[0].map((item, index)=>{
                var id = "productcheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeleteProduct(item.id);
                }
        
              })
            }
            props.getProduct();
            document.getElementById("productcheckall").checked = false;
            myProductList[0].map((item, index)=>{
              var id = "productcheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "product has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select product to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
  }
  const selectAll = () => {
    if(document.getElementById("productcheckall").checked){
      if(myProductList.length > 0){
        myProductList[0].map((item, index)=>{
          var id = "productcheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myProductList.length > 0){
        myProductList[0].map((item, index)=>{
          var id = "productcheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("productcheckall").checked = false;
    }
  }
  return (
    <Fragment >
      <div id="productPanel" className="manage-collapse mana-product-collapse" onClick={toggleProduct}>ADD/MANAGE PRODUCT<span className="item-status product-status icon ni ni-plus"></span><span className="product-cnt count">{myProductList.length > 0 ? myProductList[0].length : 0}<span>products added</span></span></div>
      <Collapse isOpen={collapseProduct} className="product-collapse">
        <div className="product-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <div className="sub-group d-flex">
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Product Name <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="productName"
                        name="productname"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter product name"
                        className={`product-name form-control-lg form-control is-hidden item-name`}
                      />
                      {errors.productname && (
                        <span className="invalid">{errors.productname.message}</span>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Insurance Company <span className="red">*</span>
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Company" className="select-pro-company">
                          <option value={0}>-- select --</option>
                          {myCompanyList.length > 0 ? (myCompanyList[0].map((item,index)=>{
                            return(
                              <option key={index} value={item.id}>{item.c_name}</option>
                            )
                          })) : ""}
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  
                </div>
                <div className="sub-group d-flex">
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Category <span className="red">*</span>
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category" className="select-pro-cat" onChange={(ev) => changeCat()}>
                          <option value={0}>-- select --</option>
                          {myCategoryList.length > 0 ? (myCategoryList[0].map((item,index)=>{
                            return(
                              <option key={index} value={item.id}>{item.c_name}</option>
                            )
                          })) : ""}
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      SubCategory <span className="red">*</span>
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category" className="select-pro-subcat">
                          <option value={0}>-- select --</option>
                          {mySubCategoryList.length > 0 ? (mySubCategoryList[0].map((item,index)=>{
                            {
                              return(
                                selectCat == item.n_catid ? (<option key={index} value={item.id}>{item.c_name}</option>)
                                : ""
                              )
                            }
                          })) : ""}
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
                    onClick={() => {
                      // editProduct();
                    }}
                  >
                    {"Save"}
                  </Button>          
                        
                </FormGroup>
            </Form>
            <table className={`table table-tranx table-product`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="productcheckall" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">PRODCUT NAME</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">INSURANCE COMPANY</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">CATEGORY</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">SUB CATEGORY</span>
                  </th>
                  <th className="tb-tnx-id more-detail">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                          <Icon name="more-v"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#delete"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  deleteItem();
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
                {myProductList.length > 0 ? (myProductList[0].map((item, index) => {
                      return (
                        <tr key={index} className="tb-tnx-item">
                          <td className="tb-tnx-id checkbox-filed">
                            <div className="tb-tnx-desc">
                                <Input type="checkbox" name="check" id={"productcheck"+item.id} onChange={()=>{selectone("productcheck"+item.id)}} ></Input>
                            </div>
                          </td>
                          <td className="tb-tnx-id">
                            <a
                              href="#id"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              <span id={"productname"+item.id}>{item.c_productname}</span>
                            </a>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{
                                myCompanyList.length > 0 ? (myCompanyList[0].map((itemCompany, index) => {
                                  return(
                                    itemCompany.id == item.n_companyid ? (<span key={index} id={"companyname"+item.id}>{itemCompany.c_name}</span>)
                                    : ""
                                  )
                                })) : (<></>)
                              }</span>
                            </div>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{
                                myCategoryList.length > 0 ? (myCategoryList[0].map((itemCat, index) => {
                                  return(
                                    itemCat.id == item.n_catid ? (<span key={index} id={"categoryname"+item.id}>{itemCat.c_name}</span>)
                                    : ""
                                  )
                                })) : (<></>)
                              }</span>
                            </div>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{
                                mySubCategoryList.length > 0 ? (mySubCategoryList[0].map((itemSubCat, index) => {
                                  return(
                                    itemSubCat.id == item.n_subcatid ? (<span key={index} className="subcat-desc" id={"subcatname"+item.id}>{itemSubCat.c_name}</span>)
                                    : ""
                                  )
                                })) : (<></>)
                              }</span>
                            </div>
                          </td>
                          <td className="btn-group">
                            <div>
                              <Button color="" className="btn-icon" onClick={() => { updateProduct(item.id, item.c_productname, item.n_companyid, item.n_catid, item.n_subcatid)}}>
                                  <span>Edit</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })) : (<></>)}
              </tbody>
            </table>
          </Card>
        </div>
      </Collapse>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    companylist: state.companyReducer,
    categorylist: state.categoryReducer,
    subcategorylist: state.subcategoryReducer,
    productlist: state.productReducer
  };
};

export default connect(mapStateToProps, {
  getCompany,
  getCategory,
  getSubCategory,
  getProduct,
  getProductView,
  AddProduct,
  UpdateProduct,
  DeleteProduct
})(ManageProductTable);