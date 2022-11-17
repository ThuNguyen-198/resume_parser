const express = require('express');

const app = express();
const https = require("https");

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