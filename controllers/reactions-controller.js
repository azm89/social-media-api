const { Thought } = require( '../models' );

module.exports = {
    addReaction: async ( req, res ) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought);
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    },
    deleteReaction: async ( req, res ) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { runValidators: true, new: true }
            );
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought);
        } catch ( err ) {
            console.log( err );
            return res.status(500).json( err );
        }
    }
}