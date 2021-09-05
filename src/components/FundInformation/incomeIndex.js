import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './incomeIndex.less';

const IncomeIndex = (props) => {
  const { data } = props;
  return (
    <div styleName='index-container'>
      <div styleName='index-container-col'>
        <div styleName='top title'>分析指标</div>
        <div styleName='middle middle-title'>本计划</div>
      </div>
      <div styleName='index-container-col'>
        <div styleName='top'>最大回撤</div>
        <div styleName='middle'>{data['最大回撤']}</div>
      </div>
      <div styleName='index-container-col'>
        <div styleName='top'>夏普比率</div>
        <div styleName='middle'>{data['夏普比率']}</div>
      </div>
      <div styleName='index-container-col'>
        <div styleName='top'>年化利率</div>
        <div styleName='middle'>{data['年化利率']}</div>
      </div>
      <div styleName='index-container-col'>
        <div styleName='top'>卡默比例</div>
        <div styleName='middle'>{data['卡默比例']}</div>
      </div>
      <div styleName='index-container-col'>
        <div styleName='top'>波动率</div>
        <div styleName='middle'>{data['波动率']}</div>
      </div>
    </div>
  );
};

export default CSSModules(IncomeIndex, styles, {
  allowMultiple: true,
});
