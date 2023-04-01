const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()
let db = mongoose.connection;

router.get('/',(req,res)=>{
  res.send("Hello Hello :)")
})

router.get('/near', async (req, res) => {
    try {
      // Get the coordinates from the request query string
        let { lat, lng } = req.query;
        // lat= 23.1064422997269;
        // lng =72.59575386356772;
      // Create a new location document with the given coordinates
      const insertLocation = {
        type: 'Point',
        coordinates: [Number(lng), Number(lat)],
      };
  
      // Insert the location document into the indoorNavigation collection
      // const result = await db.collection('indoorNavigation').insertOne({
      //   "type": "Point",
      //   "coordinates": [72.59575386356772, 23.1064422997269]
      // }
      // );
      const maxDistanceInMeters = 100; // maximum distance in meters
      const minDistanceInMeters = 100; // minimum distance in meters
      
      // Create a 2dsphere index on the 'coordinates' field of the indoorNavigation collection
      await db.collection('indoorNavigation').createIndex({ coordinates: '2dsphere' });
  
      // Find all locations near the given coordinates (within a radius of 500 meters)
      const nearbyLocations = await db.collection('indoorNavigation').find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [Number(lng), Number(lat)],
            },
            $maxDistance: maxDistanceInMeters,
            $minDistance: minDistanceInMeters,
          },
        },
      }).toArray();
  
      // res.json({ result, nearbyLocations });
      res.json({ nearbyLocations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  const locationSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
  
  // Create a model for your collection
  const Location = mongoose.model('Location', locationSchema);

  
// POST /api/locations - Insert a single document to the collection
router.post('/locations', async (req, res) => {
  try {
    const { type, coordinates } = req.body;
    const newLocation = new Location({ type, coordinates });
    const savedLocation = await newLocation.save();
    res.json(savedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/locations/bulk - Insert multiple documents to the collection
router.post('/locations/bulk', async (req, res) => {
  try {
    const locations = req.body.map(location => new Location(location));
    const savedLocations = await Location.insertMany(locations);
    res.json(savedLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});  
module.exports = router;