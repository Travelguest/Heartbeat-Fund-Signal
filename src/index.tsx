import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import App from './app';
import 'antd/dist/antd.less';

if (module && module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
