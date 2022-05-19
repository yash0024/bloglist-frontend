import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

let container

beforeEach(() => {
    const blog = {
        title: 'Albert Einstein was a physicist',
        author: 'Yash',
        url: 'yash.com',
        likes: 4
      }
    container = render(<Blog blog={blog} />).container
})

test('renders title but not author, likes, and url in the start', () => {
    let div = container.querySelector('.blogWhenHidden')
    expect(div).not.toHaveStyle("display: none")
    div = container.querySelector('.blogWhenNotHidden')
    expect(div).toHaveStyle("display: none")
})

test('render title, author, likes, and url when the View button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    let div = container.querySelector('.blogWhenHidden')
    expect(div).toHaveStyle("display: none")
    div = container.querySelector('.blogWhenNotHidden')
    expect(div).not.toHaveStyle("display: none")
})