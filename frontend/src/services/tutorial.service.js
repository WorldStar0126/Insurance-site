import http, { baseURL } from "../http-common";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class TutorialDataService {

  getUserbyId(token) {
    return http.get(`/get/credentialsbyid`, 
    {
      headers: {
        "x-access-token": token
      }
    });
  }

  getCompany() {
    return http.get(`/get/companylist`);
  }

  AddCompany(name) {
    http.post(`/create/company`, {c_name: name}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Company - ${name}`);
        }
        if(!res.data.status){
          toast.error('This name already exists!');
        }
      }
    );
    return http.get(`/get/companylist`);
  }

  UpdateCompany(id, name) {
    http.put(`/update/company?id=${id}`, {c_name: name}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated Company - ${name}`);
        }
        if(!res.data.status){
          toast.error('This name already exists!');
        }
      }
    );
    return http.get(`/get/companylist`);
  }

  DeleteCompany(id) {
    http.delete(`/delete/company?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted.`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/companylist`);
  }

  getCategory() {
    return http.get(`/get/categorylist`);
  }

  AddCategory(name) {
    http.post(`/create/category`, {c_name: name}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Category - ${name}`);
        }
        else{
          toast.error('This name already exists!');
        }
      }
    );;
    return http.get(`/get/categorylist`);
  }

  UpdateCategory(id, name) {
    http.put(`/update/category?id=${id}`, {c_name: name}).then(
      (res) => {
        
        if(res.data.status){
          toast.success(`You have successfully updated Category - ${name}`);

        }
        else {
          toast.error('This name already exists!');
        }
      }
    );;
    return http.get(`/get/categorylist`);
  }
  
  DeleteCategory(id) {
    http.delete(`/delete/category?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/categorylist`);
  }

  getSubCategory() {
    return http.get(`/get/subcatlist`);
  }

  AddSubCategory(id,name) {
    http.post(`/create/subcat`, {n_catid: id, c_name: name}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Subcategory - ${name}`);
        }
        else {
          toast.error('This name already exists!');
        }
      }
    );;
    return http.get(`/get/subcatlist`);
  }

  UpdateSubCategory(id, catid, name) {
    http.put(`/update/subcat?id=${id}`, {n_catid: catid, c_name: name}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated Subcategory - ${name}`);
        }
        else {
          toast.error('This name already exists!');
        }
      }
    );
    return http.get(`/get/subcatlist`);
  }

  DeleteSubCategory(id) {
    http.delete(`/delete/subcat?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/subcatlist`);
  }

  getProduct() {
    return http.get(`/get/productlist`);
  }
  
  getProductView() {
    return http.get(`/get/productlistview`);
  }
  
  AddProduct(productname, companyid, catid, subcatid) {
    http.post(`/create/product`, {c_productname: productname, n_companyid: companyid, n_catid: catid, n_subcatid: subcatid }).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Product - ${productname}`);
        }
        else {
          toast.error('This name already exists!');
        }
      }
    );;
    return http.get(`/get/productlist`);
  }
  
  UpdateProduct(id, name, companyid, catid, subcatid) {
    http.put(`/update/product?id=${id}`, {c_productname: name, n_companyid: companyid, n_catid: catid, n_subcatid: subcatid}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated Product - ${name}`);
        }
        else {
          toast.error('This name already exists!');
        }
      }
    );;
    return http.get(`/get/productlist`);
  }
  
  DeleteProduct(id) {
    http.delete(`/delete/product?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/productlist`);
  }

  //////////////////


  getPolicy() {
    return http.get(`/get/policylist`);
  }
  
  getPolicyById(id) {
    return http.get(`/get/policybyid?id=${id}`);
  }
  
  getPolicyView() {
    return http.get(`/get/policylistview`);
  }
  
  AddPolicy(policy_data) {
    http.post(`/create/policy`, policy_data).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created new Policy`);
        }
        else {
          toast.error('The Policy Already Exist!');
        }
      }
    );;
    return http.get(`/get/policylistview`);
  }
  
  UpdatePolicy(id, policy_data) {
    http.put(`/update/policy?id=${id}`, policy_data).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated policy`);
        }
        else {
          toast.error('The Policy Already Exist!');
        }
      }
    );;
    return http.get(`/get/policylistview`);
  }
  
  DeletePolicy(id) {
    http.delete(`/delete/policy?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/policylistview`);
  }

  getCoverAmount() {
    return http.get(`/get/coveramountlist`);
  }
  
  AddCoverAmount(coveramount) {
    http.post(`/create/coveramount`, { n_coveramount: coveramount }).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Cover amount`);
        }
        else {
          toast.error('Cover Amount Already Exist!');
        }
      }
    );;
    return http.get(`/get/coveramountlist`);
  }
  
  UpdateCoverAmount(id, coveramount) {
    http.put(`/update/coveramount?id=${id}`, {n_coveramount: coveramount}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated Cover amount`);
        }
        else {
          toast.error('Cover Amount Already Exist!');
        }
      }
    );;
    return http.get(`/get/coveramountlist`);
  }
  
  DeleteCoverAmount(id) {
    http.delete(`/delete/coveramount?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/coveramountlist`);
  }
  
  getMemberType() {
    return http.get(`/get/membertypelist`);
  }
  
  getCoverType() {
    return http.get(`/get/covertypelist`);
  }
  
  AddCoverType(name, covertype) {
    http.post(`/create/covertype`, { c_covertype: name, n_member_type: covertype }).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully created Option Type`);
        }
        else{
          toast.error('Option Type Already Exist!');
        }
      }
    );;
    return http.get(`/get/covertypelist`);
  }
  
  UpdateCoverType(id, name, covertype) {
    http.put(`/update/covertype?id=${id}`, {c_covertype: name, n_member_type: covertype}).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated Option Type`);
        }
        else {
          toast.error('Cover Type Already Exist!');
        }
      }
    );;
    return http.get(`/get/covertypelist`);
  }
  
  DeleteCoverType(id) {
    http.delete(`/delete/covertype?id=${id}`).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/covertypelist`);
  }

  /////////////
  getIdType() {
    return http.get(`/get/idtypelist`);
  }
  
  getPaySchdeule() {
    return http.get(`/get/payschedulelist`);
  }
  
  getAgeGroup(covertype, planfor, membertype) {
    return http.post(`/get/agegroups`, {n_covertype: covertype, n_planfor: planfor, n_member_type: membertype});
  }
  
  //Billing Options
  getBankAccount(token) {
    return http.get(`/get/bank_account`, 
    {
      headers: {
        "x-access-token": token
      }
    });
  }
  
  AddBankAccount(token, c_payee_name , c_bank_name , c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status ) {
    http.post(`/create/bank_account?c_payee_name=${c_payee_name}&c_bank_name=${c_bank_name}&c_account_number=${c_account_number}&n_account_type=${n_account_type}&
    c_branch_code=${c_branch_code}&c_bank_location=${c_bank_location}&is_active=${is_active}&n_verification_status=${n_verification_status}`
    , {}, {headers: { "x-access-token": token }})
    .then(
      (res) => {
        console.log(res.data);
        if(res.data.status){
          toast.success(`You have successfully created BankAccount`);
        }
        else{
          toast.error('Bank Account Option Already Exist!');
        }
      }
    ).catch(error => {
        toast.error(`Please enter correct information.`);
    });

    return http.get(`/get/bank_account`,
    {
      headers: {
        "x-access-token": token
      }
    });
  }
  
  UpdateBankAccount(id, token, c_payee_name , c_bank_name , c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status ) {
    http.put(`/update/bank_account?id=${id}&c_payee_name=${c_payee_name}&c_bank_name=${c_bank_name}&c_account_number=${c_account_number}&n_account_type=${n_account_type}&
    c_branch_code=${c_branch_code}&c_bank_location=${c_bank_location}&is_active=${is_active}&n_verification_status=${n_verification_status}`
    , {}, {headers: { "x-access-token": token }})
    .then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully updated BankAccount`);
        }
        else {
          toast.error('Bank Account Already Exist!');
        }
      }
    )
    .catch(error => {
      toast.error(`Please enter correct information.`);
    });
    
    return http.get(`/get/bank_account`,
    {
      headers: {
        "x-access-token": token
      }
    });
  }
  
  DeleteBankAccount(id, token) {
    http.delete(`/delete/bank_account?id=${id}`,
    {
      headers: {
        "x-access-token": token
      }
    }).then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully deleted`);
        }
        else{
          toast.error('Failed deleted');
        }
      }
    );;
    return http.get(`/get/bank_account`,
    {
      headers: {
        "x-access-token": token
      }
    });
  }
  
  VerifyBankAccount(token, c_bank_name, c_payee_name ,c_account_number, n_account_type, c_branch_code) {
    http.put(`/verify/bank_account`, {c_bank_name: c_bank_name, c_payee_name: c_payee_name, c_account_number: c_account_number,
      n_account_type: n_account_type, c_branch_code: c_branch_code}
      , {headers: { "x-access-token": token }})
    .then(
      (res) => {
        if(res.data.status){
          toast.success(`You have successfully Verified BankAccount`);
        }
        else {
          toast.error('Verification Failed!');
        }
      }
    );;
    return http.get(`/get/bank_account`);
  }

  getRelationshipList() {
    return http.get(`/get/relationshiplist`);
  }

  getModecommList() {
    return http.get(`/get/modecomm`);
  }

  getCountryList() {
    return http.get(`/get/country`);
  }

  getRegion() {
    return http.get(`/get/regionlist`);
  }

  getCircuit() {
    return http.get(`/get/circuitslist`);
  }

  getTemple() {
    return http.get(`/get/templeslist`);
  }
  
  getAddressType() {
    return http.get(`/get/addresstypelist`);
  }

  getCircuitbyregion(regionid) {
    return http.get(`/get/circuitsbyregion?regionid=${regionid}`).catch(error => {
      console.log(error);
    });
  }
  
  getTemplebycircuit(circuitid) {
    return http.get(`/get/templesbycircuit?circuitid=${circuitid}`);
  }

  getContactList(token) {
    return http.get(`/get/contactslist`, {headers: { "x-access-token": token }});
  }

  getContactData(token, id) {
    return http.get(`/get/contactsdata?id=${id}`, {headers: { "x-access-token": token }});
  }

  deleteContact(token, id) {
    return http.delete(`/delete/contact?id=${id}`, {headers: { "x-access-token": token }});
  }
  
  AddContactBaseInfo(token, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell) {
    return http.post(`/create/cbasicinfo`, 
              { c_initials: initial, c_title: title, c_firstname: firstname, 
                c_lastname: lastname, n_gender:gender, n_relationship:relation, d_dob: birthday, 
                c_email: email, n_tel_home: telephone, n_cell: cell}, 
              {headers: { "x-access-token": token }})
  }

  UpdateContactBaseInfo(token, id, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell) {
    return http.put(`/update/cbasicinfo?id=${id}`, 
              { c_initials: initial, c_title: title, c_firstname: firstname, 
                c_lastname: lastname, n_gender:gender, n_relationship:relation, d_dob: birthday, 
                c_email: email, n_tel_home: telephone, n_cell: cell}, 
              {headers: { "x-access-token": token }})
  }


  AddContactAddressInfo(token, contactId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
    phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm) {
    http.post(`/create/caddress`, 
              { n_contactid: contactId, c_phy_add_l1: phyresidenaddr1 , c_phy_add_l2: phyresidenaddr2, n_phy_postal_code: phycontactpostalcode, 
                c_phy_region: phyregion, c_phy_circuit: phycircuit, c_phy_temple: phytemple, n_phy_country: phycountry, 
                c_res_add_l1: postresidenaddr1, c_res_add_l2: postresidenaddr2, n_res_postal_code: postcontactpostalcode,
                c_res_region: postregion, c_res_circuit: postcircuit, c_res_temple: posttemple, n_res_country: postcountry,
                n_mode_communication: modecomm }, 
              {headers: { "x-access-token": token }})
    .then(
      (res) => {
        if(res.data.status){
          toast.success(res.data.message);
        }
        else{
          toast.error(res.data.message);
        }
      }
    );
  }

  UpdateContactAddressInfo(token, addressId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
    phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm) {
    http.put(`/update/caddress?id=${addressId}`, 
              { c_phy_add_l1: phyresidenaddr1 , c_phy_add_l2: phyresidenaddr2, n_phy_postal_code: phycontactpostalcode, 
                c_phy_region: phyregion, c_phy_circuit: phycircuit, c_phy_temple: phytemple, n_phy_country: phycountry, 
                c_res_add_l1: postresidenaddr1, c_res_add_l2: postresidenaddr2, n_res_postal_code: postcontactpostalcode,
                c_res_region: postregion, c_res_circuit: postcircuit, c_res_temple: posttemple, n_res_country: postcountry,
                n_mode_communication: modecomm }, 
              {headers: { "x-access-token": token }})
    .then(
      (res) => {
        if(res.data.status){
          toast.success(res.data.message);
        }
        else{
          toast.error(res.data.message);
        }
      }
    );
  }

  AddContactUploadId(token, formData) {
    axios({
      method: "post",
      url: `${baseURL}/create/cid`,
      data: formData,
      headers: { "x-access-token": token },
    })
    .then(
      (res) => {
        if(res.data.status){
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    );
  }

  UpdateContactUploadId(token, id, formData) {
    axios({
      method: "put",
      url: `${baseURL}/update/cid?id=${id}`,
      data: formData,
      headers: { "x-access-token": token },
    })
    .then(
      (res) => {
        if(res.data.status){
          toast.success(res.data.message);
        }
        else{
          toast.error(res.data.message);
        }
      }
    );
  }

  updateUserBaseInfo(token, formData) {
      axios({
          method: "put",
          url: `${baseURL}/update/credentials`,
          data: formData,
          headers: { "x-access-token": token },
      }).then(
          (res) => {
              if(res.data.status){
                  toast.success(res.data.message);
              } else {
                  toast.error(res.data.message);
              }
          }
      );
  }

    updateUserAddress(token, data) {
        http.put(`/update/useraddress`, data,
            {headers: { "x-access-token": token }})
            .then((res) => {
                if(res.data.status){
                    toast.success(res.data.message);
                } else{
                    toast.error(res.data.message);
                }
            });
    }

    getPolicyMember(token, policyId) {
        return http.get(`/get/policy_member?id=${policyId}`, {headers: { "x-access-token": token }});
    }

    addPolicyMember(token, body) {
        http.post(`/create/policy_member`, body,
            {headers: { "x-access-token": token }}
        ).then((res) => {
            if(res.data.status){
                toast.success(res.data.message);
            } else{
                toast.error(res.data.message);
            }
        });
    }

    updatePolicyMember(token, policy_id, body) {
        http.put(`/update/policy_member?id=${policy_id}`, body,
            {headers: { "x-access-token": token }}
        ).then((res) => {
            if(res.data.status){
                toast.success(res.data.message);
            } else{
                toast.error(res.data.message);
            }
        });
    };

    addPolicyPremium(token, body) {
        return http.post(`/create/policy_premium`, body, {headers: { "x-access-token": token }});
    }

    getPolicyDependents(token, premiumId) {
        return http.get(`/get/dependents?id=${premiumId}`, {headers: { "x-access-token": token }});
    }

    addPolicyDependents(token, data) {
        http.post(`/create/dependents`, data,
            {headers: { "x-access-token": token }}
        ).then((res) => {
            if(res.data.status){
                toast.success(res.data.message);
            } else{
                toast.error(res.data.message);
            }
        });
    }




}

export default new TutorialDataService();