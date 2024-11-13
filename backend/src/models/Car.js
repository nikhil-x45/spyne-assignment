const mongoose= require("mongoose");

const carSchema= mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Car title is required'],
        trim: true,
        maxLength: [100, 'Car title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Car description is required'],
        trim: true,
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    carType: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    dealer: {
        type: String,
        required: true,
        trim: true
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps:true});

const Car= mongoose.model('Car',carSchema);

module.exports=Car;