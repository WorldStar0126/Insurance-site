import React, { useEffect, useState, forwardRef } from "react";
import { connect } from "react-redux";
import Head from "../../layout/head/Head";
import Content from "../../layout/content/Content";
import { Collapse, DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem, Card, Form, FormGroup,
        Spinner, Label, Input, Modal, ModalBody, ModalHeader,Alert, UncontrolledAlert, Col, Row} from "reactstrap";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import { DataTablePagination } from "../../components/Component";
import Nouislider from "nouislider-react";
import Docxtemplater from "docxtemplater";
import PizZip from 'pizzip';
import exportFromJSON from "export-from-json";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
  ReactDataTable,
  NSComponent,
  ManageCoverAmountTable,
  ManageOptionTypeTable
} from "../../components/Component";
import {Link } from "react-scroll"
import FilterDropDown from "../../layout/insurance/policy-manage/FilterDropDown";
import MyPoliciesDropDown from "../../layout/insurance/product-manage/MyPoliciesDropDown";
import ViewDropDown from "../../layout/insurance/product-manage/ViewDropDown";
import { useForm } from "react-hook-form";
import { DataTableData, dataTableColumns, TableColumns_allpolicy} from "../../pages/components/table/TableData";
import PremiumOption from "../../layout/insurance/policy-manage/PremiumOption";
import { fromError } from "@apollo/client";
import { getpaySchdeule, AddPolicy, UpdatePolicy, DeletePolicy, getPolicyById, getPolicyView, setPremiumCnt } from "../../actions/tutorials";
import http from "../../http-common";
import Swal from "sweetalert2";

