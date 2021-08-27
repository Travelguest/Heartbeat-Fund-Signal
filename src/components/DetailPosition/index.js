import React, { useState } from 'react';
import { List } from 'antd';
// import { CSSTransition } from 'react-transition-group';
import './index.less';

const DetailPosition = () => {
  const [isDetail, setDetail] = useState(true);
  const data = [
    {
      sector: '非银金融',
      stock: [
        {
          stock_code: 165215,
          stock_name: '华泰证券',
          stock_price: 65.11,
          pct_chg: '5.88%',
          mkv: 5131561,
          stk_mkv_ratio: '40%',
        },
        {
          stock_code: 165215,
          stock_name: '中信证券',
          stock_price: 65.11,
          pct_chg: '5.77%',
          mkv: 5131561,
          stk_mkv_ratio: '50%',
        },
      ],
    },
    {
      sector: '银行',
      stock: [
        {
          stock_code: 165215,
          stock_name: '华泰证券',
          stock_price: 65.11,
          pct_chg: '5.55%',
          mkv: 5131561,
          stk_mkv_ratio: '40%',
        },
        {
          stock_code: 165215,
          stock_name: '中信证券',
          stock_price: 65.11,
          pct_chg: '5.11%',
          mkv: 5131561,
          stk_mkv_ratio: '50%',
        },
      ],
    },
    {
      sector: '传媒',
      stock: [
        {
          stock_code: 165215,
          stock_name: '华泰证券',
          stock_price: 65.11,
          pct_chg: '5%',
          mkv: 5131561,
          stk_mkv_ratio: '40%',
        },
        {
          stock_code: 165215,
          stock_name: '中信证券',
          stock_price: 65.11,
          pct_chg: '5.77%',
          mkv: 5131561,
          stk_mkv_ratio: '50%',
        },
      ],
    },
    {
      sector: '计算机',
      stock: [
        {
          stock_code: 165215,
          stock_name: '华泰证券',
          stock_price: 65.11,
          pct_chg: '5.05%',
          mkv: 5131561,
          stk_mkv_ratio: '40%',
        },
        {
          stock_code: 165215,
          stock_name: '中信证券',
          stock_price: 65.11,
          pct_chg: '5.11%',
          mkv: 5131561,
          stk_mkv_ratio: '50%',
        },
      ],
    },
  ];

  const data1 = [
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
    { fund_name: '中信证券', fund_code: 165215, trade_price: 65.11, pre_weight: '0%', weight: '50%' },
  ];

  return (
    <div className='list-container'>
      <div className='header'>
        <span style={{ marginRight: 220 }}>详细持仓</span>
        <a onClick={() => setDetail(!isDetail)}>查看最新持仓</a>
      </div>
      <div className='list'>
        {isDetail ? (
          <List
            itemLayout='horizontal'
            dataSource={data}
            split={false}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<div className='list-title'>{item.sector}</div>}
                  description={
                    <List
                      itemLayout='horizontal'
                      dataSource={item.stock}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.stock_name}
                            description={`${item.stock_code} ${item.stock_price}(${item.pct_chg})`}
                          />
                          <div style={{ marginRight: 40 }}>{item.stk_mkv_ratio}</div>
                        </List.Item>
                      )}
                    />
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <List
            itemLayout='horizontal'
            dataSource={data1}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.fund_name} description={`${item.fund_code}`} />
                <div style={{ marginRight: 90 }}>{item.trade_price}</div>
                <div style={{ marginRight: 40 }}>
                  {item.pre_weight} -> {item.weight}
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPosition;
