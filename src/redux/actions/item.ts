import { ItemPayload } from 'components/Items/ItemsType';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { TypedDispatch } from 'redux/store';
import helper from 'services/helper';
import { handleAsyncAction } from './utils';

export const ItemActions = {
  FETCH_ITEM_DETAIL: 'FETCH_ITEM_DETAIL',
  FETCH_ITEM_LIST: 'FETCH_ITEM_LIST',
  CREATE_ITEM: 'CREATE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

export const fetchItemDetail = (categoryId: number, id: number) => (dispatch: TypedDispatch) => {
  const url = `/categories/${categoryId}/items/${id}`;
  return handleAsyncAction(dispatch, ItemActions.FETCH_ITEM_DETAIL, () => helper.get(url));
};

export const fetchItemList = (categoryId: number, pageNumber: number, limit: number = ITEMS_PER_PAGE) =>
  (dispatch: TypedDispatch) => {
    const url = `/categories/${categoryId}/items?page=${pageNumber}&number_per_page=${limit}`;

    return handleAsyncAction(dispatch, ItemActions.FETCH_ITEM_LIST, () => helper.get(url));
  };

export const createItem = (categoryId: number, payload: ItemPayload) => (dispatch: TypedDispatch) =>
  handleAsyncAction(dispatch, ItemActions.CREATE_ITEM, () =>
    helper.postWithAuthentication(`/categories/${categoryId}/items`, payload));

export const editItem = (id: number, payload: ItemPayload) => (dispatch: TypedDispatch) => {
  const url = `/items/${id}`;
  return handleAsyncAction(dispatch, ItemActions.EDIT_ITEM, () =>
    helper.putWithAuthentication(url, payload));
};

export const removeItem = (id: number) => (dispatch: TypedDispatch) => {
  const url = `/items/${id}`;
  return handleAsyncAction(dispatch, ItemActions.DELETE_ITEM, () =>
    helper.deleteWithAuthentication(url));
};
