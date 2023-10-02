import { useSearchParams } from 'react-router-dom';
import { TypedDispatch } from 'redux/store';
import { offLoading, onLoading } from 'redux/actions/modal';
import { GenericDataTable } from 'types/common';
import { ITEMS_PER_PAGE } from 'constants/pagination';
import { useTypedDispatch, useCloseModal } from 'hooks';

const useCreate = (
  data: GenericDataTable,
  setData: (param: ((prev: GenericDataTable) => GenericDataTable) | GenericDataTable) => void,
  dispatchAction: (...params: any[]) => (dispatch: TypedDispatch) => Promise<GenericDataTable>,
) => {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModalHandle = useCloseModal();

  const handleSubmit = (formData: unknown) => {
    dispatch(onLoading());

    dispatch(dispatchAction(formData))
      .then((resData: GenericDataTable) => {
        const remainItemNumber = data.total % ITEMS_PER_PAGE;
        const totalPage = Math.floor(data.total / ITEMS_PER_PAGE);
        const lastPage = remainItemNumber ? totalPage + 1 : totalPage;

        const page = searchParams.get('page');
        const pageNumber = page && +page ? +page : 1;

        if (remainItemNumber && pageNumber === lastPage) {
          setData((prev: GenericDataTable) => ({
            total: prev.total + 1,
            items: [...prev.items, resData],
          }));
        }
        else if (remainItemNumber && pageNumber !== lastPage) {
          searchParams.set('page', lastPage.toString());
          setSearchParams(searchParams);
        }
        else if (!remainItemNumber && lastPage === 0) {
          setData((prev: GenericDataTable) => ({
            total: prev.total + 1,
            items: [...prev.items, resData],
          }));
        }
        else {
          searchParams.set('page', (lastPage + 1).toString());
          setSearchParams(searchParams);
        }
        dispatch(offLoading());
        closeModalHandle();
      })
      .catch(() => dispatch(offLoading()));
  };
  return handleSubmit;
};

export default useCreate;
