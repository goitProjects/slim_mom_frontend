import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import Header from '../../components/Header/Header';
import DiaryBlock from '../../components/DiaryBlock/DiaryBlock';
import Achievement from '../../components/Achievement/Achievement';
import styles from './Dashboard.module.css';
import { getUserData } from '../../redux/actions/auth';
import { getProductsByDayAction } from '../../redux/actions/productActions';
import CalcForm from '../../components/CalcForm/CalcForm';
import Summary from '../../components/Summary/Summary';

class Dashboard extends Component {
  state = {};

  componentDidMount = () => {
    const { userData } = this.props;
    const token = localStorage.getItem('userToken');
    const { date, getProductsByDay } = this.props;
    getProductsByDay(token, date.toISOString());
    if (token) {
      userData(token);
    }
  };

  render() {
    const { windowWidth, token, location } = this.props;
    return (
      <section className={styles.grid}>
        <div className={styles.headerBlock_container}>
          <Header {...this.props} />
        </div>
        <div className={styles.calcDairyBlock_container}>
          <Route path="/dashboard" exact component={CalcForm} />
          <Route path="/dashboard/diary" component={DiaryBlock} />
          <Route path="/dashboard/achievement" component={Achievement} />
        </div>
        {token &&
          (location.pathname === '/dashboard' ? (
            windowWidth > 767 && (
              <div className={styles.summaryBlock_container}>
                <Summary />
              </div>
            )
          ) : (
            <div className={styles.summaryBlock_container}>
              <Summary />
            </div>
          ))}
      </section>
    );
  }
}

Dashboard.propTypes = {
  token: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  getProductsByDay: PropTypes.func.isRequired,
  userData: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired
};

const mapStateToProp = state => ({
  user: state.session,
  date: state.datePicker.date
});

const mapDispatchToProps = dispatch => ({
  userData: token => dispatch(getUserData(token)),
  getProductsByDay: (token, data) =>
    dispatch(getProductsByDayAction(token, data))
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(windowSize(Dashboard));
