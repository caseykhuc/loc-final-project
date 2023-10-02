import React, { useEffect, useState, useRef } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useTypedDispatch } from 'hooks';
import { TypedDispatch } from 'redux/store';
import { CategoriesDataType } from 'types/category';
import SkeletonTable from '../SkeletonTable/SkeletonTable';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import styles from './index.module.scss';

type PageWithTableProps = {
  data: CategoriesDataType;
  setData: (data: CategoriesDataType) => void;
  tableTitle: string;
  fetchData: () => (dispatch: TypedDispatch) => Promise<any>;
  CreateButton: React.ReactNode;
  renderTable: (list: Array<any>) => JSX.Element | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  createButtonClick: () => void;
  removeIconClick: (id: number) => void;
};

const PageWithTable: React.FC<PageWithTableProps> = ({
  data,
  setData,
  tableTitle,
  fetchData,
  CreateButton,
  renderTable,
  isLoading,
  setIsLoading,
  createButtonClick,
  removeIconClick,
}) => {
  const { hash } = useLocation();
  const [isHandleHash, setIsHandleHash] = useState<boolean>(false);
  const firstUpdate = useRef(false);

  const dispatch = useTypedDispatch();

  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hashValue = queryString.parse(hash);
    if (!firstUpdate.current) {
      return;
    }

    if (isHandleHash) {
      return;
    }

    const { action, id } = hashValue;

    if (!action && !id) {
      return;
    }

    switch (action) {
      case 'create':
        createButtonClick();
        break;

      case 'delete':
        if (id) {
          removeIconClick(+id);
        }
        break;
      default:
        break;
    }
    setIsHandleHash(true);
  }, [hash, isHandleHash, createButtonClick, removeIconClick]);

  useEffect(() => {
    dispatch(fetchData())
      .then((resData: CategoriesDataType | any) => {
        if (componentRef.current) {
          setData(resData);
          setIsLoading(false);
          if (!firstUpdate.current) {
            firstUpdate.current = true;
          }
        }
      })
      .catch(() => {
        if (componentRef.current) {
          setIsLoading(false);
          if (!firstUpdate.current) {
            firstUpdate.current = true;
          }
        }
      });
  }, [dispatch, fetchData, setData, setIsLoading]);

  return (
    <div className={classNames(styles.page)} ref={componentRef}>
      <div className="u-flex u-justifyContentBetween u-alignItemsCenter u-marginBottomSmall">
        <h1 className="u-text600 u-marginNone">
          <Breadcrumb />
        </h1>
        {CreateButton}
      </div>

      <div
        className={classNames(
          styles.pageContent,
          'u-shadowMedium u-backgroundWhite u-roundedMedium',
        )}
      >
        <header className="u-backgroundLightest u-paddingHorizontalMedium u-paddingVerticalTiny u-textPrimaryDarker">
          {tableTitle}
        </header>
        <div className="u-paddingHorizontalMedium u-paddingVerticalSmall">
          {!isLoading && renderTable(data)}

          {isLoading && <SkeletonTable />}
        </div>
      </div>
    </div>
  );
};

export default PageWithTable;
