import React from 'react';
import { Row, Col } from 'antd';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import WordCloudComp from '../WordCloud';
import DetailPosition from '../DetailPosition';
import './index.less';
import RectangularTreeDiagram from '../RectangularTreeDiagram';

function Container() {
  return (
    <div className='container'>
      <RectangularTreeDiagram />
      {/* <Row>
        <Col span={10}>
          <FundInformation />
        </Col>
        <Col span={14}>
          <LineChart />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <WordCloudComp />
        </Col>
        <Col span={14}>
          新闻信息
          <DetailPosition />
        </Col>
      </Row> */}
    </div>
  );
}

export default Container;
