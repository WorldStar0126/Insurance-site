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
  getcoverType,
  AddcoverType,
  UpdatecoverType,
  DeletecoverType
} from "../../../actions/tutorials";

const ManageOptionTypeTable = (props) => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [collapseOptiontype, setcollapseOptiontype] = useState(false);
  const [myCoverTypeList, setMyCoverTypeList] = useState([]);
  const [myMemberTypeList, setMyMemberTypeList] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {

    setLoading(true);
    //calculate selected member type
    var c_name = formData.optionName;
    var selectmem =  "";
    for(var i = 1; i <= 6; i ++){
      if(document.querySelectorAll(`.memcheck${i}`)[0].checked){
        selectmem = `${selectmem},${i}`;
      }      
    }
    selectmem = selectmem.substring(1);
    
    //In case of no select any member type
    if(selectmem == "" || c_name.trim() == ""){
      Swal.fire({
        title: "Please enter correct information(Option name or Member type).",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    else{
      // In case of update cover type
      if(updateStatus == true){
        Swal.fire({
          title: `Are you sure to update this Option Type?`,
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.UpdatecoverType(updateId, c_name, selectmem);
              setUpdateStatus(false);
              props.getcoverType();
            }
        });
        
      }// In case of add cover type
      else{
        Swal.fire({
          title: "Are you sure to add new Option Type?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, add it!",
        }).then((result) => {
            if (result.isConfirmed) {
              props.AddcoverType(c_name, selectmem);
              props.getcoverType();
            }
        });
      }
    }
  };
  
  useEffect(() => {
    setMyMemberTypeList(props.membertypelist);
    setMyCoverTypeList(props.covertypelist);
    if(props.covertypelist.length > 0 && props.covertypelist[0].length > 0 ){
      document.querySelectorAll(".table-optiontype")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-optiontype")[0].style.display = "table";
    }
  }, [props])
  
  const getMembers = (members) => {
    var memberArray = members.split(",")
    var memberstring = ""
    if(myMemberTypeList && myMemberTypeList.length > 0 ){
      for(var i = 0; i < memberArray.length; i ++){
        memberstring += myMemberTypeList[parseInt(memberArray[i])-1].membertype;
        if(i != (memberArray.length - 1))
          memberstring += ", "  
      }
    }
    
    return memberstring
  }
  const editCoverType = () => {   

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
  const toggleOptiontype = () => {
    setcollapseOptiontype(!collapseOptiontype);
    changeIcon(".optiontype-status");
  }

  const UpdatecoverType = (id, currentname, membertypes) => {
    for(let i = 0; i < 6; i ++){
      document.querySelectorAll(`.memcheck${i+1}`)[0].checked = false;
    }
    document.querySelectorAll(".option-name")[0].focus();
    // document.querySelectorAll(".select-optiontype")[0].value = catid;
    document.querySelectorAll(".option-name")[0].value = currentname;
    let member_types = membertypes.split(",");
    console.log(member_types)
    for(let i = 0; i < member_types.length; i ++){
      document.querySelectorAll(`.memcheck${parseInt(member_types[i])}`)[0].checked = true;
    }
    setUpdateStatus(true);
    setUpdateId(id);
  }

  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myCoverTypeList.length > 0){
      myCoverTypeList[0].map((item, index)=>{
        var id = "optiontypecheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.c_covertype;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete this Option Type?` : `Are you sure to delete these ${selectCnt} Option Types?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myCoverTypeList.length > 0){
              myCoverTypeList[0].map((item, index)=>{
                var id = "optiontypecheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeletecoverType(item.id);
                }
        
              })
            }
            props.getcoverType();
            document.getElementById("optiontypecheckall").checked = false;
            myCoverTypeList[0].map((item, index)=>{
              var id = "optiontypecheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "Option Type has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select Option Type to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
  }

  const selectAll = () => {
    if(document.getElementById("optiontypecheckall").checked){
      if(myCoverTypeList.length > 0){
        myCoverTypeList[0].map((item, index)=>{
          var id = "optiontypecheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myCoverTypeList.length > 0){
        myCoverTypeList[0].map((item, index)=>{
          var id = "optiontypecheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("optiontypecheckall").checked = false;
    }
  }

  return (
    <Fragment>
      <div className="manage-collapse mana-optiontype-collapse" onClick={toggleOptiontype}>ADD OPTION TYPE<span className="item-status optiontype-status icon ni ni-plus"></span><span className="optiontype-cnt count">{myCoverTypeList.length > 0 ? myCoverTypeList[0].length : 0}<span>options added</span></span></div>
      <Collapse isOpen={collapseOptiontype}>
        <div className="optiontype-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="sub-group d-flex">
                <FormGroup>
                  <div className="form-control-wrap d-flex">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                      Option Name<span className="red">*</span>
                      </label>
                    </div>
                    <input
                      type={"text"}
                      id="optionName"
                      name="optionName"
                      ref={register({ required: "This field is required" })}
                      placeholder="Select Member Type"
                      className={`option-name form-control-lg form-control is-hidden company-name item-name`}
                    />
                    {errors.optionName && <span className="invalid">{errors.optionName.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup className="d-flex">
                  <label htmlFor="default-4" className="form-label selectmem-label">
                  Select Member Type <span className="red">*</span>
                  </label>
                  <div className="form-control-wrap checkbox-group">
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="mainmemcheck" className="form-label">
                        Main Member
                      </label>
                      <Input type="checkbox" name="check1" id="mainmemcheck" className="memcheck1"></Input>
                    </div>
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="spousecheck" className="form-label">
                        Spouse 
                      </label>
                      <Input type="checkbox" name="check1" id="spousecheck" className="memcheck2"></Input>
                    </div>
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="childrencheck" className="form-label">
                        Children 
                      </label>
                      <Input type="checkbox" name="check1" id="childrencheck" className="memcheck3"></Input>
                    </div>
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="extendfamilycheck" className="form-label">
                        Extended Family
                      </label>
                      <Input type="checkbox" name="check1" id="extendfamilycheck" className="memcheck4"></Input>
                    </div>
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="parentcheck" className="form-label">
                        Parents 
                      </label>
                      <Input type="checkbox" name="check1" id="parentcheck" className="memcheck5"></Input>
                    </div>
                    <div className="checkbox-item d-flex isact-check">
                      <label htmlFor="otherscheck" className="form-label">
                        Others 
                      </label>
                      <Input type="checkbox" name="check1" id="otherscheck" className="memcheck6"></Input>
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
                    editCoverType();
                  }}
                >
                  {"Save"}
                </Button>          
                      
              </FormGroup>
            </Form>
            <table className={`table table-tranx table-optiontype`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="optiontypecheckall" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">option name</span>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">member type</span>
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
                {myCoverTypeList.length > 0 ? (myCoverTypeList[0].map((item, index) => {
                      return (
                        <tr key={index} className="tb-tnx-item">
                          <td className="tb-tnx-id checkbox-filed">
                            <div className="tb-tnx-desc">
                                <Input type="checkbox" name="check"  id={"optiontypecheck"+item.id} onChange={()=>{selectone("optiontypecheck"+item.id)}}></Input>
                            </div>
                          </td>
                          <td className="tb-tnx-id">
                            <a
                              href="#id"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              {item.c_covertype}
                            </a>
                          </td>
                          <td className="tb-tnx-info">
                            <div className="tb-tnx-desc">
                              <span className="title">{getMembers(item.n_member_type)}</span>
                            </div>
                          </td>
                          <td className="btn-group">
                            <div>
                              <Button color="" className="btn-icon" onClick={() => { UpdatecoverType(item.id, item.c_covertype, item.n_member_type)}}>
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
    covertypelist: state.covertypeReducer,
    membertypelist: state.getsubdataReducer.membertype
  };
};

export default connect(mapStateToProps, {
  getcoverType,
  AddcoverType,
  UpdatecoverType,
  DeletecoverType
})(ManageOptionTypeTable);