import React, { Suspense } from 'react';
// import D3Demo from './components/D3Demo/D3Demo';
import Container from './components/Container';
import 'antd/dist/antd.less';

function App() {
  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...哈哈哈</div>}>
        <Container />
      </Suspense>
    </div>
  );
}

export default App;
