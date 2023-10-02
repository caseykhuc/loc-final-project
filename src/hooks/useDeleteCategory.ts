import { useTypedDispatch } from 'hooks';
import { useEffect, useRef } from 'react';
import { TypedDispatch } from 'redux/store';
import { CategoriesDataType } from 'types/category';
import { offLoading, onLoading } from '../redux/actions/modal';
import useCloseModal from './useCloseModal';

const useDeleteCategory = (
  data: CategoriesDataType,
  setData: (param: ((prev: CategoriesDataType) => CategoriesDataType) | CategoriesDataType) => void,
  setIsLoading: (param: ((prev: boolean) => boolean) | boolean) => void,
  dispatchDeleteAction: (
    ...params: any[]
  ) => (dispatch: TypedDispatch) => Promise<CategoriesDataType>,
  dispatchFetchAction: (
    ...params: any[]
  ) => (dispatch: TypedDispatch) => Promise<CategoriesDataType>,
) => {
  const closeModalHandle = useCloseModal();
  const dispatch = useTypedDispatch();

  const isCancel = useRef(false);

  useEffect(
    () => () => {
      isCancel.current = true;
    },
    [],
  );

  const handleSubmit = async (id: number) => {
    try {
      dispatch(onLoading());
      await dispatch(dispatchDeleteAction(id));
      closeModalHandle();

      setIsLoading(true);
      const resData = await dispatch(dispatchFetchAction(1));
      setIsLoading(false);

      if (!isCancel.current) {
        setData(resData);
        setIsLoading(false);
      }
      dispatch(offLoading());
    }
    catch {
      dispatch(offLoading());
    }
  };

  return handleSubmit;
};

export default useDeleteCategory;
