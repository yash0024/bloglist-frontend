import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {


   return (
     <div>
       <h2>Login to the application</h2>
       <Form onSubmit={handleSubmit}>
        <Form.Group>
         <Form.Label>
           Username:
          </Form.Label>
           <Form.Control
             type="text"
             name="username"
             value={username}
             onChange={handleUsernameChange}
           />
          <Form.Label>
           Password:
           </Form.Label>
           <Form.Control
           name='password'
             type="text"
             value={password}
             onChange={handlePasswordChange}
           />
           <p></p>
         <Button variant="primary" type="submit">Login</Button>
         </Form.Group>
       </Form>
     </div>
   )
 }
 
 export default LoginForm