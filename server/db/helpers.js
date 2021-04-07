const { db } = require('../db');

//USER CAN CREATE AND SAVE BIKE ROUTES
//post to ROUTES DB: route_name, st_location, end_locaiton, rating
const postRoutes = ({ routeName, start, end, rating }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO routes(route_Name, st_location, end_location, rating) \
    VALUES (?, ?, ?, ?)',
    [routeName, start, end, rating],
    (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};


//call to API search key, store in LANDMARKS DB: address_id, phone, services, bus_hours
const postLandmarks = ({ kind, deets, userId, lat, lng, media }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO poi(kind, deets, userId, lat, lng, media) \
    VALUES (?, ?, ?, ?)',
    [kind, deets, userId, lat, lng, media],
    (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
  
//PHOTO BANK TO DOCUMENT ROADS
//store image to LOCATIONS DB and pin location on map: coordinates, time_id, date_id, media
const photoBank = ({ userId, lat, lng, media }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO poi(userId, lat, lng, media) \
    VALUES (?, ?, ?, ?)',
    [userId, lat, lng, media],
    (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
  
  
//CREATE, FIND, AND CATEGORIZE BIKING EVENTS
//will need API to pin location of event, EVENTS DB: id, date_id, time_id, location_id
const bikeEvents = ({ eventsName, date, time, location }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO events (eventsName, date_id, time_id, location_id) VALUES (?, ?, ?, ?)', [eventsName, date, time, location], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
  
  
//ATTENDANCE TO BIKE EVENTS
//call to store in USER TABLE
//INSERT user_Id from USERS and events_id from the EVENTS table
const rsvp = ({ userId, eventId }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO rsvps (userId, eventId) VALUES (?, ?)', [userId, eventId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
  
module.exports = {
  postLandmarks,
  postRoutes,
  photoBank,
  rsvp,
  bikeEvents
};
