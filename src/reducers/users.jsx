import { ADD_USER, REMOVE_USER, REMOVE_ALL_USERS } from "./../actions/users/actionTypes";
import _isEqual from 'lodash/isEqual';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER:
      const user = action.payload;
      user.id = new Date().getTime();

      return [
        ...state,
        user
      ]

    case REMOVE_USER:
      return state.filter(user => !_isEqual(user, action.payload));

    case REMOVE_ALL_USERS:
      return defaultState;

    default:
      return state;
  }
};
