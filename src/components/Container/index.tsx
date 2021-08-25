import React from 'react';
import { Row, Col } from 'antd';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import RingChart from '../RingChart';
import WordCloudComp from '../WordCloud';
import './index.less';

function Container() {
  return (
    <div className='container'>
      <Row>
        <Col span={8}>
          <FundInformation />
        </Col>
        <Col span={16}>
          <LineChart />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <WordCloudComp />
        </Col>
        <Col span={14}>新闻信息</Col>
      </Row>
    </div>
  );
}

export default Container;
