import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = Schema({ 
        user_id: { type: String, required: true },
        animal: { type: String, required: true },
        breed: { type: String, required: true },
        age: { type: String, required: true },
        sex: { type: String, required: true },
        cover_image: { type: String, required: true },
        images: { type: Array, required: false },
        neutered: { type: Boolean, required: true },
        location: { type: String, required: true },
        contact: { type: String, required: true },
        contact_content: { type: String, required: true },
        status: { type: String, required: true },
        other_info: { type: String, required: false },
        origin_url: { type: String, required: false }
    }, {
        versionKey: false 
    }
)

const Post = mongoose.model('Post', PostSchema);

export default Post;