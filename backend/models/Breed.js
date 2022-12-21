import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BreedSchema = Schema({ 
        animal: { type: string, required: true },
    }, {
        versionKey: false 
    }
)

const Breed = mongoose.model('Breed', BreedSchema);

export default Breed;