import {render, screen} from '@testing-library/react';
import BlogForm from './BlogForm';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import {expect} from 'vitest';
test ('Should render blog title and author', async () => {
  const blogObj = {
    likes: 100,
    author: 'Cynthia Smith',
    title: 'Bob Loblaws Law Blog',
    url: 'http://blogurl.com',
  };

  const mockLikeHandler = vi.fn ();
  const mockDeleteHandler = vi.fn ();
  const user = userEvent.setup ();

  render (
    <Blog
      blog={blogObj}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
    />
  );
  const blogTitleSelector = screen.getByText (blogObj.title, {exact: false});
  expect (blogTitleSelector).toBeDefined ();

  const blogAuthorSelector = screen.getByText (blogObj.author, {exact: false});
  expect (blogAuthorSelector).toBeDefined ();
});

test ('Should show url, likes, on button click ', async () => {
  const blogObj = {
    likes: 100,
    author: 'Cynthia Smith',
    title: 'Bob Loblaws Law Blog',
    url: 'http://blogurl.com',
  };

  const mockLikeHandler = vi.fn ();
  const mockDeleteHandler = vi.fn ();
  const user = userEvent.setup ();

  render (
    <Blog
      blog={blogObj}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
    />
  );
  const showButton = screen.getByText ('Show');
  await user.click (showButton);

  const urlSelector = screen.getByText (blogObj.url, {exact: false});
  expect (urlSelector).toBeDefined ();

  const likesSelector = screen.getByText (`Likes: ${blogObj.likes}`, {
    exact: false,
  });
  expect (likesSelector).toBeDefined ();
});

test ('Like button event handler should be called twice when button is clicked twice', async () => {
  const blogObj = {
    likes: 100,
    author: 'Cynthia Smith',
    title: 'Bob Loblaws Law Blog',
    url: 'http://blogurl.com',
  };

  const mockLikeHandler = vi.fn ();
  const mockDeleteHandler = vi.fn ();
  const user = userEvent.setup ();

  render (
    <Blog
      blog={blogObj}
      handleLike={mockLikeHandler}
      handleDelete={mockDeleteHandler}
    />
  );
  const showButton = screen.getByText ('Show');
  await user.click (showButton);

  const urlSelector = screen.getByText (blogObj.url, {exact: false});
  expect (urlSelector).toBeDefined ();

  const likeButtonSelector = screen.getByRole ('button', {
    name: 'like',
  });
  expect (likeButtonSelector).toBeDefined ();
  for (let i = 0; i <= 1; i++) {
    await user.click (likeButtonSelector);
  }
  expect (mockLikeHandler.mock.calls).toHaveLength (2);
});

test ('BlogForm should receive the correct details of new blog', async () => {
  const blogObj = {
    likes: 100,
    author: 'Cynthia Smith',
    title: 'Bob Loblaws Law Blog',
    url: 'http://blogurl.com',
  };
  const setNotificationHandler = vi.fn ();
  const setBlogsHandler = vi.fn ();
  const user = userEvent.setup ();

  render (
    <BlogForm
      blogs={[]}
      setNotification={setNotificationHandler}
      setBlogs={setBlogsHandler}
    />
  );

  const titleInput = screen.getByLabelText ('Title', {exact: false});
  const authorInput = screen.getByLabelText ('Author', {exact: false});
  const urlInput = screen.getByLabelText ('Url', {exact: false});
  const createBtn = screen.getByRole ('button', {name: 'Create'});

  expect (titleInput).toBeDefined ();
  expect (authorInput).toBeDefined ();
  expect (urlInput).toBeDefined ();
  expect (createBtn).toBeDefined ();

  await user.type (titleInput, blogObj.title);
  await user.type (authorInput, blogObj.author);
  await user.type (urlInput, blogObj.url);
  await user.click (createBtn);

  console.log (setBlogsHandler.mock.calls[0][0]);
});
