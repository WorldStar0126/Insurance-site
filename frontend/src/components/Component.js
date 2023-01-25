import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockContent,
  BlockTitle,
  BlockDes,
  BlockBetween,
  BackTo,
} from "./block/Block";
import { OverlineTitle } from "./text/Text";
import { LinkList, LinkItem } from "./links/Links";
import { Row, Col } from "./grid/Grid";
import { SpecialTable, OrderTable, LoginLogTable } from "./table/SpecialTable";
//tables for product management page.
import ProductTable from "./table/table-product/ProductTable";
import ManageCompanyTable from "./table/table-product/ManageCompanyTable";
import ManageCategoryTable from "./table/table-product/ManageCategoryTable";
import ManageSubcategoryTable from "./table/table-product/ManageSubcategoryTable";
import ManageProductTable from "./table/table-product/ManageProductTable";
import ManagePolicyTable from "./table/table-product/ManagePolicyTable";
import ManageCoverAmountTable from "./table/table-policy/ManageCoverAmountTable";
import ManageOptionTypeTable from "./table/table-policy/ManageOptionTypeTable";
import { ViewPolicyTable } from "./table/table-product/ViewPolicyTable";
import { ContactTable } from "./table/table-contact/ContactTable";
import PaymentTable from "./table/table-billing/paymentTable";
import ManageCardTable from "./table/table-billing/ManageCardTable";
import ManageAccountTable from "./table/table-billing/ManageAccountTable";
import ManageEwalletTable from "./table/table-billing/ManageEwalletTable";

import BeneficiaryTable from "./table/table-userpolicy/BeneficiaryTable";
import PaymentMethodTable from "./table/table-userpolicy/PaymentMethodTable";

//tables for policy management page.
import { PolicyTable } from "./table/table-policy/PolicyTable";
import { DependentTable } from "./table/table-policy/DependentTable";

import { PreviewCard, PreviewAltCard, PreviewTable, CodeBlock } from "./preview/Preview";
import { EmailHeader, EmailBody, EmailBodyContent, EmailWrapper, EmailFooter } from "./email/Email";
import { ProjectCard, ProjectBody, ProjectHead } from "./partials/project-card/ProjectCard";
import {
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  DataTableTitle,
} from "../components/table/DataTable";
import TooltipComponent from "./tooltip/Tooltip";
import Progress from "./progress/Progress";
import NSComponent from "./number-spinner/NumberSpinner";
import Knob from "./knob/Knob";
import Rating from "./rating/Rating";
import Table from "./table/Table";
import NioIconCard from "./partials/nioIcon/NioIcon";
import UserAvatar from "./user/UserAvatar";
import UserGroup from "./user/UserGroup";
import PaginationComponent from "../components/pagination/Pagination";
import DataTablePagination from "./pagination/DataTablePagination";
import ReactDataTable from "./table/ReactDataTable";
import Button from "./button/Button";
import Icon from "./icon/Icon";
import InputSwitch from "./input/switch/Switch";
import OutlinedInput from "./input/outlined-input/OutlinedInput";
import Accordian from "./partials/accordian/Preview";
import Sidebar from "./sidebar/Sidebar";
import RSelect from "./select/ReactSelect";
import ReactDualList from "./dual-list/RDualList";

export {
  Accordian,
  LinkItem,
  LinkList,
  OverlineTitle,
  SpecialTable,
  OrderTable,
  LoginLogTable,
  ProductTable,
  ManageCompanyTable,
  ManageCategoryTable,
  ManageSubcategoryTable,
  ManageProductTable,
  ManagePolicyTable,
  ManageCoverAmountTable,
  ManageOptionTypeTable,
  ContactTable,
  ViewPolicyTable,
  PolicyTable,
  PaymentTable,
  ManageCardTable,
  ManageAccountTable,
  ManageEwalletTable,
  BeneficiaryTable,
  PaymentMethodTable,
  DependentTable,
  Sidebar,
  Button,
  UserAvatar,
  UserGroup,
  InputSwitch,
  OutlinedInput,
  Block,
  BlockContent,
  PaginationComponent,
  DataTablePagination,
  ReactDataTable,
  PreviewCard,
  PreviewTable,
  Progress,
  CodeBlock,
  BlockHead,
  BlockHeadContent,
  NSComponent,
  Knob,
  Rating,
  BlockTitle,
  BlockDes,
  BackTo,
  BlockBetween,
  Icon,
  Table,
  Row,
  Col,
  TooltipComponent,
  EmailHeader,
  EmailBody,
  EmailBodyContent,
  EmailWrapper,
  EmailFooter,
  NioIconCard,
  ProjectCard,
  ProjectBody,
  ProjectHead,
  DataTableRow,
  DataTableItem,
  DataTableHead,
  DataTableBody,
  DataTable,
  DataTableTitle,
  PreviewAltCard,
  RSelect,
  ReactDualList
};
