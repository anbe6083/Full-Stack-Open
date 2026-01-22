import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};
const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <StatisticsLine value={good} text={"Good"} />
          <StatisticsLine value={neutral} text={"neutral"} />
          <StatisticsLine value={bad} text={"bad"} />
          <StatisticsLine value={total} text={"all"} />
          <StatisticsLine
            value={total === 0 ? 0 : (good / total) * 100 + "%"}
            text={"Positive"}
          />
          <StatisticsLine
            value={total === 0 ? 0 : (good - bad) / total}
            text={"average"}
          />
        </table>
      </>
    );
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [total, setTotal] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log("Good on render is: ", good);
  console.log("neutral on render is: ", neutral);
  console.log("bad on render is: ", bad);

  const handleClickGood = () => {
    console.log("Good before update is: ", good);
    setGood(good + 1);
    const updatedTotal = total + 1;
    setTotal(updatedTotal);
  };
  const handleClickNeutral = () => {
    console.log("Neutral before update is: ", neutral);
    setNeutral(neutral + 1);
    const updatedTotal = total + 1;
    setTotal(updatedTotal);
  };
  const handleClickBad = () => {
    console.log("Bad before update is: ", bad);
    setBad(bad + 1);
    const updatedTotal = total + 1;
    setTotal(updatedTotal);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={"Good"} />
      <Button handleClick={handleClickNeutral} text={"Neutral"} />
      <Button handleClick={handleClickBad} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
