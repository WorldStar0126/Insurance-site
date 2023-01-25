import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loginData, orderData, transactionData } from "../TableData";
import { Collapse,Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Button from "../../button/Button";
import Content from "../../../layout/content/Content";

import {
  Icon,
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
} from "../../Component";
import {
  getCategory, getCompany,getSubCategory, getProductView
} from "../../../actions/tutorials";
import http from "../../../http-common";
import { DataTableData, dataTableColumns, dataTableColumns1, dataTableColumns2, userData } from "../../../pages/components/table/TableData";

const ProductTable = (props) => {
  const [myCompanyList, setMyCompanyList] = useState([]);
  const [myCategoryList, setMyCategoryList] = useState([]);
  const [mySubCategoryList, setMySubCategoryList] = useState([]);
  const [myProductList, setMyProductList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [collapseView, setCollapseView] = useState(true);
  // var productsData = [];
  useEffect(() => {
    return () => {
    }

  })
  const toggleView = () => {
    setCollapseView(!collapseView);
  }
  useEffect(() => {
    setMyProductList(props.productlist);
    var productsData = [];
    var temp = {}
    http.get(`/get/productlistview`).then((res) => {
        var cnt = 0;
        res.data.data.map((item, index)=> {
        temp.id = item.id;
        temp.c_productname = item.c_productname;
        temp.company = item.company;
        temp.category = item.category;
        temp.subcat = item.subcat;
        temp.policycnt = item.policy_count;
        productsData.push({...temp});
        cnt ++;
      })
      setTableData(productsData);
    });
  }, [props])

  const DropdownTrans = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
          <Icon name="more-h"></Icon>
        </DropdownToggle>
        <DropdownMenu right>
          <ul className="link-list-plain">
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                View
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Invoice
              </DropdownItem>
            </li>
            <li>
              <DropdownItem
                tag="a"
                href="#dropdownitem"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Print
              </DropdownItem>
            </li>
          </ul>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const goProductCollapse = () => {
    document.querySelectorAll(".product-collapse")[0].classList.add("show");
  }
  return (
    <Fragment>
      {
        tableData.length > 0 ? (
        <div>
          <div className="product-table-collapse submain-collapse" onClick={toggleView} style={{ marginBottom: '1rem' }}>
            <span className="icon ni ni-chevron-down"></span>
              View Products 
            <span className="product-cnt">{myProductList.length > 0 ? myProductList[0].length : 0}
              <span>
                products
              </span>
            </span>
          </div>
          <Collapse isOpen={collapseView}>
            <div className="product-table" >
              <Card className="card-bordered card-preview">
                <ReactDataTable data={tableData} columns={dataTableColumns1} expandableRows pagination className="product-data-table"/> 
              </Card>
            </div>
          </Collapse>
        </div>) : (<></>)
      }
      
    </Fragment>
    
  );
};


const mapStateToProps = (state) => {
  return {
    // companylist: state.companyReducer,
    // categorylist: state.categoryReducer,
    // subcategorylist: state.subcategoryReducer,
    // productlist: state.productReducer,
    productlist: state.productViewReducer,
    visibleproductlist: state.visibleReducer,
  };
};

export default connect(mapStateToProps, {
  getCompany,
  getCategory,
  getSubCategory,
  getProductView
})(ProductTable);