const PolicyManage = (props) => {

  const [collapseView, setCollapseView] = useState(false);
  const [collapseCover, setCollapseCover] = useState(false);
  const [collapseManage, setCollapseManage] = useState(true);
  const [premiumCnt, setPremiumCnt] = useState(1);
  const [myProductList, setMyProductList] = useState([]);
  const [myPolicyViewList, setMyPolicyViewList] = useState([]);
  const [paySchdulelist, setPaySchdulelist] = useState([]);
  const [moduleType, setModuleType] = useState("Funeral");
  const [rangeValue, setRangeValue] = useState([10, 50]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [previewBtnStatus, setPreviewBtnStatus] = useState(false);
  const [selectedData, setSelectedData] = React.useState();
  
  const TableColumns_policy = [
    {
      name: "POLICY NAME",
      selector: (row) => row.c_policyname,
      sortable: true,
      hide: 370,
    },
    {
      name: "PRODUCT NAME",
      selector: (row) => row.c_productname,
      sortable: true,
      hide: "sm",
    },
    {
      name: "COMPANY",
      selector: (row) => row.company,
      sortable: true,
      hide: "sm",
    },
    {
      name: "CATEGORY",
      selector: (row) => row.category,
      sortable: true,
      hide: "md",
    },
    {
      name: "# OF SUBSCRIBERS",
      selector: (row) => row.age,
      sortable: true,
      hide: "sm",
    },
  
    {
      name: (
        <div>
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                <span className="icon ni ni-more-v"></span>
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
      selector: (row) => row.salary,
      sortable: false,
      hide: "md",
      style: { paddingRight: "20px" },
      cell: (row) => (
        <div className="user-card mt-2 mb-2" >
          <Link to="policyPanel" spy={true} smooth={true}>
            <Button color="" className="btn-icon" onClick={() => goPolicyCollapse(row.id)}>
                <span>Edit</span>
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setPaySchdulelist(props.payschedule);
  }, [props])

  useEffect(() => {
    setPremiumCnt(props.premium.premiumCnt);
  }, [props])

  useEffect(() => {
    if (updateStatus === true) {
      console.log(props.policybyId[0])
      document.getElementById("policynameforadd").value = props.policybyId[0].c_policyname;
      document.getElementById("productnameforadd").value = props.policybyId[0].n_prodid;
      document.getElementById("payscheduleforadd").value = props.policybyId[0].n_payschedule;
      setProductId(props.policybyId[0].n_prodid);
      setPaySchedule(props.policybyId[0].n_payschedule)
      setModuleType(1);
      setPremiumCnt(props.policybyId[0].premiumoptions.length);
    }
  }, [props.policybyId])

  useEffect(() => {
    setMyProductList(props.productlist);
  }, [props])

  useEffect(() => {
    setMyPolicyViewList(props.policylist[0]);
  }, [props])

  const toggleView = () => {
    setCollapseView(!collapseView);
  }
  
  const toggleManage = () => {
    setCollapseManage(!collapseManage);
  }
  
  const toggleCover = () => {
    setCollapseCover(!collapseCover);
  }

  const changeModuleType = (index) => {
    setModuleType(index);
    props.setPremiumCnt(1);
    setPremiumCnt(1);
    let element = document.querySelectorAll(".module-type");
    for(let i = 0; i < element.length; i ++){
      element[i].style.backgroundColor = "#2466eb";
      if(i === index - 1){
        element[i].style.backgroundColor = "#0c3c98";
      }
    }
    
  }
  
  const changePolicyName = (e) => {
    if(e.target.value.trim() === "")
      setPreviewBtnStatus(false);
    else
      setPreviewBtnStatus(true);
  }

  // edit policy
  const goPolicyCollapse = (id) => {
    setUpdateStatus(true);
    setUpdateId(id);
    setPreviewBtnStatus(true);
    props.getPolicyById(id);
  }
  
  const [sm, updateSm] = useState(false);
 
  const [errorVal, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (formData) => {
    setLoading(true);
  };

  const [modal, setModal] = useState(false);
  const [modalPreview, setModalPreview] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [policyName, setPolicyName] = useState("");
  const [productId, setProductId] = useState(0);
  const [paySchdule, setPaySchedule] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [premiumAmount, setPremiumAmount] = useState([[]]);
  const [coverAmount, setCoverAmount] = useState([]);
  const [coverType, setCoverType] = useState([]);
  const [amountCnt, setAmountCnt] = useState([1]);
  const [planFor, setPlanFor] = useState([[]]);
  const [maxMember, setMaxMember] = useState([[]]);
  const [minAge, setMinAge] = useState([]);
  const [maxAge, setMaxAge] = useState([]);
  const [declaration, setDeclaration] = useState("");

  const togglePreview = () => {
    setModalPreview(!modalPreview);
  };

  const changeSelectProduct = (e) => {
    setProductId(parseInt(e.target.value));
  }

  const changeSelectPaySchedule = (e) => {
    setPaySchedule(parseInt(e.target.value));
  }
  const PreviewPolicyinfo = () => {

    let policyname = document.getElementById("policynameforadd").value;
    setPolicyName(policyname);
    
    let isactive = document.getElementById("isacitveforadd").checked;
    isactive === true ? setIsActive(1) : setIsActive(0);

    let premiumamount = [];
    let coveramount = [];
    let covertype = [];
    let maxnum = [];
    let planfor = [];
    let minage = [];
    let maxage = [];

    let coverAmountList = props.coveramountlist[0];
    let amountCount = coverAmountList.length;
    let memberCount = props.membertypelist.length;

    for (let i = 0; i < premiumCnt; i ++) {
      
      premiumamount[i] = [];
      minage[i] = [];
      maxage[i] = [];
      
      let coverAmount = document.getElementById(`selectcover${i + 1}`).value;
      let membertype = document.getElementById(`member_type_${i + 1}`).value;
      let max_mem = document.getElementById(`maxnum${i + 1}`).value; 
      covertype.push(membertype);
      maxnum.push(max_mem);
      for (let j = 0; j < amountCount; j++) {
        if (coverAmount == coverAmountList[j].id) {
          coveramount.push(coverAmountList[j].id);
          break;
        }
      }
      
      let memberType = document.getElementById(`member_type_${i + 1}`).value;
      for (let j = 0; j < memberCount; j++) {
        if (memberType == props.membertypelist[j].id) {
          planfor.push(props.membertypelist[j].id);
          break;
        }
      }

      for (let j = 1; j <= document.querySelectorAll(`.plan-amount${i + 1}`).length; j ++){
        premiumamount[i].push(document.getElementById(`premiumamount${i + 1}-${j}`).value);
        minage[i].push(document.getElementById(`minage${i + 1}-${j}`).value);
        maxage[i].push(document.getElementById(`maxage${i + 1}-${j}`).value);   
      }
    }

    setPremiumAmount(premiumamount);
    setCoverAmount(coveramount);
    setPlanFor(planfor);
    setCoverType(covertype);
    setMaxMember(maxnum);
    setMinAge(minage);
    setMaxAge(maxage);

    setModalPreview(true)
  }

  const [defaultFiles, setDefaultFiles] = useState("");
  const setFiles = (e) => {
    let fileContent = "";
    let file = e.target.files[0];
    const fr = new FileReader();
    if(file.type == "text/plain"){
      fr.onload = () => {
        fileContent = fr.result;
        setDeclaration(fileContent);
      }
      fr.readAsText(e.target.files[0]);
    }
    else if(file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
      fr.onload = async (e) => {
        const content = e.target.result;
        let doc = new Docxtemplater(new PizZip(content), {delimiters: {start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j'}});
        let text = doc.getFullText();
        setDeclaration(text);
      };
      fr.readAsBinaryString(e.target.files[0]);
    }    

    setDefaultFiles(e.target.files[0].name);
  }

  const submitPolicy = (e) => {

    let policyOptions = [];

    for (let i = 0; i < premiumCnt; i ++) {

      let amountCnt = document.querySelectorAll(`.plan-amount${i+1}`).length;
      let premiumChange = document.getElementById(`check_member_${i+1}`).checked == true ? 1 : 0;
      let premiumOptions = [];
      
      for(let j = 0; j < amountCnt; j ++){
      
        let json_temp = {
          n_minage: minAge[i][j],
          n_maxage: maxAge[i][j],
          n_premiumamount: premiumAmount[i][j]
        };
        premiumOptions.push(json_temp);

      }
      let json_temp = {
          n_planfor: planFor[i],
          n_coveramountid: coverAmount[i],
          n_member_type: parseInt(coverType[i]),
          n_maxnum: maxMember[i],
          n_premium_change: premiumChange,
          premiumoptions: premiumOptions
      }

      policyOptions.push(json_temp);
    }
    
    let json_temp = {
      c_policyname: policyName,
      n_prodid: productId,
      n_payschedule: paySchdule,
      is_active: isActive,
      c_termsncondtions: declaration,
      policyoptions: policyOptions
    }

    if (updateStatus == true) {
      props.UpdatePolicy(updateId, JSON.stringify(json_temp));
      props.getPolicyView();
    } else {
      props.AddPolicy(JSON.stringify(json_temp));
      props.getPolicyView();
    }

    setModalPreview(false);
    document.getElementById("policynameforadd").value = "";
    props.setPremiumCnt(premiumCnt);
    setPreviewBtnStatus(false);
    initializePolicy();
  };

  const initializePolicy = () => {
    if(document.querySelectorAll(".module-type")[moduleType-1])
      document.querySelectorAll(".module-type")[moduleType-1].style.backgroundColor = "#2466eb";
    setModuleType(0);
    document.getElementById("policynameforadd").value = "";
    document.getElementById("productnameforadd").value = 0;
    document.getElementById("payscheduleforadd").value = 0;
    document.getElementById("isacitveforadd").checked = false;
    setPreviewBtnStatus(false);
    setProductId(0);
    setPaySchedule(0);
    setPremiumCnt(0);
    setUpdateStatus(false);
  }

  const deleteItem = () => {
    let confirmTitle = "";
    if(selectedData.length == 0){
      Swal.fire({
        title: "Please select policy to delete.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "OK",
      })
    }
    else{
      Swal.fire({
        title: confirmTitle = selectedData.length == 1 ? `Are you sure to delete this policy?` : `Are you sure to delete these ${selectedData.length} policies?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete!",
      }).then((result) => {
          if (result.isConfirmed) {
            for(let i = 0; i < selectedData.length; i ++){
              props.DeletePolicy(selectedData[i].id)
              props.getPolicyView();
            }
          }
      });
    }
  };
  
  const rangeChange = (e) => {
    setRangeValue(e);
  }
 
  //react-data-table

  const [tableData, setTableData] = useState(myPolicyViewList);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(5);
  const [mobileView, setMobileView] = useState();

  useEffect(() => {
    setTableData(myPolicyViewList);
  }, [myPolicyViewList]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return ( 
    <React.Fragment>
      <Head title="App Messages"></Head>
      <Content>
        <div className="main-manage-content policy-manage-content">
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page tag="h3">
                Policy Management
                </BlockTitle>
              </BlockHeadContent>
              <BlockHeadContent>
                <div className="toggle-wrap nk-block-tools-toggle">
                  <Button
                    className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                    onClick={() => updateSm(!sm)}
                  >
                    <Icon name="more-v" />
                  </Button>
                  <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <MyPoliciesDropDown/>
                      </li>
                      <li>
                        <FilterDropDown/>
                      </li>
                      <li>
                        <ViewDropDown/>
                      </li>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    toggle();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
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
          <div className="product-table-collapse submain-collapse" onClick={toggleView} style={{ marginBottom: '1rem' }}>
            <span className="icon ni ni-chevron-down"></span>
            View Policies 
            <span className="product-cnt">
              {
                props.policylist.length > 0 && props.policylist[0].length > 0 ? 
                  <span>
                    {props.policylist[0].length > 1 ? `${props.policylist[0].length} policies` : '1 policy'}
                  </span> 
                :  "empty policy"
              }
            </span>
          </div>
          <Collapse isOpen={collapseView}>
            <div className="product-table" >
              <Card className="card-bordered card-preview">
                {/* DataTable */}
                  <div className={`dataTables_wrapper dt-bootstrap4 no-footer view-policy-table`}>
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
                      data={tableData}
                      columns={TableColumns_policy}
                      className="view-policy-table"
                      selectableRows
                      // selectableRowsComponent={CustomCheckbox}
                      // expandableRowsComponent={ExpandableRowComponent}
                      onSelectedRowsChange={handleChange}
                      expandableRows={mobileView}
                      noDataComponent={<div className="p-2">There are no records found</div>}
                      sortIcon={
                        <div>
                          <span>&darr;</span>
                          <span>&uarr;</span>
                        </div>
                      }
                      pagination
                      paginationComponent={({ currentPage, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage }) => (
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
                    ></DataTable>
                  </div>
                {/* DataTable */}
              </Card>
            </div>
          </Collapse>
          <div className="manage-product-collapse submain-collapse" onClick={toggleCover} style={{ marginBottom: '1rem' }}><span className="icon ni ni-chevron-down"></span>Add/ Manage Cover Amount & Policy Types </div>
          <Collapse isOpen={collapseCover}>
            <div className="manage-content" >
              <Card className="card-bordered card-preview">
                <div className="mana-company mana-item">
                  <ManageCoverAmountTable/>
                </div>
                <div className="mana-category mana-item">
                  <ManageOptionTypeTable/>
                </div>
              </Card>
            </div>
          </Collapse>
          <div className="policy-mana-nav d-flex">
            <div className="manage-product-collapse submain-collapse" onClick={toggleManage} style={{ marginBottom: '1rem' }}>
              <span className="icon ni ni-chevron-down"></span> 
              Add/ Manage Policies              
            </div>
            <UncontrolledDropdown className="menu">
              <DropdownToggle tag="a" className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 mr-n1">
                <Icon name="more-h"></Icon>
              </DropdownToggle>
              <DropdownMenu right>
                <ul className="link-list-opt no-bdr">
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#edit"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                    >
                      <Icon name="file-pdf"></Icon>
                      <span>Download as PDF</span>
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem
                      tag="a"
                      href="#edit"
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                    >
                      <Icon name="file-xls"></Icon>
                      <span>Download as XLSX</span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Collapse isOpen={collapseManage}>
            <div className="manage-content" >
              <div className="policy-manage" id="policyPanel">
                <div className="policy-detail">
                  <div className="form-one d-flex row">
                    <FormGroup className="col-4">
                      <div className="form-control-wrap d-flex">
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="default-01">
                            Policy Name <span className="red">*</span>
                          </label>
                        </div>
                        <input
                          type={"text"}
                          id="policynameforadd"
                          name="policynameforadd"
                          ref={register({ required: "This field is required" })}
                          placeholder="Enter Policy Name"
                          onChange={(e)=>changePolicyName(e)}
                          className={`policy-name form-control-lg form-control is-hidden item-name`}
                        />
                        {errors.passnew && (
                          <span className="invalid">{errors.passnew.message}</span>
                        )}
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex col-4">
                      <label htmlFor="default-4" className="form-label">
                        Product <span className="red">*</span>
                      </label>
                      <div className="form-control-wrap">
                        <div className="form-control-select">
                          <Input type="select" name="select" id="productnameforadd" placeholder="Select Category" onChange={(e)=>changeSelectProduct(e)}>
                            <option value={0}>-- select --</option>
                            {
                              myProductList.length > 0 ? (myProductList[0].map((item, index) => {
                                return(
                                  <option value={item.id} key={index}>{`${item.c_productname} (${item.company})`}</option>
                                )

                              })
                              )
                              :
                              <></>
                            }

                          </Input>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex col-4 paying-schedule">
                        <label htmlFor="default-4" className="form-label paying-schedule-label">
                          Paying Schedule <span className="red">*</span>
                        </label>
                        <div className="form-control-wrap">
                          <div className="form-control-select">
                            <Input type="select" name="select" id="payscheduleforadd" placeholder="Select Category" onChange={(e)=>changeSelectPaySchedule(e)}>
                              <option value={0}>-- select --</option>
                              {
                                paySchdulelist.length > 0 ? paySchdulelist.map((item, index)=>{
                                  return(
                                    <option value={item.id} key={index}>{item.c_name}</option>
                                  )
                                })
                                :
                                <></>
                              }
                            </Input>
                          </div>
                        </div>
                    </FormGroup>
                  </div>
                  <div className="form-two d-flex">
                    <div className="checkbox-group d-flex isact-check">
                      <label htmlFor="default-4" className="form-label">
                        IsActive <span className="red">*</span>
                      </label>
                      <Input type="checkbox" name="check1" id="isacitveforadd" ></Input>
                    </div>
                    <FormGroup className="file-upload">
                        <div className="form-control-wrap d-flex">
                            <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                            Policy Declaration<span className="red">*</span>
                            </label>
                            </div>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="declarationforadd"
                                    accept=".txt, .docx"
                                    onChange={(e) => setFiles(e)}
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    {defaultFiles === "" ? "Choose files" : defaultFiles}
                                </label>
                            </div>
                        </div>
                    </FormGroup>
                  </div>
                  <div className="form-three d-flex">
                      <label htmlFor="default-4" className="form-label">
                        Module Type <span className="red">*</span>
                      </label>
                      <div className="form-control-wrap d-flex">
                        <div className="module-items d-flex">
                          <Button color="primary" className="module-type" onClick={()=>changeModuleType(1)}>
                            <Icon name="users"></Icon>
                            <span>Funeral Insurance</span>
                          </Button>
                          <Button color="primary" className="module-type" onClick={()=>changeModuleType(2)}>
                            <Icon name="heart-fill"></Icon>
                            <span>Health Insurance</span>
                          </Button>
                          <Button color="primary" className="module-type" onClick={()=>changeModuleType(3)}>
                            <Icon name="money"></Icon>
                            <span>Social Insurance</span>
                          </Button>
                          <Button color="primary" className="module-type" onClick={()=>changeModuleType(4)}>
                            <Icon name="home-alt"></Icon>
                            <span>Property Insurance</span>
                          </Button>
                          <Button color="primary" className="module-type" onClick={()=>changeModuleType(5)}>
                            <Icon name="tron"></Icon>
                            <span>Motor Insurance</span>
                          </Button>
                        </div>
                      </div>
                  </div>
                </div>
                {
                  moduleType == 1 ? 
                  <div className="module-info">
                    <h3 className="module-title">FUNERAL INSURANCE</h3>
                    <div className="option-count d-flex">
                      <span className="">How many # of Premium Option you would want to customize</span>
                      <NSComponent defaultVal={premiumCnt} color="primary" />
                    </div>
                    {
                      premiumCnt === 0 ? 
                      <UncontrolledAlert className="alert-icon" color="danger" fade={false}>
                        <Icon name="alert-circle" />
                        Oops!!! Looks like you have not added any Premium Options.<br/>
                        You need to add at least 1 Option to proceed further.
                      </UncontrolledAlert>                     
                      :
                      Array.from(Array(premiumCnt)).map((i, index) => <PremiumOption key={index} num={index}/>)
                    }
                  </div>
                  : <></>
                }
                
                <div className="btn-group d-flex mt-5" >
                  <FormGroup>
                      <button
                        className="btn btn-primary btn-lg btn-large"
                        type="submit"
                        onClick={()=>PreviewPolicyinfo()}
                        disabled={previewBtnStatus == true && premiumCnt > 0 && productId > 0 && paySchdule > 0 ? false : true}
                      >
                        {"Preview"}
                      </button>    
                  </FormGroup>
                  <FormGroup>
                      <Button
                        size="lg"
                        className="btn-large"
                        type="submit"
                        color="primary"

                      >
                        {"Save"}
                      </Button>    
                  </FormGroup>
                  <FormGroup>
                      <Button
                        size="lg"
                        className="btn-large"
                        color="primary"
                        onClick={()=>initializePolicy()}
                      >
                        {"Cancel"}
                      </Button>    
                  </FormGroup>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </Content>

      <Modal isOpen={modal} toggle={toggle} className="modal-md view-policy-modal policy-view-page">
        <ModalHeader toggle={toggle}>View All policies</ModalHeader>
        <ModalBody>
          <div className="policy-info">
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="sub-group">
                <div className="sub-form d-flex">
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Lookup Policy Name
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          <option value="default_option">Default Option</option>
                          <option value="option_select_name">Option select name</option>
                          <option value="option_select_name">Option select name</option>
                        </Input>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label htmlFor="default-4" className="form-label">
                      Lookup Product Name
                    </label>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          {
                            myProductList.length > 0 ? (myProductList[0].map((item, index) => {
                              return(
                                <option value={item.id} key={index}>{item.c_productname}</option>
                              )

                            })
                            )
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
                    Lookup Company Name
                  </label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          {
                            props.companies.length > 0 ? (props.companies[0].map((item, index) => {
                              return(
                                <option value={item.id} key={index}>{item.c_name}</option>
                              )

                            })
                            )
                            :
                            <></>
                          }
                      </Input>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="d-flex">
                  <label htmlFor="default-4" className="form-label">
                    Lookup By Category
                  </label>
                  <div className="form-control-wrap">
                    <div className="form-control-select">
                      <Input type="select" name="select" id="default-4" placeholder="Select Category">
                          {
                            props.categories.length > 0 ? (props.categories[0].map((item, index) => {
                              return(
                                <option value={item.id} key={index}>{item.c_name}</option>
                              )

                            })
                            )
                            :
                            <></>
                          }
                      </Input>
                    </div>
                  </div>
                </FormGroup>
                </div>
                <div className="price-filter d-flex">
                  <label htmlFor="default-4" className="form-label">
                    Price Range
                  </label>
                  <Nouislider
                      className="form-range-slider"
                      accessibility
                      connect={true}
                      // tooltips={true}
                      animate={true}
                      start={[10, 50]}
                      step={1}
                      range={{
                        min: 0,
                        max: 100,
                      }}
                      onSlide={(e)=>rangeChange(e)}
                  ></Nouislider>

                  <div className="reange-value d-flex">
                      <span>{`min : ${rangeValue[0]}`}</span>
                      <span className="ml-3 mr-3">-</span>
                      <span>{`max : ${rangeValue[1]}`}</span>
                    
                  </div>
                </div>         
                <FormGroup>
                    <Button
                      size="lg"
                      className="btn-large"
                      type="submit"
                      color="primary"
                    >
                      {loading ? <Spinner size="sm" color="light" /> : "Search"}
                    </Button>    
                </FormGroup>
              </div>
            </Form>
          </div>
          <div className="">
            <ReactDataTable data={DataTableData} columns={TableColumns_allpolicy} expandableRows pagination className="view-allpolicy-table"/> 
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalPreview} toggle={togglePreview} className="modal-md preview-modal">
        <ModalHeader toggle={togglePreview}>Preview Policy Information</ModalHeader>
        <ModalBody>
          <div className="policy-detail-info info-part">
            <div className="row">
              <div className="col-6">
                <div className="item">
                  <p className="label">Policy Name</p>
                  <p className="txt">{policyName}</p>
                </div>
                <div className="item">
                  <p className="label">Fixed Paying Schedule</p>
                  {
                    paySchdulelist.length > 0 ? paySchdulelist.map((item, index)=>{
                      if(item.id === paySchdule)
                        return(
                          <p className="txt" key={index}>{item.c_name}</p>
                        )
                    })
                    :
                    <></>
                  }
                </div>
              </div>
              <div className="col-6">
                <div className="item">
                  <p className="label">Product Name</p>
                  {
                    myProductList.length > 0 ? myProductList[0].map((item, index)=>{
                      if(item.id === productId)
                        return(
                          <p className="txt" key={index}>{`${item.c_productname} (${item.company})`}</p>
                        )
                    })
                    :
                    <></>
                  }
                </div>
                <div className="item">
                  <p className="label">Type</p>
                  <p className="txt">Funeral Insurance</p>
                </div>
              </div>
            </div>
          </div>
          {
            Array.from(Array(premiumCnt)).map((item, index) => 
            <div className="premium-info info-part" key={index}>
              <h4 className="item-title">PREMIUM OPTION {index+1}</h4>
              <p className="plan-for item">Plan For: 
                  {
                      planFor.length > 0 && props.membertypelist.length > 0 ? props.membertypelist.map((membertype, index2)=>{
                        return(membertype.id == planFor[index] ? <span className="plan-detail txt" key={index2}>{`  This Plan belongs to ${membertype.membertype}`}</span> : "")
                      })
                    :
                    <></>
                  }
              </p>
              <p className="plan-option item">Cover Amount: &nbsp;&nbsp;
                {
                  props.coveramountlist.length > 0 ? props.coveramountlist[0].map((item, index1)=>{
                    return(item.id == parseInt(coverAmount[index]) ? <span className="cover-amount txt" key={index1}>{item.n_coveramount}</span> : "")
                  }):""
                }
              </p>
              <div className="option-group">
                <div className="option d-flex item row">
                    <div className="col-4">
                      {
                        premiumAmount[index] && premiumAmount[index].length > 0 ? premiumAmount[index].map((item, index) => 
                          <div className="d-flex" key={index}>
                              <p className="label option-num-label">Option {index+1}: </p>
                              <p className="txt">PREMIUM AMOUNT : R{item} </p>
                          </div>
                        )
                        :
                        <></>
                      }
                    </div>
                    <div className="col-4">
                      {
                        minAge[index] && minAge[index].length > 0 ? minAge[index].map((item, index) => 
                          <div className="d-flex" key={index}>
                              <p className="txt">MinAge : {item} </p>
                          </div>
                        )
                        :
                        <></>
                      }
                    </div>
                    <div className="col-4">
                      {
                        maxAge[index] && maxAge[index].length > 0 ? maxAge[index].map((item, index) => 
                          <div className="d-flex" key={index}>
                              <p className="txt">MaxAge : {item} </p>
                          </div>
                        )
                        :
                        <></>
                      }
                    </div>
                </div>
              </div>
            </div>
            )
          }
          
          <div className="declaration-info info-part">
            <h4 className="item-title">POLICY DECLARATION</h4>
            <div className="declaration-txt">
            {declaration}
            </div>
          </div>
          <div className="btn-group d-flex mt-5" >
            <FormGroup>
                <Button
                  size="lg"
                  className="btn-large"
                  type="submit"
                  color="primary"
                  onClick={()=>submitPolicy()}
                >
                  {"Confirm & Submit"}
                </Button>    
            </FormGroup>
            <FormGroup>
                <Button
                  size="lg"
                  className="btn-large"
                  type="submit"
                  color="primary"
                  onClick={()=>setModalPreview(false)}
                >
                  {"Edit"}
                </Button>    
            </FormGroup>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    premium: state.premiumReducer,
    companies: state.companyReducer,
    categories: state.categoryReducer,
    productlist: state.productViewReducer,
    policylist: state.policyViewReducer,
    policybyId: state.policybyIdReducer,
    payschedule: state.payscheduleReducer,
    coveramountlist: state.coveramountReducer,
    covertypelist: state.covertypeReducer,
    membertypelist: state.getsubdataReducer.membertype
  };
};

export default connect(mapStateToProps,{
  getpaySchdeule,
  AddPolicy, 
  UpdatePolicy, 
  DeletePolicy,
  getPolicyById,
  getPolicyView,
  setPremiumCnt
})(PolicyManage);

