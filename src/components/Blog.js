import { useState } from "react"

const Blog = ({blog, incrementLikes, deleteBlog}) => {

  const [displayAll, setDisplayAll] = useState(false)

  const toggleDisplay = () => {
    setDisplayAll(!displayAll)
  }

  const blogStyleWhenHidden = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: displayAll ? 'none' : '' 
  }

  const blogStyleWhenNotHidden = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: displayAll ? '' : 'none' 
  }

  return(
    <li>
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <p>{blog.url}
        <br>
        {blog.likes}
          <button onClick={incrementLikes}>
            Like
          </button>
        </br>
        <br>
        Added by {blog.user.name}
        </br>
        </p>
      </div>
    </li>

  )
}

export default Blog