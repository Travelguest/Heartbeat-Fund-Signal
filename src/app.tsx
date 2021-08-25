import React, { Suspense } from 'react';
import Container from './components/Container';

function App() {
  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    </div>
  );
}

export default App;
