const Part = ({id, name, exercises}) => {
  return (
    <div key={id}>
      {name} {exercises}
    </div>
  );
};
export default Part;
