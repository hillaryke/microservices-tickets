import mongoose from "mongoose";

// An interface describing properties required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface describing the properties a User Model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

User.build({
    email: 'asasdfas@df.com',
    password: 'adfadsf'
});

export { User };