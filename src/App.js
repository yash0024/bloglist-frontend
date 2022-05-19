import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './Error'
import Notification from './Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const blogsToDisplay = [...blogs].sort((blog1, blog2) => 
    blog2.likes - blog1.likes
  )

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Error message={errorMessage} />
    {user === null ?
    <div>
      <h2>Log in to the application</h2>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>:
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <div>
      <p>{user.name} Logged in</p>
      <button onClick={handleLogout}>
        Logout
      </button>
      {blogForm()}
      </div>
      {blogsToDisplay.map(blog =>
        <Blog key={blog.id}
              blog={blog}
              incrementLikes={() => incrementLikes(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
        />
      )}
    </div>}
    </div>
  )
}

export default App
