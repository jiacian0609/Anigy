import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AgeSchema = Schema({ 
        age: { type: string, required: true },
    }, {
        versionKey: false 
    }
)

const Age = mongoose.model('Age', AgeSchema);

export default Age;