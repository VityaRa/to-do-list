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

app.post("/api/login", jsonParser, async (req, res) => {

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

//get all lists
app.get("/api/list", jsonParser, async (req, res) => {
    const collection = req.app.locals.collection.collection("lists");
    try {
        const items = await collection.find({}).toArray();
        res.send(items);
    }
    catch (err) { return console.log(err); }
});

//get list by id
app.get("/api/list/:id", jsonParser, async (req, res) => {
    const collection = req.app.locals.collection.collection("lists");
    const id = new objectId(req.params.id);

    try {
        const items = await collection.find({ _id: id }).toArray();
        res.send(items);
    }
    catch (err) { return console.log(err); }
});

//create new list instance
app.post("/api/list", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const { title } = req.body
    if (!title) res.sendStatus(400);



    const newList = { title, items: [] }
    const collection = req.app.locals.collection.collection("lists");

    try {
        await collection.insertOne(newList);
        res.send(newList);
    }

    catch (err) { return console.log(err); }
});

//remove list by id
app.delete("/api/list/:id", jsonParser, async (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection.collection("lists");
    try {
        const result = await collection.findOneAndDelete({ _id: id });
        const item = result.value;
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

//add task in specific list
app.put("/api/list/", jsonParser, async (req, res) => {
    const collection = req.app.locals.collection.collection("lists");
    const { description } = req.body

    if (!description) res.send(400)
    const id = new objectId(req.body.id);

    const newItem = {
        description, isDone: false, _id: new objectId()
    }

    try {
        const result = await collection.findOneAndUpdate({ _id: id }, { $push: { items: newItem } },
            { returnDocument: "after" });
        res.send(newItem);
    }
    catch (err) { return console.log(err); }
});

//remove item from list
app.put("/api/list/:id/:itemId", jsonParser, async (req, res) => {
    const id = new objectId(req.params.id);
    const itemId = new objectId(req.params.itemId);

    const collection = req.app.locals.collection.collection("lists");
    try {
        const result = await collection.findOneAndUpdate({ _id: id }, { $pull: { items: { _id: itemId } } }, { returnDocument: "after" });
        const item = result.value;
        res.send({ success: true });
    }
    catch (err) { return { success: false }; }
});

//update description
app.put("/api/list/desc", jsonParser, async (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const id = new objectId(req.body.id);
    const itemId = new objectId(req.body.itemId);

    const { description } = req.body
    if (!description || !id || !itemId) res.sendStatus(400);

    const collection = req.app.locals.collection.collection("lists");
    try {
        const result = await collection.findOneAndUpdate({ _id: id, "items._id": itemId }, { $set: { "items.$.description": description } }, { returnDocument: "after" });
        const list = result.value;
        res.send(list.items.find(elem => elem._id.equals(itemId)))
    }
    catch (err) { return console.log(err); }
});

//update status
app.put("/api/list/status", jsonParser, async (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const id = new objectId(req.body.id);
    const itemId = new objectId(req.body.itemId);

    const { isDone } = req.body
    if (!id || !itemId) res.sendStatus(400);

    const collection = req.app.locals.collection.collection("lists");
    try {
        const result = await collection.findOneAndUpdate({ _id: id, "items._id": itemId }, { $set: { "items.$.isDone": isDone } }, { returnDocument: "after" });
        const list = result.value;
        res.send(list.items.find(elem => elem._id.equals(itemId)))
    }
    catch (err) { return console.log(err); }
});

//START NEW VERSION (CURRENTLY ACTIVE)

//get all tasks
// app.get("/api/items", jsonParser, async (req, res) => {
//     const collection = req.app.locals.collection.collection("items");
//     try {
//         const items = await collection.find({}).toArray();
//         res.send(items);
//     }
//     catch (err) { return console.log(err); }
// });

// app.get("/api/users/:id", async (req, res) => {

//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection.collection("items");
//     try {
//         const user = await collection.findOne({ _id: id });
//         res.send(user);
//     }
//     catch (err) { return console.log(err); }
// });

// app.post("/api/item", jsonParser, async (req, res) => {

//     if (!req.body) return res.sendStatus(400);

//     const { description } = req.body
//     if (!description) res.sendStatus(400);

//     const item = { description, isDone: false };

//     const collection = req.app.locals.collection.collection("items");

//     try {
//         await collection.insertOne(item);
//         res.send(item);
//     }
//     catch (err) { return console.log(err); }
// });

// app.delete("/api/item/:id", async (req, res) => {
//     const id = new objectId(req.params.id);
//     const collection = req.app.locals.collection.collection("items");
//     try {
//         const result = await collection.findOneAndDelete({ _id: id });
//         const item = result.value;
//         res.send(item);
//     }
//     catch (err) { return console.log(err); }
// });

// app.put("/api/item/desc", jsonParser, async (req, res) => {

//     if (!req.body) return res.sendStatus(400);
//     const id = new objectId(req.body.id);

//     const { description } = req.body
//     if (!description) res.sendStatus(400);

//     const collection = req.app.locals.collection.collection("items");
//     try {
//         const result = await collection.findOneAndUpdate({ _id: id }, { $set: { description } },
//             { returnDocument: "after" });
//         const item = result.value;
//         res.send(item);
//     }
//     catch (err) { return console.log(err); }
// });

// app.put("/api/item/status", jsonParser, async (req, res) => {

//     if (!req.body) return res.sendStatus(400);
//     const id = new objectId(req.body.id);

//     const { isDone } = req.body
//     const collection = req.app.locals.collection.collection("items");
//     try {
//         const result = await collection.findOneAndUpdate({ _id: id }, { $set: { isDone } },
//             { returnDocument: "after" });
//         const item = result.value;
//         res.send(item);
//     }
//     catch (err) { return console.log(err); }
// });

//END OLD VERSION

process.on("SIGINT", async () => {
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});