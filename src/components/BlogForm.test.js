import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const sendButton = screen.getByText('Save')

  let input = screen.getByPlaceholderText('Write title')
  userEvent.type(input, 'A' )

  input = screen.getByPlaceholderText('Write author')
  userEvent.type(input, 'Y' )
  
  input = screen.getByPlaceholderText('Write url')
  userEvent.type(input, 'y' )

  await userEvent.click(sendButton)
 
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A')
})