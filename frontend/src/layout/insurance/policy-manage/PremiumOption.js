import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown,Form, FormGroup, Spinner, Input } from "reactstrap";
import { sortAndDeduplicateDiagnostics } from "typescript";
import {
    Icon,
    Button
  } from "../../../components/Component";
import { getPolicyById, setPlanCnt, setAmountCnt, deletePlanCnt} from "../../../actions/tutorials";

const PremiumOption = (props) => {
  
  const [planCnt, setPlanCnt] = useState(1);
  const [amountCnt, setAmountCnt] = useState(1);
  const [editStatus, setEditStatus] = useState(false);
  const [myPolicyById, setMyPolicyById] = useState([]);
  const [myCoverTypeList, setMyCoverTypeList] = useState([]);

  useEffect(() => {
    setMyPolicyById(props.policybyId);
    if(props.policybyId[0]){
        if (props.policybyId[0].premiumoptions.length < props.num + 1) {
            props.policybyId[0].premiumoptions[props.num] = {coverid:0, n_planfor: 0, coveroptions: [{n_minage: 0, n_maxage: 0, n_premiumamount: 0}]};
        } 
        let amountCnt = props.policybyId[0].premiumoptions[props.num].coveroptions.length;
        setAmountCnt(amountCnt);
    } else {
        let data = [{premiumoptions: []}];
        for (let i = 0; i < props.num + 1; i++) {
            data[0].premiumoptions[i] = {coverid:0, n_planfor: 0, coveroptions: [{n_minage: 0, n_maxage: 0, n_premiumamount: 0}]};
        }
        setMyPolicyById(data);
    }

  }, [props.policybyId])

  useEffect(() => {
    if(props.policybyId && props.policybyId[0]){
        changeCoverType(props.policybyId[0].premiumoptions[props.num].planfor);
    }
  }, [])

  const addAmount = () =>{
    setAmountCnt(amountCnt + 1);
    setEditStatus(true)
  }

  const deleteAmount = () => {
    setAmountCnt(amountCnt - 1);
  }

  const changeCheckBox = () => {

  }

  const changeCoverType = (id) => {
    let membertype = "";
    let mem_type_list = [];
    for(let i = 0; i < props.covertypelist[0].length; i ++){
        if(props.covertypelist[0][i].id == id){
            membertype = props.covertypelist[0][i].n_member_type;
        }
    }
    let membertype_array = membertype.split(",");
    for(let i = 0; i < membertype_array.length; i ++){
        mem_type_list.push(parseInt(membertype_array[i]))
    }
    setMyCoverTypeList(mem_type_list)
  }
  return (
    <div className="premium-option">
        <h4 className="option-title">Premium Option # {props.num + 1}</h4>
        <div className="plan">
            <div className="plan-head-group">
                <div className={`plan-head plan-head${props.num + 1} d-flex`} >
                    <div className="plan-head-content d-flex">
                        <FormGroup className="d-flex paying-schedule">
                            <label htmlFor="default-4" className="form-label">
                                Select Cover Amount
                            </label>
                            <div className="form-control-wrap">
                            <div className="form-control-select">
                                {
                                    myPolicyById[0] ? 
                                        <Input type="select" name="select" id={`selectcover${props.num + 1}`} placeholder="Select Category">
                                            <option value={0}>-- select --</option>
                                            { 
                                                props.coveramountlist.length > 0 ? props.coveramountlist[0].map((item, index)=>{
                                                    return (
                                                        <option value={item.id} key={index} selected={
                                                            parseInt(myPolicyById[0].premiumoptions[props.num].coverid) == item.id ? "selected" : ""
                                                            }>{item.n_coveramount}</option>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Input>
                                    :
                                        <Input type="select" name="select" id={`selectcover${props.num + 1}`} placeholder="Select Category">
                                            { 
                                                props.coveramountlist.length > 0 ? props.coveramountlist[0].map((item, index)=>{
                                                    return (
                                                        <option value={item.id} key={index}>{item.n_coveramount}</option>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Input>
                                }
                            </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex paying-schedule">
                            <label htmlFor="default-4" className="form-label">
                                OPTION NAME
                            </label>
                            <div className="form-control-wrap">
                            <div className="form-control-select">
                                {
                                    myPolicyById[0] ? 
                                        <Input 
                                            type="select" 
                                            name="select" 
                                            id={`planfor${props.num + 1}`}  placeholder="Select Category"
                                            onChange={(e)=>changeCoverType(e.target.value)}
                                        >
                                            <option value={0}>-- select --</option>
                                            {
                                                props.covertypelist.length > 0 ? props.covertypelist[0].map((item, index)=>{
                                                    return (
                                                        <option value={item.id} key={index} selected={
                                                            parseInt(myPolicyById[0].premiumoptions[props.num].planfor) == item.id ? "selected" : ""
                                                        }>{item.c_covertype}</option>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Input>
                                    : 
                                    <Input 
                                            type="select" 
                                            name="select" 
                                            id={`planfor${props.num + 1}`}  placeholder="Select Category">
                                            <option value={0}>-- select --</option>
                                            {
                                                props.covertypelist.length > 0 ? props.covertypelist[0].map((item, index)=>{
                                                    return (
                                                        <option value={item.id} key={index}>{item.c_covertype}</option>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Input>
                                }
                            </div>
                            </div>
                        </FormGroup>
                        <FormGroup className="d-flex paying-schedule">
                            <label htmlFor="default-4" className="form-label">
                                MEMBER TYPE
                            </label>
                            <div className="form-control-wrap">
                            <div className="form-control-select">
                                {
                                    myPolicyById[0] ? 
                                        <Input 
                                            type="select" 
                                            name="select" 
                                            id={`member_type_${props.num + 1}`}  placeholder="Select Category">
                                            <option value={0}>-- select --</option>
                                            {
                                                props.membertypelist.length > 0 ? props.membertypelist.map((item, index)=>{
                                                    for(let i = 0; i < myCoverTypeList.length; i ++){
                                                        if(myCoverTypeList[i] == item.id){
                                                            return (
                                                                <option value={item.id} key={index}
                                                                    selected={parseInt(myPolicyById[0].premiumoptions[props.num].coveroptions[0].n_member_type) == item.id ? "selected" : ""}>
                                                                {item.membertype}
                                                                </option>
                                                            )
                                                        }
                                                    }
                                                })
                                                : <></>
                                            }
                                        </Input>
                                    : 
                                    <Input 
                                            type="select" 
                                            name="select" 
                                            id={`planfor${props.num + 1}`}  placeholder="Select Category">
                                            <option value={0}>-- select --</option>
                                            {
                                                props.covertypelist.length > 0 ? props.covertypelist[0].map((item, index)=>{
                                                    return (
                                                        <option value={item.id} key={index}>{item.c_covertype}</option>
                                                    )
                                                })
                                                : <></>
                                            }
                                        </Input>
                                }
                            </div>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div className="plan-head-group">
                    <div className={`plan-head plan-head${props.num + 1} d-flex`} >
                        <div className="plan-head-content d-flex">
                            <FormGroup className="d-flex paying-schedule">
                                <label htmlFor="default-4" className="form-label">
                                    MAX # OF MEMBERS
                                </label>
                                <div className="form-control-wrap">
                                    {
                                        myPolicyById[0] ? 
                                        <input type="number" id={`maxnum${props.num + 1}`} className="form-control" min="0" max="100" step="1"
                                            defaultValue={myPolicyById[0].premiumoptions[props.num].coveroptions[0].n_maxnum}/>
                                        :
                                        <input type="number" id={`maxnum${props.num + 1}`} className="form-control" min="0" max="100" step="1"/>

                                    }
                                </div>
                            </FormGroup>
                            <FormGroup className="d-flex paying-schedule">
                                <div className="checkbox-group d-flex isact-check">
                                    <label htmlFor={`check_member_${props.num + 1}`} className="form-label">
                                        DOES PREMIUM CHANGES ON ADDITION PER MEMBER
                                    </label>
                                    {
                                        myPolicyById[0] ? 
                                        <Input type="checkbox" id={`check_member_${props.num + 1}`} style={{marginTop: '11px'}}
                                            defaultChecked={myPolicyById[0].premiumoptions[props.num].coveroptions[0].n_premium_change == 1 ? true : false} onChange={changeCheckBox}/>
                                        :
                                        <Input type="checkbox" id={`check_member_${props.num + 1}`} style={{marginTop: '11px'}}/>

                                    }
                                    
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div className="plan-amount-group">
            {
                myPolicyById[0] ?
                    Array.from(Array(amountCnt)).map((i, index) => 
                    <div className={`plan-amount plan-amount${props.num+1} d-flex`} key={index}>
                        <Button color="" className="plus-btn" onClick={() => addAmount()}>
                            <Icon name="plus-round"></Icon>
                        </Button>
                        <div className="plan-amount-content d-flex">
                            <FormGroup>
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                        MIN AGE
                                    </label>
                                </div>
                                <input type="number" id={`minage${props.num+1}-${index+ 1}`} name="companyname"
                                    min="0" max="100" step="1" className="form-control"
                                    defaultValue={!editStatus? parseInt(myPolicyById[0].premiumoptions[props.num].coveroptions[index].n_minage) : 0 }/>
                            </div>
                            </FormGroup>
                            <FormGroup>
                            <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                        MAX AGE
                                    </label>
                                </div>
                                <input type="number" id={`maxage${props.num+1}-${index+ 1}`} className="form-control"
                                    name="companyname" min="0" max="100" step="1"
                                    defaultValue={!editStatus? parseInt(myPolicyById[0].premiumoptions[props.num].coveroptions[index].n_maxage)  : 0 }/>
                            </div>
                            </FormGroup>  
                            <div className="premium-amount">
                            <FormGroup>
                                <div className="form-control-wrap d-flex">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="default-01">
                                    Premium amount
                                    </label>
                                </div>
                                <input type={"text"} id={`premiumamount${props.num+1}-${index+ 1}`} name="companyname"
                                    defaultValue={!editStatus? parseInt(myPolicyById[0].premiumoptions[props.num].coveroptions[index].n_premiumamount) : 0 }
                                    placeholder="Enter Amount" className={`form-control-lg form-control is-hidden item-name amount-input`}/>
                                </div>
                            </FormGroup>
                            </div>
                            <Button color="" onClick={() => deleteAmount()}>
                            <Icon name="trash"></Icon>
                            </Button>
                        </div>
                    </div>
                    )
                : ""
            }
            </div>
            
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      premium: state.premiumReducer,
      coveramountlist: state.coveramountReducer,
      covertypelist: state.covertypeReducer,
      membertypelist: state.getsubdataReducer.membertype,
      policybyId: state.policybyIdReducer,
    };
  };
  
  export default connect(mapStateToProps,{
    setPlanCnt,
    deletePlanCnt,
    getPolicyById
  })(PremiumOption);
  