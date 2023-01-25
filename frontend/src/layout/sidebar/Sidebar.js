import React, { useState } from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Logo from "../logo/Logo";
import Menu from "../menu/Menu";
import Toggle from "./Toggle";
import {FormGroup, Spinner, Modal, ModalBody, ModalHeader} from "reactstrap";
import {
  Button, Icon
} from "../../components/Component";

import ContactManage from "../../pages/insurance/contactManage"
import { Link } from "react-router-dom";

const Sidebar = ({ fixed, theme, className, sidebarToggle, mobileView, ...props }) => {
  const [collapseSidebar, setSidebar] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  const toggleCollapse = () => {
    setSidebar(!collapseSidebar);
  };

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const [modalContact, setModalContact] = useState(false);
  const toggleContact = () => {
    setModalContact(!modalContact);
  };

  const classes = classNames({
    "nk-sidebar": true,
    "nk-sidebar-fixed": fixed,
    "is-compact": collapseSidebar,
    "has-hover": collapseSidebar && mouseEnter,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });

  return (
    <React.Fragment>
      <div className={classes}>
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-menu-trigger">
            <Toggle className="nk-nav-toggle nk-quick-nav-icon d-xl-none mr-n2" icon="arrow-left" click={sidebarToggle} />
            <Toggle
              className={`nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex ${
                collapseSidebar ? "compact-active" : ""
              }`}
              click={toggleCollapse}
              icon="menu"
            />
          </div>
          <div className="nk-sidebar-brand">
            <Logo />
          </div>
        </div>
        <div className="nk-sidebar-content" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SimpleBar className="nk-sidebar-menu">
            <Menu sidebarToggle={sidebarToggle} mobileView={mobileView}/>
            <FormGroup>
              <Button color="" className="btn-contact" 
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleContact();
                  }}>
                <Icon name="plus"></Icon>
                <Link to={'/contact'}>Add contact</Link>
              </Button>``
            </FormGroup>
          </SimpleBar>
        </div>
      </div>

    </React.Fragment>
    
  );
};
export default Sidebar;
