/** _id
username (string)
email (string)
password (string)
mobile (string)
show_mobile (boolean)
show_email (boolean)
 */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    mobile: { type: String, required: false },
}, {
    versionKey: false
})

const User = mongoose.model('User', UserSchema);

export default User;
