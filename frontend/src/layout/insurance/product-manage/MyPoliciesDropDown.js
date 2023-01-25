import React from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Icon, Button } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const MyPoliciesDropDown = () => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" href="#dropdown" onClick={(ev) => ev.preventDefault()} className="nk-quick-nav-icon">
        <Button color="" className="btn-icon">
            <Icon name="users"></Icon>
            <span>My Policies</span>
        </Button>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">View my policies</span>
            
        </div>
        <div className="dropdown-body">
          
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(MyPoliciesDropDown);
