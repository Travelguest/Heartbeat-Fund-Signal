import React from 'react';
import './index.less';
import { minus } from 'Utils/math';

interface IProps {
  a: number;
  b: number;
}

function ComputedOne(props: IProps) {
  const { a, b } = props;
  const diff = minus(a, b);
  return <p className='two'>{`Hi, I'm computed one, my Difference is ${diff}`}</p>;
}

export default ComputedOne;
