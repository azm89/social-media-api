const { User } = require( '../models' );

module.exports = {
    addFriend: async ( req, res ) => {
        try {
            const friend = ( await User.findById(  req.params.friendId ) );
            if ( !friend ) {
                res.status(404).json( { message: `Invalid friend id! Could not find user with that id!` } );
                return;
            } 
            const user = await User.findOneAndUpdate( 
                { _id: req.params.userId },
                { $addToSet: { friends: friend._id } },
                { runValidators: true, new: true }
            );
            !user
            ? res.status(404).json( { message: `User with that id does not exist!` } )
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
         ? res.status(404).json( { message: `User with that id does not exist!` } )
         : res.status(200).json( user );
    }
}