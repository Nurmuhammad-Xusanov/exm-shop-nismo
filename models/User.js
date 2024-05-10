import {Schema, model} from "mongoose"

const UserSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})

const User = model("User", UserSchema)
export default User