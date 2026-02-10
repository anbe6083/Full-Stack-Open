import Togglable from '../components/Togglable';

const Blog = ({blog, handleLike, handleDelete}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="Show" closeLabel={'Hide'}>
        {blog.url}
        <br />
        Likes:
        {' '}
        {blog.likes}
        {' '}
        <button id="like-button" onClick={() => handleLike (blog)}>like</button>
        <br />
        <button onClick={() => handleDelete (blog)}>Remove</button>
      </Togglable>
    </div>
  );
};

export default Blog;
