
 const sessionId = req.cookies?.session;
req → The request coming from the frontend.
req.cookies → All cookies sent by the browser.
?.session → Get the cookie named session, but only if cookies exists.
sessionId → Store that session ID in a variable.

role based authentication: middleware

----------------------------------------------------------------------------------------------
Error vs error
Here, Error is a built-in JavaScript class.

We use it to create an error object.

Think of it like a blueprint:
- Error = blueprint.
- new Error() = creating an actual error object.

Here, Error is a built-in JavaScript class.

We use it to create an error object.

Think of it like a blueprint:
- Error = blueprint.
- new Error() = creating an actual error object.
try {
    await pool.query("SELECT 1");
} catch (error) {
    console.log(error);
}
----------------------------------------------------------------------------------------------------
1. What are backticks ( ``   ` )?
Backticks are used for something called Template Literals in JavaScript.

They allow you to:
- Insert variables directly inside a string.
- Write expressions inside a string.
- Write multiline strings easily.

const name = "Khushi";

console.log(`Hello ${name}`); vs console.log("Hello " + name);

----------------------------------------------------------------------------------------
Express.jsExpress is a web framework for Node.js. It helps you build backend applications and APIs.

Imagine a user clicks the Login button on your website.

Express helps you:
- Receive the login request.
- Check the user's information.
- Call the authentication controller.
- Communicate with the database.
- Send a response to the frontend.
--------------------------------------------------------------------------------------
if (error && !res.headersSent){ . explain 1-2 lines

error && !res.headersSent checks two conditions:
error → An error has occurred.
!res.headersSent → The server has not already sent a response to the client.
headersSent tells whether the server has already started sending an HTTP response (status code and headers) to the client.

