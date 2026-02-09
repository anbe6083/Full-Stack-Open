const BlogForm = ({
  handleSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  <form onSubmit={handleSubmit}>
    <div>
      <label>
        Title <input value={title} onChange={e => setTitle (e.target.value)} />
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
  </form>;
};
