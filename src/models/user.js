import moongose from 'mongoose'

const UserSchema = new moongose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
})

const User = moongose.models.User || moongose.model('User', UserSchema )

export default User