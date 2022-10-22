const { Thought, User } = require( '../models' );

module.exports = {
    getAllThoughts: async ( req, res ) => {
        try {
            const allThoughts = await Thought.find();
            res.status(200).json( allThoughts );
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }

    },
    getSingleThought: async ( req, res ) => {
        try {
            const thought = await Thought.findById( req.params.id );
            !thought
            ? res.status(404).json( { message: `Thought with that id does not exist!` } )
            : res.json( thought );
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    },
    createThought: async ( req, res ) => {
        try {
            const newThought = await Thought.create( req.body );
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
            );
            !user
            ? res.status(404).json( { message: `Thought created, but found no user with that id.` } )
            : res.json( newThought );
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    },
    updateThought: async ( req, res ) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            !thought
            ? res.status(404).json( { message: `No thought found with that id` } )
            : res.json( thought );
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    },
    deleteThought: async ( req, res ) => {
        try {
            const deletedThought = await Thought.findOneAndDelete( { _id: req.params.id } );
            if ( !deletedThought ) {
                res.status(404).json( { message: `No thought found with that id` } );
                return;
            }
            await User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id  } }
            );
            res.json( { message: 'Thought deleted!' } );
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    }
};