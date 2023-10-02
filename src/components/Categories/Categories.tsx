import { useEffect, useState } from 'react';

import { Button } from '@ahaui/react';

import { ModalList } from 'constants/modal';
import { useAppSelector, useAuthWarning, useCloseModal, useTypedDispatch } from 'hooks';
import useDeleteCategory from 'hooks/useDeleteCategory';
import useCreate from 'hooks/useCreateCategory';

import { setBreadcrumb } from 'redux/actions/breadcrumb';
import { createCategory, fetchCategoryList, removeCategory } from 'redux/actions/category';
import { setModal } from 'redux/actions/modal';
import { userSelector } from 'redux/reducers/user.';
import { CategoriesDataType, CategoryType } from 'types/category';

import CategoriesTable from 'components/Categories/CategoriesTable';
import CategoryPage from 'components/Common/CategoryPage';

const Categories = () => {
  const user = useAppSelector(userSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<CategoriesDataType>([]);
  const dispatch = useTypedDispatch();
  const handleUserNotLoggedIn = useAuthWarning();
  const submitCreateHandle = useCreate(
    data,
    setData,
    createCategory,
    setIsLoading,
    fetchCategoryList,
  );
  const submitDeleteHandle = useDeleteCategory(
    data,
    setData,
    setIsLoading,
    removeCategory,
    fetchCategoryList,
  );
  const closeModalHandle = useCloseModal();

  useEffect(() => {
    const newBreadcrumb = [
      {
        title: 'Manage Categories',
        href: '/categories',
      },
    ];

    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  const createCategoryOnClick = () => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn('create category', 'create');
      return;
    }

    dispatch(
      setModal({
        component: ModalList.CREATE_CATEGORY,
        componentProps: { submitHandle: submitCreateHandle, closeHandle: closeModalHandle },
        isLoading: false,
        isOpen: true,
        title: 'Create category form',
        footerContent: undefined,
        closeHandle: closeModalHandle,
      }),
    );
  };

  const removeIconOnClick = (id: number) => {
    if (!user.isLoggedIn) {
      handleUserNotLoggedIn('delete category', 'delete', id);
      return;
    }

    const toBeDeleteCategory = data.find((category) => category.id === id);

    if (toBeDeleteCategory) {
      dispatch(
        setModal({
          component: ModalList.DELETE_WARNING,
          componentProps: { itemName: toBeDeleteCategory.name },
          isLoading: false,
          isOpen: true,
          title: 'Delete Warning',
          closeHandle: closeModalHandle,
          footerContent: {
            closeButtonContent: 'Cancel',
            submitButtonContent: 'Confirm',
            closeButtonHandle: () => closeModalHandle(),
            submitButtonHandle: () => {
              submitDeleteHandle(id);
            },
          },
        }),
      );
    }
  };

  const renderTable = (list: Array<CategoryType>) => (
    <CategoriesTable list={list} removeHandle={removeIconOnClick} />
  );

  return (
    <div>
      <CategoryPage
        data={data}
        setData={setData}
        renderTable={renderTable}
        fetchData={fetchCategoryList}
        CreateButton={<Button onClick={createCategoryOnClick}>Create category</Button>}
        tableTitle="Category List"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        createButtonClick={createCategoryOnClick}
        removeIconClick={removeIconOnClick}
      />
    </div>
  );
};

export default Categories;
