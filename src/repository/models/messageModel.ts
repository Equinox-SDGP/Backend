import {Schema, model} from 'mongoose';

const messageSchema = new Schema({
    type: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const messageModel = model('Message', messageSchema);
export default messageModel;