import { createFeatureSelector, createSelector  } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";


export const authSelector = createFeatureSelector('auth');
export const errorAuthSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.error;
    } else {
      return null;
    }
  }
);

export const tokenSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.token;
    } else {
      return null;
    }
  }
);

export const isLoggedinSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.isLoggedin;
    } else {
      return false;
    }
  }
);

export const currentUserSelector = createSelector(authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.user;
    } else {
      return null;
    }
  }
);
