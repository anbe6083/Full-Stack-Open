import {useState} from 'react';

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState ('');
  const [author, setAuthor] = useState ('');
  const [url, setUrl] = useState ('');
  const handleSubmitBlog = async e => {
    e.preventDefault ();
    createBlog ({title, author, url});
    setTitle ('');
    setAuthor ('');
    setUrl ('');
  };
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        <label>
          Title:
          {' '}
          <input value={title} onChange={e => setTitle (e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Author:
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
