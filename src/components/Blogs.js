import { Table } from 'react-bootstrap'
import Link from "react-router-dom"

const Blogs = ({ blogs }) => (
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
              {blog.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default Blogs