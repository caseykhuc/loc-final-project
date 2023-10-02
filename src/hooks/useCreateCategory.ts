import { useCloseModal, useTypedDispatch } from 'hooks';
import { offLoading, onLoading } from 'redux/actions/modal';
import { TypedDispatch } from 'redux/store';
import { CategoriesDataType } from 'types/category';

const useCreate = (
  data: CategoriesDataType,
  setData: (param: ((prev: CategoriesDataType) => CategoriesDataType) | CategoriesDataType) => void,
  dispatchAction: (...params: any[]) => (dispatch: TypedDispatch) => Promise<CategoriesDataType>,
  setIsLoading: (param: ((prev: boolean) => boolean) | boolean) => void,
  dispatchFetchAction: (
    ...params: any[]
  ) => (dispatch: TypedDispatch) => Promise<CategoriesDataType>,
) => {
  const dispatch = useTypedDispatch();
  const closeModalHandle = useCloseModal();

  const handleSubmit = (formData: unknown) => {
    dispatch(onLoading());

    dispatch(dispatchAction(formData))
      .then(async () => {
        setIsLoading(true);
        const responseData = await dispatch(dispatchFetchAction());
        setData(responseData);
        setIsLoading(false);
        dispatch(offLoading());
        closeModalHandle();
      })
      .catch(() => dispatch(offLoading()));
  };
  return handleSubmit;
};

export default useCreate;
