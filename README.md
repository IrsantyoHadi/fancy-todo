**Fancy Todo**
----------------------------------------
## Deploy Link
http://fancytodo.irsantyohadi.com/

## Endpoint
baseUrl = http:localhost:3000/

### *Doesn't Require Token*

#### User Routes
| Routes| Method | Request Body | Response Data| Response Error | Description |
|----------------------|--------|-------------|-----------------------------------|--|---------------------------------------------------------------|
| `/users/signup`| POST | `{ username, email, password }` | `{ access_token }` | 400 (`{email}` has been registered!) <br>400 (`{email}` is not a valid email!) <br>  (`${username}` has been registered!)|Register a new user|
| `/users/signin` | POST | `{ email, password }`| `{ name, access_token }`| 400 (Wrong email/password) |Log in and get an email verification!|
| `/users/signinGoogle` | POST | `{ id_token }` | `{ name, newPass, access_token }` | |Sign in with Google and get a new password! |
| `users/` | GET | | Using Req.headers to get `${token}` | 200 `${data}` get Data | Use to get information while login |

### Token is required!

#### Todo Routes (`{ headers: { token } }`)
| Routes | Method | Request Body | Response Success | Response Error | Description|
|-------------------------|--------|-------------------|--------------------------|-------------------------|------------------------------------------------------------------------------|
| `/todos/`| GET | -| `{ data }`| 401(Invalid Token) <br> 401(Please Login) <br> 404 (wrong User) <br> 500 (Internal Server Error) |  get your todoList according to your User
| `/todos/` | POST | `{name,description,dueDate}`| `${success message}` | 401(Invalid Token) <br> 401(Please Login) <br> 404 (Wrong User) <br> 400 (DueDate must be more than today)| Create a new Task! |
| `/todos/:id` | DELETE | -| | 401 (Invalid Token)<br> 401 (Please Login) <br> 401 (Unauthorized) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Delete a a Todo List |
| `/todos/:id`| PUT |  | `{ status , dueDate }`| 401 (Invalid Token)<br> 401 (Please Login) <br> 404 (Wrong User) <br> 500 (Internal Server Error) | Use to Assign Todo as done or undone in client side|
| `/todos/undone` | GET| -| `{ data }` | 500 (Internal Server Error) | get a undone ToDo |

## Depedencies 
| npm | ver |
|--------|--------|
"axios" | "^0.19.0"|
"bcryptjs"| "^2.4.3"|
"cors"| "^2.8.5"|
"express"| "^4.17.1"|
"google-auth-library"| "^4.2.5"|
"jsonwebtoken"| "^8.5.1"|
"moment"| "^2.24.0"|
"mongoose"| "^5.6.4"|
"mongoose-unique-validator"| "^2.0.3"|
"nodemailer"| "^6.3.0"|
