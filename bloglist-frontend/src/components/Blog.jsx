import {useState} from 'react';
import Togglable from '../components/Togglable';
const expandedBlog = () => {
  return {};
};

const Blog = ({blog, handleLike}) => {
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
        <button onClick={() => handleLike (blog)}>like</button>
        <br />
        {blog.author}
        <br />
      </Togglable>
    </div>
  );
};

export default Blog;
