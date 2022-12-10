import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = Schema({
    user_id: { type: Number, required: false },
    animal: { type: String, required: false },
    color: { type: String, required: false },
    age: { type: String, required: false },
    sex: { type: String, required: false },
    image: { type: String, required: false },
    neutered: { type: Boolean, required: false },
    location: { type: String, required: false },
    contact: { type: String, required: false },
    status: { type: String, required: false },
    other_info: { type: String, required: false },
    origin_url: { type: String, required: false }
})

const Post = mongoose.model('Post', PostSchema);

export default Post;