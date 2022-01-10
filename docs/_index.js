"use strict"

const generalDocs = require("./info.json")

const VaccinDocs = require('../api/Vaccin/docs.json') 

module.exports = {
    ...generalDocs,
    paths: { 
        ...VaccinDocs,
    }
}