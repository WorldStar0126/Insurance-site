import React, {useEffect, useState, forwardRef, useRef, Fragment} from "react";
import {connect} from "react-redux";
import DataTable from "react-data-table-component";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Modal,
    ModalBody,
    ModalHeader, FormGroup
} from "reactstrap";
import Button from "../../button/Button";
import Icon from "../../icon/Icon";

import {} from "../../../actions/tutorials";
import Swal from "sweetalert2";

const BeneficiaryTable = (props) => {

    const [modalBeneficiary, setModalBeneficiary] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [contactList, setContactList] = useState([]);
    const [selectedContact, setSelectedContact] = useState([]);

    useEffect(() => {
        let list = props.contactlist;
        let length = list.length;
        for (let i = 0; i < length; i++) {
            list[i].name = `${list[i].c_firstname} ${list[i].c_lastname}`;
            list[i].age = parseInt(new Date().getFullYear() - new Date(list[i].d_dob).getFullYear());
        }
        setContactList(list);
    }, [props]);

    const toggleModal = () => {
        setModalBeneficiary(!modalBeneficiary);
    };

    const BeneficiaryColumn = [
        {
            name: "NAME",
            selector: (row) => row.name,
            minWidth: "140px",
            cell: (row) => (
                <div className="user-card mt-2 mb-2">
                    <div className="user-info">
                        <span className="tb-lead">
                            {row.name}
                        </span>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            name: "AGE",
            selector: (row) => row.age,
            minWidth: "140px",
            cell: (row) => (
                <span className="tb-amount">
                    {row.age} years
                </span>
            ),
            sortable: true,
            hide: 480,
        },
        {
            name: "RELATIONSHIP",
            selector: (row) => row.relation_name,
            sortable: true,
            cell: (row) => <span>{row.relation_name}</span>,
            hide: "md",
        },
        {
            name: "EMAIL",
            selector: (row) => row.c_email,
            minWidth: "140px",
            cell: (row) => (
                <span className="tb-amount">
                    {row.c_email}
                </span>
            ),
            sortable: true,
            hide: 480,
        },
        {
            name: "ID NUMBER",
            selector: (row) => row.contact_id_num,
            sortable: true,
            minWidth: "170px",
            hide: "md",
            cell: (row) => (
                <span className="tb-amount">
                    12345678
                </span>
            ),
        },
    ];

    const handleSelect = (state) => {
        setSelectedData(state.selectedRows);
    };

    const handleChange = () => {
        setSelectedContact(selectedData);
        setModalBeneficiary(false);
        document.getElementById('beneficiaries_count').innerHTML =
            `${selectedData.length} <span>${selectedData.length > 1 ? 'beneficiaries' : 'beneficiary'} added</span>`
    };

    const deleteItem = (e) => {

        Swal.fire({
            title: "Are you sure delete beneficiary?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK",
        }).then(result => {
            if (result.isConfirmed) {
                let index = parseInt(e.target.dataset.index);
                let list = selectedContact;
                list.splice(index, 1);
                setSelectedContact(list);
                document.getElementById('beneficiaries_count').innerHTML =
                    `${list.length} <span>${list.length > 1 ? 'beneficiaries' : 'beneficiary'} added</span>`;
                setModalBeneficiary(true);
                setModalBeneficiary(false);
            }
        });
    };

    return (
        <Fragment>
            <UncontrolledDropdown className="pay-method-dropdown mb-3">
                <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger btn-title mt-n1 mr-n1">
                    <span className="">Pull Contact Information</span>
                </DropdownToggle>
                <DropdownMenu right>
                    <ul className="link-list-opt no-bdr">
                        <li>
                            <DropdownItem
                                tag="a" style={{cursor: 'pointer'}}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setModalBeneficiary(true);
                                }}>
                                <span>Add from Existing Contact</span>
                            </DropdownItem>
                        </li>
                        <li>
                            <DropdownItem tag="a"  style={{cursor: 'pointer'}} href={'/contact'}>
                                <span>Add a New Contact</span>
                            </DropdownItem>
                        </li>
                    </ul>
                </DropdownMenu>
            </UncontrolledDropdown>
            <table className="table table-orders">
                <thead className="tb-odr-head">
                <tr className="tb-odr-item">
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">name</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">email</span>
                    </th>
                    <th className="tb-odr-info">
                        <span className="tb-odr-id">age</span>
                        <span className="tb-odr-date d-none d-md-inline-block">id number</span>
                    </th>
                    <th className="tb-odr-amount">
                        <span className="tb-odr-total">relationship</span>
                    </th>
                    <th className="tb-odr-action">
                    </th>
                </tr>
                </thead>
                <tbody className="tb-odr-body">
                {selectedContact && selectedContact.length > 0 ? selectedContact.map((item, index) => {
                    return (
                        <tr className="tb-odr-item" key={index}>
                            <td className="tb-odr-info">
                                <span className="tb-odr-id">
                                    {item.name}
                                </span>
                            </td>
                            <td className="tb-odr-info" style={{marginLeft: '40%'}}>
                                <span className="tb-odr-id">
                                    {item.c_email}
                                </span>
                            </td>
                            <td className="tb-odr-info">
                                <span className="tb-odr-id">{item.age} years</span>
                                <span className="tb-odr-id">1234567</span>
                            </td>
                            <td className="tb-odr-amount">
                              <span className="tb-odr-total">
                                <span className="amount">{item.relation_name}</span>
                              </span>
                            </td>
                            <td className="tb-odr-action">
                                <div className="tb-odr-btns d-md-inline dropdown">
                                    <Button color="" className="delete-btn" onClick={(e) => {deleteItem(e)}}>
                                        <Icon name="trash" data-index={index}/>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    );
                }) : <><td colSpan={6} className={'text-center'}><div className="p-2">There are no records found</div></td></>}
                </tbody>
            </table>

            <Modal isOpen={modalBeneficiary} toggle={toggleModal} className="modal-md beneficiary-modal">
                <ModalHeader toggle={toggleModal}>Select Beneficiary Member</ModalHeader>
                <ModalBody>
                    <div className="view-contactlist">
                        <div className="view-policy-content contactlist-content">
                            <div className={`dataTables_wrapper dt-bootstrap4 no-footer`}>
                                <DataTable
                                    data={contactList}
                                    columns={BeneficiaryColumn}
                                    pagination
                                    onSelectedRowsChange={handleSelect}
                                    noDataComponent={<div className="p-2">There are no records found</div>}
                                    className="nk-tb-list contactlist-table"
                                    selectableRows
                                />
                            </div>
                            <FormGroup style={{float:'right'}}>
                                <Button size="lg" className="btn-large" color="primary"
                                        onClick={() => {handleChange()}}>
                                    {"Save & Proceed"}
                                </Button>
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, {})(BeneficiaryTable);
  
  