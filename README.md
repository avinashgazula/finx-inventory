Inventory: Deployed at https://leafy-alfajores-78e449.netlify.app/

# Auth Information - for testing purposes

Since we are just calling an existing api, I have just saved users locally and not created a database but the passwords are still hashed and the jwt is saved in the cookies

For existing users already in the db, you can login with the password: **password\*\*** and the rest of their info should apply, for new users, you can use a differnt password but you will always have the sales-rep role.

# Pages

- Inventory: Available to all users once logged in

- Sales: Available to manager, principal and admin

- Users: Available to principal and admin

- Admin: Available to admin, here you can set the fail mode
