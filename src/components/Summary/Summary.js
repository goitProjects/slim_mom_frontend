import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './Summery.module.css';
import { getDailyRate, getDate, getProducts, getGroupBlood } from './selectors';
import { getProductsByGroupBlood, getCcalSumm } from './constants';

function Summary({ products, date, groupBlood, dailyRate }) {
  const [ссalSumm, setCсalSumm] = useState(0);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (products) setCсalSumm(getCcalSumm(products));
    setProductsList(getProductsByGroupBlood(groupBlood));
  });

  return (
    <div className={style.summarySection}>
      <div>
        <h3>
          {`Сводка за
          ${moment(date).format('MM.DD.Y')}`}
        </h3>
        <ul className={style.listSummery}>
          <li>
            {dailyRate ? (
              dailyRate - ссalSumm >= 0 ? (
                <p>Осталось</p>
              ) : (
                <p>Перебор</p>
              )
            ) : (
              <p>Осталось</p>
            )}
            {dailyRate ? (
              dailyRate - ссalSumm >= 0 ? (
                <p>
                  {(dailyRate - ссalSumm).toFixed(0)}
                  ккал
                </p>
              ) : (
                <p className={style.colorOverCcal}>
                  {Math.abs((dailyRate - ссalSumm).toFixed(0))}
                  ккал
                </p>
              )
            ) : (
              <Link className={style.start} to="/dashboard">
                Посчитать
              </Link>
            )}
          </li>
          <li>
            <p>Употреблено</p>
            <p>
              {ссalSumm}
              ккал
            </p>
          </li>
          <li>
            <p>Дневная норма</p>
            <p>
              {dailyRate.toFixed(0)}
              ккал
            </p>
          </li>
          <li>
            <p>n% от нормы</p>
            {dailyRate ? (
              <p>{`${(ссalSumm * (100 / dailyRate)).toFixed(0)} %`}</p>
            ) : (
              <p>0%</p>
            )}
          </li>
        </ul>
      </div>

      <div>
        <h3>Продукты, которые вам не рекомендуется употреблять:</h3>
        <p className={style.pSummery}>{productsList}</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: getProducts(state),
  date: getDate(state),
  groupBlood: getGroupBlood(state),
  dailyRate: getDailyRate(state)
});

Summary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      ccal: PropTypes.number
    })
  ),
  date: PropTypes.shape({
    date: PropTypes.string
  }).isRequired,
  groupBlood: PropTypes.number,
  dailyRate: PropTypes.number
};

Summary.defaultProps = {
  products: [],
  groupBlood: 0,
  dailyRate: 0
};

export default connect(mapStateToProps, null)(Summary);
