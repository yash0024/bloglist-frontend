import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Blog = ({blog, incrementLikes, addNewComment}) => {

  const user = blog.user

  const [comment, setComment] = useState('')

  const handleOnChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    addNewComment(blog.id, comment)
    setComment('')
  }

  return(
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <div>
          {blog.url}
        </div>
        <div>
        {blog.likes}
          <Button variant='light' onClick={() => incrementLikes(blog.id)}>
            Like
          </Button>
        </div>
        <div>
        Added by {user.name}
        </div>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map(comment =>
            <li key={blog.comments.indexOf(comment)}>
              {comment}
            </li>)}
        </ul>
        <Form onSubmit={addComment}>
        <Form.Group>
         <Form.Label>
           Comment:
          </Form.Label>
           <Form.Control
             type="text"
             name="comment"
             value={comment}
             onChange={handleOnChange}
           />
           <p></p>
         <Button variant="primary" type="submit">Add Comment</Button>
         </Form.Group>
       </Form>
      </div>
  )
}

export default Blog