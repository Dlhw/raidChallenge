- a README file within your repository containing a list of the user stories you implemented.

1. As a customer, I want to see a list of fruits that are available to buy (complete with stock and pricing information), so that I can decide which fruits I want to buy.

2. As a customer, I want to keep track of the fruits and quantity that I have shortlisted (including the total amount I need to pay), so that I can adjust my purchasing decisions as I shop.

3. As a customer, I want to submit my order of the fruits I selected, so that I can complete my purchase when I am done shopping. Assume that payment is done separate from this POS application.

4. As an owner, I want to see the orders that my customers have submitted, so that I can fulfill their orders.

13. As a customer, after logging in, I want my order shortlist to be saved so that I can log in and continue shopping on another device later.

14. As an owner, I want to be able to serve millions of customers at the same time, so that I can scale my business. (not sure how you want this, but can create many user accounts i guess, no blocking apis?)

15. As an owner, I do not want my customers to be able to see the whole store's order history, or amend my stocks, or perform any actions that should only be available for me. (got user role check)

17. As a customer, I want the fruit store pages to load quickly at all times, so that I can browse and shop without delays. (hmm i didn't do pagination)

I seeded the database with some fruit stocks and an admin user, the details can be found in backend/seed/

I also place dummy values for process.env so it should work, but if it doesn't put a .env file in the backend folder
