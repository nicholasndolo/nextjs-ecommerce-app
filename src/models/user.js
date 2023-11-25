import moongose from 'mongoose'

const userSchema = new moongose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
})

const User = moongose.models.User || moongose.model('User', userSchema )

export default User