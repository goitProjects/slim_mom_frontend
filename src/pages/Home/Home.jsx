/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CalcForm from '../../components/CalcForm/CalcForm';
import Header from '../../components/Header/Header';
import style from './Home.module.css';

const Home = props => (
  <div className={style.homeContainer}>
    <div className={style.homeGroup}>
      <div className={style.homeHeader}>
        <Header {...props} />
      </div>
      <div className={style.calcForm}>
        <CalcForm />
      </div>
    </div>
  </div>
);

export default Home;
