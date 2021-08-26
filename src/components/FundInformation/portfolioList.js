import React, { useState } from 'react';
import { Table } from 'antd';
import './portfolioList.less';

const PorfolioList = () => {
  const columns = [
    {
      title: '持仓基金',
      dataIndex: 'holdingFund',
      render: (_, { holdingFund, id, type }) => {
        return (
          <div className='holding-fund'>
            <p className='holding-fund-title'>{holdingFund}</p>
            <p className='holding-fund-sub-info'>
              <span className='item-type'>{id}</span>
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
      dataIndex: 'rateOfReturn',
    },
  ];

  const data = [
    {
      id: 1,
      holdingFund: '景顺长城中证500低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '+50.82%',
      type: '指数型',
    },
    {
      id: 2,
      holdingFund: '景顺长城中证300低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-0.78%',
      type: 'QDII型',
    },
    {
      id: 3,
      holdingFund: '景顺长城中证100低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-30%',
      type: 'QDII型',
    },
    {
      id: 4,
      holdingFund: '景顺长城中证100低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-30%',
      type: 'QDII型',
    },
    {
      id: 5,
      holdingFund: '景顺长城中证100低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-30%',
      type: 'QDII型',
    },
    {
      id: 6,
      holdingFund: '景顺长城中证100低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-30%',
      type: 'QDII型',
    },
  ];
  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
      scroll={{ y: 400 }}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default PorfolioList;
