// describe('Login Component', ()=>{

//     beforeEach(()=>{
//         cy.visit('/login')
//     })

//     it('logs in the user successfully', ()=>{
//         cy.get('.email').type('janedoe@yopmail.com')
//         cy.get('.password').type('12345678')
//         cy.get('#login-btn').click()
//         cy.get('img')
//         cy.location('pathname').should('eq', '/home/posts')
//     })

//     it('throws error on invalid login', ()=>{
//         cy.get('.email').type('janedo@yopmail.com')
//         cy.get('.password').type('12345679')
//         cy.get('#login-btn').click()
//         cy.get('.login-error')
//     })
// })
