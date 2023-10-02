import { useEffect, useState } from 'react';
import { Header as AhaHeader, Dropdown, Icon } from '@ahaui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useTypedDispatch } from 'hooks';
import { userSelector } from 'redux/reducers/user.';
import { logout } from 'redux/actions/user';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import styles from './Header.module.scss';

const Header = () => {
  const user = useAppSelector(userSelector);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [isFetch, setIsFetch] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (isFetch === 0) {
      setIsFetch((prev) => prev + 1);
    }
  }, [dispatch, navigate, user, isFetch, location.pathname]);

  const logoutHandle = () => {
    dispatch(logout());
  };

  return (
    <AhaHeader fullWidth className={styles.header}>
      <AhaHeader.Brand>
        <Link to="/">
          <Logo width={100} height={36} />
        </Link>
      </AhaHeader.Brand>

      <AhaHeader.Main>
        <AhaHeader.Right>
          {user.isLoggedIn && (
            <Dropdown alignRight className="u-marginLeftExtraSmall">
              <Dropdown.Toggle className="u-textLight u-lineHeightNone">
                <div className="u-flex u-alignItemsCenter">
                  <Icon name="contact" size="medium" className="u-marginRightTiny" />
                  <div>
                    User ID:
                    {' '}
                    {user.id}
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Container
                className="u-cursorPointer u-marginNone u-minWidth-0"
                additionalStyles={{ minWidth: 'unset' }}
              >
                <Dropdown.Item
                  className="u-paddingVerticalExtraSmall u-paddingHorizontalExtraSmall"
                  onClick={() => logoutHandle()}
                >
                  <Icon name="power" size="small" />
                  <span className="u-marginLeftExtraSmall">Logout</span>
                </Dropdown.Item>
              </Dropdown.Container>
            </Dropdown>
          )}

          {!user.isLoggedIn && (
            <div className="u-flex u-alignItemsCenter">
              <Link
                className="hover:u-textPrimary u-textDark"
                to="/login"
                state={{ prevPath: location.pathname }}
              >
                Login
              </Link>
              <Link
                className="hover:u-textPrimary u-textDark u-marginLeftSmall"
                to="/signup"
                state={{ prevPath: location.pathname }}
              >
                Register
              </Link>
            </div>
          )}
        </AhaHeader.Right>
      </AhaHeader.Main>
    </AhaHeader>
  );
};

export default Header;
