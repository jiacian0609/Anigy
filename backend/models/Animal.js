import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AnimalSchema = Schema({ 
        animal: { type: string, required: true },
    }, {
        versionKey: false 
    }
)

const Animal = mongoose.model('Animal', AnimalSchema);

export default Animal;