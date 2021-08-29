import React from 'react';
import { Row, Col } from 'antd';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import WordCloudComp from '../WordCloud';
import styles from './index.less';
import RectangularTreeDiagram from '../RectangularTreeDiagram';

function Container() {
  return (
    <div className={styles.container}>
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
      </Row>
      <Col span={5}>
        <RectangularTreeDiagram />
      </Col>
    </div>
  );
}

export default Container;
