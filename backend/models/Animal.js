import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AnimalSchema = Schema({ 
        animal: { type: String, required: true },
    }, {
        versionKey: false 
    }
)

const Animal = mongoose.model('Animal', AnimalSchema);

export default Animal;