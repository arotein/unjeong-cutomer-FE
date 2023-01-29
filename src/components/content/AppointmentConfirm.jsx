import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import styles from './appointmentConfirm.module.scss';
import { getMyAppointmentList } from '../../store/api/appointment';
import Title from '../common/Title';
import AppointmentList from './AppointmentList';

const cx = classNames.bind(styles);

function AppointmentConfirm() {
  const nameRef = useRef();
  const phoneRef = useRef();

  const [isActive, setIsActive] = useState(false);
  const [enteredData, setEnteredData] = useState();
  const [appointmentList, setAppointmentList] = useState();

  const onHandleSubmit = e => {
    e.preventDefault();
    const nameValue = nameRef.current.value;
    const phoneValue = phoneRef.current.value;
    const params = {
      name: nameValue,
      phone: phoneValue,
    };

    if (nameValue !== '' && phoneValue !== '') {
      setEnteredData(params);
      getMyAppointmentList(params)
        .then(res => {
          setAppointmentList(res.data.data.appointmentList);
          setIsActive(true);
        })
        .catch(err => toast.error(err.response.data.errorMessage));
    }
  };

  useEffect(() => {
    if (isActive) {
      setIsActive(false);
    }
  }, []);

  return (
    <div className={cx('appointmentConfirm-wrap')}>
      <Title name='예약확인' />

      {isActive ? (
        <AppointmentList
          enteredData={enteredData}
          appointmentList={appointmentList}
        />
      ) : (
        <form onSubmit={onHandleSubmit}>
          <div className={cx('name-wrap', 'input-wrap')}>
            <label htmlFor='name' className={cx('left')}>
              이름
            </label>
            <input
              type='text'
              id='name'
              className={cx('right', 'input')}
              ref={nameRef}
              required
            />
          </div>

          <div className={cx('phone-wrap', 'input-wrap')}>
            <label htmlFor='phone' className={cx('left')}>
              연락처
            </label>
            <input
              type='tel'
              id='phone'
              pattern='^\d{3}-\d{3,4}-\d{4}$'
              title='ex) 010-1234-5678'
              placeholder='ex) 010-1234-5678'
              className={cx('right', 'input')}
              ref={phoneRef}
              required
            />
          </div>

          <button type='submit' className={cx('submit-btn')}>
            예약조회
          </button>
        </form>
      )}
    </div>
  );
}

export default AppointmentConfirm;
