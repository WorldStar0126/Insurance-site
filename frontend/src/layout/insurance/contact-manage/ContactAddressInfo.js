import React, {Fragment, useEffect, useState, forwardRef} from "react";
import {Form, FormGroup, Input} from "reactstrap";
import {connect} from "react-redux";
import {Icon, Button} from "../../../components/Component";
import {useForm} from "react-hook-form";
import http from "../../../http-common";
import {
    AddContactAddressInfo, getcountrylist, getmodecommlist, getregion, getcircuitbyregion,
    gettemplebycircuit, getcircuit, gettemple, UpdateContactAddressInfo
} from "../../../actions/tutorials"

let sessiontoken = sessionStorage.getItem("token");

const ContactAddressInfo = (props) => {

    const {errors, register, handleSubmit} = useForm();
    const [contactId, setContactId] = useState(0);
    const [physicalRegion, setPhysicalRegion] = useState(0);
    const [postRegion, setPostRegion] = useState(0);
    const [physicalCircuit, setPhysicalCircuit] = useState(0);
    const [postCircuit, setPostCircuit] = useState(0);
    const [physicalTemple, setPhysicalTemple] = useState(0);
    const [postTemple, setPostTemple] = useState(0);

    const [physicalCircuitList, setPhysicalCircuitList] = useState([]);
    const [postCircuitList, setPostCircuitList] = useState([]);
    const [physicalTempleList, setPhysicalTempleList] = useState([]);
    const [postTempleList, setPostTempleList] = useState([]);

    if (props.activeTab == 3 && document.getElementById('contactSubTab')) {

        let tabNav = document.getElementById('contactSubTab').children;
        let tabConent = document.getElementById('contactSubTabContent').children;

        for (let i = 0; i < 4; i++) {
            if (props.activeTab == i + 1) {
                tabNav[i].children[0].classList.remove('nav-link');
                tabNav[i].children[0].classList.add('active');
                tabNav[i].children[0].classList.add('nav-link');
                tabConent[i].classList.add('active');
            } else {
                tabNav[i].children[0].classList.remove('active');
                tabConent[i].classList.remove('active');
            }
        }

    }

    const onFormSubmit = (formData) => {

        let phycountry = document.getElementById("selectphycountry").value;
        let postcountry = document.getElementById("selectpostcountry").value;

        let phyregion = document.getElementById("select-phi-region").value;
        let postregion = document.getElementById("select-post-region").value;

        let phycircuit = document.getElementById("select-phi-circuit").value;
        let postcircuit = document.getElementById("select-post-circuit").value;

        let phytemple = document.getElementById("select-phi-temple").value;
        let posttemple = document.getElementById("select-post-temple").value;

        // calculate selected communication mode

        let modecomm = "";
        for (let item of props.modecommlist) {
            if (document.getElementById(`communimode${item.id}`).checked)
                modecomm = `${modecomm},${item.id}`;
        }
        modecomm = modecomm.substring(1);

        // -------------  ****************   ---------------

        if (props.updateStatus && props.contactData[0].addressinfo[0] != undefined) {
            props.UpdateContactAddressInfo(sessiontoken, props.contactData[0].addressinfo[0].id, formData.phyresidenaddr1, formData.phyresidenaddr2, formData.phycontactpostalcode, phyregion, phycircuit, phytemple,
                phycountry, formData.postresidenaddr1, formData.postresidenaddr2, formData.postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm);
        } else {
            props.AddContactAddressInfo(sessiontoken, contactId, formData.phyresidenaddr1, formData.phyresidenaddr2, formData.phycontactpostalcode, phyregion, phycircuit, phytemple,
                phycountry, formData.postresidenaddr1, formData.postresidenaddr2, formData.postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm);
        }

    }

    useEffect(() => {
        props.getcountrylist();
        props.getmodecommlist();
        props.getregion();
        props.getcircuit();
        props.gettemple();
    }, [])

    useEffect(() => {
        setContactId(props.currentcontact)
    }, [props])

    const changeSameas = () => {
        // If user/ admin check same as physical address, auto filled in postal address as like physical address
        if (document.getElementById("samephysical").checked) {
            document.getElementById("post-residenaddr1").value = document.getElementById("phy-residenaddr1").value;
            document.getElementById("post-residenaddr2").value = document.getElementById("phy-residenaddr2").value;
            document.getElementById("post-contactpostalcode").value = document.getElementById("phy-contactpostalcode").value;

            document.getElementById("selectpostcountry").value = document.getElementById("selectphycountry").value;
            setPostRegion(document.getElementById("select-phi-region").value);
            document.getElementById("select-post-region").value = document.getElementById("select-phi-region").value;
            setPostCircuit(document.getElementById("select-phi-circuit").value);
            document.getElementById("select-post-circuit").value = document.getElementById("select-phi-circuit").value;
            setPostTemple(document.getElementById("select-phi-temple").value);
            document.getElementById("select-post-temple").value = document.getElementById("select-phi-temple").value;
        } else {
            document.getElementById("post-residenaddr1").value = "";
            document.getElementById("post-residenaddr2").value = "";
            document.getElementById("post-contactpostalcode").value = "";

            document.getElementById("selectpostcountry").value = 0;
            document.getElementById("select-post-region").value = 0;
            document.getElementById("select-post-circuit").value = 0;
            document.getElementById("select-post-temple").value = 0;

        }
    }

    const changePhysicalRegion = (e) => {
        setPhysicalRegion(e.target.value)
    }

    const changePostRegion = (e) => {
        setPostRegion(e.target.value)
    }

    const changePhysicalCircuit = (e) => {
        setPhysicalCircuit(e.target.value)
    }

    const changePostCircuit = (e) => {
        setPostCircuit(e.target.value)
    }

    const changePhysicalTemple = (e) => {
        setPhysicalTemple(e.target.value)
    }

    const changePostTemple = (e) => {
        setPostTemple(e.target.value)
    }

    useEffect(() => {
        http.get(`/get/circuitsbyregion?regionid=${physicalRegion}`)
            .then((res) => {
                setPhysicalCircuitList(res.data.data)
            }).catch(error => {
            console.log(error)
        });

    }, [physicalRegion])

    useEffect(() => {
        http.get(`/get/circuitsbyregion?regionid=${postRegion}`)
            .then((res) => {
                setPostCircuitList(res.data.data)
            }).catch(error => {
            console.log(error)
        });

    }, [postRegion])

    useEffect(() => {
        http.get(`/get/templesbycircuit?circuitid=${physicalCircuit}`)
            .then((res) => {
                setPhysicalTempleList(res.data.data)
            }).catch(error => {
            console.log(error)
        });

    }, [physicalCircuit])

    useEffect(() => {
        http.get(`/get/templesbycircuit?circuitid=${postCircuit}`)
            .then((res) => {
                setPostTempleList(res.data.data)
            }).catch(error => {
            console.log(error)
        });

    }, [postCircuit])

    return (
        <Fragment>
            <div className="contact-content contact-address-info">
                <Form className="form-contact-info" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="address-info">
                        <div className="contact-physical-address contact-address-detail">
                            <h4 className="mb-3">Physical Address</h4>
                            <div className="physical-group address-group d-block mt-3">
                                <div className="row">
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Residential Address Line 1<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input type={"text"} id="phy-residenaddr1" name="phyresidenaddr1"
                                                   placeholder="Enter Address 1"
                                                   ref={register({required: "This field is required"})}
                                                   className={`form-control-lg form-control is-hidden company-name item-name`}/>
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Residential Address Line 2<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input type={"text"} id="phy-residenaddr2" name="phyresidenaddr2"
                                                   placeholder="Enter Address 2"
                                                   ref={register({required: "This field is required"})}
                                                   className={`form-control-lg form-control is-hidden company-name item-name`}/>
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-6 d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Country <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" className="select-country"
                                                       id="selectphycountry" placeholder="Select">
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        props.countries && props.countries.length > 0 ? props.countries.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.c_name}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Postal Code<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input type={"text"} id="phy-contactpostalcode" name="phycontactpostalcode"
                                                   placeholder="Initials"
                                                   ref={register({required: "This field is required"})}
                                                   className={`form-control-lg form-control is-hidden company-name item-name`}/>
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row region">
                                    <FormGroup className="col-4 d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Region <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" id="select-phi-region"
                                                       placeholder="Select" onChange={(e) => changePhysicalRegion(e)}>
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        props.regionlist.length > 0 ? props.regionlist.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.c_name}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-4 d-flex circuit-form">
                                        <label htmlFor="default-4" className="form-label">
                                            Circuit <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" id="select-phi-circuit"
                                                       placeholder="Select" onChange={(e) => changePhysicalCircuit(e)}>
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        physicalCircuitList.length > 0 ? physicalCircuitList.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.circuitname}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-4 d-flex">
                                        <label htmlFor="default-4" className="form-label"
                                               onChange={(e) => changePhysicalTemple(e)}>
                                            Temple <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" id="select-phi-temple"
                                                       placeholder="Select">
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        physicalTempleList.length > 0 ? physicalTempleList.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.templename}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div className="contact-Postal-address contact-address-detail mt-5">
                            <div className="postal-head d-flex">
                                <h4 className="mb-3">Postal Address</h4>
                                <div className="checkbox-group d-flex sameasphysical">
                                    <label htmlFor="samephysical" className="form-label">
                                        Same as Physical address?
                                    </label>
                                    <Input type="checkbox" name="samephysical" id="samephysical"
                                           onChange={(e) => changeSameas(e)} style={{marginTop: '0.9rem'}}></Input>
                                </div>
                            </div>
                            <div className="postal-group address-group d-block mt-3">
                                <div className="row">
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Postal Address Line 1<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="post-residenaddr1"
                                                name="postresidenaddr1"
                                                placeholder="Enter Address 1"
                                                ref={register({required: "This field is required"})}
                                                className={`form-control-lg form-control is-hidden company-name item-name`}
                                            />
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Postal Address Line 2<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="post-residenaddr2"
                                                name="postresidenaddr2"
                                                placeholder="Enter Address 2"
                                                ref={register({required: "This field is required"})}
                                                className={`form-control-lg form-control is-hidden company-name item-name`}
                                            />
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-6 d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Country <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" id="selectpostcountry"
                                                       placeholder="Select">
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        props.countries && props.countries.length > 0 ? props.countries.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.c_name}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Postal Code<span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="post-contactpostalcode"
                                                name="postcontactpostalcode"
                                                placeholder="Initials"
                                                ref={register({required: "This field is required"})}
                                                className={`form-control-lg form-control is-hidden company-name item-name`}
                                            />
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row region">
                                    <FormGroup className="col-4 d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Region <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <Input type="select" name="select" id="select-post-region"
                                                       placeholder="Select" onChange={(e) => changePostRegion(e)}>
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        props.regionlist.length > 0 ? props.regionlist.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.c_name}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </Input>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-4 d-flex circuit-form">
                                        <label htmlFor="default-4" className="form-label">
                                            Circuit <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <select name="select" id="select-post-circuit" placeholder="Select"
                                                        className="form-control" onChange={(e) => changePostCircuit(e)}
                                                        value={postCircuit > 0 ? postCircuit : 0}>
                                                    {/* selected={postCircuit > 0 && postCircuit == item.id ? "selected" : "" } */}
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        postCircuitList.length > 0 ? postCircuitList.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.circuitname}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-4 d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Temple <span className="red">*</span>
                                        </label>
                                        <div className="form-control-wrap">
                                            <div className="form-control-select">
                                                <select name="select" id="select-post-temple" placeholder="Select"
                                                        className="form-control" onChange={(e) => changePostTemple(e)}
                                                        value={postTemple > 0 ? postTemple : 0}>
                                                    <option value={0}>-- select --</option>
                                                    {
                                                        postTempleList.length > 0 ? postTempleList.map((item, index) => {
                                                                return (<option value={item.id}
                                                                                key={index}>{item.templename}</option>)
                                                            })
                                                            : <></>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                            <FormGroup className="communi-mode d-flex">
                                <div className="form-label-group d-flex">
                                    <label className="form-label" htmlFor="default-01">
                                        Preferred Mode of Communication <span className="red">*</span>
                                    </label>
                                </div>
                                <div className="checkbox-group d-flex">
                                    {
                                        props.modecommlist && props.modecommlist.length > 0 ? props.modecommlist.map((item, index) => {
                                                return (
                                                    <div className="d-flex" key={index} style={{marginLeft: '2rem'}}>
                                                        <Input type="checkbox" name={`communimode${item.id}`}
                                                               id={`communimode${item.id}`}></Input>
                                                        <label className="check-label" htmlFor={`communimode${index + 1}`}>
                                                            {item.mode}
                                                        </label>
                                                    </div>
                                                )
                                            })
                                            : <></>
                                    }
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="d-flex btn-group">
                        <FormGroup>
                            <Button size="lg" className="btn-large" type="submit" color="primary">
                                {"Save & Proceed"}
                            </Button>
                        </FormGroup>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
};


const mapStateToProps = (state) => {
    return {
        activeTab: state.contactReducer.activeTab,
        countries: state.contactReducer.countrylist,
        modecommlist: state.contactReducer.modecommlist,
        regionlist: state.contactReducer.regionlist,
        circuitlist: state.contactReducer.circuitlist,
        templelist: state.contactReducer.templelist,
        currentcontact: state.contactReducer.contact,
        updateStatus: state.contactReducer.updateStatus,
        contactData: state.contactReducer.contactdata
    };
};

export default connect(mapStateToProps, {
    AddContactAddressInfo,
    getcountrylist,
    getmodecommlist,
    getregion,
    getcircuit,
    gettemple,
    getcircuitbyregion,
    gettemplebycircuit,
    UpdateContactAddressInfo
})(ContactAddressInfo);
  
