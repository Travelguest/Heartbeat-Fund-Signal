import React, { useState } from 'react';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import PorfolioList from './portfolioList';
import './index.less';

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

  return (
    <>
      <Row className='fund-container'>
        <Col span={12}>
          <Row className='time-selection-container'>
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
        <Col span={12}>Pie Chart</Col>
      </Row>
    </>
  );
};

export default FundInformation;
