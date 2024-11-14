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
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    imagesCount: {
        type: Number,
        default: 0
    }
},{timestamps:true});

carSchema.pre('save', function(next) {
    if (this.images.length > 10) {
        next(new Error('Cannot add more than 10 images per car'));
    }
    this.imagesCount = this.images.length;
    next();
});

const Car= mongoose.model('Car',carSchema);

module.exports=Car;