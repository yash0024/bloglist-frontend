describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'yash',
        username: 'Yash',
        password: 'hello'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login')
        cy.contains('login').click()
      })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('Yash')
            cy.get('#password').type('hello')
            cy.get('#login-button').click()
        
            cy.contains('yash Logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('Yash')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
            .should('contain', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        
            cy.get('html').should('not.contain', 'yash logged in')
        })
      })

      describe('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'Yash', password: 'hello' })
        })

        it('A blog can be created', function() {
            cy.contains('Create new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('yash')
            cy.get('#url').type('yash.com')
            cy.contains('Save').click()
            cy.contains('a blog created by cypress')
          })

        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'first blog', author: 'Yash', url: 'yash.com'})
                cy.createBlog({ title: 'second blog', author: 'Yash', url: 'yash.com' })
                cy.createBlog({ title: 'third blog', author: 'Yash', url: 'yash.com' })
            })

            it('User can like a blog', function() {
                cy.contains('second blog')
                  .contains('View')
                  .click()

                cy.contains('second blog').parent().contains(0)
                  .contains('Like')
                  .click()

                cy.contains('second blog').parent().contains(1)
                  .contains('Like')
            })

            it('User can delete a blog', function() {
                cy.contains('first blog')
                  .contains('View')
                  .click()

                cy.contains('first blog').parent().contains('Yash')
                  .contains('Remove')
                  .click()

                cy.should('not.contain', 'first blog')
            })
        })
    })
})