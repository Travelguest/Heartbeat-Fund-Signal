import React, { useState, useEffect } from 'react';
import { WordCloud } from '@ant-design/charts';
import './index.less';

const WordCloudComp = () => {
  // const [data, setData] = useState([]);

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  const data = [
    { value: 2, name: '再飞' },
    { value: 4, name: '完白' },
    { value: 6, name: '巴思' },
    { value: 8, name: '张初尘' },
    { value: 10, name: '御术' },
    { value: 12, name: '有田' },
    { value: 2, name: '沉鱼' },
    { value: 2, name: '玉伯' },
    { value: 2, name: '玉伯2' },
    { value: 2, name: '玉伯21' },
    { value: 2, name: '玉伯1' },
  ];
  // useEffect(() => {
  //   // asyncFetch();
  // }, []);
  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
      rotation: 0,
    },
    spiral: 'rectangular',
  };
  return (
    <div className='word-cloud-container'>
      <div className='header'>24小时热门搜索词</div>
      <WordCloud {...config} />;
    </div>
  );
};

export default WordCloudComp;
