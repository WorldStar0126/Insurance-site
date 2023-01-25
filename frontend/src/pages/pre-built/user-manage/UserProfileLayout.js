import React, {useState, useEffect} from "react";
import Content from "../../../layout/content/Content";
import UserProfileRegularPage from "./UserProfileRegular";
import UserProfileSettingPage from "./UserProfileSetting";
import UserProfileNotificationPage from "./UserProfileNotification";
import UserProfileActivityPage from "./UserProfileActivity";
import UserProfileSocial from "./UserProfileSocials";
import UserProfilePasswordPage from "./UserProfilePassword";
import UserProfilePackagePage from "./UserProfilePackage";
import {Route, Switch, Link} from "react-router-dom";
import {Icon, UserAvatar} from "../../../components/Component";
import {findUpper} from "../../../utils/Utils";
import {Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle} from "reactstrap";

const email = sessionStorage.getItem('email');
const username = sessionStorage.getItem('username');
const avatar = sessionStorage.getItem('avatar');

const UserProfileLayout = () => {

    const [sm, updateSm] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [profileName, setProfileName] = useState("Abu Bin Ishtiak");

    // function to change the design view under 990 px
    const viewChange = () => {
        if (window.innerWidth < 990) {
            setMobileView(true);
        } else {
            setMobileView(false);
            updateSm(false);
        }
    };

    useEffect(() => {
        viewChange();
        window.addEventListener("load", viewChange);
        window.addEventListener("resize", viewChange);
        document.getElementsByClassName("nk-header")[0].addEventListener("click", function () {
            updateSm(false);
        });
        return () => {
            window.removeEventListener("resize", viewChange);
            window.removeEventListener("load", viewChange);
        };
    }, []);

    return (
        <React.Fragment>
            <Content>
                <Card className="card-bordered">
                    <div className="card-aside-wrap">
                        <div
                            className={`card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg ${
                                sm ? "content-active" : ""
                            }`} style={{width: '200px'}}>
                            <div className="card-inner-group">
                                <div className="card-inner">
                                    <div className="user-card">
                                        {
                                            avatar.includes('/null') ? <UserAvatar text={findUpper(username)}/>
                                                : <UserAvatar text={findUpper(username)} image={avatar}/>
                                        }
                                        <div className="user-info">
                                            <span className="lead-text">{username}</span>
                                            <span className="sub-text">{email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner p-0">
                                    <ul className="link-list-menu">
                                        <li onClick={() => updateSm(false)}>
                                            <Link to={`${process.env.PUBLIC_URL}/user-profile-regular`}
                                                  className={window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-regular` ? "active" : ""}>
                                                <Icon name="user-fill-c"/>
                                                <span>Manage Your Profile</span>
                                            </Link>
                                        </li>
                                        <li onClick={() => updateSm(false)}>
                                            <Link to={`${process.env.PUBLIC_URL}/user-profile-kyc`}
                                                  className={window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-kyc` ? "active" : ""}>
                                                <Icon name="camera"></Icon>
                                                <span>Upload KYC</span>
                                            </Link>
                                        </li>
                                        <li onClick={() => updateSm(false)}>
                                            <Link to={`${process.env.PUBLIC_URL}/user-profile-esign`}
                                                  className={window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-esign` ? "active" : ""}>
                                                <Icon name="tron"></Icon>
                                                <span>Manage e-Signature</span>
                                            </Link>
                                        </li>
                                        <li onClick={() => updateSm(false)}>
                                            <Link to={`${process.env.PUBLIC_URL}/user-profile-password`}
                                                  className={window.location.pathname === `${process.env.PUBLIC_URL}/user-profile-password` ? "active" : ""}>
                                                <Icon name="lock-alt-fill"></Icon>
                                                <span>Change Password</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card-inner card-inner-lg" style={{padding: 10}}>
                            {sm && mobileView && <div className="toggle-overlay" onClick={() => updateSm(!sm)}></div>}
                            <Switch>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-regular`}
                                    render={() => <UserProfileRegularPage updateSm={updateSm} sm={sm}
                                                                          setProfileName={setProfileName}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-notification`}
                                    render={() => <UserProfileNotificationPage updateSm={updateSm} sm={sm}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-activity`}
                                    render={() => <UserProfileActivityPage updateSm={updateSm} sm={sm}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-setting`}
                                    render={() => <UserProfileSettingPage updateSm={updateSm} sm={sm}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-social`}
                                    render={() => <UserProfileSocial updateSm={updateSm} sm={sm}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-password`}
                                    render={() => <UserProfilePasswordPage updateSm={updateSm} sm={sm}/>}
                                ></Route>
                                <Route
                                    exact
                                    path={`${process.env.PUBLIC_URL}/user-profile-package`}
                                    render={() => <UserProfilePackagePage updateSm={updateSm} sm={sm}/>}
                                ></Route>
                            </Switch>
                        </div>
                    </div>
                </Card>
            </Content>
        </React.Fragment>
    );
};

export default UserProfileLayout;
