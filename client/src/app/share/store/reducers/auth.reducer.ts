import { AuthActions, SIGNUP_ERROR, SIGNIN_ERROR, SIGNIN_SUCCESS, LOGOUT, SET_CURRENT_USER } from './../actions/auth.actions';
import { User } from './../../models/user.model';
import { Action } from '@ngrx/store';


export interface AuthState {
  user: User;
  token: string;
  error: string;
  isLoggedin: boolean;
}

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  error: null,
  isLoggedin: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGNIN_ERROR :
    case SIGNUP_ERROR : {
      return {
        ...state,
        error: action.payload
      };
    }
    case SIGNIN_SUCCESS : {
      return {
        ...state,
        token: action.payload,
        isLoggedin: true,
        error: null
      };
    }
    case LOGOUT : {
      return {
        ...state,
        user: null,
        token: null,
        error: null,
        isLoggedin: false
      };
    }
    case SET_CURRENT_USER : {
      return {
        ...state,
        user: action.payload
      };
    }
  }
  return state;
}
