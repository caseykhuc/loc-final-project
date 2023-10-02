import { RootState } from 'redux/store';
import { User } from 'types/redux';
import jwtDecode from 'jwt-decode';
import { AUTH_STORAGE_KEY } from 'constants/storage';

type Action = {
  type: string;
  payload?: User;
};

const accessToken = localStorage.getItem(AUTH_STORAGE_KEY) || '';
const { sub } = jwtDecode<{ sub: number }>(accessToken);

const initialState: User = {
  id: sub,
  isLoggedIn: !!sub,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
      };

    case 'REGISTER_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
      };

    case 'LOGOUT':
      return {
        id: undefined,
        isLoggedIn: false,
      };

    case 'FETCH_USER_INFO_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };

    case 'FETCH_USER_INFO_FAILURE':
      return state;

    default:
      return state;
  }
};

export const userSelector = (state: RootState) => state.user;
export default userReducer;
