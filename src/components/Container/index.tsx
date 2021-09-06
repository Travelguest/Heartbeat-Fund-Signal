import React, { useState } from 'react';
import { Row, Col, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import LineChart from '../LineChart/index';
import FundInformation from '../FundInformation/index';
import WordCloudComp from '../WordCloud';
import styles from './index.less';
import RectangularTreeDiagram from '../RectangularTreeDiagram';
import DisassemblyTree from '../DisassemblyTree';

type DateType = Moment | null;

const Container: React.FC = () => {
  const [time, setTime] = useState<string>('2020-01-13');
  function onChange(date: DateType, dateString: string) {
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
          <RectangularTreeDiagram time={time} />
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <WordCloudComp time={time} />
        </Col>
        <Col span={10}>
          <LineChart />
        </Col>
        <Col span={9}>
          <DisassemblyTree time={time} />
        </Col>
      </Row>
    </div>
  );
};

export default Container;
