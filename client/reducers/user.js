//@flow

import type { Action } from '../types';
import type { UserState } from '../types/state';

const initialState = {
  isAuthorized: false,
  userProfile: {},
  token: {}
};

export default (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case 'user/SE_ACCESS_TOKEN':
      {
        const {
          scope,
          ...others
        } = action.payload;
        return Object.assign({}, state, {
          isAuthorized: true,
          token: {
            ...others,
            user_scope: scope.split(" ")
          }
        });
      }
      // setUserProfile
    case 'user/SE_USER_PROFILE':
      {
        const {
          links,
          ...others
        } = action.payload;
        // like > state.user.userProfile
        return Object.assign({}, state, {
          userProfile: {
            ...others
          },
          links
        });
      }
    default:
      return state;
  }
};