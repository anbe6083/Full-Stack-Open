import {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './style.css'
const App = () => {
  const [blogs, setBlogs] = useState ([]);
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [user, setUser] = useState (null);
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  useEffect (() => {
    blogService.getAll ().then (blogs => setBlogs (blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('LoggedInUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <h1>Login to Application</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username
              <input
                value={username}
                onChange={e => setUsername (e.target.value)}
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={e => setPassword (e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault()
    await blogService.createBlog({title, author, url})
    setBlogs(blogs.concat({title, author, url}))
    setNotification(`A new blog: "${title}" by ${author} was added`)
    setTitle("")
    setAuthor("")
    setUrl("")
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {

    const user = await loginService.login ({username, password});
    blogService.setToken(user.token)
    window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
    setUser(user)
    setNotification(`${user.name} is signed in`)
    setUsername('')
    setPassword('')
    } catch {
      setErrorMessage("Incorrect username or password")
      setTimeout(() => {
      setErrorMessage(null)
      },5000)
    }
  };

  const handleLogout = async e => {
    e.preventDefault()
    window.localStorage.removeItem("LoggedInUser")
    setUser(null)
  }
  return (
    <div>
      {notification &&
      <div className='notification'>
      {notification}
      </div> 
      }
      {errorMessage &&
      <div className='error-message'>
      {errorMessage}
      </div> 
      }
      {user &&(
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
      <h2>blogs</h2>
      {!user && loginForm ()}
      {user && blogs.map (blog => <Blog key={blog.id} blog={blog} />)}
      <h1>Create New</h1>
      {user && (
        <form onSubmit={handleSubmitBlog}>
          <div>
            <label>Title <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          </div>
          <div>
            <label>Author <input value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
          </div>
          <div>
            <label>Url: <input value={url} onChange={(e) => setUrl(e.target.value)} /></label>
          </div>
          <button type="submit" className='Button'>Create</button>
        </form>
      )}
    </div>
  );
};

export default App;
