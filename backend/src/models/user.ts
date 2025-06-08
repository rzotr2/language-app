import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: false
    },
    level: {
        type: String,
        required: false
    },
    interests: {
        type: String,
        required: false
    },
    goals: {
        type: String,
        required: false
    }
});

const User = model('User', userSchema);

export default User;
