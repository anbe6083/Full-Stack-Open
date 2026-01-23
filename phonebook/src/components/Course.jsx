import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const total = course.parts.reduce((s, c) => s + c.exercises, 0);
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <div>
        <b>Total of {total} exercises</b>
      </div>
    </>
  );
};
export default Course;
