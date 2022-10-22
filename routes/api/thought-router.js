const thoughtRouter = require( 'express' ).Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require( '../../controllers/thoughtController' );

const {
    addReaction,
    deleteReaction
} = require( '../../controllers/reactionsController' );

thoughtRouter.route( '/' )
    .get( getAllThoughts )
    .post( createThought );

thoughtRouter.route( '/:id' )
    .get( getSingleThought )
    .put( updateThought )
    .delete( deleteThought );

thoughtRouter.route( '/:thoughtId/reactions' )
    .post( addReaction )
    .delete( deleteReaction );

module.exports = thoughtRouter;