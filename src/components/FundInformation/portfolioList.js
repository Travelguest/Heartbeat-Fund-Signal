import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';

const PorfolioList = () => {
  const columns = [
    {
      title: '持仓基金',
      dataIndex: 'holdingFund',
      render: (_, { holdingFund, id }) => {
        return (
          <div className='holding-fund'>
            <p className='holding-fund-title'>{holdingFund}</p>
            <p className='holding-fund-id'>{id}</p>
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
    { id: 1, holdingFund: '景顺长城中证500低波动', proportionOfOpenPositions: '13.95%', rateOfReturn: '+50.82%' },
    { id: 2, holdingFund: '景顺长城中证300低波动', proportionOfOpenPositions: '13.95%', rateOfReturn: '-0.78%' },
    {
      id: 3,
      holdingFund: '景顺长城中证100低波动',
      proportionOfOpenPositions: '13.95%',
      rateOfReturn: '-30%',
    },
  ];
  return <Table rowKey={(record) => record.id} columns={columns} dataSource={data} />;
};

export default PorfolioList;
