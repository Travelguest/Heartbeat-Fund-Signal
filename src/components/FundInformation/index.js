import React, { useState, useEffect } from 'react';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { getLatestRepositioning } from 'Src/utils/api';
import PorfolioList from './portfolioList';
import RingChart from '../RingChart';
import DetailPosition from '../DetailPosition/index';
import styles from './index.less';

const { RangePicker } = DatePicker;

const FundInformation = () => {
  const [hackTime, setHackTime] = useState();
  const [time, setTime] = useState();

  const disabledDate = (current) => {
    return current && current > moment().locale('zh-cn');
  };

  const onOpenChange = (open) => {
    if (open) {
      setHackTime([]);
    } else {
      setHackTime(undefined);
    }
  };
  useEffect(() => {
    getLatestRepositioning('2021-08-25')
      .then((data) => {
        console.log('index:', data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <>
      <Row className={styles['fund-container']}>
        <Col span={12}>
          <Row className={styles['time-selection-container']}>
            选择时间：
            <RangePicker
              value={hackTime || time}
              disabledDate={disabledDate}
              onChange={(val) => setTime(val)}
              onOpenChange={onOpenChange}
            />
          </Row>
          <Row>
            <PorfolioList />
          </Row>
          <Row>收益相关指标</Row>
        </Col>
        <Col span={12}>
          <RingChart />
          <DetailPosition />
        </Col>
      </Row>
    </>
  );
};

export default FundInformation;
