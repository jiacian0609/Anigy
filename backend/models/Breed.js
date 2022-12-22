import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BreedSchema = Schema({ 
        breed: { type: String, required: true },
    }, {
        versionKey: false 
    }
)

const Breed = mongoose.model('Breed', BreedSchema);

export default Breed;