import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('') 
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const handleBlogChange = (event) => {
        setNewBlog(event.target.value)
      }
    
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
      }
    
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
      }
    
      const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog,
            author: author,
            url: url
          })
        setNewBlog('')
        setAuthor('')
        setUrl('')
      }

      return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                title
                <input
                value={newBlog}
                onChange={handleBlogChange}
                placeholder='Write title'
                id='title'
                />
                </div>
                <div>
                author
                <input
                value={author}
                onChange={handleAuthorChange}
                placeholder='Write author'
                id='author'
                />
                </div>
                <div>
                url
                <input
                value={url}
                onChange={handleUrlChange}
                placeholder='Write url'
                id='url'
                />
                </div>
                <button type="submit">Save</button>
           </form>  
        </div>
      )
}

export default BlogForm