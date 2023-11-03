let requireAuth = (req, res, next) => {
        const authToken = req.cookies.authToken;     
        if (!authToken) {
          return res.status(401).send('Authentication required');
        }
        // Here, you would typically validate the authToken and determine if the user is authenticated.
        // For the sake of the example, we'll just check if it's a dummy value.
        if (authToken === 'secretToken') {
          next(); // User is authenticated, proceed to the next middleware.
        } else {
          res.status(401).send('Invalid authentication token');
        }
  
}
module.exports = requireAuth;