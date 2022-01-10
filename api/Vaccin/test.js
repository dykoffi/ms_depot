"use strict"

const frisby = require('frisby')

const URL = "http://localhost:8888"

describe('Vaccin routes tester', () => {

    it("/POST Create new Vaccin", () => {
        return frisby
            .post(`${URL}/Vaccin`)
            .expectNot("status", 500);
    });

    it("/GET get all Vaccin", () => {
        return frisby
            .get(`${URL}/Vaccin`)
            .expectNot("status", 500)
    });

    it("/GET/id Show specify Vaccin", () => {
        return frisby
            .get(`${URL}/Vaccin/1`)
            .expectNot("status", 500)
    });

    it("/PUT/id Modify specify Vaccin", () => {
        return frisby
            .put(`${URL}/Vaccin/1`)
            .expectNot("status", 500)
    });

    it("/DELETE/id Delete specify Vaccin", () => {
        return frisby
            .del(`${URL}/Vaccin/1`)
            .expectNot("status", 500)
    });

});