import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    temperature : {
        type: String
    },
    humidity: {
        type: String
    },
    timestamp: {
        type: String
    }
})

//export schema to mongoDB
export default mongoose.model("Data", dataSchema);