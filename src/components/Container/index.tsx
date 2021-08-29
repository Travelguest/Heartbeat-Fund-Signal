import React from 'react';
import { Row, Col } from 'antd';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import WordCloudComp from '../WordCloud';
import './index.less';

function Container() {
  return (
    <div className='container'>
      <Row>
        <Col span={10}>
          <FundInformation />
        </Col>
        <Col span={14}>矩形树图</Col>
      </Row>
      <Row>
        <Col span={5}>
          <WordCloudComp />
        </Col>
        <Col span={14}>
          <LineChart />
        </Col>
        <Col span={5}>拆解树图</Col>
      </Row>
    </div>
  );
}

export default Container;
