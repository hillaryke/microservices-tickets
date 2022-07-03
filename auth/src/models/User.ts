import mongoose from "mongoose";

// An interface describing properties required to create a new User
interface UserAttrs {
    email: string
    password: string;
}

// An interface describing the properties a User Model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
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

const User = mongoose.model<any, UserModel>('User', UserSchema);

User.build({
    email: 'asasdfas@df.com',
    password: 'adfadsf'
});

export { User };