import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nativeLanguage: {
        type: String,
        required: false
    },
    languageToLearn: {
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
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
});

const User = model('User', userSchema);

export default User;
