import React, { Suspense } from 'react';
import Container from './components/Container';
import styles from './app.less';

function App() {
  return (
    <div id={styles.root}>
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    </div>
  );
}

export default App;
