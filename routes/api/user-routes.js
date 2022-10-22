const userRouter = require( 'express' ).Router();

const { 
    getAllUsers, 
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require( '../../controllers/userController' );

const {
    addFriend,
    removeFriend
} = require( '../../controllers/friendController' );

userRouter.route( '/' )
    .get( getAllUsers )
    .post( createUser );

userRouter.route( '/:id' )
    .get( getSingleUser )
    .put( updateUser )
    .delete( deleteUser );

userRouter.route( '/:userId/friends/:friendId' )
    .post( addFriend )
    .delete( removeFriend );

module.exports = userRouter;