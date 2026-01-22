import {useState} from 'react';

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState (0);
  const [total, setTotal] = useState (0);
  const [neutral, setNeutral] = useState (0);
  const [bad, setBad] = useState (0);
  console.log ('Good on render is: ', good);
  console.log ('neutral on render is: ', neutral);
  console.log ('bad on render is: ', bad);

  const handleClickGood = () => {
    console.log ('Good before update is: ', good);
    setGood (good + 1);
    const updatedTotal = total + 1;
    setTotal (updatedTotal);
  };
  const handleClickNeutral = () => {
    console.log ('Neutral before update is: ', neutral);
    setNeutral (neutral + 1);
    const updatedTotal = total + 1;
    setTotal (updatedTotal);
  };
  const handleClickBad = () => {
    console.log ('Bad before update is: ', bad);
    setBad (bad + 1);
    const updatedTotal = total + 1;
    setTotal (updatedTotal);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={'Good'} />
      <Button handleClick={handleClickNeutral} text={'Neutral'} />
      <Button handleClick={handleClickBad} text={'Bad'} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p> Average {total === 0 ? 0 : (good - bad) / total}</p>
      <p> Positive {good / total * 100}%</p>
    </div>
  );
};

export default App;
