import React, {Fragment, useEffect, useState, forwardRef} from "react";
import {Form, FormGroup, Input} from "reactstrap";
import {connect} from "react-redux";
import {Icon, Button} from "../../../components/Component";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {
    getcircuit,
    getcircuitbyregion,
    getcountrylist,
    getmodecommlist,
    getregion,
    gettemple,
    gettemplebycircuit,
    updateUserAddress
} from "../../../actions/tutorials"
import http from "../../../http-common";

const sessionToken = sessionStorage.getItem("token");
let isUpdated = false;

const AddressInfo = (props) => {

    const {errors, register, handleSubmit} = useForm();

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

    useEffect(() => {
        props.getcountrylist();
        props.getmodecommlist();
        props.getregion();
        props.getcircuit();
        props.gettemple();
    }, []);

    useEffect(() => {

        let userInfo = props.userInfo[0];

        if (userInfo != null) {

            isUpdated = true;
            userInfo = userInfo[0];

            document.getElementById('residential_address1').value = userInfo.c_phy_add_l1;
            document.getElementById('residential_address2').value = userInfo.c_phy_add_l2;
            document.getElementById('select_phys_country').value = userInfo.n_phy_country;
            document.getElementById('phys_postal_code').value = userInfo.n_phy_postal_code;
            document.getElementById('postal_address1').value = userInfo.c_res_add_l2;
            document.getElementById('postal_address2').value = userInfo.c_res_add_l2;
            document.getElementById('select_post_country').value = userInfo.n_res_country;
            document.getElementById('post_postal_code').value = userInfo.n_res_postal_code;

            document.getElementById('select-phi-region').value = userInfo.n_phy_region;
            document.getElementById('select-post-region').value = userInfo.n_res_region;

            setSelectData(document.getElementById('select-phi-circuit'), props.circuitlist,
                userInfo.n_phy_region, userInfo.n_phy_circuit);
            setSelectData(document.getElementById('select-phi-temple'), props.templelist,
                userInfo.n_phy_region, userInfo.n_phy_temple);

            setTimeout(() => {
                setSelectData(document.getElementById('select-post-circuit'), props.circuitlist,
                    userInfo.n_res_region, userInfo.n_res_circuit);
                setSelectData(document.getElementById('select-post-temple'), props.templelist,
                    userInfo.n_res_region, userInfo.n_res_temple);
            }, 500);


            if (userInfo.n_mode_communication != null) {
                const modeComm = userInfo.n_mode_communication.split(',');
                for (let id of modeComm) {
                    if (document.getElementById(`comm_mode_${id}`) != null) {
                        document.getElementById(`comm_mode_${id}`).checked = true;
                    }
                }
            }

        }

    }, [props]);

    const setSelectData = (select, array, region, value) => {
        let html = "<option value='0'>-- select --</option>";
        for (let i in array) {
            if (array[i].n_regionid == region) {
                html += `<option value='${array[i].id}'>${array[i].c_name}</option>`;
            }
        }
        select.innerHTML = html;
        select.value = parseInt(value);
    }

    const changeSameAs = () => {

        if (document.getElementById("same_physical_postal").checked) {
            document.getElementById("postal_address1").value = document.getElementById("residential_address1").value;
            document.getElementById("postal_address2").value = document.getElementById("residential_address1").value;
            document.getElementById("post_postal_code").value = document.getElementById("phys_postal_code").value;
            document.getElementById("select_post_country").value = document.getElementById("select_phys_country").value;
            document.getElementById("select-post-region").value = document.getElementById("select-phi-region").value;
            document.getElementById("select-post-circuit").value = document.getElementById("select-phi-circuit").value;
            document.getElementById("select-post-temple").value = document.getElementById("select-phi-temple").value;
        } else {
            document.getElementById("postal_address1").value = "";
            document.getElementById("postal_address2").value = "";
            document.getElementById("post_postal_code").value = "";
            document.getElementById("select_post_country").value = 0;
            document.getElementById("select-post-region").value = 0;
            document.getElementById("select-post-circuit").value = 0;
            document.getElementById("select-post-temple").value = 0;

        }
    }


    const onFormSubmit = (formData) => {

        let n_phy_country = document.getElementById("select_phys_country").value;
        let n_res_country = document.getElementById("select_post_country").value;

        let n_phy_region = document.getElementById("select-phi-region").value;
        let n_res_region = document.getElementById("select-post-region").value;

        let n_phy_circuit = document.getElementById("select-phi-circuit").value;
        let n_res_circuit = document.getElementById("select-post-circuit").value;

        let n_phy_temple = document.getElementById("select-phi-temple").value;
        let n_res_temple = document.getElementById("select-post-temple").value;

        let modeComm = "";
        for (let item of props.modecommlist) {
            if (document.getElementById(`comm_mode_${item.id}`).checked)
                modeComm = `${modeComm},${item.id}`;
        }
        modeComm = modeComm.substring(1);

        formData.n_phy_country = n_phy_country;
        formData.n_res_country = n_res_country;
        formData.n_phy_region = n_phy_region;
        formData.n_res_region = n_res_region;
        formData.n_phy_circuit = n_phy_circuit;
        formData.n_res_circuit = n_res_circuit;
        formData.n_phy_temple = n_phy_temple;
        formData.n_res_temple = n_res_temple;
        formData.n_mode_communication = modeComm;

        props.updateUserAddress(sessionToken, formData);

    };

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
                <Form className={'form-contact-info'} onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="address-info">
                        <div className="contact-physical-address contact-address-detail">
                            <h4 className="mb-3">Physical Address</h4>
                            <div className="physical-group address-group d-flex mt-3">
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Residential Address Line 1<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="residential_address1"
                                            name="c_phy_add_l1"
                                            placeholder="Enter Address 1"
                                            ref={register({required: "This field is required"})}
                                            className={`form-control-lg form-control is-hidden company-name item-name`}
                                        />
                                        {errors.passnew && (
                                            <span className="invalid">{errors.passnew.message}</span>
                                        )}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="residenaddr2">
                                                Residential Address Line 2<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="residential_address2"
                                            name="c_phy_add_l2"
                                            placeholder="Enter Address 2"
                                            ref={register({required: "This field is required"})}
                                            className={`form-control-lg form-control is-hidden company-name item-name`}
                                        />
                                        {errors.passnew && (
                                            <span className="invalid">{errors.passnew.message}</span>
                                        )}
                                    </div>
                                </FormGroup>
                                <FormGroup className="col-4 d-flex">
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
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
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Circuit <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select-phi-circuit" id="select-phi-circuit"
                                                   placeholder="Select" onChange={(e) => changePhysicalCircuit(e)}>
                                                <option value={0}>-- select --</option>
                                                {
                                                    physicalCircuitList.length > 0 ? physicalCircuitList.map((item, index) => {
                                                            return (<option value={item.id}>{item.c_name}</option>)
                                                        })
                                                        : <></>
                                                }
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="col-4 d-flex">
                                    <label htmlFor="default-4" className="form-label"  style={{width:'5rem'}}
                                           onChange={(e) => changePhysicalTemple(e)}>
                                        Temple <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select-phi-temple" id="select-phi-temple"
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
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Country <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="select_phys_country"
                                                   placeholder="Select">
                                                <option value={0}>-- select --</option>
                                                {
                                                    props.countries && props.countries.length > 0 ? props.countries.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.c_name}</option>)
                                                        })
                                                        : <></>
                                                }
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Postal Code<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="phys_postal_code"
                                            name="n_phy_postal_code"
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
                        </div>
                        <div className="contact-Postal-address contact-address-detail mt-5">
                            <div className="postal-head d-flex">
                                <h4 className="mb-3">Postal Address</h4>
                                <div className="checkbox-group d-flex sameasphysical">
                                    <label htmlFor="same_physical_postal" className="form-label">
                                        Same as Physical address?
                                    </label>
                                    <Input type="checkbox" name="same_physical_postal" id="same_physical_postal"
                                           onChange={(e) => changeSameAs(e)}/>
                                </div>
                            </div>
                            <div className="postal-group address-group d-flex mt-3">
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Postal Address Line 1<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="postal_address1"
                                            name="c_res_add_l1"
                                            placeholder="Enter Address 1"
                                            ref={register({required: "This field is required"})}
                                            className={`form-control-lg form-control is-hidden company-name item-name`}
                                        />
                                        {errors.passnew && (
                                            <span className="invalid">{errors.passnew.message}</span>
                                        )}
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Postal Address Line 2<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="postal_address2"
                                            name="c_res_add_l2"
                                            placeholder="Enter Address 2"
                                            ref={register({required: "This field is required"})}
                                            className={`form-control-lg form-control is-hidden company-name item-name`}
                                        />
                                        {errors.passnew && (
                                            <span className="invalid">{errors.passnew.message}</span>
                                        )}
                                    </div>
                                </FormGroup>
                                <FormGroup className="col-4 d-flex">
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Region <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select-post-region" id="select-post-region"
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
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Circuit <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <select name="select-post-circuit" id="select-post-circuit" placeholder="Select"
                                                    className="form-control" onChange={(e) => changePostCircuit(e)}
                                                    value={postCircuit > 0 ? postCircuit : 0}>
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
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Temple <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <select name="select-post-temple" id="select-post-temple" placeholder="Select"
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
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label" style={{width:'5rem'}}>
                                        Country <span className="red">*</span>
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="select_post_country"
                                                   placeholder="Select">
                                                <option value={0}>-- select --</option>
                                                {
                                                    props.countries && props.countries.length > 0 ? props.countries.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.c_name}</option>)
                                                        })
                                                        : <></>
                                                }
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <div className="form-control-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Postal Code<span className="red">*</span>
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="post_postal_code"
                                            name="n_res_postal_code"
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
                                                        <Input type="checkbox" name={`comm_mode_${item.id}`}
                                                               id={`comm_mode_${item.id}`}/>
                                                        <label className="check-label" htmlFor={`comm_mode_${item.id}`}>
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
        countries: state.contactReducer.countrylist,
        modecommlist: state.contactReducer.modecommlist,
        userInfo: state.userinfoReducer,
        regionlist: state.contactReducer.regionlist,
        circuitlist: state.contactReducer.allcircuits,
        templelist: state.contactReducer.alltemples,
    };
};

export default connect(mapStateToProps, {
    getmodecommlist,
    getcountrylist,
    getregion,
    getcircuit,
    gettemple,
    getcircuitbyregion,
    gettemplebycircuit,
    updateUserAddress
})(AddressInfo);
  
