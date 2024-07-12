var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://babinigor:Thunder.5@customers.y6q8urz.mongodb.net/?retryWrites=true&w=majority&appName=Customers";

var DATABASENAME = "todoappdb";
var database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (err, client) => {
    database = client.db(DATABASENAME);
    console.log("Connected to database");
  });
});

app.get("/api/todoapp/GetNotes", (request, response) => {
  database
    .collection("todoappcollection")
    .find({})
    .toArray((err, result) => {
      response.send(result);
    });
});

app.post("/api/todoapp/AddNotes", multer().none(), (request, response) => {
  database.collection("todoappcollection").count({}, function (err, numOfDocs) {
    database.collection("todoappcollection").insertOne({
      id: (numOfDocs + 1).toString(),
      description: request.body.newNotes,
    });
    response.json("success");
  });
});

app.delete("/api/todoapp/DeleteNotes", (request, response) => {
  database.collection("todoappcollection").deleteOne({
    id: request.query.id,
  });
  response.json("deleted");
});
