const mongoose = require('mongoose');
const Issue = require('../models/issue');

let issues = [
    {   
        "name": "Wash clothes", 
        "completed": false, 
        "details": "sport clothes", 
        "priority": 2, 
        "time_start": "11:00", 
        "time_end": "13:00"
    }, 
    {  
        "name": "TNPW project", 
        "completed": true, 
        "details": "do it girl", 
        "priority": 1, 
        "time_start": "13:00", 
        "time_end": "15:30"
    }, 
    {   
        "name": "Rock it", 
        "completed": false, 
        "details": "yeah", 
        "priority": 1, 
        "time_start": "21:00", 
        "time_end": "21:30"
    }, 
]

mongoose
  .connect('mongodb://127.0.0.1:27017/issues')
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Issue.insertMany(issues);
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log('Writing to DB successful, DB disconnected');
  })
  .catch((error) => {
    console.log('Error while writing to DB');
  });
