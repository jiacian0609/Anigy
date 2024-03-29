import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LocationSchema = Schema({ 
        location: { type: String, required: true },
    }, {
        versionKey: false 
    }
)

const Location = mongoose.model('Location', LocationSchema);

export default Location;