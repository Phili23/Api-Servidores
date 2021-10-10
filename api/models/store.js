import { mongoose } from "mongoose";
const storeSchema=mongoose.storeSchema({
    firsName:String,
    phone:Number,
    address:String
})

export default mongoose.model("store",storeSchema);