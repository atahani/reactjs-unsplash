import {SE_ACCESS_TOKEN, SE_USER_PROFILE} from '../constants/action-types';

const initialState = {
  is_authorized: false,
  user_profile: {},
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
      // setUserProfile
    case SE_USER_PROFILE:
      {
        const {
          links,
          ...others
        } = action.payload;
        // like > state.user.user_profile
        return Object.assign({}, state, {
          user_profile: {
            ...others
          },
          links
        });
      }
    default:
      return state;
  }
}