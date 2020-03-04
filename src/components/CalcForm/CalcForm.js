/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorNotification from './ErrorNotification';
import Result from '../Result/Result';
import css from './CalcForm.module.css';

const GroupBlood = {
  FIRST_GROUP: '1',
  SECOND_GROUP: '2',
  THIRD_GROUP: '3',
  FOURTH_GROUP: '4'
};

class CalcForm extends Component {
  state = {
    height: this.props.data.height,
    age: this.props.data.age,
    currentWeight: this.props.data.currentWeight,
    desiredWeight: this.props.data.desiredWeight,
    groupBlood: this.props.data.groupBlood,
    heightValid: true,
    ageValid: true,
    currentWeightValid: true,
    desiredWeightValid: true,
    groupBloodValid: true,
    isOpenModal: false,
    isValidForm: true,
    isEmptyInput: false,
    isWeightEqual: false
  };

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        height: data.height,
        age: data.age,
        currentWeight: data.currentWeight,
        desiredWeight: data.desiredWeight,
        groupBlood: data.groupBlood
      });
    }
  }

  handleChange = e => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState(
      {
        [name]:
          name === 'currentWeight' || name === 'desiredWeight'
            ? value.replace(/[^.\d]+/g, '').replace(/^([^.]*\.)|\./g, '$1')
            : name !== 'groupBlood'
            ? value.replace(/[^\d]+/g, '')
            : value
      },
      () => {
        this.validateInput(name, value);
      }
    );
  };

  validateInput = (inputName, value) => {
    const val = Number(value);
    let { heightValid } = this.state;
    let { ageValid } = this.state;
    let { currentWeightValid } = this.state;
    let { desiredWeightValid } = this.state;
    let { groupBloodValid } = this.state;

    switch (inputName) {
      case 'height':
        heightValid = val >= 50 && val <= 230;
        break;
      case 'age':
        ageValid = val >= 1 && val <= 99;
        break;
      case 'currentWeight':
        currentWeightValid = val >= 30 && val <= 199;
        break;
      case 'desiredWeight':
        desiredWeightValid = val >= 30 && val <= 199;
        break;
      case 'groupBlood':
        groupBloodValid = val >= 1 && val <= 4;
        break;
      default:
        break;
    }

    this.setState(
      {
        heightValid,
        ageValid,
        currentWeightValid,
        desiredWeightValid,
        groupBloodValid
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const {
      heightValid,
      ageValid,
      currentWeightValid,
      desiredWeightValid,
      groupBloodValid,
      currentWeight,
      desiredWeight
    } = this.state;

    this.setState({
      isValidForm:
        heightValid &&
        ageValid &&
        currentWeightValid &&
        desiredWeightValid &&
        groupBloodValid,
      isEmptyInput: false,
      isWeightEqual: Number(currentWeight) <= Number(desiredWeight)
    });
  };

  openResult = () => {
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      isValidForm,
      isWeightEqual
    } = this.state;

    this.setState({});

    if (
      height &&
      age &&
      currentWeight &&
      desiredWeight &&
      groupBlood &&
      isValidForm
    ) {
      if (!isWeightEqual) {
        this.toggleOpenModal();
      }
    } else {
      this.setState({ isEmptyInput: true });
    }
  };

  toggleOpenModal = () => {
    this.setState(state => ({ isOpenModal: !state.isOpenModal }));
  };

  render() {
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      heightValid,
      ageValid,
      currentWeightValid,
      desiredWeightValid,
      groupBloodValid,
      isWeightEqual,
      isOpenModal,
      isEmptyInput
    } = this.state;
    const { session, data } = this.props;

    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.titleContainer}>
            <p className={css.title}>Узнай свою суточную </p>
            <p className={css.title}>
              норму калорий
              {!session.token && ' прямо сейчас'}
            </p>
          </div>
          <form>
            <div className={css.leftInputs}>
              <div className={css.input_wrapper}>
                <label
                  htmlFor="height"
                  className={`${css.input_label} ${height &&
                    css.inputHasValue}`}
                >
                  Рост, см *
                </label>
                <input
                  className={css.input}
                  id="height"
                  type="text"
                  name="height"
                  maxLength="3"
                  value={height}
                  onChange={this.handleChange}
                />
                {!heightValid && (
                  <ErrorNotification label="Введите целое число от 50 до 230" />
                )}
              </div>
              <div className={css.input_wrapper}>
                <label
                  htmlFor="age"
                  className={`${css.input_label} ${age && css.inputHasValue}`}
                >
                  Возраст *
                </label>
                <input
                  className={css.input}
                  id="age"
                  type="text"
                  name="age"
                  maxLength="3"
                  value={age}
                  onChange={this.handleChange}
                />
                {!ageValid && (
                  <ErrorNotification label="Введите целое число от 1 до 99" />
                )}
              </div>
              <div className={css.input_wrapper}>
                <label
                  htmlFor="currentWeight"
                  className={`${css.input_label} ${currentWeight &&
                    css.inputHasValue}`}
                >
                  Текущий вес, кг *
                </label>
                <input
                  className={css.input}
                  id="currentWeight"
                  type="text"
                  name="currentWeight"
                  maxLength="6"
                  value={currentWeight}
                  onChange={this.handleChange}
                />
                {!currentWeightValid && (
                  <ErrorNotification label="Введите число от 30 до 199" />
                )}
              </div>
            </div>
            <div className={css.rightInputs}>
              <div className={css.input_wrapper}>
                <label
                  htmlFor="desiredWeight"
                  className={`${css.input_label} ${desiredWeight &&
                    css.inputHasValue}`}
                >
                  Желаемый вес, кг *
                </label>
                <input
                  className={css.input}
                  id="desiredWeight"
                  type="text"
                  name="desiredWeight"
                  maxLength="6"
                  value={desiredWeight}
                  onChange={this.handleChange}
                />
                {(!desiredWeightValid && (
                  <ErrorNotification label="Введите число от 30 до 199" />
                )) ||
                  (isWeightEqual && (
                    <ErrorNotification label="Желаемый вес должен быть меньше текущего" />
                  ))}
              </div>
              <section className={css.radioContainer}>
                <h3>Группа крови *</h3>
                <div className={css.radioInputs}>
                  <label htmlFor="groupBlood_1" className={css.radio}>
                    1
                    <input
                      id="groupBlood_1"
                      type="radio"
                      name="groupBlood"
                      value={GroupBlood.FIRST_GROUP}
                      checked={groupBlood === GroupBlood.FIRST_GROUP}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label htmlFor="groupBlood_2" className={css.radio}>
                    2
                    <input
                      id="groupBlood_2"
                      checked={groupBlood === GroupBlood.SECOND_GROUP}
                      type="radio"
                      name="groupBlood"
                      value={GroupBlood.SECOND_GROUP}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label htmlFor="groupBlood_3" className={css.radio}>
                    3
                    <input
                      id="groupBlood_3"
                      checked={groupBlood === GroupBlood.THIRD_GROUP}
                      type="radio"
                      name="groupBlood"
                      value={GroupBlood.THIRD_GROUP}
                      onChange={this.handleChange}
                    />
                  </label>
                  <label htmlFor="groupBlood_4" className={css.radio}>
                    4
                    <input
                      id="groupBlood_4"
                      checked={groupBlood === GroupBlood.FOURTH_GROUP}
                      type="radio"
                      name="groupBlood"
                      value={GroupBlood.FOURTH_GROUP}
                      onChange={this.handleChange}
                    />
                  </label>
                  {!groupBloodValid && (
                    <ErrorNotification label="Укажите группу крови" />
                  )}
                </div>
              </section>
            </div>
          </form>
          {isEmptyInput && (
            <p className={css.errorForm}>
              <ErrorNotification label="Заполните все поля калькулятора" />
            </p>
          )}
          <button
            type="button"
            id="submit"
            className={css.btn}
            onClick={this.openResult}
          >
            {!data.groupBlood ? 'Похудеть' : 'Пересчитать'}
          </button>
        </div>
        {isOpenModal && (
          <Result {...this.state} onClose={this.toggleOpenModal} />
        )}
      </div>
    );
  }
}

CalcForm.propTypes = {
  data: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currentWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    desiredWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    groupBlood: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  session: PropTypes.shape({
    token: PropTypes.string
  })
};

CalcForm.defaultProps = {
  data: {
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    groupBlood: ''
  },
  session: {
    token: ''
  }
};

const mapStateToProps = state => ({
  session: state.session,
  data: state.session.userData
});

export default connect(mapStateToProps)(CalcForm);
