import React, { Suspense } from 'react';
import D3Demo from './components/D3Demo/D3Demo';

function App() {
  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <D3Demo />
      </Suspense>
    </div>
  );
}

export default App;
