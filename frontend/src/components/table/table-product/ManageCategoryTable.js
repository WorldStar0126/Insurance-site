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
  AddCategory,
  updateCategory,
  DeleteCategory
} from "../../../actions/tutorials";

export const ManageCategoryTable = (props) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [collapseCategory, setCollapseCategory] = useState(false);
  const [errorVal, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  useEffect(() => {
    setMyCategoryList(props.categorylist);
    if(props.categorylist.length > 0 && props.categorylist[0].length > 0 ){
      document.querySelectorAll(".table-category")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-category")[0].style.display = "table";
    }
  }, [props]);

  const changeIcon = (classname) => {
    if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
      document.querySelectorAll(classname)[0].classList.remove("ni-plus");
      document.querySelectorAll(classname)[0].classList.add("ni-minus");
    }else{
      document.querySelectorAll(classname)[0].classList.remove("ni-minus");
      document.querySelectorAll(classname)[0].classList.add("ni-plus");
    }
  }
  const toggleCategory = () => {
    setCollapseCategory(!collapseCategory);
    changeIcon(".category-status");
  }

  const editCategory = () => {
    
  }  
  const onFormSubmit = (formData) => {
    var name = formData.categoryname.trim();

    if(name == ""){
      Swal.fire({
        title: "Please enter correct category name.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    else{
      if(updateStatus == true){
        Swal.fire({
          title: "Are you sure to update this category?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.updateCategory(updateId, name);
              setUpdateStatus(false);
              props.getCategory();
              // Swal.fire("Updated!", "category has been updated.", "success");
            }
        });
        
      }else{
        Swal.fire({
          title: "Are you sure to add new category?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.AddCategory(name);  
              props.getCategory();
              // Swal.fire("Added!", `${name} has been added.`, "success");
            }
        });
      }
    }
  };

  const updateCategory = (id, currentname) => {
    document.querySelectorAll(".edit-category-name")[0].focus();
    document.querySelectorAll(".edit-category-name")[0].value = currentname;
    setUpdateStatus(true);
    setUpdateId(id);
  }

  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myCategoryList.length > 0){
      myCategoryList[0].map((item, index)=>{
        var id = "categorycheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.c_name;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete ${selectName}?` : `Are you sure to delete these ${selectCnt} categories?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myCategoryList.length > 0){
              myCategoryList[0].map((item, index)=>{
                var id = "categorycheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeleteCategory(item.id);
                }
        
              })
            }
            props.getCategory();
            
            document.getElementById("categorycheckall").checked = false;
            myCategoryList[0].map((item, index)=>{
              var id = "categorycheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "category has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select category to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);    
  }

  const selectAll = () => {
    if(document.getElementById("categorycheckall").checked){
      if(myCategoryList.length > 0){
        myCategoryList[0].map((item, index)=>{
          var id = "categorycheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myCategoryList.length > 0){
        myCategoryList[0].map((item, index)=>{
          var id = "categorycheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("categorycheckall").checked = false;
    }
  }
  return (
    <Fragment>
      <div className="manage-collapse mana-category-collapse" onClick={toggleCategory}>ADD/MANAGE CATEGORIES<span className="item-status category-status icon ni ni-plus"></span><span className="category-cnt count">{myCategoryList.length > 0 ? myCategoryList[0].length : 0}<span>categories added</span></span></div>
      <Collapse isOpen={collapseCategory}> 
        <div className="category-edit" >
          <Card className="card-bordered card-preview">
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                  <FormGroup>
                    <div className="form-control-wrap d-flex">
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="default-01">
                          Category <span className="red">*</span>
                        </label>
                      </div>
                      <input
                        type={"text"}
                        id="categoryName"
                        name="categoryname"
                        ref={register({ required: "This field is required" })}
                        placeholder="Enter category name"
                        className={`edit-category-name form-control-lg form-control is-hidden category-name item-name`}
                      />
                      {errors.categoryname && (
                        <span className="invalid">{errors.categoryname.message}</span>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      size="lg"
                      className="btn-large"
                      type="submit"
                      color="primary"
                      onClick={editCategory}
                    >
                      {"Save"}
                    </Button>
                  </FormGroup>
              </Form>
              <table className={`table table-tranx table-category`}>
                <thead>
                  <tr className="tb-tnx-head">
                    <th className="tb-tnx-id">
                      <div className="tb-tnx-desc">
                          <Input type="checkbox" name="check" id="categorycheckall" className="checkall" onChange={selectAll}></Input>
                      </div>
                    </th>
                    <th className="tb-tnx-id">
                      <span className="">CATEGORY NAME</span>
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
                  {myCategoryList.length > 0 ? (myCategoryList[0].map((item, index) => {
                        return (
                          <tr key={index} className="tb-tnx-item">
                            <td className="tb-tnx-id checkbox-filed">
                              <div className="tb-tnx-desc">
                                  <Input type="checkbox" name="check" id={"categorycheck"+item.id} onChange={()=>{selectone("categorycheck"+item.id)}}></Input>
                              </div>
                            </td>
                            <td className="tb-tnx-id">
                              <a
                                href="#id"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>{item.c_name}</span>
                              </a>
                            </td>
                            <td className="btn-group">
                              <div>
                                <Button color="" className="btn-icon" onClick={() => { updateCategory(item.id, item.c_name)}}>
                                    <span>Edit</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })): (
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
  };
};

export default connect(mapStateToProps, {
  getCategory,
  AddCategory,
  updateCategory,
  DeleteCategory
})(ManageCategoryTable);