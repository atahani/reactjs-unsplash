import {SE_ACCESS_TOKEN} from '../constants/action-types';

const initialState = {
  is_authorized: false,
  token: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SE_ACCESS_TOKEN:
      {
        const {
          scope,
          ...others
        } = action.payload;
        return Object.assign({}, state, {
          is_authorized: true,
          token: {
            ...others,
            user_scope: scope.split(" ")
          }
        });
      }
    default:
      return state;
  }
}