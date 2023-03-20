import express from 'express';
//import path from 'path';
//import fs from 'fs';
import Data from '../values/values.js';

// constants
//const DB_PATH = path.resolve("db.json");
const router = express.Router();

router.get("/greet", async (req, res, next) => {
    res.send("Hello KASEE!!")
});

router.post("/", async (req, res, next) => {
    const { temperature, humidity } = req.body; // deconstruct body

    const data = new Data({
        temperature,
        humidity,
        timestamp: new Date(),
    });

    try {
        await data.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(200).json({message: 'Data posted successfully!'});
});

router.get("/", async (req, res, next) => {
    let LastValue;
    let lastValue;

    try{
        LastValue = await Data.find().sort({$natural:-1}).limit(1);
        lastValue = LastValue[0];
       // const humidity = lastValue.humidity;
    }catch(err){
        return console.log(err);
    }

    if(!LastValue){
        return res.status(404).json({message: "Couldn't access the last values posted!"});
    }
    return res.status(200).json({lastValue});
});

export default router;



/*
let dbFilePath = path.resolve('./db.json');
// If the db.json file doesn't exist, create it
if (!fs.existsSync(dbFilePath)) {
    let db = {
        data: []
    };

    fs.writeFileSync(dbFilePath, JSON.stringify(db));
}

router.post("/", async (req, res, next) => {
    let db = JSON.parse(fs.readFileSync(dbFilePath));
    let body = req.body;
    let temperature = body.temperature;
    let humidity = body.humidity;
    let timestamp = new Date();

    db.data.push({
        temperature: temperature,
        humidity: humidity
    });

    fs.writeFileSync(dbFilePath, JSON.stringify(db));

    res.status(200).send('Data posted successfully!');
});

router.get("/", async (req, res, next) => {
    let db = JSON.parse(fs.readFileSync(dbFilePath));
    let lastValue = db.data[db.data.length - 1];

    res.status(200).send(lastValue);
});
*/

