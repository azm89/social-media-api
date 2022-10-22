const apiRouter = require( 'express' ).Router();
const userRouter = require('./userRoutes');
const thoughtRouter = require( './thoughtRouter' );

apiRouter.use( '/users', userRouter );
apiRouter.use( '/thoughts', thoughtRouter );

module.exports = apiRouter;