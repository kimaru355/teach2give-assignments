describe('User Dashboard', ()=>{

    beforeEach(()=>{
        
        cy.fixture('posts.json').then((postsJson)=>{
            cy.intercept('GET', 'http://localhost:4115/post/all', {
                body: postsJson
            }).as('getPosts')

            
        })
        cy.fixture('comments').then((commentsJson)=>{
            cy.intercept('GET', `http://localhost:4115/comment/all-post-comments/3b582715-e98f-449d-a335-519874e56f53`, {
                body: commentsJson
            }).as('getComments')
        })

        cy.visit('/home/posts')

        cy.wait('@getPosts')
        cy.wait('@getComments')
    })

    it('Displays all posts', ()=>{
        cy.get('.post').should("have.length", 5)
    })

})