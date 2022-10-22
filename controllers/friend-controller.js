const { User } = require( '../models' );

module.exports = {
    addFriend: async ( req, res ) => {
        try {
            const friend = ( await User.findById(  req.params.friendId ) );
            if ( !friend ) {
                res.status(404).json( { message: `Friend id invalid! could not find user with id: ${ req.params.friendId }` } );
                return;
            } 
            const user = await User.findOneAndUpdate( 
                { _id: req.params.userId },
                { $addToSet: { friends: friend._id } },
                { runValidators: true, new: true }
            );
            !user
            ? res.status(404).json( { message: `User with id: ${ req.params.userId } does not exist!` } )
            : res.status(200).json( user );


        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    },
    removeFriend: async ( req, res ) => {
        const user = await User.findOneAndUpdate( 
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
         );
         !user
         ? res.status(404).json( { message: `User with id: ${ req.params.userId } does not exist!` } )
         : res.status(200).json( user );
    }
}