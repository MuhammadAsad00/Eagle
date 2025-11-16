import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/,"Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role:{
        type:String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    cartData:{
        type: Object,
        default: {}
    }
},{timestamps: true, minimize: false});

const User = mongoose.model('User', userSchema);

export default User;