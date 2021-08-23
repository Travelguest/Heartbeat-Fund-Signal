import React from 'react';
import { Row, Col } from 'antd';
import LineChart from '../LineChart/index';
import './index.less';

function Container() {
  return (
    <div className='container'>
      <Row>
        <Col span={10}>投资组合基本信息</Col>
        <Col span={14}>
          <LineChart />
        </Col>
      </Row>
      <Row>
        <Col span={10}>最新调仓</Col>
        <Col span={14}>新闻信息</Col>
      </Row>
    </div>
  );
}

export default Container;
