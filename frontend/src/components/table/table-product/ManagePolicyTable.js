// import React, { Fragment, useEffect, useState } from "react";
// import { connect } from "react-redux";
// import Button from "../../button/Button";
// import { Collapse, Card, Form, FormGroup, Spinner, Input,} from "reactstrap";
// import { useForm } from "react-hook-form";

// import {
//   deletePolicy,
//   getCompany
// } from "../../../actions/tutorials";

// const ManagePolicyTable = ( props ) => {
//   const [collapsePolicy, setCollapsePolicy] = useState(false);
//   const { tabledata } = props;
//   const deleteData = (id) => {
//     props.deletePolicy(id);

//   }
//   const changeIcon = (classname) => {
//     if(document.querySelectorAll(classname)[0].classList.contains("ni-plus")){
//       document.querySelectorAll(classname)[0].classList.remove("ni-plus");
//       document.querySelectorAll(classname)[0].classList.add("ni-minus");
//     }else{
//       document.querySelectorAll(classname)[0].classList.remove("ni-minus");
//       document.querySelectorAll(classname)[0].classList.add("ni-plus");
//     }
//   }
//   const togglePolicy = () => {
//     setCollapsePolicy(!collapsePolicy);
//     changeIcon(".policy-status");
//   }
  
//   const [loading, setLoading] = useState(false);
//   const { errors, register, handleSubmit } = useForm();
//   const onFormSubmit = (formData) => {
//     setLoading(true);
//   };
 
//   return (
//     <Fragment>
//       <div className="manage-collapse mana-policy-collapse" onClick={togglePolicy}>ADD/MANAGE POLICY<span className="policy-status icon ni ni-plus"></span><span className="policy-cnt count">2<span>policies added</span></span></div>
//       <Collapse isOpen={collapsePolicy}>
//         <div className="policy-edit" >
//           <Card className="card-bordered card-preview">
//             <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
//               <div className="sub-group d-flex">
//                 <FormGroup>
//                   <div className="form-control-wrap d-flex">
//                     <div className="form-label-group">
//                       <label className="form-label" htmlFor="default-01">
//                         Product Name <span className="red">*</span>
//                       </label>
//                     </div>
//                     <input
//                       type={"text"}
//                       id="companyName"
//                       name="companyname"
//                       ref={register({ required: "This field is required" })}
//                       placeholder="Select Category"
//                       className={`form-control-lg form-control is-hidden company-name item-name`}
//                     />
//                     {errors.passnew && (
//                       <span className="invalid">{errors.passnew.message}</span>
//                     )}
//                   </div>
//                 </FormGroup>
//                 <FormGroup className="d-flex">
//                   <label htmlFor="default-4" className="form-label">
//                     Insurance Company <span className="red">*</span>
//                   </label>
//                   <div className="form-control-wrap">
//                     <div className="form-control-select">
//                       <Input type="select" name="select" id="default-4" placeholder="Select Category">
//                         <option value="default_option">Default Option</option>
//                         <option value="option_select_name">Option select name</option>
//                         <option value="option_select_name">Option select name</option>
//                       </Input>
//                     </div>
//                   </div>
//                 </FormGroup>
//                 <FormGroup className="d-flex">
//                   <label htmlFor="default-4" className="form-label">
//                     Insurance Company <span className="red">*</span>
//                   </label>
//                   <div className="form-control-wrap">
//                     <div className="form-control-select">
//                       <Input type="select" name="select" id="default-4" placeholder="Select Category">
//                         <option value="default_option">Default Option</option>
//                         <option value="option_select_name">Option select name</option>
//                         <option value="option_select_name">Option select name</option>
//                       </Input>
//                     </div>
//                   </div>
//                 </FormGroup>
                
//               </div>
//               <FormGroup className="d-flex">
//                   <label htmlFor="default-5" className="form-label">
//                     Is Active <span className="red">*</span>
//                   </label>
//                   <div className="form-control-wrap">
//                     <div className="form-control-select">
//                       <Input type="checkbox" name="check" id="default-5" >
//                       </Input>
//                     </div>
//                   </div>
//               </FormGroup>
              
//             </Form>
//             <table className={`table table-tranx `}>
//               <thead>
//                 <tr className="tb-tnx-head">
//                   <th className="tb-tnx-id">
//                     <span className="">OPTION #</span>
//                   </th>
//                   <th className="tb-tnx-id">
//                     <span className="">MEMBER TYPE</span>
//                   </th>
//                   <th className="tb-tnx-id">
//                     <span className="">MIN AGE</span>
//                   </th>
//                   <th className="tb-tnx-id">
//                     <span className="">MAX AGE</span>
//                   </th>
//                   <th className="tb-tnx-id">
//                     <span className="">PREMIUN AMOUNT</span>
//                   </th>
//                   <th className="tb-tnx-id">
//                     <span className="">SUB CATEGORY</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tabledata.map((item, index) => {
//                       return (
//                         <tr key={item.id} className="tb-tnx-item">
//                           <td className="tb-tnx-id d-flex">
//                             <button className="icon ni ni-trash btn btn- " onClick={(e) => { deleteData(item.id); }}></button>
//                             <input
//                                 type={"text"}
//                                 placeholder="1"
//                                 className={`form-control-lg form-control is-hidden company-name item-name item-cnt`}
//                                 />
//                           </td>
//                           <td className="tb-tnx-info">
//                             <Input type="select" name="select" id="default-4" placeholder="Select">
//                                 <option value="default_option">Default Option</option>
//                                 <option value="option_select_name">Option select name</option>
//                                 <option value="option_select_name">Option select name</option>
//                             </Input>
//                           </td>
//                           <td className="tb-tnx-info">
//                             <Input type="select" name="select" id="default-4" placeholder="Select">
//                                 <option value="default_option">Default Option</option>
//                                 <option value="option_select_name">Option select name</option>
//                                 <option value="option_select_name">Option select name</option>
//                             </Input>
//                           </td>
//                           <td className="tb-tnx-info">
//                             <Input type="select" name="select" id="default-4" placeholder="Select">
//                                 <option value="default_option">Default Option</option>
//                                 <option value="option_select_name">Option select name</option>
//                                 <option value="option_select_name">Option select name</option>
//                             </Input>
//                           </td>
//                           <td className="tb-tnx-info">
//                             <input
//                                 type={"text"}
//                                 placeholder="Enter Amount"
//                                 className={`form-control-lg form-control is-hidden company-name item-name`}
//                                 />
//                           </td>
//                           <td className="tb-tnx-info">
//                             <input
//                                 type={"text"}
//                                 placeholder="Enter Amount"
//                                 className={`form-control-lg form-control is-hidden company-name item-name`}
//                                 />
//                           </td>
//                         </tr>
//                       );
//                     })}
//               </tbody>
//             </table>
//             <FormGroup>
//                 <Button
//                   size="lg"
//                   className="btn plus"
//                   type="submit"
//                 >
//                   +
//                 </Button>    
//             </FormGroup>
//             <FormGroup>
//                 <Button
//                   size="lg"
//                   className="btn-large"
//                   type="submit"
//                   color="primary"
//                 >
//                   {loading ? <Spinner size="sm" color="light" /> : "Save"}
//                 </Button>    
//             </FormGroup>     
//           </Card>
//         </div>
//       </Collapse>
      
//     </Fragment>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     tabledata: state.policyReducer,
//   };
// };

// export default connect(mapStateToProps, {
//   deletePolicy,
//   getCompany
// })(ManagePolicyTable);
