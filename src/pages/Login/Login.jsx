/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { memorizedUserData } from './selectors';
import Header from '../../components/Header/Header';
import style from './Login.module.css';

import { sendRegisterData, sendLoginData } from '../../redux/actions/auth';

class Login extends Component {
  // static propTypes = {
  //   history: PropTypes.string.isRequired
  // };

  state = {
    login: '',
    password: '',
    error: ''
    // errorLog: '',
    // errorPass: ''
  };

  handleInputs = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });

    setTimeout(() => {
      const regLatin = new RegExp('^[a-zA-Z0-9]+$');
      const regFirstNum = new RegExp(`^[0-9]`);
      if (regFirstNum.test(this.state.login || this.state.login.length > 0)) {
        this.setState({
          error: 'Логин не может начинаться с цифры'
        });
      } else if (
        !regLatin.test(this.state.login || this.state.login.length > 0)
      ) {
        this.setState({
          error: 'Логин не может содержать кириллицу и спец символы'
        });
      } else if (this.state.login.length > 0 && this.state.login.length < 5) {
        this.setState({
          error: 'Логин должен состоять минимум из 5 знаков'
        });
      } else if (
        this.state.password.length > 0 &&
        this.state.password.length < 5
      ) {
        this.setState({
          error: 'Пароль должен состоять минимум из 5 знаков'
        });
      } else if (this.state.login.length > 0 && this.state.login.length > 16) {
        this.setState({
          error: 'Логин должен состоять максимум из 16 символов'
        });
      } else if (
        this.state.password.length > 0 &&
        this.state.password.length > 16
      ) {
        this.setState({
          error: 'Пароль должен состоять максимум из 16 символов'
        });
      } else {
        this.setState({
          error: ''
        });
      }
    }, 10);
  };

  redirectUser = data => {
    const { history } = this.props;
    localStorage.setItem('userToken', data.token);

    if (!data.userData) {
      history.push('/dashboard');
    } else {
      history.push('/dashboard/diary');
    }
  };

  handleErrorLogin = (data, status) => {
    if (status === 200) {
      this.redirectUser(data.user);
    }
    if (status >= 400) {
      let errorResponse =
        data.err === 'User doesnt exist' && 'Неправильный пароль или логин';
      errorResponse =
        data.err === 'Password is invalid' && 'Неправильный пароль или логин';
      this.setState({
        error: errorResponse
      });
    }
  };

  handleErrorRegister = (data, status) => {
    if (status === 200) {
      this.redirectUser(data.user);
    }

    if (status >= 400) {
      const errorResponse =
        data.message === 'nickname already exist' && 'Логин уже занят';
      this.setState({
        error: errorResponse
      });
    }
  };

  handleLogin = e => {
    const { loginUser } = this.props;
    e.preventDefault();
    const { login, password } = this.state;

    if (login.length < 5 || password < 5) {
      return;
    }

    const dataToLogin = {
      nickname: login,
      password
    };

    loginUser(JSON.stringify(dataToLogin))
      .then(({ data, status }) => this.handleErrorLogin(data, status))
      .catch(err => err);
  };

  handleRegister = e => {
    e.preventDefault();
    const { userData, registerUser } = this.props;
    const { error, login, password } = this.state;

    if (error !== '') {
      return;
    }

    let dataToRegister = {
      nickname: login,
      password
    };

    if (userData) {
      dataToRegister = {
        ...dataToRegister,
        userData
      };
    }

    registerUser(JSON.stringify(dataToRegister))
      .then(({ data, status }) => {
        this.handleErrorRegister(data, status);
      })
      .catch(err => err);
  };

  render() {
    const { error } = this.state;

    return (
      <>
        <div className={style.pageWrapper}>
          <Header {...this.props} />
          <div className={style.loginWrapper}>
            <div className={style.entry}>ВХОД / РЕГИСТРАЦИЯ</div>
            <form>
              <div className={style.inputModule}>
                <label htmlFor="login" className={style.invisible}>
                  Login
                </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  onChange={this.handleInputs}
                  placeholder="Логин *"
                  className={style.input}
                />
                <label htmlFor="password" className={style.invisible}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleInputs}
                  placeholder="Пароль *"
                  className={style.input}
                />
              </div>
              <div className={style.error}>
                <p>{error}</p>
              </div>
              <div className={style.butModule}>
                <button
                  type="button"
                  onClick={this.handleLogin}
                  className={style.button}
                >
                  Вход
                </button>
                <button
                  type="button"
                  onClick={this.handleRegister}
                  className={style.button}
                >
                  Регистрация
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
  userData: PropTypes.shape({}).isRequired,
  registerUser: PropTypes.func.isRequired
};

const mstp = state => ({
  userData: memorizedUserData(state)
});

const mdtp = {
  registerUser: sendRegisterData,
  loginUser: sendLoginData
};

export default connect(mstp, mdtp)(Login);
