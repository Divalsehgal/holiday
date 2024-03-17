import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export type UserType = {
    email: string
    password: string;
    _id: string;
    lastName: string;
    firstName: string;
}

//creating user schema

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

//for encrypting user password

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
    //now it will resume saving the password

})



//mongoose will create model instance
const User = mongoose.model('User', userSchema);

export default User; 
