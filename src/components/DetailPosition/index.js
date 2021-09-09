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

  return (
    <div className={styles['list-container']}>
      <div className={styles.header}>
        <span style={{ marginRight: 260 }}>详细持仓</span>
        <span className={styles['header-right']} onClick={() => setDetail(!isDetail)}>
          查看最新持仓
        </span>
      </div>
      <div className={styles.list}>
        {isDetail ? (
          <List
            itemLayout='horizontal'
            dataSource={detailRepositioning}
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
