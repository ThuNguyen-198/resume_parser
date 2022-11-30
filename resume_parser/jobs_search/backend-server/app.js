const express = require('express');

const app = express();
const https = require("https");
const Joba = require('./models/job')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://ThuNguyen:teamwork@cluster0.ajvxtpp.mongodb.net/resume-parser?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(() => {
        console.log("Connection to MongoDB failed!")
    })

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ThuNguyen:<password>@cluster0.ajvxtpp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/jobs", (req, res, next) => {
    const jobb = new Joba({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobID: req.body.jobID,
        jobDescription: req.body.jobDescription,
        match: req.body.match
    });
    jobb.save();
    res.status(201).json({
        message: "job added!"
    });
})

app.get("/jobs", (req, res, next) => {
    Joba.find().then(document => {
        res.status(200).json({
            message: 'Account fetched successfully!',
            jobs: document
        })
    })
})


const url = "https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=499c8d15&app_key=0080b0c18013a490f54403717febca02&results_per_page=10&content-type=application/json"
https.get(url, function (response) {
    response.on("data", function (data) {
        const jobsData = JSON.parse(data);
        const jobsJson = jobsData.results;
        app.use("/", (req, res, next) => {
            res.status(200).json({
                message: 'success',
                posts: jobsJson
            });
        });
    });
});

module.exports = app;