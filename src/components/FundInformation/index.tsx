import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { getFundsPortfolio, getLatestRepositioning, getEvaluationIndex } from 'Src/utils/api';
import PorfolioList from './portfolioList';
import RingChart from '../RingChart';
import DetailPosition from '../DetailPosition/index';
import IncomeIndex from './incomeIndex';
import styles from './index.less';

interface IFundInformationProps {
  time: string;
}

const FundInformation: React.FC<IFundInformationProps> = (props: IFundInformationProps) => {
  const { time } = props;
  const [fundsPortfolio, setFundsPortfolio] = useState([]);
  const [latestRepositioning, setLatestRepositioning] = useState([]);
  const [incomeIndex, setIncomeIndex] = useState({});
  useEffect(() => {
    getFundsPortfolio(time)
      .then(({ content }) => {
        return setFundsPortfolio(content);
      })
      .catch((err) => {
        console.error(err);
      });
    getLatestRepositioning(time)
      .then(({ content }) => {
        setLatestRepositioning(content);
        return content;
      })
      .catch((err) => {
        console.error(err);
      });
    getEvaluationIndex(time)
      .then(({ content }) => {
        setIncomeIndex(content);
        return content;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [time]);

  return (
    <>
      <Row className={styles['fund-container']}>
        <Col span={12}>
          <Row>
            <PorfolioList data={fundsPortfolio} />
          </Row>
          <Row>
            <IncomeIndex data={incomeIndex} />
          </Row>
        </Col>
        <Col span={12}>
          <RingChart data={fundsPortfolio} />
          <DetailPosition latestRepositioning={latestRepositioning} />
        </Col>
      </Row>
    </>
  );
};

export default FundInformation;
