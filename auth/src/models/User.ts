const mongoose = require('mongoose');

// An interface describing properties required to create a new User
interface UserAttrs {
    email: string
    password: string;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
}

export { User,buildUser };