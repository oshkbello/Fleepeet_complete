
module.exports = (mongoose)=>{
const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
    createrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    targetId: {
        type: String,
        required: true
    },
    message:{
        type:String,
    },
    type: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null
    }
});
return mongoose.model("Activity", ActivitySchema);
}

