import {  
    GET_CONTACTLIST,
    GET_RELATIONSHIP,
    GET_COUNTRY,
    GET_MODECOMMUNICATION,
    GET_REGION,
    GET_CIRCUITBYREGION,
    GET_TEMPLEBYCIRCUIT,
    GET_CURRENTCONTACT,
    GET_CONTACTADDRESSINFO,
    GET_CONTACTINDENTIFICATION,
    UPDATE_CONTACTINDENTIFICATION,
    GET_ADDRESSTYPE,
    GET_CONTACTDATA,
    SET_CONTACTID,
    DELETE_CONTACT,
    UPDATE_CURRENTCONTACT,
    GET_CIRCUIT,
    GET_TEMPLE,
    UPDATE_CONTACTADDRESSINFO
    } from "../actions/types";
    
const initialState = {
    contactlist: [],
    relationshiplist: [],
    modecommlist: [],
    countrylist: [],
    regionlist: [],
    allcircuits: [],
    circuitlist: [],
    alltemples: [],
    templelist: [],
    addresstypelist: [],
    contact: {},
    activeTab: 1,
    contactdata: {},
    contactId: 0
};

function contactReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CONTACTLIST:
            return {...state, contactlist: payload};
        case GET_CURRENTCONTACT:
            return {...state, contact: payload, activeTab: 2, updateStatus: false};
        case UPDATE_CURRENTCONTACT:
            return {...state, contact: payload, activeTab: 2, updateStatus: true};
        case GET_CONTACTADDRESSINFO:
            return {...state, activeTab: 3, updateStatus: false};
        case UPDATE_CONTACTADDRESSINFO:
            return {...state, activeTab: 3, updateStatus: true};
        case GET_CONTACTINDENTIFICATION:
            return {...state, activeTab: 4, updateStatus: false};
        case UPDATE_CONTACTINDENTIFICATION:
            return {...state, activeTab: 4, updateStatus: true};
        case GET_RELATIONSHIP:
            return {...state, relationshiplist: payload};
        case GET_MODECOMMUNICATION:
            return {...state, modecommlist: payload};
        case GET_COUNTRY:
            return {...state, countrylist: payload};
        case GET_REGION:
            return {...state, regionlist: payload};
        case GET_CIRCUIT:
            return {...state, allcircuits: payload};
        case GET_TEMPLE:
            return {...state, alltemples: payload};
        case GET_CIRCUITBYREGION:
            return {...state, circuitlist: payload};
        case GET_TEMPLEBYCIRCUIT:
            return {...state, templelist: payload};
        case GET_ADDRESSTYPE:
            return {...state, addresstypelist: payload};
        case GET_CONTACTDATA:
            return {...state, contactdata: payload};
        case DELETE_CONTACT:
            return {...state};
        case SET_CONTACTID:
            return {...state, contactId: payload};
        default:
            return state;
    }
};

export default contactReducer;