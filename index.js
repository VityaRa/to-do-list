const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
const cors = require('cors')

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb+srv://Vityarka:2301some36rand41@cluster0.nlskh.mongodb.net/test-mongo?retryWrites=true&w=majority");

app.use(express.static(__dirname + "/public"));
app.use(cors());

const port = process.env.PORT || 5000
(async () => {
    try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("listdb").collection("items");
        await app.listen(port, '0.0.0.0');
        console.log("Сервер ожидает подключения...");
    } catch (err) {
        return console.log(err);
    }
})();


app.get("/api/items", async (req, res) => {

    const collection = req.app.locals.collection;
    try {
        const items = await collection.find({}).toArray();
        res.send(items);
    }
    catch (err) { return console.log(err); }

});

app.get("/api/users/:id", async (req, res) => {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
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

    const collection = req.app.locals.collection;

    try {
        await collection.insertOne(item);
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

app.delete("/api/item/:id", async (req, res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
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

    const collection = req.app.locals.collection;
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
    if (!isDone) res.sendStatus(400);

    const collection = req.app.locals.collection;
    try {
        const result = await collection.findOneAndUpdate({ _id: id }, { $set: { isDone } },
            { returnDocument: "after" });
        const item = result.value;
        res.send(item);
    }
    catch (err) { return console.log(err); }
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {

    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});