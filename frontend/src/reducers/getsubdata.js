import {  
    GET_MEMBERTYPE,
    GET_AGEGROUP,
    GET_RELATIONSHIP
    } from "../actions/types";
    
const initialState = {
    membertype: [],
    agegroup: [],
    relationshiplist: [],
};

function getsubdataReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case GET_MEMBERTYPE:
        return {...state, membertype: payload};
    case GET_AGEGROUP:
        return {...state, agegroup: payload};
    case GET_RELATIONSHIP:
        return {...state, relationshiplist: payload};
    default:
        return state;
    }
};

export default getsubdataReducer;