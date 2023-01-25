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
  getcoverAmount,
  AddcoverAmount,
  UpdatecoverAmount,                                                  
  DeletecoverAmount
} from "../../../actions/tutorials";

const ManageCoverAmountTable = (props) => {  
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [myCoverAmountList, setMyCoverAmountList] = useState([]);
  const [collapseCover, setcollapseCover] = useState(true);
  // getcoverAmount();

  useEffect(() => {
    setMyCoverAmountList(props.coveramountlist);
    if(props.coveramountlist.length > 0 && props.coveramountlist[0].length > 0 ){
      document.querySelectorAll(".table-cover")[0].style.display = "block";
    }else{
      document.querySelectorAll(".table-cover")[0].style.display = "table";
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
  const toggleCover = () => {
    setcollapseCover(!collapseCover);
    changeIcon(".cover-status");
  }
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (formData) => {
    setLoading(true);
    var name = formData.coverAmount;
    if(updateStatus == true){
      Swal.fire({
        title: "Are you sure to update this Cover amount?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
          if (result.isConfirmed) {
            props.UpdatecoverAmount(updateId, parseInt(name));
            props.getcoverAmount();
            setUpdateStatus(false);
          }
      });
      
    }else if(updateStatus == false){
      Swal.fire({
        title: "Are you sure to add new Cover amount?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
      }).then((result) => {
          if (result.isConfirmed) {
            props.AddcoverAmount(parseInt(name));  
            props.getcoverAmount();
          }
      });
    }
    
    setLoading(false);
  };

  const editCompany = () => {
    
  } 
  const UpdatecoverAmount = (id, currentname) => {
    document.querySelectorAll(".edit-cover-amount")[0].focus();
    document.querySelectorAll(".edit-cover-amount")[0].value = currentname;
    setUpdateStatus(true);
    setUpdateId(id);
  }

  const deleteItem = () => {
    var deleteStatus = false;
    var selectCnt = 0;
    var selectName = "";
    var confirmTitle = "";
    if(myCoverAmountList.length > 0){
      myCoverAmountList[0].map((item, index)=>{
        var id = "covercheck"+item.id;
        if(document.getElementById(id).checked == true){
          deleteStatus = true;
          selectCnt ++;
          selectName = item.n_coveramount;
        }
      })
    }
    if(deleteStatus){

      confirmTitle = selectCnt == 1 ? `Are you sure to delete Cover amount ${selectName}?` : `Are you sure to delete these ${selectCnt} Cover amounts?`;

      Swal.fire({
        title: confirmTitle,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.isConfirmed) {
            if(myCoverAmountList.length > 0){
              myCoverAmountList[0].map((item, index)=>{
                var id = "covercheck"+item.id;
                if(document.getElementById(id).checked == true){
                  props.DeletecoverAmount(item.id);
                }
        
              })
            }
            props.getcoverAmount();
            document.getElementById("covercheckall").checked = false;
            myCoverAmountList[0].map((item, index)=>{
              var id = "covercheck"+item.id;
              document.getElementById(id).checked = false;
            })
            Swal.fire("Deleted!", "Cover amount has been deleted.", "success");
          }
      });
    }
    else{
      Swal.fire({
        title: "Please select Cover amount to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    setUpdateStatus(false);
    
  }

  const selectAll = () => {
    if(document.getElementById("covercheckall").checked){
      if(myCoverAmountList.length > 0){
        myCoverAmountList[0].map((item, index)=>{
          var id = "covercheck"+item.id;
          document.getElementById(id).checked = true;
        })
      }
    }else{
      if(myCoverAmountList.length > 0){
        myCoverAmountList[0].map((item, index)=>{
          var id = "covercheck"+item.id;
          document.getElementById(id).checked = false;
        })
      }
    }
  }
  const selectone = (id) => {
    if(document.getElementById(id).checked == false){
      document.getElementById("covercheckall").checked = false;
    }
  }

  return (
    <Fragment>
      <div className="manage-collapse mana-cover-collapse" onClick={toggleCover}>ADD/MANAGE COVER AMOUNT<span className="item-status cover-status icon ni ni-minus"></span><span className="company-cnt count">{myCoverAmountList.length > 0 ?myCoverAmountList[0].length : 0}<span>covers added</span></span></div>
      <Collapse isOpen={collapseCover} className="manage-coveramount">
        <div className="cover-edit" >
          <Card className="card-bordered card-preview">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-control-wrap d-flex">
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="default-01">
                        Add Cover Amount <span className="red">*</span>
                      </label>
                    </div>
                    <input
                      type={"number"}
                      id="coverAmount"
                      name="coverAmount"
                      ref={register({ required: "This field is required" })}
                      placeholder="Enter Cover Amount"
                      className={`form-control-lg form-control is-hidden edit-cover-amount item-name`}
                    />
                    {errors.coverAmount && <span className="invalid">{errors.coverAmount.message}</span>}
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
            <table className={`table table-tranx table-cover`}>
              <thead>
                <tr className="tb-tnx-head">
                  <th className="tb-tnx-id">
                    <div className="tb-tnx-desc">
                        <Input type="checkbox" name="check" id="covercheckall" className="checkall" onChange={selectAll}></Input>
                    </div>
                  </th>
                  <th className="tb-tnx-id">
                    <span className="">cover amount</span>
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
                { myCoverAmountList.length > 0 ? (myCoverAmountList[0].map((item, index) => {
                      return (
                        <tr key={index} className="tb-tnx-item">
                          <td className="tb-tnx-id checkbox-filed">
                            <div className="tb-tnx-desc">
                                <Input type="checkbox" name="check" id={"covercheck"+item.id} onChange={()=>{selectone("covercheck"+item.id)}}></Input>
                            </div>
                          </td>
                          <td className="tb-tnx-id">
                            <a
                              href="#id"
                              onClick={(ev) => {
                                ev.preventDefault();
                              }}
                            >
                              <span>{item.n_coveramount}</span>
                            </a>
                          </td>
                          <td className="btn-group">
                            <div>
                              <Button color="" className="btn-icon" onClick={() => { UpdatecoverAmount(item.id, item.n_coveramount)}}>
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
    coveramountlist: state.coveramountReducer,
  };
};

export default connect(mapStateToProps, {
  getcoverAmount,
  AddcoverAmount,
  UpdatecoverAmount,
  DeletecoverAmount
})(ManageCoverAmountTable);
