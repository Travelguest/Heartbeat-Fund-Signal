import React, { useState, useEffect } from 'react';
import { WordCloud } from '@ant-design/charts';
import { getHotWords } from 'Utils/api';
import './index.less';

const WordCloudComp = (props) => {
  const { time } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    getHotWords(time)
      .then(({ content }) => {
        console.log('word', content);
        setData(content);
        return content;
      })
      .catch((err) => {
        console.error(err);
      });
  }, [time]);

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
