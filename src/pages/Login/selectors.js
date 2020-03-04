import { createSelector } from 'reselect';

const getUserData = state => state.session.userData;

export const memorizedUserData = createSelector(
  getUserData,
  userData => userData
);

export const DELETE = createSelector(getUserData, userData => userData);
