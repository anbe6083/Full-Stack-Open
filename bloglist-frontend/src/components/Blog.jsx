import Togglable from '../components/Togglable';

const Blog = ({blog, handleLike, handleDelete, user}) => {
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
        {user &&
          blog.user &&
          user.username === blog.user.username &&
          <button onClick={() => handleDelete (blog)}>Remove</button>}
      </Togglable>
    </div>
  );
};

export default Blog;
