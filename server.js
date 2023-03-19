import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

// constants
const DB_PATH = path.resolve("db.json");
const router = express.Router();

//const PORT = process.env.PORT || 8000;
const PORT = 6000;
// middlewares
app.use(express.json());
app.use("/api", router);

// routes
router.get("/greet", async (req, res, next) => {
    res.send("Hello KASEE!!")
});

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

    //let temperature = Math.floor(Math.random() * 100);
    //let humidity = Math.floor(Math.random() * 100);
    let body = req.body;
    let temperature = body.temperature;
    let humidity = body.humidity;

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


app.listen(PORT, () => console.log("Listening on port", PORT));