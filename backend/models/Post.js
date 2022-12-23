import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = Schema({ 
        user_id: { type: String, required: false },
        animal: { type: String, required: false },
        breed: { type: String, required: false },
        color: { type: String, required: false },
        age: { type: String, required: false },
        sex: { type: String, required: false },
        cover_image: { type: String, required: false },
        images: { type: Array, required: false },
        neutered: { type: Boolean, required: false },
        location: { type: String, required: false },
        contact: { type: String, required: false },
        status: { type: String, required: false },
        other_info: { type: String, required: false },
        origin_url: { type: String, required: false }
    }, {
        versionKey: false 
    }
)

const Post = mongoose.model('Post', PostSchema);

export default Post;