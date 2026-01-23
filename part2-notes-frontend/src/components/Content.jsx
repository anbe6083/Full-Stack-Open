import Part from './Part';
const Content = ({parts}) => {
  return parts.map (p => (
    <Part key={p.id} name={p.name} exercises={p.exercises} />
  ));
};

export default Content;
