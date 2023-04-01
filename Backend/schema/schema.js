const mongoose = require('mongoose');

// sample data for node
/*
"id": "node1",
        "name": "Main Entrance",
        "location": {
          "type": "Point",
          "coordinates": [-122.4189, 37.7752]
        }
 */

export const nodeSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});


// sample data for edge
/*
"id": "edge1",
        "name": "Main Entrance to Main Hall",
        "start": "node1",
        "end": "node2",
        "weight": 10
    */
export const edgeSchema = new mongoose.Schema({
    id: String,
    name: String,
    start: String,
    end: String,
    weight: Number
});

// sample data for path
/*
"id": "path1",
        "name": "Main Entrance to Main Hall",
        "start": "node1",
        "end": "node2",
        "weight": 10,
        "path": [
            "node1",
            "node2"
        ]
    }
    */
export const pathSchema = new mongoose.Schema({
    id: String,
    name: String,
    start: String,
    end: String,
    weight: Number,
    path: [String]
});

// sample data for waypoint

/*
{
        "id": "waypoint2",
        "name": "Stairway to Third Floor",
        "location": {
          "type": "Point",
          "coordinates": [-122.4187, 37.7753]
        }
      }
 */
export const waypointSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],    
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
