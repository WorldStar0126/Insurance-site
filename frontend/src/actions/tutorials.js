import * as Type from "./types"

import TutorialDataService from "../services/tutorial.service";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const getUserById = (token) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getUserbyId(token);
        dispatch({
            type: Type.GET_USERBYID,
            payload: res.data.data,
        });
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getCompany = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCompany();
        dispatch({
            type: Type.GET_COMPANY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const updateCompany = (id, name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateCompany(id, name);
        dispatch({
            type: Type.EDIT_COMPANY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const AddCompany = (name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddCompany(name);
        dispatch({
            type: Type.ADD_COMPANY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeleteCompany = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteCompany(id);
        dispatch({
            type: Type.DELETE_COMPANY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getCategory = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCategory();
        dispatch({
            type: Type.GET_CATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddCategory = (name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddCategory(name);
        console.log(res.data)
        dispatch({
            type: Type.ADD_CATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const updateCategory = (id, name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateCategory(id, name);
        dispatch({
            type: Type.EDIT_CATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeleteCategory = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteCategory(id);
        dispatch({
            type: Type.DELETE_CATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getSubCategory = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getSubCategory();
        dispatch({
            type: Type.GET_SUBCATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddSubCategory = (id, name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddSubCategory(id, name);
        dispatch({
            type: Type.ADD_SUBCATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const updateSubCategory = (id, catid, name) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateSubCategory(id, catid, name);
        dispatch({
            type: Type.EDIT_SUBCATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeleteSubCategory = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteSubCategory(id);
        dispatch({
            type: Type.DELETE_SUBCATEGORY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getProduct = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getProduct();
        dispatch({
            type: Type.GET_PRODUCT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getProductView = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getProductView();
        dispatch({
            type: Type.GET_PRODUCTVIEW,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddProduct = (productname, companyid, catid, subcatid) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddProduct(productname, companyid, catid, subcatid);
        dispatch({
            type: Type.ADD_PRODUCT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const UpdateProduct = (id, name, companyid, catid, subcatid) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateProduct(id, name, companyid, catid, subcatid);
        dispatch({
            type: Type.EDIT_PRODUCT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeleteProduct = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteProduct(id);
        dispatch({
            type: Type.DELETE_PRODUCT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const selectcategory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: Type.SELECT_CAT,
            payload: id,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPolicy = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getPolicy();
        dispatch({
            type: Type.GET_POLICY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPolicyById = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getPolicyById(id);
        dispatch({
            type: Type.GET_POLICYBYID,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPolicyView = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getPolicyView();
        dispatch({
            type: Type.GET_POLICYVIEW,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddPolicy = (data) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddPolicy(data);
        dispatch({
            type: Type.ADD_POLICY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const UpdatePolicy = (id, data) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdatePolicy(id, data);
        dispatch({
            type: Type.EDIT_POLICY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeletePolicy = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeletePolicy(id);
        dispatch({
            type: Type.DELETE_POLICY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getcoverAmount = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCoverAmount();
        dispatch({
            type: Type.GET_COVERAMOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddcoverAmount = (coveramount) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddCoverAmount(coveramount);
        dispatch({
            type: Type.ADD_COVERAMOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const UpdatecoverAmount = (id, coveramount) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateCoverAmount(id, coveramount);
        dispatch({
            type: Type.EDIT_COVERAMOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeletecoverAmount = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteCoverAmount(id);
        dispatch({
            type: Type.DELETE_COVERAMOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getmemberType = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getMemberType();
        dispatch({
            type: Type.GET_MEMBERTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getcoverType = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCoverType();
        dispatch({
            type: Type.GET_OPTIONTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddcoverType = (name, covertype) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddCoverType(name, covertype);
        dispatch({
            type: Type.ADD_OPTIONTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const UpdatecoverType = (id, name, covertype) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateCoverType(id, name, covertype);
        dispatch({
            type: Type.EDIT_OPTIONTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeletecoverType = (id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteCoverType(id);
        dispatch({
            type: Type.DELETE_OPTIONTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const getageGroup = (covertype, planfor, membertype) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getAgeGroup(covertype, planfor, membertype);
        dispatch({
            type: Type.GET_AGEGROUP,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

//Billing options

export const getTransaction = (token) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getTransaction(token);
        dispatch({
            type: Type.GET_TRANSACTION,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getBankAccount = (token) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getBankAccount(token);
        dispatch({
            type: Type.GET_BANKACCOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddBankAccount = (token, c_payee_name, c_bank_name, c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status) => async (dispatch) => {
    try {
        const res = await TutorialDataService.AddBankAccount(token, c_payee_name, c_bank_name, c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status);
        dispatch({
            type: Type.ADD_BANKACCOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const UpdateBankAccount = (id, token, c_payee_name, c_bank_name, c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status) => async (dispatch) => {
    try {
        const res = await TutorialDataService.UpdateBankAccount(id, token, c_payee_name, c_bank_name, c_account_number, n_account_type, c_branch_code, c_bank_location, is_active, n_verification_status);
        dispatch({
            type: Type.EDIT_BANKACCOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

export const DeleteBankAccount = (id, token) => async (dispatch) => {
    try {
        const res = await TutorialDataService.DeleteBankAccount(id, token);
        dispatch({
            type: Type.DELETE_BANKACCOUNT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(Promise.reject(err));
        return Promise.reject(err);
    }
};

//Contact 

export const getrelationshiplist = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getRelationshipList();
        dispatch({
            type: Type.GET_RELATIONSHIP,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getmodecommlist = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getModecommList();
        dispatch({
            type: Type.GET_MODECOMMUNICATION,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getcountrylist = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCountryList();
        dispatch({
            type: Type.GET_COUNTRY,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getregion = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getRegion();
        dispatch({
            type: Type.GET_REGION,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getcircuit = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCircuit();
        dispatch({
            type: Type.GET_CIRCUIT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const gettemple = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getTemple();
        dispatch({
            type: Type.GET_TEMPLE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getcircuitbyregion = (regionid) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getCircuitbyregion(regionid);
        dispatch({
            type: Type.GET_CIRCUITBYREGION,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const gettemplebycircuit = (circuitid) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getTemplebycircuit(circuitid);
        dispatch({
            type: Type.GET_TEMPLEBYCIRCUIT,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getaddressType = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getAddressType();
        dispatch({
            type: Type.GET_ADDRESSTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getcontactlist = (token) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getContactList(token);
        dispatch({
            type: Type.GET_CONTACTLIST,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};


export const getcontactdata = (token, id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.getContactData(token, id);
        dispatch({
            type: Type.GET_CONTACTDATA,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteContact = (token, id) => async (dispatch) => {
    try {
        const res = await TutorialDataService.deleteContact(token, id);
        dispatch({
            type: Type.DELETE_CONTACT,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const AddContactBaseInfo = (token, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell) => async (dispatch) => {
    try {

        const res = await TutorialDataService.AddContactBaseInfo(token, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell);

        if (res.data.status) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }

        dispatch({
            type: Type.GET_CURRENTCONTACT,
            payload: res.data.data,
        });

    } catch (err) {
        console.log(err)
    }
};


export const UpdateContactBaseInfo = (token, id, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell) => async (dispatch) => {
    try {

        const res = await TutorialDataService.UpdateContactBaseInfo(token, id, title, initial, firstname, lastname, gender, birthday, relation, email, telephone, cell);

        dispatch({
            type: Type.UPDATE_CURRENTCONTACT,
            payload: parseInt(res.data.data),
        });

        if (res.data.status) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }

    } catch (err) {
        console.log(err)
    }
};

export const SetContactId = (id) => (dispatch) => {
    dispatch({
        type: Type.SET_CONTACTID,
        payload: id,
    });
};

export const AddContactAddressInfo = (token, contactId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
                                      phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm) => async (dispatch) => {
    try {
        const res = TutorialDataService.AddContactAddressInfo(token, contactId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
            phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm);

        dispatch({
            type: Type.GET_CONTACTADDRESSINFO,
            payload: [],
        });

    } catch (err) {
        console.log(err);
    }
};

export const UpdateContactAddressInfo = (token, addressId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
                                         phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm) => async (dispatch) => {
    try {
        const res = TutorialDataService.UpdateContactAddressInfo(token, addressId, phyresidenaddr1, phyresidenaddr2, phycontactpostalcode, phyregion, phycircuit, phytemple,
            phycountry, postresidenaddr1, postresidenaddr2, postcontactpostalcode, postregion, postcircuit, posttemple, postcountry, modecomm);

        dispatch({
            type: Type.UPDATE_CONTACTADDRESSINFO,
            payload: [],
        });

    } catch (err) {
        console.log(err);
    }
};

export const AddContactUploadId = (token, formData) => async (dispatch) => {
    try {
        TutorialDataService.AddContactUploadId(token, formData);
        dispatch({
            type: Type.GET_CONTACTINDENTIFICATION,
            payload: [],
        });
    } catch (err) {
        console.log(err)
    }
};

export const UpdateContactUploadId = (token, id, formData) => async (dispatch) => {
    try {
        TutorialDataService.UpdateContactUploadId(token, id, formData);
        dispatch({
            type: Type.UPDATE_CONTACTINDENTIFICATION,
            payload: [],
        });
    } catch (err) {
        console.log(err)
    }
};

export const updateUserBaseInfo = (token, formData) => async () => {

    try {
        TutorialDataService.updateUserBaseInfo(token, formData);
    } catch (err) {
        console.log(err);
    }

}

export const updateUserAddress = (token, data) => async () => {

    try {
        TutorialDataService.updateUserAddress(token, data);
    } catch (err) {
        console.log(err);
    }

}

export const contactPageStatu = (index) => async (dispatch) => {
    dispatch({
        type: Type.CHANGE_CONTACTPAGESTATUS,
        payload: index,
    });
};


export const sortData = (data) => async (dispatch) => {
    dispatch({
        type: Type.SORT_DATA,
        payload: data,
    });
};

export const setPremiumCnt = (cnt) => async (dispatch) => {
    dispatch({
        type: Type.SET_PREMIUMCNT,
        payload: cnt,
    });
};

export const setPlanCnt = () => async (dispatch) => {
    dispatch({
        type: Type.SET_PLANCNT
    });
};

export const deletePlanCnt = () => async (dispatch) => {
    dispatch({
        type: Type.DELETE_PLANCNT
    });
};

export const setAmountCnt = (cnt) => async (dispatch) => {
    dispatch({
        type: Type.SET_AMOUNTCNT,
        payload: cnt,
    });
};

export const deleteAmountCnt = (cnt) => async (dispatch) => {
    dispatch({
        type: Type.DELETE_PLANCNT,
        payload: cnt,
    });
};

export const getidType = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getIdType();
        dispatch({
            type: Type.GET_IDTYPE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getpaySchdeule = () => async (dispatch) => {
    try {
        const res = await TutorialDataService.getPaySchdeule();
        dispatch({
            type: Type.GET_PAYSCHEDULE,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getPolicyMember = (token, policyId) => async (dispatch) => {

    try {
        const res = await TutorialDataService.getPolicyMember(token, policyId);
        dispatch({
            type: Type.GET_MAIN_MEMBER,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }

}


export const addPolicyMember = (token, body) => async () => {
    try {
        TutorialDataService.addPolicyMember(token, body);
    } catch (err) {
        console.log(err)
    }
};

export const updatePolicyMember = (token, id, body) => async () => {
    try {
        TutorialDataService.updatePolicyMember(token, id, body);
    } catch (err) {
        console.log(err)
    }
};


export const addPolicyPremium = (token, body) => async (dispatch) => {
    try {
        const res = await TutorialDataService.addPolicyPremium(token, body);
        dispatch({
            type: Type.GET_POLICY_PREMIUM,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err)
    }
};

export const getPolicyDependents = (token, premiumId) => async (dispatch) => {

    try {
        const res = await TutorialDataService.getPolicyDependents(token, premiumId);
        dispatch({
            type: Type.GET_POLICY_DEPENDENTS,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err);
    }

}

export const addPolicyDependents = (token, data) => async () => {
    try {
        TutorialDataService.addPolicyDependents(token, data);
    } catch (err) {
        console.log(err)
    }
};
