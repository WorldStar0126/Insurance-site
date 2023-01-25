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
  getCompany,
  AddCompany,
  updateCompany,
  DeleteCompany
} from "../../../actions/tutorials";

const ManageCompanyTable = (props) => {  
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [myCompanyList, setMyCompanyList] = useState([]);
  const [collapseCompany, setCollapseCompany] = useState(true);

  useEffect(() => {
    setMyCompanyList(props.companylist);
    if(props.companylist.length > 0 && props.companylist[0].length > 0 ){
      document.querySelectorAll(".table-company")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-company")[0].style.display = "table";
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
  const toggleCompany = () => {
    setCollapseCompany(!collapseCompany);
    changeIcon(".company-status");
  }
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {
    setLoading(true);
    var name = formData.companyname.trim();
    if(name != ""){
      if(updateStatus == true){
        Swal.fire({
          title: "Are you sure to update this company?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.updateCompany(updateId, name);
              props.getCompany();
              setUpdateStatus(false);
              // Swal.fire("Updated!", "company has been updated.", "success");
            }
        });
        
      }else if(updateStatus == false){
        Swal.fire({
          title: "Are you sure to add new company?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.AddCompany(name);  
              props.getCompany();
              // Swal.fire("Added!", `${name} has been added.`, "success");
            }
        });
      }
      
      setLoading(false);
    }
    else{
      Swal.fire({
        title: "Please enter correct company name.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
  };

  const editCompany = () => {
    
  } 
  const updateCompany = (id, currentname) => {
    document.querySelectorAll(".edit-company-name")[0].focus();
    document.querySelectorAll(".edit-company-name")[0].value = currentname;
    setUpdateStatus(true);
    setUpdateId(id);
  }

  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myCompanyList.length > 0){
      myCompanyList[0].map((item, index)=>{
        var id = "companycheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.c_name;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete ${selectName}?` : `Are you sure to delete these ${selectCnt} companies?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myCompanyList.length > 0){
              myCompanyList[0].map((item, index)=>{
                var id = "companycheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeleteCompany(item.id);
                }
        
              })
            }
            props.getCompany();
            document.getElementById("companycheckall").checked = false;
            myCompanyList[0].map((item, index)=>{
              var id = "companycheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "company has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select company to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
    
  }

  const selectAll = () => {
    if(document.getElementById("companycheckall").checked){
      if(myCompanyList.length > 0){
        myCompanyList[0].map((item, index)=>{
          var id = "companycheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myCompanyList.length > 0){
        myCompanyList[0].map((item, index)=>{
          var id = "companycheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("companycheckall").checked = false;
    }
  }

  return (
    <Fragment>
      <div className="manage-collapse mana-company-collapse" onClick={toggleCompany}>ADD/MANAGE COMPANY<span className="item-status company-status icon ni ni-minus"></span><span className="company-cnt count">{myCompanyList.length > 0 ?myCompanyList[0].length : 0}<span>companies added</span></span></div>
      <Collapse isOpen={collapseCompany}>
        <div className="company-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-control-wrap d-flex">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Company <span className="red">*</span>
                      </label>
                    </div>
                    <input
                      type={"text"}
                      id="companyName"
                      name="companyname"
                      ref={register({ required: "This field is required" })}
                      placeholder="Enter company name"
                      className={`form-control-lg form-control is-hidden edit-company-name item-name`}
                    />
                    {errors.companyname && <span className="invalid">{errors.companyname.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button
                    size="lg"
                    className="btn-large"
                    type="submit"
                    color="primary"
                    // onClick={editCompany}
                  >
                    {"Save"}
                  </Button>
                </FormGroup>
            </Form>
            <table className={`table table-tranx table-company`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="companycheckall" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">COMPANY NAME</span>
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
                { myCompanyList.length > 0 ? (myCompanyList[0].map((item, index) => {
                      return (
                        <tr key={index} className="tb-tnx-item">
                          <td className="tb-tnx-id checkbox-filed">
                            <div className="tb-tnx-desc">
                                <Input type="checkbox" name="check" id={"companycheck"+item.id} onChange={()=>{selectone("companycheck"+item.id)}}></Input>
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
                              <Button color="" className="btn-icon" onClick={() => { updateCompany(item.id, item.c_name)}}>
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
    companylist: state.companyReducer,
  };
};

export default connect(mapStateToProps, {
  getCompany,
  AddCompany,
  updateCompany,
  DeleteCompany
})(ManageCompanyTable);
