import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { getFundsPortfolio } from 'Src/utils/api';
import PorfolioList from './portfolioList';
import RingChart from '../RingChart';
import DetailPosition from '../DetailPosition/index';
import styles from './index.less';

interface IFundInformationProps {
  time: string;
}

const FundInformation: React.FC<IFundInformationProps> = (props: IFundInformationProps) => {
  const { time } = props;
  const [fundsPortfolio, setFundsPortfolio] = useState([]);
  useEffect(() => {
    // console.log('time', time);
    getFundsPortfolio(time)
      .then(({ content }) => {
        // console.log('data:', content);
        return setFundsPortfolio(content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [time]);

  return (
    <>
      <Row className={styles['fund-container']}>
        <Col span={12}>
          <Row>
            <PorfolioList fundsPortfolio={fundsPortfolio} />
          </Row>
          <Row>收益相关指标</Row>
        </Col>
        <Col span={12}>
          <RingChart data={fundsPortfolio} />
          <DetailPosition />
        </Col>
      </Row>
    </>
  );
};

export default FundInformation;
