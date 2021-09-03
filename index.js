const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const auth = require("./middleware/auth");

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb+srv://Vityarka:2301some36rand41@cluster0.nlskh.mongodb.net/test-mongo?retryWrites=true&w=majority");

app.use(express.static(__dirname + "/public"));
app.use(cors());

const port = process.env.PORT || 3001;

(async () => {
    try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("listdb");
        app.listen(port, () => {
            console.log("Сервер ожидает подключения...");
        })

    } catch (err) {
        return console.log(err);
    }
})();


app.get("/api/items", async (req, res) => {
    const collection = req.app.locals.collection.collection("items");
    try {
        const items = await collection.find({}).toArray();
        res.send(items);
    }
    catch (err) { return console.log(err); }

});

app.get("/api/users/:id", async (req, res) => {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection.collection("items");
    try {
        const user = await collection.findOne({ _id: id });
        res.send(user);
    }
    catch (err) { return console.log(err); }
});

app.post("/api/item", jsonParser, async (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const { description } = req.body
    if (!description) res.sendStatus(400);

    const item = { description, isDone: false };

    const collection = req.app.locals.collection.collection("items");

    try {
        await collection.insertOne(item);
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

app.delete("/api/item/:id", async (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection.collection("items");
    try {
        const result = await collection.findOneAndDelete({ _id: id });
        const item = result.value;
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

app.put("/api/item/desc", jsonParser, async (req, res) => {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);

    const { description } = req.body
    if (!description) res.sendStatus(400);

    const collection = req.app.locals.collection.collection("items");
    try {
        const result = await collection.findOneAndUpdate({ _id: id }, { $set: { description } },
            { returnDocument: "after" });
        const item = result.value;
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

app.put("/api/item/status", jsonParser, async (req, res) => {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);

    const { isDone } = req.body
    const collection = req.app.locals.collection.collection("items");
    try {
        const result = await collection.findOneAndUpdate({ _id: id }, { $set: { isDone } },
            { returnDocument: "after" });
        const item = result.value;
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

app.post("/api/register", jsonParser, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const collection = req.app.locals.collection.collection("users");

        const oldUser = await collection.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await collection.insertOne({
            email: email.toLowerCase(),
            password: encryptedPassword,
        })

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const collection = req.app.locals.collection.collection("users");

        const user = await collection.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});



process.on("SIGINT", async () => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});