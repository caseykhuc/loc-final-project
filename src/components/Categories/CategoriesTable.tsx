import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@ahaui/react';
import { addBreadcrumb } from 'redux/actions/breadcrumb';
import { useTypedDispatch } from 'hooks';
import { CategoryType } from 'types/category';

type TableProps = {
  list: Array<CategoryType> | undefined;
  removeHandle: (arg1: number) => void;
};

const Table: React.FC<TableProps> = ({ list, removeHandle }) => {
  const dispatch = useTypedDispatch();

  return (
    <>
      {list && list.length > 0 && (
        <div>
          <table
            width="100%"
            className="Table Table--stickyHeader Table--bordered  u-backgroundWhite u-textDark u-text200"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list
                && list.map((category) => (
                  <tr key={category.id}>
                    <td width="20px">{category.id}</td>
                    <td width="100px">
                      <img
                        width="100%"
                        height="auto"
                        style={{ objectFit: 'cover' }}
                        src={category.imageUrl}
                        alt=""
                      />
                    </td>
                    <td width="200px">
                      <Link
                        to={`/categories/${category.id}/items`}
                        onClick={() => {
                          dispatch(
                            addBreadcrumb([
                              {
                                title: category.name,
                                href: `/categories/${category.id}/items`,
                              },
                            ]),
                          );
                        }}
                      >
                        {category.name}
                      </Link>
                    </td>
                    <td>{category.description}</td>

                    <td style={{ whiteSpace: 'nowrap' }} width="100px">
                      <div
                        className="u-inlineBlock u-paddingExtraSmall u-roundedCircle hover:u-backgroundLightest hover:u-textPrimary u-cursorPointer"
                        onClick={() => removeHandle(category.id)}
                        onKeyPress={() => null}
                        role="button"
                        tabIndex={0}
                        aria-label="Remove category"
                      >
                        <Icon size="small" name="trash" />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {((list && list.length === 0) || !list) && <div>No data</div>}
    </>
  );
};

export default Table;
