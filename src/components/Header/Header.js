/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import PropTypes from 'prop-types';
import { fetchLogOut } from '../../utils/requests';
import {
  closeModalProductsAction,
  clearSessionAction
} from '../../redux/actions/productActions';
import UserBar from '../UserBar/UserBar';
import Modal from './Modal';
import Icon from '../../assets/icons/Icon/Icon';
import logo from './Logo/logo-png.png';
import styles from './Header.module.css';

const activeStyles = {
  color: 'black'
};

class Header extends Component {
  state = {
    openModal: false
  };

  toogleModal = () => {
    this.setState(state => ({ openModal: !state.openModal }));
  };

  logOut = token => {
    const { clearSession, history } = this.props;
    fetchLogOut(token).then(() => {
      localStorage.removeItem('userToken');
      clearSession();
      history.push('/');
    });
  };

  render() {
    const { toogleModal, logOut, navigationToogle } = this;
    const { openModal } = this.state;
    const {
      username,
      isModalShowed,
      toogleModalProducts,
      session,
      token,
      location,
      windowWidth
    } = this.props;
    return (
      <div className={styles.header}>
        <div
          className={session.token ? styles.container : styles.loggedContainer}
        >
          <div
            className={
              session.token
                ? styles.logoNavigationBox
                : styles.loggedLogoNavigationBox
            }
          >
            <Link
              className={styles.logotype}
              to={
                (!session.token && !session.userData) || !session.userData
                  ? '/dashboard'
                  : '/dashboard/diary'
              }
            >
              <img className={styles.logoImg} src={logo} alt="LOGO" />
              <span className={styles.logoText}>
                Slim
                <span className={styles.logoTextSpan}>Mom</span>
              </span>
            </Link>

            {session.token && windowWidth > 1023 && (
              <div className={styles.navigationBox}>
                <NavLink
                  activeStyle={activeStyles}
                  onClick={navigationToogle}
                  className={styles.navigationLink}
                  exact
                  to="/dashboard/diary"
                >
                  ДНЕВНИК
                </NavLink>
                <NavLink
                  activeStyle={activeStyles}
                  onClick={navigationToogle}
                  className={styles.navigationLink}
                  exact
                  to="/dashboard"
                >
                  КАЛЬКУЛЯТОР
                </NavLink>
                <NavLink
                  activeStyle={activeStyles}
                  onClick={navigationToogle}
                  className={styles.navigationLink}
                  exact
                  to="/dashboard/achievement"
                >
                  ДОСТИЖЕНИЯ
                </NavLink>
              </div>
            )}
          </div>

          {session.token && (
            <div className={styles.usernameBurgerWrapper}>
              {session.token && windowWidth > 767 && (
                <div className={styles.usernamebox}>
                  <p className={styles.usernameText}>{username}</p>
                  <p>|</p>
                  <button
                    type="button"
                    className={(styles.slash, styles.logoutText)}
                    onClick={() => logOut(token)}
                    // className={styles.logoutText}
                  >
                    Выйти
                  </button>
                </div>
              )}
              {session.token && !openModal && windowWidth < 1023 && (
                <button
                  type="button"
                  className={styles.burgerBtn}
                  onClick={toogleModal}
                >
                  <Icon className={styles.burger} icon="Menu" />
                </button>
              )}
              {session.token && openModal && windowWidth < 1023 && (
                <button
                  type="button"
                  className={styles.burgerBtn}
                  onClick={toogleModal}
                >
                  <Icon className={styles.cross} icon="Close" />
                </button>
              )}
            </div>
          )}
          {openModal && windowWidth < 1023 && (
            <Modal toogleModal={toogleModal} />
          )}
          {location.pathname === '/' && !session.token && <UserBar />}
        </div>
        {session.token && windowWidth < 767 && (
          <div
            className={
              isModalShowed ? styles.greyZone : styles.greyZoneModalClose
            }
          >
            {isModalShowed && (
              <button
                type="button"
                onClick={toogleModalProducts}
                className={styles.closeModal}
              >
                <Icon icon="Arrow_Back" />
              </button>
            )}
            <div className={styles.mobileLogoutBox}>
              <p className={styles.username}>{username}</p>
              <Icon
                onClick={() => logOut(token)}
                className={styles.logoutButton}
                icon="Logout"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  token: PropTypes.string,
  clearSession: PropTypes.func.isRequired,
  username: PropTypes.string,
  isModalShowed: PropTypes.bool.isRequired,
  toogleModalProducts: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  session: PropTypes.shape({
    token: PropTypes.string,
    userData: PropTypes.shape({})
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

Header.defaultProps = {
  token: '',
  session: {
    token: '',
    userData: {}
  },
  username: ''
};

const mapStateToProps = state => ({
  session: state.session,
  username: state.session.nickname,
  token: state.session.token,
  isModalShowed: state.dailyBlock.isModalProductShowed
});

const mapDispatchToProps = dispatch => ({
  toogleModalProducts: () => {
    dispatch(closeModalProductsAction());
  },
  clearSession: () => {
    dispatch(clearSessionAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(Header));
