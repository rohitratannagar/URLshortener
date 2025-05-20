// A closure is created when a function is defined inside another function, and it accesses variables 
// from the outer function.

// function createCounter() {
//     let count = 0;
  
//     return function() {
//       count++;
//       return count;
//     };
//   }
  
//   const counter = createCounter();
//   console.log(counter()); // 1
//   console.log(counter()); // 2
//   console.log(counter()); // 3

// Even though createCounter has finished running, the returned function still remembers the count variable.
//  That's a closure.
  

// Lexical scope (also called static scope) means that the scope of a variable is determined by its 
// position in the source code, and nested functions have access to variables declared in their outer scope.

// In simple terms:
// Where a variable is available depends on where you wrote it in the code—not when or how the function is called.


// A closure in backend JavaScript (or JavaScript in general) is a function that "remembers" the variables from 
// its lexical scope, even after that scope has finished executing.

// This concept is very powerful in backend development (Node.js), especially when you're dealing with callbacks,
//  middleware, or maintaining private state in things like modules or request handlers.

// Useful in asynchronous logic like promises and callbacks



function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) 
            return res.redirect('/login');

        if (!roles.includes(req.user.role))
            return res.end('unAuthorized');

        return next();
    }
}

// This is a classic middleware factory pattern, where a closure is used to "capture" the roles argument and make
//  it available in the returned middleware function.

//  1. Customization of Middleware
// Without closure, you'd have to hard-code roles. But this lets you write:

app.get('/admin', restrictTo(['admin']), handler);
app.get('/editor', restrictTo(['editor', 'admin']), handler);

// Each time you call restrictTo([...]), you're creating a custom version of the middleware with those specific
//  roles "remembered" by the inner function.

// How Closure Helps
// The roles variable belongs to the outer function's lexical scope, but it's used inside the inner function 
// that handles the actual request. Thanks to closures, that inner function remembers roles, even after the
//  outer function finishes executing.


app.use(checkForAuthentication);
app.use(checkForAuthentication());

// difference?

// app.use(checkForAuthentication());
// Here, you're calling a function immediately, and expecting it to return a middleware function.

// This is how middleware factories work — just like your restrictTo([]) example earlier.



// populate() is one of Mongoose's most powerful features, and it's super useful when working with references 
// between collections.

// Suppose you have a Request model like this:


// If I approve someone as admin, can they be logged out immediately?

// With JWT? It's tricky but possible, here's how:

// ✅ Option 1: Token Blacklisting (Recommended for security)
// When someone is made admin, add their current token to a blacklist (e.g., in Redis or your DB). 
// On each authenticated request, check if the token is blacklisted.

// If blacklisted → deny access and force re-login.

// Can be scoped per-user easily.

// ✅ Option 2: Change tokenVersion
// Add a tokenVersion field in your user schema.

// When you issue a token, include tokenVersion in the JWT payload.

// When approving the user as admin, increment their tokenVersion.

// On every request, compare the JWT's tokenVersion with the one in DB.

// If it doesn’t match → token is invalid → force logout.

// ✅ Option 3: Just force logout client-side (for basic cases)
// When a user’s role is changed, and they still have an old token, just show an error on next request like:

// “Your session has expired. Please log in again.”

// This is easier but less secure unless tokens are short-lived.

