const Car = require("../models/Car");

exports.createCar = async (req, res) => {
    try {
        // retrieve logged in user from req attached by userAuth
        const loggedInUser = req.user;

        const { title, description, carType, company, dealer } = req.body;
        //good to validate the incoming data, not doing cause of time constraint

        const newCar = new Car({
            title,
            description,
            carType,
            company,
            dealer,
            userId: loggedInUser._id
        });
        
        await newCar.save();
        
        res.status(201).json({
            message: "Car created successfully",
            carId: newCar._id
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

exports.getUserCars = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const cars = await Car.find({ userId: loggedInUser._id });
        
        res.json({
            success: true,
            cars
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

// Get single car detail
exports.getCarDetail = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const car = await Car.findById(req.params.id);
        
        if (!car) {
            return res.json({
                message: "Car not found"
            });
        }

        // Check if car belongs to logged in user
        if (car.userId.toString() !== loggedInUser._id.toString()) {
            return res.json({
                message: "Not authorized to view this car"
            });
        }

        res.json({
            success: true,
            car
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

// Update car
exports.updateCar = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const carId = req.params.id;
        
        let car = await Car.findById(carId);
        
        if (!car) {
            return res.json({
                message: "Car not found"
            });
        }

        // Check if car belongs to logged in user
        if (car.userId.toString() !== loggedInUser._id.toString()) {
            return res.json({
                message: "Not authorized to update this car"
            });
        }

        car = await Car.findByIdAndUpdate(
            carId, 
            req.body,
            { new: true }
        );

        res.json({
            message: "Car updated successfully",
            car
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

// Delete car
exports.deleteCar = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const car = await Car.findById(req.params.id);
        
        if (!car) {
            return res.json({
                message: "Car not found"
            });
        }

        // Check if car belongs to logged in user
        if (car.userId.toString() !== loggedInUser._id.toString()) {
            return res.json({
                message: "Not authorized to delete this car"
            });
        }

        await car.deleteOne();

        res.json({
            message: "Car deleted successfully"
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

// Search cars
exports.searchCars = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { keyword } = req.query;  

        const searchQuery = {
            userId: loggedInUser._id,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },  // 'i' makes it case insensitive
                { description: { $regex: keyword, $options: 'i' } },
                { carType: { $regex: keyword, $options: 'i' } },
                { company: { $regex: keyword, $options: 'i' } },
                { dealer: { $regex: keyword, $options: 'i' } }
            ]
        };

        const cars = await Car.find(searchQuery);

        res.json({
            success: true,
            count: cars.length,
            cars
        });
    } catch (err) {
        res.json({
            message: "Error: " + err.message
        });
    }
};

