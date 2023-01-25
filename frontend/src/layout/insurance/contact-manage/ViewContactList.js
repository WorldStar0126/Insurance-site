import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    Form, FormGroup, Spinner, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Row, Col, Collapse
} from "reactstrap";
import {UserAvatar, Icon, DataTablePagination} from "../../../components/Component";
import {findUpper, formatDate} from "../../../utils/Utils";
import DataTable from "react-data-table-component";
import {Link} from "react-scroll";
import {
    BlockHead,
    BlockHeadContent,
    BlockBetween,
    BlockTitle,
    Button,
    ReactDataTable
} from "../../../components/Component";
import Nouislider from "nouislider-react";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {
    getcontactlist,
    getcontactdata,
    deleteContact,
    SetContactId,
    getcircuit,
    gettemple
} from "../../../actions/tutorials";


let sessiontoken = sessionStorage.getItem("token");

const ViewContactList = (props) => {

    const [rangeValue, setRangeValue] = useState([10, 50]);
    const [contactList, setContactList] = useState([]);
    const [contactData, setContactData] = useState({});
    const [selectedData, setSelectedData] = useState();
    const [collapseView, setCollapseView] = useState(true);

    const rangeChange = (e) => {
        setRangeValue(e);
    };

    const toggleView = () => {
        setCollapseView(!collapseView);
    }


    useEffect(() => {
        props.getcontactlist(sessiontoken);
        props.getcircuit();
        props.gettemple();
    }, []);

    const [rowsPerPageS, setRowsPerPage] = useState(5);
    const [mobileView, setMobileView] = useState();

    // function to change the design view under 1200 px
    const viewChange = () => {
        if (window.innerWidth < 960 && mobileView) {
            setMobileView(true);
        } else {
            setMobileView(false);
        }
    };

    const handleChange = (state) => {
        setSelectedData(state.selectedRows);
    };

    useEffect(() => {
        window.addEventListener("load", viewChange);
        window.addEventListener("resize", viewChange);
        return () => {
            window.removeEventListener("resize", viewChange);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getContactCollapse = (id) => {
        props.getcontactdata(sessiontoken, id);
    };

    useEffect(() => {
        handleSearch();
        setContactData(props.contactData[0]);
        setContactView(props.contactData[0]);
    }, [props]);

    const handleSearch = () => {

        let contact_name = document.getElementById('text_contact_name').value;
        let relationship = document.getElementById('select_relationship').value;
        let refer_status = document.getElementById('select_refer_status').value;
        let min_age = parseInt(rangeValue[0]);
        let max_age = parseInt(rangeValue[1]);

        let list = [];
        let totalContactList = props.contactList;

        for (let i in totalContactList) {

            let item = {
                id: totalContactList[i].id,
                name: `${totalContactList[i].c_firstname} ${totalContactList[i].c_lastname}`,
                email: totalContactList[i].c_email,
                age: parseInt(new Date().getFullYear() - new Date(totalContactList[i].d_dob).getFullYear()),
                relationship: totalContactList[i].relation_name,
                kyc_status: totalContactList[i].kyc_status,
                refer_status: totalContactList[i].n_refer_status
            };

            if (contact_name != '' && !item.name.toUpperCase().includes(contact_name.toUpperCase())) continue;
            if (relationship != '' && item.relationship != relationship) continue;
            if (refer_status != -1 && item.refer_status != refer_status) continue;
            if (item.age < min_age || item.age > max_age) continue;

            list.push(item);
        }

        setContactList(list);

    }

    const setSelectData = (select, array, region, value) => {

        let html = "<option value='0'>-- select --</option>";

        for (let i in array) {
            if (array[i].n_regionid == region) {
                html += `<option value='${array[i].id}' key='${i}'>${array[i].c_name}</option>`;
            }
        }

        select.innerHTML = html;
        select.value = value;

    }

    const setContactView = (currentContact) => {

        if (currentContact == undefined) return;
        props.SetContactId(currentContact.id);

        if (currentContact.c_title == 'mr') document.getElementById('titleradio-mr').checked = true;
        else if (currentContact.c_title == 'mrs') document.getElementById('titleradio-mrs').checked = true;
        else if (currentContact.c_title == 'ms') document.getElementById('titleradio-ms').checked = true;

        // main contact info
        document.getElementById('contactinitial').value = currentContact.c_initials;
        document.getElementById('contactfirstname').value = currentContact.c_firstname;
        document.getElementById('contactlastname').value = currentContact.c_lastname;
        document.getElementById('contactgender').value = currentContact.n_gender;
        document.getElementById('contact-birthday').value = formatDate(currentContact.d_dob);
        document.getElementById('relamainmem').value = currentContact.n_relationship;
        document.getElementById('contactemail').value = currentContact.c_email;
        document.getElementById('contactelphone').value = currentContact.n_tel_home;
        document.getElementById('contactcell').value = currentContact.n_cell;

        // contact address info

        if (currentContact.addressinfo[0] != undefined) {

            console.log(currentContact.addressinfo[0]);
            document.getElementById('phy-residenaddr1').value = currentContact.addressinfo[0].c_phy_add_l1;
            document.getElementById('phy-residenaddr2').value = currentContact.addressinfo[0].c_phy_add_l2;
            document.getElementById('selectphycountry').value = currentContact.addressinfo[0].n_phy_country;
            document.getElementById('phy-contactpostalcode').value = currentContact.addressinfo[0].n_phy_postal_code;
            document.getElementById('select-phi-region').value = currentContact.addressinfo[0].c_phy_region;

            setSelectData(document.getElementById('select-phi-circuit'), props.circuitlist,
                currentContact.addressinfo[0].c_phy_region, currentContact.addressinfo[0].c_phy_circuit);
            setSelectData(document.getElementById('select-phi-temple'), props.templelist,
                currentContact.addressinfo[0].c_phy_region, currentContact.addressinfo[0].c_phy_temple);

            document.getElementById('post-residenaddr1').value = currentContact.addressinfo[0].c_res_add_l1;
            document.getElementById('post-residenaddr2').value = currentContact.addressinfo[0].c_res_add_l2;
            document.getElementById('selectpostcountry').value = currentContact.addressinfo[0].n_res_country;
            document.getElementById('post-contactpostalcode').value = currentContact.addressinfo[0].n_res_postal_code;
            document.getElementById('select-post-region').value = currentContact.addressinfo[0].c_res_region;

            setSelectData(document.getElementById('select-post-circuit'), props.circuitlist,
                currentContact.addressinfo[0].c_res_region, currentContact.addressinfo[0].c_res_circuit);
            setSelectData(document.getElementById('select-post-temple'), props.templelist,
                currentContact.addressinfo[0].c_res_region, currentContact.addressinfo[0].c_res_temple);

            let comm = currentContact.addressinfo[0].n_mode_communication.split(',');
            for (let item of comm) {
                document.getElementById(`communimode${item}`).checked = true;
            }

        }

        // contact identification

        if (currentContact.kycinfo[0] != undefined) {
            document.getElementById('identificatioinType').value = currentContact.kycinfo[0].n_idtype;
            document.getElementById('contactveriID').value = currentContact.kycinfo[0].n_idnum;
            document.getElementById('identificationType2').value = currentContact.kycinfo[0].n_addresstype;
            document.getElementById('contactaddrID').value = currentContact.kycinfo[0].n_addressnum;
        }


    };

    const deleteItem = () => {
        let confirmTitle;
        if (selectedData.length == 0) {
            Swal.fire({
                title: "Please select contact to delete.",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "OK",
            })
        } else {
            Swal.fire({
                title: confirmTitle = selectedData.length == 1 ? `Are you sure to delete this contact?` : `Are you sure to delete these ${selectedData.length} contacts?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete!",
            }).then((result) => {
                if (result.isConfirmed) {
                    for (let i = 0; i < selectedData.length; i++) {
                        props.deleteContact(sessiontoken, selectedData[i].id);
                        props.getcontactlist(sessiontoken);
                    }
                }
            });
        }
    };

    const contactlistColumn = [
        {
            name: "NAME",
            selector: (row) => row.name,
            compact: true,
            grow: 2,
            style: {paddingRight: "20px"},
            cell: (row) => (
                <div className="user-card mt-2 mb-2">
                    <UserAvatar theme={row.avatarBg} text={(findUpper(row.name))} image={row.image}/>
                    <div className="user-info">
                        <span className="tb-lead">{row.name}{" "}
                        <span className={`dot dot-${"success"} d-md-none ml-1`}/></span>
                        <span>{row.email}</span>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            name: "AGE",
            selector: (row) => `${row.age} years`,
            minWidth: "80px",
            sortable: true,
            hide: 480,
        },
        {
            name: "RELATIONSHIP",
            selector: (row) => row.relationship,
            sortable: true,
            minWidth: "170px",
            cell: (row) => <span style={{padding: '5px 10px', background: '#ddd', borderRadius: '15px'}}>{row.relationship}</span>,
            hide: "sm",
        },
        {
            name: "KYC",
            selector: (row) => row.kyc_status,
            minWidth: "140px",
            hide: "sm",
            cell: (row) => (
                <span className={`tb-status text-${
                    row.kyc_status == null ? "danger" : row.kyc_status == 0 ? "warning" : "success"
                }`} style={{padding: '5px 10px', background: '#eee', borderRadius: '15px'}}>
                    {row.kyc_status == null ? "Not Uploaded" : row.kyc_status == 0 ? "Submitted" : "Approved"}
        </span>
            ),
        },
        {
            name: "REFERRAL",
            selector: (row) => row.refer_status,
            hide: "sm",
            cell: (row) => (
                <div>
                    <Button size="sm" className="btn-small" type="submit" color="primary"
                            style={{width: '74px', padding: '5px', display: row.refer_status == 0 ? 'block' : 'none'}}>
                        Refer Now</Button>
                    <span
                        className={`tb-status text-${row.refer_status == 0 ? "danger" : row.refer_status == 1 ? "warning" : "success"}`}
                        style={{
                            padding: '5px 10px',
                            background: '#eee',
                            borderRadius: '15px',
                            display: row.refer_status == 0 ? 'none' : 'block'
                        }}>
                      {row.refer_status == 1 ? 'Referred' : 'Joined'}
                  </span>
                </div>
            ),
        },
        {
            name: (
                <div>
                    <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                            <span className="icon ni ni-more-v"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                                <li>
                                    <DropdownItem
                                        tag="a"
                                        href="#delete"
                                        onClick={(ev) => {
                                            ev.preventDefault();
                                            deleteItem();
                                        }}
                                    >
                                        {/* <Icon name="trash"></Icon> */}
                                        <span className="icon ni ni-trash"></span>
                                        <span>Delete Selected Items</span>
                                    </DropdownItem>
                                </li>
                            </ul>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            ),
            hide: "sm",
            width: "70px",
            cell: (row) => (
                <div className="user-card">
                    <Link to="contactPanel" spy={true} smooth={true}>
                        <Button className="btn-icon" onClick={() => getContactCollapse(row.id)}>
                            <span>Edit</span>
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <React.Fragment>
            <div className="view-contactlist">
                <div className="view-policy-content contactlist-content">
                    <div className="payment-table-collapse submain-collapse" onClick={toggleView}
                         style={{marginBottom: '1rem'}}>
                        <span className="icon ni ni-chevron-down"/> Contact Filter
                    </div>
                    <Collapse isOpen={collapseView}>
                        <div className="policy-info">
                            <div className="is-alter" style={{width: '60rem', marginBottom: '1rem'}}>
                                <div className="sub-group">
                                    <div className="sub-form d-flex">
                                        <FormGroup className="d-flex">
                                            <label htmlFor="default-4" className="form-label">
                                                Lookup Contact Name
                                            </label>
                                            <div className="form-control-wrap">
                                                <Input type="text" id="text_contact_name"
                                                       placeholder="Enter Contact Name"
                                                       style={{width: '12rem'}}/>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="d-flex">
                                            <label htmlFor="default-4" className="form-label form-control-wrap">
                                                Search by Relationship
                                            </label>
                                            <div className="form-control-wrap">
                                                <div className="form-control-select">
                                                    <Input type="select" name="select" id="select_relationship"
                                                           placeholder="Select Relation ship" style={{width: '10rem'}}>
                                                        <option value="">-- select --</option>
                                                        {
                                                            props.relationshiplist && props.relationshiplist.length > 0 ? props.relationshiplist.map((item, index) => {
                                                                    return (<option value={item.relation_name}
                                                                                    key={index}>{item.relation_name}</option>)
                                                                })
                                                                :
                                                                <></>
                                                        }
                                                    </Input>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="sub-form d-flex">
                                        <FormGroup className="d-flex">
                                            <label htmlFor="default-4" className="form-label">
                                                Search by Refferal Status
                                            </label>
                                            <div className="form-control-wrap">
                                                <div className="form-control-select">
                                                    <Input type="select" name="select" id="select_refer_status"
                                                           placeholder="Select Refferal Status"
                                                           style={{width: '10rem'}}>
                                                        <option value={-1}>-- select --</option>
                                                        <option value={0}>Not refer</option>
                                                        <option value={1}>Referred</option>
                                                        <option value={2}>Joined</option>
                                                    </Input>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className="price-filter d-flex">
                                        <label htmlFor="default-4" className="form-label">
                                            Search by Age
                                        </label>
                                        <Nouislider id="slider_age_picker" className="form-range-slider" accessibility
                                                    connect={true}
                                                    start={[10, 50]} tooltips={true} step={1} range={{min: 0, max: 100}}
                                                    onSlide={(e) => rangeChange(e)}/>
                                        <div className="reange-value d-flex">
                                            <span>{`min : ${rangeValue[0]}`}</span>
                                            <span className="ml-3 mr-3">-</span>
                                            <span>{`max : ${rangeValue[1]}`}</span>
                                        </div>
                                    </div>
                                    <FormGroup>
                                        <Button size="lg" className="btn-large" color="primary"
                                                onClick={() => handleSearch()}>
                                            {"Search"}
                                        </Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    {/* DataTable */}
                    <div className={`dataTables_wrapper dt-bootstrap4 no-footer`}>
                        <Row className={`justify-between g-2`}>
                            <Col className="col-5 text-right" sm="8">
                                <div className="datatable-filter">
                                    <div className="d-flex justify-content-end g-2">
                                        {/* {<Export data={data} />} */}
                                        <div className="dataTables_length" id="DataTables_Table_0_length">
                                            <label>
                                                <span className="d-none d-sm-inline-block">Page Size</span>
                                                <div className="form-control-select">
                                                    {" "}
                                                    <select
                                                        name="DataTables_Table_0_length"
                                                        className="custom-select custom-select-sm form-control form-control-sm"
                                                        onChange={(e) => setRowsPerPage(e.target.value)}
                                                        value={rowsPerPageS}
                                                    >
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="40">40</option>
                                                        <option value="50">50</option>
                                                    </select>{" "}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <DataTable
                            data={contactList}
                            columns={contactlistColumn}
                            onSelectedRowsChange={handleChange}
                            noDataComponent={<div className="p-2">There are no records found</div>}
                            sortIcon={
                                <div>
                                    <span>&darr;</span>
                                    <span>&uarr;</span>
                                </div>
                            }
                            pagination
                            paginationComponent={({
                                                      currentPage,
                                                      rowsPerPage,
                                                      rowCount,
                                                      onChangePage,
                                                      onChangeRowsPerPage
                                                  }) => (
                                <DataTablePagination
                                    customItemPerPage={rowsPerPageS}
                                    itemPerPage={rowsPerPage}
                                    totalItems={rowCount}
                                    paginate={onChangePage}
                                    currentPage={currentPage}
                                    onChangeRowsPerPage={onChangeRowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                />
                            )}
                            className="nk-tb-list contactlist-table"
                            selectableRows/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        relationshiplist: state.contactReducer.relationshiplist,
        contactList: state.contactReducer.contactlist,
        contactData: state.contactReducer.contactdata,
        circuitlist: state.contactReducer.allcircuits,
        templelist: state.contactReducer.alltemples,
    };
};

export default connect(mapStateToProps, {
    getcontactlist,
    getcontactdata,
    deleteContact,
    getcircuit,
    gettemple,
    SetContactId
})(ViewContactList);

