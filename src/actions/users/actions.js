import { ADD_USER, REMOVE_USER, REMOVE_ALL_USERS } from './actionTypes'

export const addUser = user => ({
  type: ADD_USER,
  payload: user
});

export const removeUser = user => ({
  type: REMOVE_USER,
  payload: user
});

export const removeAllUsers = () => ({
  type: REMOVE_ALL_USERS
})