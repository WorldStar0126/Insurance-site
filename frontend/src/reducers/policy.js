import {
    GET_POLICY,
    ADD_POLICY,
    EDIT_POLICY,
    DELETE_POLICY,
    GET_MAIN_MEMBER,
    GET_POLICY_PREMIUM,
    GET_POLICY_DEPENDENTS
} from "../actions/types";

const initialState = [];

function policyReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {
        case GET_POLICY:
            return [payload];
        case ADD_POLICY:
            return [...state, payload];
        case EDIT_POLICY:
            return [...state, payload];
        case DELETE_POLICY:
            return [...state, payload];
        case GET_MAIN_MEMBER:
            return {...state, mainMember: payload};
        case GET_POLICY_PREMIUM:
            return {...state, policyPremium: payload};
        case GET_POLICY_DEPENDENTS:
            return {...state, policyDependents: payload};
        default:
            return state;
    }
}

export default policyReducer;