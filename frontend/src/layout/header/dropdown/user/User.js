import React, {useState} from "react";
import {DropdownToggle, DropdownMenu, Dropdown} from "reactstrap";
import {Icon} from "../../../../components/Component";
import {LinkList, LinkItem} from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import image from "../../../../images/avatar/c-sm.jpg";
import http from "../../../../http-common";
import {Link} from "react-scroll"
import {findUpper} from "../../../../utils/Utils";

let session_usertype = sessionStorage.getItem("usertype");
let email = sessionStorage.getItem('email');
let username = sessionStorage.getItem('username');
let avatar = sessionStorage.getItem('avatar');

const User = () => {

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prevState) => !prevState);

    const handleSignout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("loggedAt");
        sessionStorage.removeItem("usertype");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");
        localStorage.removeItem("accessToken");
        window.location.href = '/auth-login';
    };

    return (
        <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
            <DropdownToggle
                tag="a"
                href="#toggle"
                className="dropdown-toggle"
                onClick={(ev) => {
                    ev.preventDefault();
                }}
            >
                <div className="user-avatar">
                    {
                        avatar.includes('/null') ? <UserAvatar text={findUpper(username)}/>
                            : <UserAvatar text={findUpper(username)} image={avatar} size={10}/>
                    }
                </div>
                {
                    session_usertype == 'User' ? <p className="user-noti badge badge-dim badge-danger"
                                                    style={{marginLeft: '10px', display: 'none'}}>{session_usertype}</p>
                        : <p className="user-noti badge badge-dim badge-danger"
                             style={{marginLeft: '4px', display: 'none'}}>{session_usertype}</p>
                }
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
                <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card sm">
                        <div className="user-avatar">
                            {
                                avatar.includes('/null') ? <UserAvatar text={findUpper(username)}/>
                                : <UserAvatar text={findUpper(username)} image={avatar}/>
                            }
                        </div>
                        <div className="user-info">
                            <span className="lead-text">{username}</span>
                            <span className="sub-text">{email}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
                            Edit Profile
                        </LinkItem>
                        <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}
                                  style={{display: 'none'}}>
                            Account Setting
                        </LinkItem>
                        <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}
                                  style={{display: 'none'}}>
                            Login Activity
                        </LinkItem>
                    </LinkList>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <LinkItem to="#" onClick={handleSignout} style={{cursor: 'pointer'}}>
                            <Icon name="signout"></Icon>
                            <span>Sign Out</span>
                        </LinkItem>
                    </LinkList>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
};

export default User;
