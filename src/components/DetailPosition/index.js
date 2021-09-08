import React, { useState } from 'react';
import { List } from 'antd';
// import { CSSTransition } from 'react-transition-group';
import styles from './index.less';

const DetailPosition = (props) => {
  const { detailRepositioning, latestRepositioning } = props;
  const [isDetail, setDetail] = useState(true);
  const toPercent = (point) => {
    let str = Number(point * 100).toFixed(2);
    str += '%';
    return str;
  };
  // 注意：等非哥将最新调仓接口改好后，将data注释并改为detailRepositioning
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

  return (
    <div className={styles['list-container']}>
      <div className={styles.header}>
        <span style={{ marginRight: 260 }}>详细持仓</span>
        <span
          style={{
            color: '#0266b8',
          }}
          onClick={() => setDetail(!isDetail)}
        >
          查看最新持仓
        </span>
      </div>
      <div className={styles.list}>
        {isDetail ? (
          <List
            itemLayout='horizontal'
            dataSource={data}
            split={false}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<div className={styles['list-title']}>{item.sector}</div>}
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
            dataSource={latestRepositioning}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.fund_name} description={`${item.fund_code}`} />
                <div style={{ marginRight: 90 }}>
                  {item.trade_price === '-' ? '-' : Number(item.trade_price).toFixed(4)}
                </div>
                <div style={{ marginRight: 40 }}>
                  {toPercent(item.pre_weight)} -&gt; {toPercent(item.weight)}
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
