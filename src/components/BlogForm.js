import { useState } from "react"
import { Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={addBlog}>
        <Form.Group>
         <Form.Label>
           Title:
          </Form.Label>
           <Form.Control
             type="text"
             name="title"
             value={newBlog}
             onChange={handleBlogChange}
           />
          <Form.Label>
           Author:
           </Form.Label>
           <Form.Control
           name='author'
             type="text"
             value={author}
             onChange={handleAuthorChange}
           />
          <Form.Label>
           Url:
           </Form.Label>
           <Form.Control
           name='url'
             type="text"
             value={url}
             onChange={handleUrlChange}
           />
           <p></p>
         <Button variant="primary" type="submit">Save</Button>
         </Form.Group>
       </Form>
        </div>
      )
}

export default BlogForm