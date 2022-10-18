const db = require("../models")

module.exports = {
  // POST new user to database
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },


  // GET all users
  findAll: function (req, res) {
    db.User
      .find({})
      .populate("userThoughts")
      .populate("userFriends")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // GET user by ID
  findById: function (req, res) {
    db.User
      .findOne({ _id: req.params.id })
      .populate("userThoughts")
      .populate("userFriends")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },


  // PUT user & user's Thoughts to match
  updateUser: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(user =>
        !user
          ? res.status(400).json({ message: "User not found" })
          : db.Thought.updateMany({ _id: { $in: user.userThoughts } },
            { userName: user.userName }
          ))
      .then(() => res.json({ message: "User and thoughts updated" }))
      .catch(err => res.status(422).json(err))
  },

  // PUT user to add new friend info
  addFriend: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $addToSet: { userFriends: req.params.friendId } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // PUT user to remove friend info
  removeFriend: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, { $pull: { userFriends: req.params.friendId } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },


  // DELETE user & user's Thoughts
  deleteUser: function (req, res) {
    db.User.findOneAndDelete({ _id: req.params.id })
      .then(user =>
        !user
          ? res.status(400).json({ message: "User not found" })
          : db.Thought.deleteMany({ _id: { $in: user.userThoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted" }))
      .catch(err => res.status(422).json(err))
  }
}
