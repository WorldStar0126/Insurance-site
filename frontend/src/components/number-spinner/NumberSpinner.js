import React, { useState } from "react";
import { Icon, Button } from "../Component";
import { connect } from "react-redux";
import { setPremiumCnt, setPlanCnt, setAmountCnt} from "../../actions/tutorials";
import { isPropsEqual } from "@fullcalendar/core";

// { max, min, step, outline, color, defaultVal }
const NSComponent = ({defaultVal, ...props}) => {

  const [value, setValue] = useState(defaultVal);
  
  const addVal = (n) => {
    props.setPremiumCnt(value + n);
    setValue(value + n);
  };
  
  const reduceVal = (n) => {
    if(value > 0){
      props.setPremiumCnt(value - n);
      setValue(value - n);
    }
  };
  
  return (
    <div className="form-control-wrap number-spinner-wrap">
      {" "}
      <Button
        color="primary"
        disabled={value < 0 ? true : false}
        className="btn-icon number-spinner-btn number-minus"
        onClick={() => reduceVal(1)}
      >
        <Icon name="minus"></Icon>
      </Button>{" "}
      <input
        type="number"
        className="form-control number-spinner"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // max={max}
        // min={min}
      />{" "}
      <Button
        // outline={outline ? true : false}
        color="primary"
        // disabled={value === max ? true : false}
        className="btn-icon number-spinner-btn number-plus"
        onClick={() => addVal(1)}
      >
        <Icon name="plus"></Icon>
      </Button>{" "}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps,{
  setPremiumCnt,
  setPlanCnt,
  setAmountCnt
})(NSComponent);