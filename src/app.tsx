import React, { Suspense, useState } from 'react';

const ComputedOne = React.lazy(() => import('Components/ComputedOne'));
const ComputedTwo = React.lazy(() => import('Components/ComputedTwo'));

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;
  const [showTwo, setShowTwo] = useState<boolean>(false);

  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <span>{`Hello I'm ${name}, ${age} years old`}</span>
        <ComputedOne a={1} b={2} />
        {showTwo && <ComputedTwo a={2} b={1} />}
        <button type='button' onClick={() => setShowTwo(!showTwo)}>
          显示showTwo
        </button>
      </Suspense>
    </div>
  );
}

export default App;
