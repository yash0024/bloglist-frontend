import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Error from './Error'
import Notification from './Notification'

import { useNavigate, useMatch, Route, Routes, Navigate } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
      setNotification(`${user.name} Successfully logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setNotification('Logged out')
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    userService.getAll().then(users => 
      setUsers ( users ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService
    .create(blogObject)
    .then(returnBlog => {
      setBlogs(blogs.concat(returnBlog))
      setUsers(users.map(user => 
        user.id === returnBlog.user ?
        {...user, blogs: user.blogs.concat(returnBlog)}:
        user))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    })
  }

  const incrementLikes = id => {
    const blog = blogs.find(blog => blog.id === id)
    let updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user._id}

    blogService
    .update(id, updatedBlog)
    .then(returnedBlog => {
      updatedBlog = {...blog, likes: blog.likes + 1}
      setBlogs(blogs.map(blog => blog.id != id ? blog : updatedBlog))
    })
  }

  const addNewComment = async (id, comment) => {
    const blog = blogs.find(blog => blog.id === id)
    let updatedBlog = {...blog, comments: blog.comments.concat(comment), user: blog.user._id}

    blogService
    .update(id, updatedBlog)
    .then(returnedBlog => {
      updatedBlog = {...blog, comments: blog.comments.concat(comment)}
      setBlogs(blogs.map(blog => blog.id != id ? blog : updatedBlog))
    })
  }

  const deleteBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='Create a new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')
  const userToDisplay = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  return (
    <div className='container'>
      <NavBar user={user} handleLogout={handleLogout} />
      <Error message={errorMessage} />
      <Notification message={notification} />
      <h1>Blog Application</h1>
      <Routes>
        <Route path="/" element={user ? 
            <div>
              {blogForm()}
            <Blogs blogs={blogs}/> 
            </div>
            : <Navigate replace to="/login" />}/>
        <Route path="/users" element={user ? <Users users={users}/> : <Navigate replace to="/login" />}/>
        <Route path="/users/:id" element={user ? <User user={userToDisplay}/> : <Navigate replace to="/login" />}/>
        <Route path="/login" element={!user?
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
              : <Navigate replace to="/" />
        }/>
        <Route path="/blogs/:id" element={user ? 
                <Blog 
                blog={blog}
                incrementLikes={incrementLikes}
                addNewComment={addNewComment}/>
                 : <Navigate replace to="/login" />}/>
      </Routes>
    </div>
  )
}

export default App
