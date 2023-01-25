import React, { useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import {
    Card,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Spinner,
    TabContent,
    TabPane,
    UncontrolledAlert,
    UncontrolledDropdown
} from "reactstrap";
import {
    BeneficiaryTable,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PaymentMethodTable,
    ViewPolicyTable,
} from "../../components/Component";
import FilterDropDown from "../../layout/insurance/product-manage/FilterDropDown";
import MyPoliciesDropDown from "../../layout/insurance/product-manage/MyPoliciesDropDown";
import {useForm} from "react-hook-form";
import avatar from "../../images/avatar/c-sm.jpg"
import point from "../../images/point.png"
import classnames from "classnames";
import PersonalInfo from "../../layout/insurance/user-policy-manage/PersonalInfo";
import AddressInfo from "../../layout/insurance/user-policy-manage/AddressInfo";
import KYCStatus from "../../layout/insurance/user-policy-manage/KYCStatus";
import SignaturePad from 'react-signature-canvas';
import {
    getageGroup,
    getcontactlist,
    getcoverType,
    getcircuit,
    getcircuitbyregion,
    getcountrylist,
    getmodecommlist,
    getregion,
    gettemple,
    gettemplebycircuit,
    getUserById,
    getPolicyMember, addPolicyPremium, getPolicyDependents, addPolicyDependents
} from "../../actions/tutorials";
import http from "../../../src/http-common";
import Swal from "sweetalert2";
import {formatDate, numberWithCommas} from "../../utils/Utils";

let member_main, member_spouse, member_children, member_extend;
let sessionToken = sessionStorage.getItem("token");

const UserPolicyManage = (props) => {

    const moduleTypeList = ['Funeral Insurance', 'Health Insurance', 'Social Insurance', 'Property Insurance', 'Motor Insurance'];
    const [moduleType, setModuleType] = useState(0);
    const [coverAmountId, setCoverAmountId] = useState(0);
    const [coverAmount, setCoverAmount] = useState({});
    const [coverType, setCoverType] = useState(0);
    const [coverTypeStr, setCoverTypeStr] = useState(0);

    const [selectPolicyId, setSelectPolicyId] = useState(0);
    const [selectedPolicy, setSelectedPolicy] = useState({});

    const [coverMemType, setCoverMemType] = useState("");
    const [myCoverAmountList, setMyCoverAmountList] = useState([]);
    const [myCoverTypeList, setMyCoverTypeList] = useState([]);
    const [ageVal, setAgeVal] = useState([-1, -1]);
    const [mainMemberAgeList, setMainMemberAgeList] = useState([]);
    const [premiumAmount, setPremiumAmount] = useState([]);

    const [extAgeVal, setExtAgeVal] = useState([-1, -1]);
    const [extHaveStatus, setExtHaveStatus] = useState(false);
    const [extAgeList, setExtAgeList] = useState([]);
    const [extCount, setExtCount] = useState(0);

    const [spouseAgeVal, setSpouseAgeVal] = useState([-1, -1]);
    const [spouseHaveStatus, setSpouseHaveStatus] = useState(false);
    const [spouseAgeList, setSpouseAgeList] = useState([]);
    const [spouseCount, setSpouseCount] = useState(0);

    const [childrenAgeVal, setChildrenAgeVal] = useState([-1, -1]);
    const [childrenHaveStatus, setChildrenHaveStatus] = useState(false);
    const [childrenAgeList, setChildrenAgeList] = useState([]);
    const [childrenCount, setChildrenCount] = useState(0);

    const [spouseDependentsList, setSpouseDependentsList] = useState([]);
    const [childrenDependentsList, setChildrenDependentsList] = useState([]);
    const [extendsDependentsList, setExtendsDependentsList] = useState([]);

    const [dependentsCount, setDependentsCount] = useState(0);
    const [beneficiariesCount, setBeneficiariesCount] = useState(0);

    const [premiumCal, setPremiumCal] = useState(0);

    const [collapseView, setCollapseView] = useState(true);
    const [collapseManage, setCollapseManage] = useState(true);

    //company toggle
    const [collapseCompany, setCollapseCompany] = useState(true);
    const [collapseCategory, setCollapseCategory] = useState(false);
    const [collapseSubcategory, setCollapseSubcategory] = useState(false);
    const [collapseProduct, setCollapseProduct] = useState(false);
    const [collapsePolicy, setCollapsePolicy] = useState(false);
    const [modalPreview, setModalPreview] = useState(false);
    const [premiumCnt, setPremiumCnt] = useState(0);

    const [spouseList, setSpouseList] = useState([]);
    const [childrenList, setChildrenList] = useState([]);
    const [extendsList, setExtendsList] = useState([]);

    let signPad = useRef({});
    let data = "";

    useEffect(() => {

        props.membertypelist && props.membertypelist.map((item) => {
            switch (item.membertype) {
                case "Main Member":
                    member_main = item.id;
                    break;
                case "Spouse":
                    member_spouse = item.id;
                    break;
                case "Children":
                    member_children = item.id;
                    break;
                case "Extended Family":
                    member_extend = item.id;
                    break;
            }
        });

        let spouse =  [], children = [], extend = [];
        props.contactList && props.contactList.map((item) => {
            switch (item.relation_name) {
                case "Spouse":
                    spouse.push(item);
                    break;
                case "Children":
                    children.push(item);
                    break;
                default:
                    extend.push(item);
                    break;
            }
        });

        setSpouseList(spouse);
        setChildrenList(children);
        setExtendsList(extend);

    }, [props]);

    useEffect(() => {

        if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && ageVal[0] != -1) {
            getPremiumAmount();
        } else if (coverAmountId > 0 && coverType > 0) {
            http.post(`/get/agegroups`, {
                n_covertype: coverAmountId,
                n_planfor: coverType,
                n_member_type: member_main
            }).then((res) => {
                setMainMemberAgeList(res.data.data)
            });
        } else {
            setPremiumCal(0);
        }
    }, [coverAmountId, coverType, ageVal])

    // get premium amount when change spouse status
    useEffect(() => {
        if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && spouseAgeVal[0] != -1) {
            getPremiumAmount();
        } else if (moduleType > 0 && coverAmountId > 0 && coverType > 0) {
            http.post(`/get/agegroups`, {
                n_covertype: coverAmountId,
                n_planfor: coverType,
                n_member_type: member_spouse
            }).then((res) => {
                setSpouseAgeList(res.data.data);
            });
        }
    }, [spouseAgeVal]);

    // get premium amount when change children status
    useEffect(() => {
        if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && childrenAgeVal[0] != -1) {
            getPremiumAmount();
        } else if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && childrenHaveStatus == true) {
            http.post(`/get/agegroups`, {
                n_covertype: coverAmountId,
                n_planfor: coverType,
                n_member_type: member_children
            }).then((res) => {
                setChildrenAgeList(res.data.data)
            });
        }
    }, [childrenHaveStatus, childrenAgeVal])

    // get premium amount when change extended family status
    useEffect(() => {
        if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && extAgeVal.length > 0 && extAgeVal[0] != -1) {
            getPremiumAmount();
        } else if (moduleType > 0 && coverAmountId > 0 && coverType > 0 && extHaveStatus == true) {
            http.post(`/get/agegroups`, {
                n_covertype: coverAmountId,
                n_planfor: coverType,
                n_member_type: member_extend
            }).then((res) => {
                setExtAgeList(res.data.data)
            });
        }
    }, [extHaveStatus, extAgeVal])

    useEffect(() => {
        setPremiumCnt(props.premium.premiumCnt);
    }, [props])

    useEffect(() => {
        props.getcontactlist(sessionToken);
        props.getcountrylist();
        props.getmodecommlist();
        props.getregion();
        props.getcircuit();
        props.gettemple();
    }, []);

    useEffect(() => {

        let userInfo = props.userInfo[0];
        if (userInfo != undefined) {

            userInfo = userInfo[0];

            if (userInfo.title == 'mr') document.getElementById('title_radio_mr').checked = true;
            else if (userInfo.title == 'mrs') document.getElementById('title_radio_mrs').checked = true;
            else if (userInfo.title == 'ms') document.getElementById('title_radio_ms').checked = true;

            document.getElementById('member_firstname').value = userInfo.firstname;
            document.getElementById('member_lastname').value = userInfo.lastname;
            document.getElementById('member_initials').value = userInfo.initials;
            document.getElementById('member_gender').value = userInfo.gender;
            document.getElementById('member_birthday').value = formatDate(userInfo.dob);
            document.getElementById('member_telephone').value = userInfo.telephone;
            document.getElementById('member_email').value = userInfo.email;
            document.getElementById('member_cell').value = userInfo.contact;

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

        } else if (props.mainMemberData != null) {

            const memberInfo = props.mainMemberData;

            if (memberInfo.c_title == 'mr') document.getElementById('title_radio_mr').checked = true;
            else if (memberInfo.c_title == 'mrs') document.getElementById('title_radio_mrs').checked = true;
            else if (memberInfo.c_title == 'ms') document.getElementById('title_radio_ms').checked = true;

            document.getElementById('member_firstname').value = memberInfo.c_firstname;
            document.getElementById('member_lastname').value = memberInfo.c_lastname;
            document.getElementById('member_initials').value = memberInfo.c_initials;
            document.getElementById('member_gender').value = memberInfo.n_gender;
            document.getElementById('member_birthday').value = formatDate(memberInfo.d_dob);
            document.getElementById('member_telephone').value = memberInfo.c_tel_home;
            document.getElementById('member_email').value = memberInfo.c_email;
            document.getElementById('member_cell').value = memberInfo.c_cell;

            document.getElementById('residential_address1').value = memberInfo.c_residence_address1;
            document.getElementById('residential_address2').value = memberInfo.c_residence_address2;
            document.getElementById('select_phys_country').value = memberInfo.n_residence_country;
            document.getElementById('phys_postal_code').value = memberInfo.n_residence_postalcode;
            document.getElementById('postal_address1').value = memberInfo.c_postal_address1;
            document.getElementById('postal_address2').value = memberInfo.c_postal_address2;
            document.getElementById('select_post_country').value = memberInfo.n_postal_country;
            document.getElementById('post_postal_code').value = memberInfo.n_postal_postalcode;

            document.getElementById('select-phi-region').value = memberInfo.n_residence_region;
            document.getElementById('select-post-region').value = memberInfo.n_postal_region;

            setSelectData(document.getElementById('select-phi-circuit'), props.circuitlist,
                memberInfo.n_residence_region, memberInfo.n_residence_circuit);
            setSelectData(document.getElementById('select-phi-temple'), props.templelist,
                memberInfo.n_residence_region, memberInfo.n_residence_temple);

            setTimeout(() => {
                setSelectData(document.getElementById('select-post-circuit'), props.circuitlist,
                    memberInfo.n_postal_region, memberInfo.n_postal_circuit);
                setSelectData(document.getElementById('select-post-temple'), props.templelist,
                    memberInfo.n_postal_region, memberInfo.n_postal_temple);
            }, 500);

            if (memberInfo.c_comm_mode != null) {
                const modeComm = memberInfo.c_comm_mode.split(',');
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

    const getPremiumAmount = () => {

        http.post(`/get/premiumamount`,
            {
                n_policy: parseInt(selectPolicyId),
                n_covertype: coverAmountId,
                n_planfor: coverType,
                n_member_type_main: ageVal[0] != 0 ? member_main : 0,
                n_minage_main: parseInt(ageVal[0]),
                n_maxage_main: parseInt(ageVal[1]),
                n_member_type_spouse: spouseAgeVal[0] != "0" ? member_spouse : 0,
                n_minage_spouse: parseInt(spouseAgeVal[0]),
                n_maxage_spouse: parseInt(spouseAgeVal[1]),
                n_member_type_children: childrenHaveStatus && childrenAgeVal[0] != "0" ? member_children : 0,
                n_minage_children: parseInt(childrenAgeVal[0]),
                n_maxage_children: parseInt(childrenAgeVal[1]),
                n_member_type_extends: extHaveStatus && extAgeVal[0] != "0" ? member_extend : 0,
                n_minage_extends: parseInt(extAgeVal[0]),
                n_maxage_extends: parseInt(extAgeVal[1]),
            })
            .then((res) => {
                const data = res.data.data;
                setPremiumAmount(data);
                setPremiumCal(parseInt(data[4]));
            }).catch(error => {
                console.log(error);
            }
        );
    };

    const addSpouseDependents = (e) => {

        let value = {}, isSelected = false;
        let list = spouseDependentsList;
        let length = spouseList.length;

        for (let i = 0; i < length; i++) {
            if (spouseList[i].id == e.target.value) {
                value = spouseList[i];
                isSelected = true;
                break;
            }
        }

        if (list.includes(value) && isSelected) {
            Swal.fire({
                title: "This spouse already have added.",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        } else if (!list.includes(value) && isSelected) {

            Swal.fire({
                title: "Are you sure add spouse to dependents?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "OK",
            }).then(result => {
               if (result.isConfirmed) {
                   list.push(value);
                   setSpouseDependentsList(list);
                   reloadTab('nav_children', 'nav_spouse');
                   length = dependentsCount;
                   length++;
                   setDependentsCount(length);
               }
            });
        }

    }

    const deleteSpouseDependents = (e) => {

        Swal.fire({
            title: "Are you sure add spouse to dependents?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then(result => {
            if (result.isConfirmed) {

                let id = e.target.parentElement.dataset.id;
                let list = spouseDependentsList;
                let length = list.length;

                for (let i = 0; i < length; i++) {
                    if (list[i].id == id) {
                        list.splice(i, 1);
                        break;
                    }
                }

                setSpouseDependentsList(list);
                reloadTab('nav_children', 'nav_spouse');
                length = dependentsCount;
                length--;
                setDependentsCount(length);
            }
        });
    }

    const addChildrenDependents = (e) => {

        let value = {}, isSelected = false;
        let list = childrenDependentsList;
        let length = childrenList.length;

        for (let i = 0; i < length; i++) {
            if (childrenList[i].id == e.target.value) {
                value = childrenList[i];
                isSelected = true;
                break;
            }
        }

        if (list.includes(value) && isSelected) {
            Swal.fire({
                title: "This children already have added.",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        } else if (!list.includes(value) && isSelected) {

            Swal.fire({
                title: "Are you sure add children to dependents?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "OK",
            }).then(result => {
                if (result.isConfirmed) {
                    list.push(value);
                    setChildrenDependentsList(list);
                    reloadTab('nav_extends', 'nav_children');
                    length = dependentsCount;
                    length++;
                    setDependentsCount(length);
                }
            });
        }

    }

    const deleteChildrenDependents = (e) => {

        Swal.fire({
            title: "Are you sure add children to dependents?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then(result => {
            if (result.isConfirmed) {

                let id = e.target.parentElement.dataset.id;
                let list = childrenDependentsList;
                let length = list.length;

                for (let i = 0; i < length; i++) {
                    if (list[i].id == id) {
                        list.splice(i, 1);
                        break;
                    }
                }

                setChildrenDependentsList(list);
                reloadTab('nav_extends', 'nav_children');
                length = dependentsCount;
                length--;
                setDependentsCount(length);
            }
        });
    }

    const addExtendsDependents = (e) => {

        let value = {}, isSelected = false;
        let list = extendsDependentsList;
        let length = extendsList.length;

        for (let i = 0; i < length; i++) {
            if (extendsList[i].id == e.target.value) {
                value = extendsList[i];
                isSelected = true;
                break;
            }
        }

        if (list.includes(value) && isSelected) {
            Swal.fire({
                title: "This extends family already have added.",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        } else if (!list.includes(value) && isSelected) {

            Swal.fire({
                title: "Are you sure add extends family to dependents?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "OK",
            }).then(result => {
                if (result.isConfirmed) {
                    list.push(value);
                    setExtendsDependentsList(list);
                    reloadTab('nav_spouse', 'nav_extends');
                    length = dependentsCount;
                    length++;
                    setDependentsCount(length);
                }
            });
        }

    }

    const deleteExtendsDependents = (e) => {

        Swal.fire({
            title: "Are you sure add extends family to dependents?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then(result => {
            if (result.isConfirmed) {

                let id = e.target.parentElement.dataset.id;
                let list = extendsDependentsList;
                let length = list.length;

                for (let i = 0; i < length; i++) {
                    if (list[i].id == id) {
                        list.splice(i, 1);
                        break;
                    }
                }

                setExtendsDependentsList(list);
                reloadTab('nav_spouse', 'nav_extends');
                length = dependentsCount;
                length--;
                setDependentsCount(length);
            }
        });
    }

    const reloadTab = (tab1, tab2) => {

        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });

        document.getElementById(tab1).dispatchEvent(event);
        document.getElementById(tab2).dispatchEvent(event);
    }

    const handleSaveDependents = () => {

        let dependentsList = [];
        let premiumId = props.policyPremium.id;

        spouseDependentsList.map(item => {
            dependentsList.push({
                n_memberid: member_spouse,
                n_policyid: premiumId,
                n_dependentid: item.id
            });
        });

        childrenDependentsList.map(item => {
            dependentsList.push({
                n_memberid: member_spouse,
                n_policyid: premiumId,
                n_dependentid: item.id
            });
        });

        extendsDependentsList.map(item => {
            dependentsList.push({
                n_memberid: member_spouse,
                n_policyid: premiumId,
                n_dependentid: item.id
            });
        });

        props.addPolicyDependents(sessionToken, dependentsList);

    }

    const [activeTab, setActiveTab] = useState("1");
    const [subActiveTab, setSubActiveTab] = useState("1");
    const [dependentTab, setDependentTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const togglesub = (tab) => {
        if (subActiveTab !== tab) setSubActiveTab(tab);
    };

    const toggleDependentTab = (tab) => {
        if (dependentTab !== tab) setDependentTab(tab);
    };

    const toggleModalStatus = (id) => {
        if (id == 1) {
            document.querySelectorAll(".modal-signature")[0].classList.remove("second");
            document.querySelectorAll(".modal-signature")[0].classList.add("first");
        } else if (id == 2) {
            document.querySelectorAll(".modal-signature")[0].classList.remove("first");
            document.querySelectorAll(".modal-signature")[0].classList.add("second");
        } else {
            document.querySelectorAll(".modal-signature")[0].classList.remove("second");
            document.querySelectorAll(".modal-signature")[0].classList.add("third");
        }
    }

    const togglePreview = () => {
        setModalPreview(!modalPreview);
    };

    const toggleView = () => {
        setCollapseView(!collapseView);
    }

    const toggleManage = () => {
        setCollapseManage(!collapseManage);
    }

    const changeIcon = (classname) => {
        if (document.querySelectorAll(classname)[0].classList.contains("ni-plus")) {
            document.querySelectorAll(classname)[0].classList.remove("ni-plus");
            document.querySelectorAll(classname)[0].classList.add("ni-minus");
        } else {
            document.querySelectorAll(classname)[0].classList.remove("ni-minus");
            document.querySelectorAll(classname)[0].classList.add("ni-plus");
        }
    }

    const toggleCompany = () => {
        setCollapseCompany(!collapseCompany);
        changeIcon(".company-status");
    }

    const toggleCategory = () => {
        setCollapseCategory(!collapseCategory);
        changeIcon(".category-status");
    }

    const toggleSubcategory = () => {
        setCollapseSubcategory(!collapseSubcategory);
        changeIcon(".subcategory-status");
    }

    const toggleProduct = () => {
        setCollapseProduct(!collapseProduct);
        changeIcon(".product-status");
    }

    const togglePolicy = () => {
        setCollapsePolicy(!collapsePolicy);
        changeIcon(".policy-status");
    }

    const changeModule = (e) => {
        if (e.target.value != 1) {
            setMyCoverAmountList([]);
            document.getElementById("selectplanfor").value = 0;
            setCoverType(0);
        } else {
            document.getElementById("select-policy-type").innerHTML = "Funeral Insurance";
        }
        setModuleType(e.target.value);
    }

    const changePolicyName = (e) => {

        let id = e.target.value;
        setSelectPolicyId(id);

        // -------------    initializing origin status of main info       ---------------

        setPremiumCal(0);
        setCoverMemType("");
        document.getElementById("selectplanfor").value = 0;
        setMyCoverAmountList([]);
        document.getElementById("selectcoveramount").value = 0;
        document.getElementById("selectage").value = "0,0";
        setMainMemberAgeList([])
        setAgeVal([-1, -1])
        setCoverAmountId(0);
        setCoverAmount(0);
        setCoverType(0);

        // -------------    *****************************************       ---------------

        id != 0 && props.policylist.length > 0 ? props.policylist[0].map((item, index) => {
            if (id == item.id)
                document.getElementById("select-policy-name").innerHTML = `${item.c_policyname} (${item.c_productname} / ${item.company})`;
        }) : document.getElementById("select-policy-name").innerHTML = "No selected";

        http.get(`/get/covertypebypolicy?n_policyid=${e.target.value}`)
            .then((res) => {
                setMyCoverTypeList(res.data.data)
            })
            .catch(error => {
                console.log(error)
            });


    }
    const changeCoverAmountId = (e) => {

        if (e.target.value == 0) {
            //-----------       initializing age status      -----------------

            document.getElementById("selectage").value = "0,0";
            setMainMemberAgeList([])
            setAgeVal([-1, -1])

            //-----------       ************************      -----------------
        }

        if (document.getElementById("havespouse")) document.getElementById("havespouse").checked = false;
        setChildrenHaveStatus(false);

        if (document.getElementById("havechildren")) document.getElementById("havechildren").checked = false;
        setSpouseHaveStatus(false);

        if (document.getElementById("haveextendfamily")) document.getElementById("haveextendfamily").checked = false;
        setExtHaveStatus(false);

        setCoverAmountId(parseInt(e.target.value));

        http.post(`/get/agegroups`, {
            n_covertype: parseInt(e.target.value),
            n_planfor: coverType,
            n_member_type: member_spouse
        }).then((res) => {
            setSpouseAgeList(res.data.data);
        });

    }

    const changeCoverType = (e) => {

        http.get(`/get/coveramountbypolicyandtype?n_policyid=${selectPolicyId}&n_planfor=${e.target.value}`)
            .then((res) => {
                setMyCoverAmountList(res.data.data)
            })
            .catch(error => {
                console.log(error)
            });

        setCoverType(parseInt(e.target.value));
        e.target.value != 0 && props.covertypelist.length > 0 ?
            props.covertypelist[0].map((item, index) => {
                if (e.target.value == item.id) {
                    setCoverMemType(item.n_member_type);
                }
            })
            : setCoverMemType("");

        //-----------       initializing age status      -----------------

        document.getElementById("selectage").value = "0,0";
        setMainMemberAgeList([]);
        setAgeVal([-1, -1]);
        setSpouseCount(1);

        //-----------       ************************      -----------------
    }

    // ----------       when user click age group.        ----------
    const changeMemAge = (e) => {
        let mmage = e.target.value.split(",");
        setAgeVal(mmage);

    }

    const changeSpouseAge = (e) => {
        let spouseage = e.target.value.split(",");
        setSpouseAgeVal(spouseage);
    }

    const changeChildrenAge = (e) => {
        let childrenage = e.target.value.split(",");
        setChildrenAgeVal(childrenage);
    }

    const changeExtAge = (e) => {
        let extage = e.target.value.split(",");
        setExtAgeVal(extage);
    }

    // ----------       ***************************        ----------

    // ----------       when change have member status.        ----------

    const changeHaveExtStatus = () => {
        if (extHaveStatus) {
            setExtAgeVal([0, 0]);
            setExtCount(0);
        } else setExtCount(1);
        setExtHaveStatus(!extHaveStatus)

    }

    const changeHaveChildrenStatus = () => {
        if (childrenHaveStatus) {
            setChildrenAgeVal([0, 0]);
            setChildrenCount(0);
        } else setChildrenCount(1);
        setChildrenHaveStatus(!childrenHaveStatus)
    }

    const changeHaveSpouseStatus = () => {
        if (spouseHaveStatus) setSpouseCount(1);
        else setSpouseCount(2);
        setSpouseHaveStatus(!spouseHaveStatus);
    }

    // ----------       ***************************        ----------

    const saveCanvas = () => {
        data = signPad.current.toDataURL();
    }

    const [sm, updateSm] = useState(false);
    const [errorVal, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {errors, register, handleSubmit} = useForm();

    const onFormSubmit = (formData) => {
        setLoading(true);
    };

    const [modal, setModal] = useState(false);
    const [modalSignature, setModalSign] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleSign = () => {
        setModalSign(!modalSignature);
    };

    const applyPolicy = () => {

        if ((spouseHaveStatus && (spouseAgeVal[0] == "0" || spouseAgeVal[0] == -1)) ||
            (childrenHaveStatus && (childrenAgeVal[0] == "0" || childrenAgeVal[0] == -1)) ||
            (extHaveStatus && (extAgeVal[0] == "0" || extAgeVal[0] == -1))) {
            Swal.fire({
                title: "Please select age group.",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "OK",
            });
        } else {

            document.querySelectorAll(".user-panel-bottom")[0].style.display = 'block';
            props.getPolicyMember(sessionToken, 1);

            const sCount = document.getElementById('spouseCnt') == null ? 0 : document.getElementById('spouseCnt').value;
            setSpouseCount(sCount);
            const cCount = document.getElementById('childrenCnt') == null ? 0 : document.getElementById('childrenCnt').value;
            setChildrenCount(cCount);
            const eCount = document.getElementById('extfamilyCnt') == null ? 0 : document.getElementById('extfamilyCnt').value;
            setExtCount(eCount);

            let body = {
                n_policy_id: selectPolicyId,
                n_option_id: coverType,
                n_amount_id: coverAmountId,
                n_minage: ageVal[0],
                n_maxage: ageVal[1],
                n_has_spouse: spouseHaveStatus,
                n_spouse_count: sCount,
                n_spouse_minage: spouseAgeVal[0],
                n_spouse_maxage: spouseAgeVal[1],
                n_has_children: childrenHaveStatus,
                n_children_count: cCount,
                n_children_minage: childrenAgeVal[0],
                n_children_maxage: childrenAgeVal[1],
                n_has_extends: extHaveStatus,
                n_extends_count: eCount,
                n_extends_minage: extAgeVal[0],
                n_extends_maxage: extAgeVal[1],
                n_premiumamount: premiumCal
            };

            props.addPolicyPremium(sessionToken, body);

            let list = props.policylist[0];
            let length = list.length;
            for (let i = 0; i < length; i++) {
                if (list[i].id == selectPolicyId) {
                    setSelectedPolicy(list[i]);
                    break;
                }
            }

            list = props.coveramountlist[0];
            length = list.length;
            for (let i = 0; i < length; i++) {
                if (list[i].id == coverAmountId) {
                    setCoverAmount(list[i]);
                    break;
                }
            }

            length = myCoverTypeList.length;
            for (let i = 0; i < length; i++) {
                if (coverType == myCoverTypeList[i].id) {
                    setCoverTypeStr(myCoverTypeList[i].c_covertype);
                    break;
                }
            }

        }
    }

    // import member's info from user profile
    const handleImportIntoProfile = () => {

        Swal.fire({
            title: "Are you sure import member's info from user profile?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then(result => {
            if (result.isConfirmed) {
                props.getUserById(sessionToken, selectPolicyId);
            }
        });

    }

    return (
        <React.Fragment>

            <Head title="App Messages"/>
            <Content>
                <div className="main-manage-content userpolicy-manage-content">
                    <BlockHead size="sm">
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle page tag="h3">
                                    Policy Management
                                </BlockTitle>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}>
                                        <Icon name="more-v"/>
                                    </Button>
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <MyPoliciesDropDown/>
                                            </li>
                                            <li>
                                                <FilterDropDown/>
                                            </li>
                                            <li>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                                                        <Icon name="more-h"/>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <ul className="link-list-opt no-bdr">
                                                            <li>
                                                                <DropdownItem tag="a" href="#edit"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        toggle();
                                                                    }}>
                                                                    <Icon name="edit"/>
                                                                    <span>View all policies</span>
                                                                </DropdownItem>
                                                            </li>
                                                        </ul>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <div className="select-cover-collapse submain-collapse" onClick={toggleView} style={{marginBottom: '1rem'}}>
                        <span className="icon ni ni-chevron-down"/>
                        Select Policy and Cover
                    </div>
                    <Collapse isOpen={collapseView}>
                        <div className="select-cover">
                            <Card className="card-bordered card-preview">
                                <div className="select-content">
                                    <div className="select-top">
                                        <div className="row">
                                            <div className="col-5">
                                                <FormGroup className="d-flex">
                                                    <label htmlFor="default-4" className="form-label">
                                                        Module Type<span className="red">*</span>
                                                    </label>
                                                    <div className="form-control-wrap">
                                                        <div className="form-control-select">
                                                            <Input type="select" name="selectmodule" id="selectmodule"
                                                                   placeholder="Select Module Type"
                                                                   onChange={(e) => changeModule(e)}>
                                                                <option value={0}>-- Select --</option>
                                                                <option value={1}>Funeral Insurance</option>
                                                                <option value={2}>Health Insurance</option>
                                                                <option value={3}>Social Insurance</option>
                                                                <option value={4}>Property Insurance</option>
                                                                <option value={5}>Motor Insurance</option>
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-7">
                                                <FormGroup className="d-flex policy-name-select">
                                                    <label htmlFor="selectpolicyname" className="form-label">
                                                        Policy Name <span className="red">*</span>
                                                    </label>
                                                    <div className="form-control-wrap">
                                                        <div className="form-control-select">
                                                            <Input type="select" name="selectpolicyname"
                                                                   id="selectpolicyname" placeholder="Select Cover Amount"
                                                                   onChange={(e) => changePolicyName(e)}>
                                                                <option value={0}>-- Select --</option>
                                                                {
                                                                    moduleType == 1 && props.policylist.length > 0 ? props.policylist[0].map((item, index) => {
                                                                            return (
                                                                                <option value={item.id} key={index}>
                                                                                    {`${item.c_policyname} (${item.c_productname} / ${item.company})`}
                                                                                </option>
                                                                            )
                                                                        })
                                                                        : <></>
                                                                }
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <FormGroup className="d-flex">
                                                    <label htmlFor="selectplanfor" className="form-label">
                                                        Cover Options <span className="red">*</span>
                                                    </label>
                                                    <div className="form-control-wrap">
                                                        <div className="form-control-select">
                                                            <Input type="select" name="selectplanfor" id="selectplanfor"
                                                                   placeholder="Select Plan For"
                                                                   onChange={(e) => changeCoverType(e)}>
                                                                <option value={0}>-- Select --</option>
                                                                {
                                                                    myCoverTypeList.length > 0 ? myCoverTypeList.map((item, index) => {
                                                                            return (
                                                                                <option value={item.id} key={index}>
                                                                                    {item.c_covertype}
                                                                                </option>
                                                                            )
                                                                        })
                                                                        : <></>
                                                                }
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-4">
                                                <FormGroup className="d-flex">
                                                    <label htmlFor="selectcoveramount" className="form-label">
                                                        Cover Amount <span className="red">*</span>
                                                    </label>
                                                    <div className="form-control-wrap">
                                                        <div className="form-control-select">
                                                            <Input type="select" name="selectcoveramount" id="selectcoveramount"
                                                                   placeholder="Select Cover Amount"
                                                                   onChange={(e) => changeCoverAmountId(e)}>
                                                                <option value={0}>-- Select --</option>
                                                                {
                                                                    myCoverAmountList.length > 0 ? myCoverAmountList.map((item, index) => {
                                                                            return (
                                                                                <option value={item.id} key={index}>
                                                                                    {item.n_coveramount}
                                                                                </option>
                                                                            )
                                                                        })
                                                                        : <></>
                                                                }
                                                            </Input>
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </div>
                                            <div className="col-4">
                                                <FormGroup className="d-flex">
                                                    <label htmlFor="selectage" className="form-label">
                                                        Your age group <span className="red">*</span>
                                                    </label>
                                                    <div className="form-control-wrap">
                                                        <div className="form-control-select">
                                                            <Input type="select" name="selectage" id="selectage"
                                                                   placeholder="Select age group"
                                                                   onChange={(e) => changeMemAge(e)}>
                                                                <option value="0,0">-- Select --</option>
                                                                {
                                                                    mainMemberAgeList.length > 0 ? mainMemberAgeList.map((item, index) => {
                                                                            return (
                                                                                <option value={`${item.n_minage},${item.n_maxage}`} key={index}>
                                                                                    {item.n_minage} - {item.n_maxage}
                                                                                </option>
                                                                            )
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
                                    {
                                        moduleType == 1 ?
                                            <div>
                                                <div className="select-bottom">
                                                    {
                                                        coverMemType && coverMemType.includes("2") ?
                                                            <div className="line-one row">
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                          Do you have more than 1 Spouse or Partner?<span
                                                                            className="red">*</span>
                                                                        </span>
                                                                        <div className="custom-control custom-switch">
                                                                            <input type="checkbox" id="havespouse"
                                                                                className="custom-control-input form-control"
                                                                                onChange={() => changeHaveSpouseStatus()} />
                                                                            <label className="custom-control-label" htmlFor="havespouse"/>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                                <div className="col-4">
                                                                    <FormGroup>
                                                                        <div className="form-control-wrap d-flex">
                                                                            <div className="form-label-group">
                                                                                <span className="form-label">
                                                                                    How many Spouses or Partners?
                                                                                    <span className="red">*</span>
                                                                                </span>
                                                                            </div>
                                                                            <input type="number" id="spouseCnt" name="spouseCnt"
                                                                                defaultValue={spouseCount} min="0" max="10" step="1"
                                                                                className="form-control spouse-cnt member-cnt"/>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                            Spouse's/ Partner's age group
                                                                            <span className="red">*</span>
                                                                        </span>
                                                                        <div className="form-control-wrap">
                                                                            <div className="form-control-select">
                                                                                <Input type="select" name="spouseagegroup"
                                                                                       id="spouseagegroup" placeholder="Select Category"
                                                                                       onChange={(e) => changeSpouseAge(e)}>
                                                                                    <option value={0}>-- Select --</option>
                                                                                    {
                                                                                        spouseAgeList.length > 0 ? spouseAgeList.map((item, index) => {
                                                                                                return (
                                                                                                    <option value={`${item.n_minage},${item.n_maxage}`} key={index}>
                                                                                                        {item.n_minage} - {item.n_maxage}
                                                                                                    </option>
                                                                                                )
                                                                                            })
                                                                                            : <></>
                                                                                    }
                                                                                </Input>
                                                                            </div>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            : <></>
                                                    }
                                                    {
                                                        coverMemType && coverMemType.includes("3") ?
                                                            <div className="line-two row">
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                            Any Children to cover<span className="red">*</span>
                                                                        </span>
                                                                        <div className="custom-control custom-switch">
                                                                            <input type="checkbox" className="custom-control-input form-control" id="havechildren"
                                                                                onChange={(e) => changeHaveChildrenStatus()} />
                                                                            <label className="custom-control-label" htmlFor="havechildren"/>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                                <div className="col-4">
                                                                    <FormGroup>
                                                                        <div className="form-control-wrap d-flex">
                                                                            <div className="form-label-group">
                                                                            <span className="form-label">
                                                                                How many Children?<span className="red">*</span>
                                                                            </span>
                                                                            </div>
                                                                            <input type="number" id="childrenCnt" name="childrenCnt"
                                                                                defaultValue={childrenCount} min="0" max="10" step="1"
                                                                                className="form-control children-cnt member-cnt"/>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                            Children's age group <span className="red">*</span>
                                                                        </span>
                                                                        <div className="form-control-wrap">
                                                                            <div className="form-control-select">
                                                                                <Input type="select" name="childrensagegroup" id="childrensagegroup" placeholder="Select Category"
                                                                                       onChange={(e) => changeChildrenAge(e)}>
                                                                                    <option value="0,0">-- Select --</option>
                                                                                    {
                                                                                        childrenHaveStatus == true && childrenAgeList.length > 0 ? childrenAgeList.map((item, index) => {
                                                                                                return (
                                                                                                    <option value={`${item.n_minage},${item.n_maxage}`} key={index}>
                                                                                                        {item.n_minage} - {item.n_maxage}
                                                                                                    </option>
                                                                                                )
                                                                                            })
                                                                                            : <></>
                                                                                    }
                                                                                </Input>
                                                                            </div>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            : <></>
                                                    }
                                                    {
                                                        coverMemType && coverMemType.includes("4") ?
                                                            <div className="line-three row">
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                            Any Extended Family to cover<span className="red">*</span>
                                                                        </span>
                                                                        <div className="custom-control custom-switch">
                                                                            <input type="checkbox" className="custom-control-input form-control" id="haveextendfamily"
                                                                                onChange={(e) => changeHaveExtStatus()}/>
                                                                            <label className="custom-control-label" htmlFor="haveextendfamily"/>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="cover-slider d-flex">
                                                                        <FormGroup>
                                                                            <div className="form-control-wrap d-flex">
                                                                                <div className="form-label-group">
                                                                                    <span className="form-label">
                                                                                        Have many Extended Family Members?<span className="red">*</span>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="number" id="extfamilyCnt" name="extfamilyCnt" defaultValue={extCount}
                                                                                    min="0" max="10" step="1" className="form-control extfamily-cnt member-cnt"
                                                                                />
                                                                            </div>
                                                                        </FormGroup>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <FormGroup className="d-flex">
                                                                        <span className="form-label">
                                                                            Extended Members age group <span className="red">*</span>
                                                                        </span>
                                                                        <div className="form-control-wrap">
                                                                            <div className="form-control-select">
                                                                                <Input type="select" name="exmemberagegroup" id="exmemberagegroup"
                                                                                       placeholder="Select" onChange={(e) => changeExtAge(e)}>
                                                                                    <option value="0,0">-- Select --</option>
                                                                                    {
                                                                                        extHaveStatus == true && extAgeList.length > 0 ? extAgeList.map((item, index) => {
                                                                                                return (
                                                                                                    <option value={`${item.n_minage},${item.n_maxage}`} key={index}>
                                                                                                        {item.n_minage} - {item.n_maxage}
                                                                                                    </option>
                                                                                                )
                                                                                            })
                                                                                            : <></>
                                                                                    }
                                                                                </Input>
                                                                            </div>
                                                                        </div>
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            : <></>
                                                    }
                                                </div>
                                                    <p className="cal-premium-amount">R{premiumCal}*</p>
                                                <FormGroup>
                                                    <button className="btn btn-primary btn-lg btn-large apply-btn" type="submit" disabled={premiumCal == 0} onClick={applyPolicy}>
                                                        {"Apply"}
                                                    </button>
                                                </FormGroup>
                                            </div>
                                            :
                                            <UncontrolledAlert className="alert-icon m-5" color="danger" fade={false}>
                                                <Icon name="alert-circle"/>
                                                Coming soon...
                                            </UncontrolledAlert>
                                    }

                                </div>
                            </Card>
                        </div>
                    </Collapse>
                    <div className="user-panel-bottom">
                        <div className="policy-mana-nav d-flex">
                            <div className="manage-product-collapse submain-collapse" onClick={toggleManage}
                                 style={{marginBottom: '1rem'}}>
                                <span className="icon ni ni-chevron-down"/>
                                Add/ Manage Policies
                                <div className="userpolicy-detail">
                                    <span className="title">Policy Selected :&nbsp;</span>
                                    <span className="selectPolicy" id="select-policy-name">No selected</span>&nbsp;|&nbsp;
                                    <span className="title">Type :&nbsp;</span>
                                    <span className="selectPolicy" id="select-policy-type">No selected</span>&nbsp;|&nbsp;
                                    <span className="title">Amount :&nbsp;</span>
                                    <span className="selectPolicy">${premiumCal}</span>
                                    <span className="icon ni ni-plus-circle"/>
                                </div>
                            </div>
                            <UncontrolledDropdown className="menu">
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                                    <Icon name="more-h"/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <ul className="link-list-opt no-bdr">
                                        <li>
                                            <DropdownItem tag="a" href="#edit"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle();
                                                }} >
                                                <Icon name="file-pdf"/>
                                                <span>Download as PDF</span>
                                            </DropdownItem>
                                        </li>
                                        <li>
                                            <DropdownItem tag="a" href="#edit"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggle();
                                                }} >
                                                <Icon name="file-xls"/>
                                                <span>Download as XLSX</span>
                                            </DropdownItem>
                                        </li>
                                    </ul>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                        <Collapse isOpen={collapseManage}>
                            <div className="manage-content">
                                <div className="mana-member mana-item">
                                    <div className="manage-collapse mana-member-collapse" onClick={toggleCompany}>
                                        MAIN MEMBER DETAILS
                                        <span className="item-status company-status icon ni ni-minus"/>
                                    </div>
                                    <Collapse isOpen={collapseCompany}>
                                        <div className=" contact-main">
                                            <Card className="card-bordered card-preview">
                                                <Nav tabs className="mt-n3 custom-tab">
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" className={classnames({active: subActiveTab === "1"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                togglesub("1");
                                                            }} >
                                                            <Icon name="user-circle" className="mr-1"/>
                                                            Member's Personal Info
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" className={classnames({active: subActiveTab === "2"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                togglesub("2");
                                                            }}>
                                                            <Icon name="home" className="mr-1"/>
                                                            Member's Address Info
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" className={classnames({active: subActiveTab === "3"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                togglesub("3");
                                                            }}>
                                                            <Icon name="camera" className="mr-1"/>
                                                            KYC Status
                                                        </NavLink>
                                                    </NavItem>
                                                    <UncontrolledDropdown className="pay-method-dropdown mb-3">
                                                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger btn-title mt-n1 mr-n1">
                                                            <span className="">Pull Member's Information</span>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            <ul className="link-list-opt no-bdr" style={{cursor: 'pointer'}}>
                                                                <li>
                                                                    <DropdownItem tag="a"
                                                                        onClick={(ev) => {
                                                                            ev.preventDefault();
                                                                            handleImportIntoProfile();
                                                                        }}>
                                                                        <span>Import Info From My Profile</span>
                                                                    </DropdownItem>
                                                                </li>
                                                            </ul>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </Nav>
                                                <TabContent activeTab={subActiveTab}>
                                                    <TabPane tabId="1">
                                                        <PersonalInfo policyId={selectPolicyId}/>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <AddressInfo policyId={selectPolicyId}/>
                                                    </TabPane>
                                                    <TabPane tabId="3">
                                                        <KYCStatus policyId={selectPolicyId}/>
                                                    </TabPane>
                                                </TabContent>
                                            </Card>
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="mana-dependent mana-item">
                                    <div className="manage-collapse mana-dependent-collapse" onClick={toggleCategory}>
                                        DEPENDENTS
                                        <span className="item-status category-status icon ni ni-plus"/>
                                        <span className="category-cnt count">
                                            {dependentsCount}
                                            <span>dependents added</span>
                                        </span>
                                    </div>
                                    <Collapse isOpen={collapseCategory}>
                                        <div className="dependent-edit">
                                            <Card className="card-bordered card-preview">
                                                <Nav tabs className="mt-n3 custom-tab">
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" id='nav_spouse' className={classnames({active: dependentTab === "1"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                toggleDependentTab("1");
                                                            }} >
                                                            Spouse Details
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" id='nav_children' className={classnames({active: dependentTab === "2"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                toggleDependentTab("2");
                                                            }}>
                                                            Children Details
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="subnav">
                                                        <NavLink tag="a" href="#tab" id='nav_extends' className={classnames({active: dependentTab === "3"})}
                                                            onClick={(ev) => {
                                                                ev.preventDefault();
                                                                toggleDependentTab("3");
                                                            }}>
                                                            Extended Family Details
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                                <TabContent activeTab={dependentTab}>
                                                    <TabPane tabId="1">
                                                        <div className="row">
                                                            <div className="col-5 depen-mem-detail">
                                                                {
                                                                    spouseList.map((i, index) =>
                                                                        <FormGroup className="d-flex" key={index}>
                                                                            <label htmlFor="select_pull_spouse" className="form-label">
                                                                                Spouse/Partner {index + 1} Details <span className="red">*</span>
                                                                            </label>
                                                                            <div className="form-control-wrap">
                                                                                <div className="form-control-select" style={{width: '10rem'}}>
                                                                                    <Input type="select" id="select_pull_spouse" style={{width: '10rem'}} placeholder="Select Category"
                                                                                            onChange={(e) => {addSpouseDependents(e)}}>
                                                                                        <option value={0}>-- select --</option>
                                                                                        {
                                                                                            spouseList && spouseList.map((item) => {
                                                                                                return (<option value={item.id}>{item.c_firstname} {item.c_firstname}</option>)
                                                                                            })
                                                                                        }
                                                                                    </Input>
                                                                                </div>
                                                                            </div>
                                                                        </FormGroup>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="col-7 add-mem-detail">
                                                                {
                                                                    spouseDependentsList.map((item, index) => {
                                                                        return (
                                                                            <div className="added-row d-flex" key={index}>
                                                                                <p className="added-name">Spouse/Partner {index + 1} Full Name
                                                                                    <span className="name-txt">{item.c_firstname} {item.c_lastname}</span>
                                                                                </p>
                                                                                <p className="added-id">
                                                                                    Spouse/Partner {index + 1} ID# <span className="id-txt">123456789</span>
                                                                                </p>
                                                                                <Button color="" className="delete-btn" data-id={item.id}
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            deleteSpouseDependents(e)}}>
                                                                                    <Icon name="trash"/>
                                                                                </Button>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <div className="row">
                                                            <div className="col-5 depen-mem-detail">
                                                                {
                                                                    childrenList.map((i, index) =>
                                                                        <FormGroup className="d-flex" key={index}>
                                                                            <label htmlFor="select_full_children" className="form-label">
                                                                                Child {index + 1} Details <span className="red">*</span>
                                                                            </label>
                                                                            <div className="form-control-wrap">
                                                                                <div className="form-control-select" style={{width: '10rem'}}>
                                                                                    <Input type="select" id="select_full_children" style={{width: '10rem'}} placeholder="Select Category"
                                                                                           onChange={(e) => {addChildrenDependents(e)}}>
                                                                                        <option value={0}>-- select --</option>
                                                                                        {
                                                                                            childrenList && childrenList.map((item) => {
                                                                                                return (
                                                                                                    <option value={item.id}>
                                                                                                        {item.c_firstname} {item.c_firstname}
                                                                                                    </option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Input>
                                                                                </div>
                                                                            </div>
                                                                        </FormGroup>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="col-7 add-mem-detail">
                                                                {
                                                                    childrenDependentsList.map((item, index) => {
                                                                        return (
                                                                            <div className="added-row d-flex" key={index}>
                                                                                <p className="added-name">
                                                                                    Child {index + 1} Full Name
                                                                                    <span className="name-txt">{item.c_firstname} {item.c_lastname}</span>
                                                                                </p>
                                                                                <p className="added-id">
                                                                                    Child {index + 1} ID #
                                                                                    <span className="id-txt">123456789</span>
                                                                                </p>
                                                                                <Button color="" className="delete-btn" data-id={item.id}
                                                                                        onClick={(e) => {deleteChildrenDependents(e)}}>
                                                                                    <Icon name="trash"/>
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="3">
                                                        <div className="row">
                                                            <div className="col-5 depen-mem-detail">
                                                                {
                                                                    extendsList.map((i, index) =>
                                                                        <FormGroup className="d-flex" key={index}>
                                                                            <label htmlFor="select_pull_extends" className="form-label">
                                                                                Extends Family Member {index + 1} Details <span className="red">*</span>
                                                                            </label>
                                                                            <div className="form-control-wrap">
                                                                                <div className="form-control-select" style={{width: '10rem'}}>
                                                                                    <Input type="select" id="select_pull_extends" style={{width: '10rem'}} placeholder="Select Category"
                                                                                           onChange={(e) => {addExtendsDependents(e)}}>
                                                                                        <option value={0}>-- select --</option>
                                                                                        {extendsList && extendsList.map((item) => {
                                                                                            return (<option value={item.id}>{item.c_firstname} {item.c_firstname}</option>)
                                                                                        })}
                                                                                    </Input>
                                                                                </div>
                                                                            </div>
                                                                        </FormGroup>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="col-7 add-mem-detail">
                                                                {
                                                                    extendsDependentsList.map((item, index) => {
                                                                        return (
                                                                            <div className="added-row d-flex" key={index}>
                                                                                <p className="added-name">
                                                                                    Family Member {index + 1} Full Name
                                                                                    <span className="name-txt">{item.c_firstname} {item.c_lastname}</span>
                                                                                </p>
                                                                                <p className="added-id">Family
                                                                                    Member {index + 1} ID # <span
                                                                                        className="id-txt">123456789</span>
                                                                                </p>
                                                                                <Button color="" className="delete-btn" data-id={item.id}
                                                                                        onClick={(e) => {deleteExtendsDependents(e)}}>
                                                                                    <Icon name="trash"/>
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </TabPane>
                                                </TabContent>
                                                <div className="d-flex btn-group mt-3 mr-3">
                                                    <FormGroup>
                                                        <Button size="lg" className="btn-large" type="submit" color="primary"
                                                            onClick={() => {handleSaveDependents()}}>
                                                            {"Save & Proceed"}
                                                        </Button>
                                                    </FormGroup>
                                                </div>
                                            </Card>
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="mana-beneficiary mana-item">
                                    <div className="manage-collapse mana-beneficiary-collapse"
                                         onClick={toggleSubcategory}>
                                        BENEFICIARY DETAILS
                                        <span className="item-status subcategory-status icon ni ni-plus"/>
                                        <span id='beneficiaries_count' className="category-cnt count">
                                            {beneficiariesCount}<span>beneficiaries added</span>
                                        </span>
                                    </div>
                                    <Collapse isOpen={collapseSubcategory}>
                                        <div className="beneficiary-edit">
                                            <Card className="card-bordered card-preview">
                                                <BeneficiaryTable contactlist={props.contactList}/>
                                            </Card>
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="signature mana-item">
                                    <FormGroup>
                                        <Button
                                            size="lg"
                                            className="btn-large btn-sign"
                                            type="submit"
                                            color="primary"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                togglePreview()
                                            }}
                                        >
                                            {loading ? <Spinner size="sm" color="light"/> : "Sign and Submit"}
                                        </Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </Content>

            <Modal isOpen={modal} toggle={toggleModal} className="modal-md">
                <ModalHeader toggle={toggle}>View All policies</ModalHeader>
                <ModalBody>
                    <div className="policy-info">
                        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="sub-group">
                                <FormGroup>
                                    <div className="form-control-wrap text-form-wrap d-flex">
                                        <div className="form-label-group">
                                            <label className="form-label" htmlFor="default-01">
                                                Lookup Policy Name
                                            </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            id="companyName"
                                            name="companyname"
                                            ref={register({required: "This field is required"})}
                                            placeholder="Select Category"
                                            className={`form-control-lg form-control is-hidden company-name item-name`}
                                        />
                                        {errors.passnew && (
                                            <span className="invalid">{errors.passnew.message}</span>
                                        )}
                                    </div>
                                </FormGroup>
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label">
                                        Lookup Product Name
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="default-4"
                                                   placeholder="Select Category">
                                                <option value="default_option">Default Option</option>
                                                <option value="option_select_name">Option select name</option>
                                                <option value="option_select_name">Option select name</option>
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label">
                                        Lookup Category Name
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="default-4"
                                                   placeholder="Select Category">
                                                <option value="default_option">Default Option</option>
                                                <option value="option_select_name">Option select name</option>
                                                <option value="option_select_name">Option select name</option>
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label">
                                        Lookup SubCategory Name
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="default-4"
                                                   placeholder="Select Category">
                                                <option value="default_option">Default Option</option>
                                                <option value="option_select_name">Option select name</option>
                                                <option value="option_select_name">Option select name</option>
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup className="d-flex">
                                    <label htmlFor="default-4" className="form-label">
                                        Lookup By Active Status
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                            <Input type="select" name="select" id="default-4"
                                                   placeholder="Select Category">
                                                <option value="default_option">Default Option</option>
                                                <option value="option_select_name">Option select name</option>
                                                <option value="option_select_name">Option select name</option>
                                            </Input>
                                        </div>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Button
                                        size="lg"
                                        className="btn-large"
                                        type="submit"
                                        color="primary"
                                    >
                                        {loading ? <Spinner size="sm" color="light"/> : "Search"}
                                    </Button>
                                </FormGroup>
                            </div>
                        </Form>
                    </div>
                    <div className="view-all-policy-table">
                        <ViewPolicyTable/>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modalPreview} toggle={togglePreview}
                   className="modal-md preview-modal modal-signature first">
                <div className="first-confirm">
                    <ModalHeader className="preview-head" toggle={togglePreview}>Preview Policy Information</ModalHeader>
                    <ModalBody>
                        <div className="policy-detail-info info-part">
                            <div className="row">
                                <div className="col-6">
                                    <div className="item">
                                        <p className="label">Policy Name</p>
                                        <p className="txt">{selectedPolicy.c_policyname}</p>
                                    </div>
                                    <div className="item">
                                        <p className="label">Fixed Paying Schedule</p>
                                        <p className="txt">{selectedPolicy.pay_schedule_name}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="item">
                                        <p className="label">Product Name</p>
                                        <p className="txt">{selectedPolicy.c_productname}</p>
                                    </div>
                                    <div className="item">
                                        <p className="label">Type</p>
                                        <p className="txt">{moduleTypeList[parseInt(moduleType) - 1]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="premium-info info-part">
                            <h4 className="item-title">DETAILS</h4>
                            <p className="main-mem-name item">Main Member Name :
                                <span className="main-mem-name txt">
                                    {
                                        props.mainMemberData != null ? `${props.mainMemberData.c_firstname} ${props.mainMemberData.c_lastname}` : ""
                                    }
                                </span>
                            </p>
                            <p className="select-plan-option item">Selected Plan Option :
                                <span className="select-plan-option txt">{coverTypeStr}</span>
                            </p>
                            <p className="premium-amount item">Premium Amount:
                                <span className="premium-amount txt"> R {premiumCal}</span>
                            </p>
                            <p className="cover-amount item">Coverage Amount:
                                <span className="cover-amount txt"> R {numberWithCommas(coverAmount.n_coveramount)}</span>
                            </p>
                            <div className="option-group">
                                <div className="d-flex">
                                    <p className="label">Main Member <span className="age-group">(Age Group {ageVal[0]} - {ageVal[1]} years)</span>
                                    </p>
                                    <p className="txt"> : R {premiumAmount[0]}</p>
                                </div>
                                {
                                    premiumAmount[1] > 0 ?
                                        <div className="d-flex">
                                            <p className="label">
                                                {spouseCount} Spouses
                                                <span className="age-group">(Age Group {spouseAgeVal[0]} - {spouseAgeVal[1]} years)</span></p>
                                            <p className="txt"> : R {premiumAmount[1]}</p>
                                        </div>
                                    : ""
                                }
                                {
                                    premiumAmount[2] > 0 ?
                                        <div className="d-flex">
                                            <p className="label">
                                                {childrenCount} Children
                                                <span className="age-group">(Age Group {childrenAgeVal[0]} - {childrenAgeVal[1]} years)</span>
                                            </p>
                                            <p className="txt"> : R {premiumAmount[2]}</p>
                                        </div>
                                    : ""
                                }
                                {
                                    premiumAmount[3] > 0 ?
                                        <div className="d-flex">
                                            <p className="label">
                                                {extCount} Extended Family Members
                                                <span className="age-group">(Age Group {extAgeVal[0]} - {extAgeVal[1]} years)</span>
                                            </p>
                                            <p className="txt"> : R {premiumAmount[3]}</p>
                                        </div>
                                    : ""
                                }
                            </div>
                            <div className="option-group">
                                <div className="d-flex">
                                    <p className="label">Premium Amount</p>
                                    <p className="txt">: R {premiumCal}</p>
                                </div>
                                <div className="d-flex">
                                    <p className="label">Taxes</p>
                                    <p className="txt">: R {parseInt(premiumCal) * 0.0625}</p>
                                </div>
                                <div className="d-flex">
                                    <p className="label">Total Amount To be Paid</p>
                                    <p className="txt">: R {parseInt(premiumCal) * 1.0625}</p>
                                </div>
                            </div>
                        </div>

                        <div className="declaration-info info-part">
                            <h4 className="item-title">POLICY DECLARATION</h4>
                            <div className="declaration-txt">
                                {selectedPolicy.policy_declaration}
                            </div>
                        </div>
                        <div className="btn-group d-flex mt-5">
                            <FormGroup>
                                <Button
                                    size="lg"
                                    className="btn-large"
                                    type="submit"
                                    color="primary"
                                    onClick={() => toggleModalStatus(2)}
                                >
                                    {"Proceed"}
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    size="lg"
                                    className="btn-large"
                                    type="submit"
                                    color="primary"
                                    onClick={() => setModalPreview(false)}
                                >
                                    {"Edit"}
                                </Button>
                            </FormGroup>
                        </div>
                    </ModalBody>
                </div>
                <div className="second-confirm">
                    <ModalHeader className="preview-head" toggle={togglePreview}>Review and Act on following
                        declaration</ModalHeader>
                    <ModalBody>
                        <div className="person-info d-flex">
                            <img src={avatar} alt="img"/>
                            <div className="account">
                                <p className="name">Codi George</p>
                                <p className="email">codi_123@gmail.com</p>
                            </div>
                        </div>
                        <label className="form-label text-title" htmlFor="default-01">
                            Please sign the declaration <span className="red">*</span>
                        </label>
                        <div className="sign-content">
                            <p className="confirm-title">Confirm your name, initials and signatures</p>
                            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="sub-group first-part d-flex">
                                    <FormGroup>
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Initials <span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="companyName"
                                                name="companyname"
                                                ref={register({required: "This field is required"})}
                                                placeholder="Initials"
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
                                                    First Name <span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="companyName"
                                                name="companyname"
                                                ref={register({required: "This field is required"})}
                                                placeholder="Enter your First Name"
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
                                                    Last Name <span className="red">*</span>
                                                </label>
                                            </div>
                                            <input
                                                type={"text"}
                                                id="companyName"
                                                name="companyname"
                                                ref={register({required: "This field is required"})}
                                                placeholder="Enter your Last Name"
                                                className={`form-control-lg form-control is-hidden company-name item-name`}
                                            />
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="sub-group second-part d-flex">
                                    <FormGroup>
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    Signatures <span className="red">*</span>
                                                </label>
                                            </div>
                                            <div className="edit-input">
                                                <span className="icon ni ni-pen2"/>
                                                <SignaturePad penColor='green'
                                                              canvasProps={{
                                                                  width: 500,
                                                                  height: 200,
                                                                  className: 'sigCanvas'
                                                              }}
                                                              ref={signPad}
                                                />
                                            </div>
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="form-control-wrap d-flex">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    DS <span className="red">*</span>
                                                </label>
                                            </div>
                                            <div className="edit-input">
                                                <span className="icon ni ni-pen2"/>
                                                <textarea id="d-sign-txt" className="digital-signature"
                                                          placeholder="Digital Signature">

                        </textarea>
                                            </div>
                                            {errors.passnew && (
                                                <span className="invalid">{errors.passnew.message}</span>
                                            )}
                                        </div>
                                    </FormGroup>
                                </div>
                            </Form>
                            <div className="sign-detail d-flex">
                                <img src={point} alt="img"/>
                                <p className="sign-explain">
                                    By selecting Sign and Submit. I agree that the signature and initials will be the
                                    read the electronic representation of
                                    my signature and initials for all purposes then I (or my agent) use them on
                                    documents, including legally binding contracts
                                    -just the same as a pen and signature or initial.
                                </p>
                            </div>
                        </div>
                        <div className="modal-bottom d-flex">
                            <FormGroup>
                                <Button
                                    size="lg"
                                    className="btn-large"
                                    type="submit"
                                    color="primary"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        saveCanvas();
                                        toggleModalStatus(3);
                                    }}
                                >
                                    {loading ? <Spinner size="sm" color="light"/> : "Sign and Submit"}
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    size="lg"
                                    className="btn-large"
                                    type="submit"
                                    color="primary"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        toggleModalStatus(1);
                                    }}
                                >
                                    {loading ? <Spinner size="sm" color="light"/> : "Go Back"}
                                </Button>
                            </FormGroup>
                        </div>
                    </ModalBody>
                </div>
                <div className="result-submit">
                    <ModalBody>
                        <div className="result-top d-flex">
                            <Icon name="check-circle"/>
                            <h3 className="result-title">Thank you for submitting your policy.</h3>
                        </div>
                        <div className="result-content">
                            <p className="item"><span className="label">Reference ID</span><span className="txt">: REFIMS112390</span>
                            </p>
                        </div>
                        <FormGroup>
                            <Button
                                size="lg"
                                className="btn-large"
                                type="submit"
                                color="primary"
                            >
                                {loading ? <Spinner size="sm" color="light"/> : "Download the cerificate"}
                            </Button>
                        </FormGroup>
                    </ModalBody>
                </div>
            </Modal>
        </React.Fragment>
    );
};


const mapStateToProps = (state) => {
    return {
        premium: state.premiumReducer,
        covertypelist: state.covertypeReducer,
        policylist: state.policyViewReducer,
        coveramountlist: state.coveramountReducer,
        membertypelist: state.getsubdataReducer.membertype,
        userInfo: state.userinfoReducer,
        countries: state.contactReducer.countrylist,
        modecommlist: state.contactReducer.modecommlist,
        regionlist: state.contactReducer.regionlist,
        circuitlist: state.contactReducer.allcircuits,
        templelist: state.contactReducer.alltemples,
        mainMemberData: state.policyReducer.mainMember,
        contactList: state.contactReducer.contactlist,
        policyPremium: state.policyReducer.policyPremium,
        policyDependents: state.policyReducer.policyDependents
    };
};

export default connect(mapStateToProps, {
    getcoverType,
    getageGroup,
    getcontactlist,
    getUserById,
    getmodecommlist,
    getcountrylist,
    getregion,
    getcircuit,
    gettemple,
    getcircuitbyregion,
    gettemplebycircuit,
    getPolicyMember,
    addPolicyPremium,
    getPolicyDependents,
    addPolicyDependents
})(UserPolicyManage);
