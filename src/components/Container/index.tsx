import React, { useState } from 'react';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import WordCloudComp from '../WordCloud';
import styles from './index.less';
import RectangularTreeDiagram from '../RectangularTreeDiagram';

const Container: React.FC = () => {
  const [time, setTime] = useState<string>('2020-01-13');
  function onChange(date: any, dateString: string) {
    console.log(dateString);
    setTime(dateString);
  }
  return (
    <div className={styles.container}>
      <Row>
        <Col className={styles['fund-information-container']} span={10}>
          <DatePicker className={styles['time-selector']} onChange={onChange} defaultValue={moment('2020-01-13')} />
          <FundInformation time={time} />
        </Col>
        <Col span={14}>
          <RectangularTreeDiagram />
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <WordCloudComp />
        </Col>
        <Col span={14}>
          <LineChart />
        </Col>
        <Col span={5}>树图</Col>
      </Row>
    </div>
  );
};

export default Container;
