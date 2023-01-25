import React from "react";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Icon, Button } from "../../../components/Component";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const SortDropDown = () => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" href="#dropdown" onClick={(ev) => ev.preventDefault()} className="nk-quick-nav-icon">
        <Button color="" className="btn-icon">
            <Icon name="sort-line"></Icon>
            <span>Sort</span>
        </Button>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl">
        <div className="dropdown-head">
          <span className="sub-title nk-dropdown-title">Aplly Filters</span>
            
        </div>
        <div className="dropdown-body">
          
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default withRouter(SortDropDown);
