import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Button from "../../button/Button";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
import {
  Icon,
} from "../../Component";
import { useForm } from "react-hook-form";

import {
  getCategory,
  getSubCategory,
  AddSubCategory,
  updateSubCategory,
  DeleteSubCategory
} from "../../../actions/tutorials";

const ManageSubcategoryTable = (props) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [collapseSubcategory, setCollapseSubcategory] = useState(false);
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [mySubCategoryList, setMySubCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {
    setLoading(true);
    
    var catid = document.querySelectorAll(".select-cat")[0].value;
    var c_name = formData.subcatename.trim(); 
    
    if(c_name == "" || catid == 0){
      Swal.fire({
        title: "Please enter correct information (category or subcategory name).",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    else{
      if(updateStatus == true){
        Swal.fire({
          title: "Are you sure to update this subcategory?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.updateSubCategory(updateId, catid, c_name);
              setUpdateStatus(false);
              props.getSubCategory();
              // Swal.fire("Updated!", "subcategory has been updated.", "success");
            }
        });
        
      }else{
        Swal.fire({
          title: "Are you sure to add new subcategory?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.AddSubCategory(catid, c_name);
              props.getSubCategory();
              // Swal.fire("Added!", `${c_name} has been added.`, "success");
            }
        });
      }
    }
  };

  // getCategory();
  
  useEffect(() => {
    setMyCategoryList(props.categorylist);
  }, [props])
  
  // getSubCategory();
  
  useEffect(() => {
    setMySubCategoryList(props.subcategorylist);
    if(props.subcategorylist.length > 0 && props.subcategorylist[0].length > 0 ){
      document.querySelectorAll(".table-subcat")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-subcat")[0].style.display = "table";
    }
  }, [props])
  
  const editSubCat = () => {

  }

  const changeIcon = (classname) => {
    if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
      document.querySelectorAll(classname)[0].classList.remove("ni-plus");
      document.querySelectorAll(classname)[0].classList.add("ni-minus");
    }else{
      document.querySelectorAll(classname)[0].classList.remove("ni-minus");
      document.querySelectorAll(classname)[0].classList.add("ni-plus");
    }
  }
  const toggleSubcategory = () => {
    setCollapseSubcategory(!collapseSubcategory);
    changeIcon(".subcategory-status");
  }

  const updateSubCategory = (id, catid, currentname) => {
    document.querySelectorAll(".subcat-name")[0].focus();
    document.querySelectorAll(".select-cat")[0].value = catid;
    document.querySelectorAll(".subcat-name")[0].value = currentname;
    setUpdateStatus(true);
    setUpdateId(id);
  }

  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(mySubCategoryList.length > 0){
      mySubCategoryList[0].map((item, index)=>{
        var id = "subcatcheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.c_name;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete ${selectName}?` : `Are you sure to delete these ${selectCnt} subcategories?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(mySubCategoryList.length > 0){
              mySubCategoryList[0].map((item, index)=>{
                var id = "subcatcheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeleteSubCategory(item.id);
                }
        
              })
            }
            props.getSubCategory();
            document.getElementById("subcatcheckall").checked = false;
            mySubCategoryList[0].map((item, index)=>{
              var id = "subcatcheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "subcategory has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select subcategory to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
  }

  const selectAll = () => {
    if(document.getElementById("subcatcheckall").checked){
      if(mySubCategoryList.length > 0){
        mySubCategoryList[0].map((item, index)=>{
          var id = "subcatcheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(mySubCategoryList.length > 0){
        mySubCategoryList[0].map((item, index)=>{
          var id = "subcatcheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("subcatcheckall").checked = false;
    }
  }

  return (
    <Fragment>
      <div className="manage-collapse mana-subcategory-collapse" onClick={toggleSubcategory}>ADD/MANAGE SUB CATEGORIES<span className="item-status subcategory-status icon ni ni-plus"></span><span className="category-cnt count">{mySubCategoryList.length > 0 ? mySubCategoryList[0].length : 0}<span>subcategories added</span></span></div>
      <Collapse isOpen={collapseSubcategory}>
        <div className="subcategory-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="sub-group d-flex">
                <FormGroup className="d-flex">
                  <label htmlFor="default-4" className="form-label">
                    Category <span className="red">*</span>
                  </label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <Input type="select" name="select" id="default-4" placeholder="Select Category" className="select-cat">
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
                <FormGroup>
                  <div className="form-control-wrap d-flex">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Sub Category <span className="red">*</span>
                      </label>
                    </div>
                    <input
                      type={"text"}
                      id="subcateName"
                      name="subcatename"
                      ref={register({ required: "This field is required" })}
                      placeholder="Enter Sub Category"
                      className={`subcat-name form-control-lg form-control is-hidden company-name item-name`}
                    />
                    {errors.subcatename && (
                      <span className="invalid">{errors.subcatename.message}</span>
                    )}
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
                    // editSubCat();
                  }}
                >
                  {"Save"}
                </Button>          
                      
              </FormGroup>
            </Form>
            <table className={`table table-tranx table-subcat`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="subcatcheckall" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">CATEGORY NAME</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">SUB CATEGORY NAME</span>
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
                {mySubCategoryList.length > 0 ? (mySubCategoryList[0].map((item, index) => {
                      return (
                        <tr key={index} className="tb-tnx-item">
                          <td className="tb-tnx-id checkbox-filed">
                            <div className="tb-tnx-desc">
                                <Input type="checkbox" name="check"  id={"subcatcheck"+item.id} onChange={()=>{selectone("subcatcheck"+item.id)}}></Input>
                            </div>
                          </td>
                          <td className="tb-tnx-id">
                            <a
                              href="#id"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              {
                                myCategoryList.length > 0 ? (myCategoryList[0].map((itemCat, index) => {
                                  return(
                                    itemCat.id == item.n_catid ? (<span key={index}>{itemCat.c_name}</span>)
                                    : ""
                                  )
                                })) : (<></>)
                              }
                            </a>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{item.c_name}</span>
                            </div>
                          </td>
                          <td className="btn-group">
                            <div>
                              <Button color="" className="btn-icon" onClick={() => { updateSubCategory(item.id, item.n_catid, item.c_name)}}>
                                  <span>Edit</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })) : (
                      <></>
                    )}
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
    categorylist: state.categoryReducer,
    subcategorylist: state.subcategoryReducer,
  };
};

export default connect(mapStateToProps, {
  getCategory,
  getSubCategory,
  AddSubCategory,
  updateSubCategory,
  DeleteSubCategory
})(ManageSubcategoryTable);