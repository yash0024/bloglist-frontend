import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {
  const blogsToDisplay = [...blogs].sort((blog1, blog2) => 
  blog2.likes - blog1.likes
  )
  return(
    <div>
    <h2>Blogs</h2>
    <Table striped>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </td>
            <td>
              {blog.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)}

export default Blogs