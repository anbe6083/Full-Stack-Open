import {useState} from 'react';
import blogService from '../services/blogs';
const BlogForm = ({setBlogs, blogs, setNotification}) => {
  const [title, setTitle] = useState ('');
  const [author, setAuthor] = useState ('');
  const [url, setUrl] = useState ('');
  const handleSubmitBlog = async e => {
    e.preventDefault ();
    await blogService.createBlog ({title, author, url});
    setBlogs (blogs.concat ({title, author, url}));
    setNotification (`A new blog: "${title}" by ${author} was added`);
    setTimeout (() => {
      setNotification (null);
    }, 5000);
  };
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        <label>
          Title
          {' '}
          <input value={title} onChange={e => setTitle (e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Author
          {' '}
          <input value={author} onChange={e => setAuthor (e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Url: <input value={url} onChange={e => setUrl (e.target.value)} />
        </label>
      </div>
      <button type="submit" className="Button">Create</button>
    </form>
  );
};

export default BlogForm;
