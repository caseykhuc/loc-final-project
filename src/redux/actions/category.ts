import { EndPoints } from 'constants/api';
import helper from 'services/helper';
import { CategoryPayload } from 'types/category';
import { TypedDispatch } from '../store';
import { handleAsyncAction } from './utils';

export const CategoryActions = {
  FETCH_CATEGORY_DETAIL: 'FETCH_CATEGORY_DETAIL',
  FETCH_CATEGORY_LIST: 'FETCH_CATEGORY_LIST',
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};

export const fetchCategoryDetail = (id: number) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.CATEGORIES}/${id}`;
  return handleAsyncAction(dispatch, CategoryActions.FETCH_CATEGORY_DETAIL, () => helper.get(url));
};

export const fetchCategoryList = () => (dispatch: TypedDispatch) => {
  const url = EndPoints.CATEGORIES;

  return handleAsyncAction(dispatch, CategoryActions.FETCH_CATEGORY_LIST, () => helper.get(url));
};

export const createCategory = (payload: CategoryPayload) => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, CategoryActions.CREATE_CATEGORY, () =>
    helper.postWithAuthentication(EndPoints.CATEGORIES, payload));

export const removeCategory = (id: number) => (dispatch: TypedDispatch) => {
  const url = `${EndPoints.CATEGORIES}/${id}`;
  return handleAsyncAction(dispatch, CategoryActions.DELETE_CATEGORY, () =>
    helper.deleteWithAuthentication(url));
};
