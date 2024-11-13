const express = require("express");
const { 
    createCar,
    getUserCars,
    getCarDetail,
    updateCar,
    deleteCar,
    searchCars
} = require("../controllers/carController");
const userAuth = require("../middleware/auth");

const router = express.Router();

router.use(userAuth);

// Car routes
router.post("/cars", createCar);
router.get("/cars", getUserCars);
router.get("/cars/search", searchCars);
router.get("/cars/:id", getCarDetail);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;