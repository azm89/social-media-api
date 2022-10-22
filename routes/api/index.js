const apiRouter = require( 'express' ).Router();
const userRouter = require('./users-routes');
const thoughtRouter = require( './thoughts-router' );

apiRouter.use( '/users', userRouter );
apiRouter.use( '/thoughts', thoughtRouter );

module.exports = apiRouter;