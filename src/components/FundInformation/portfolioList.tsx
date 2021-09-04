/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { IPorfolioListProps } from 'Src/typings/porfolio';
import styles from './portfolioList.less';

const PorfolioList = (props: IPorfolioListProps) => {
  const { fundsPortfolio } = props;
  fundsPortfolio.forEach((fund) => {
    // eslint-disable-next-line no-param-reassign
    fund.proportionOfOpenPositions = `${fund.value * 100}%`;
  });

  useEffect(() => {
    console.log('fundsPortfolio:', fundsPortfolio);
  });
  const columns = [
    {
      title: '持仓基金',
      dataIndex: 'type',
      render: (__: any, { type, fund_code, fund_type }: any) => {
        return (
          <div className={styles['holding-fund']}>
            <p className={styles['holding-fund-title']}>{type}</p>
            <p className={styles['holding-fund-sub-info']}>
              <span className={styles['item-type']}>{fund_type}</span>
              <span>{fund_code}</span>
            </p>
          </div>
        );
      },
    },
    {
      title: '持仓占比',
      dataIndex: 'proportionOfOpenPositions',
    },
    {
      title: '收益率',
      dataIndex: 'fund_return',
    },
  ];

  return (
    <Table
      rowKey={(record) => record.fund_code}
      columns={columns}
      dataSource={fundsPortfolio}
      scroll={{ y: 400 }}
      pagination={{ hideOnSinglePage: false }}
    />
  );
};

export default PorfolioList;
