"use strict"

const router = require('express').Router()
const { vaccin } = require('../../db')

router

    /**
     * @descr Create new vaccin
     * @route POST /vaccin
     * @access public
     */

    .post("/", async (req, res) => {

        vaccin.create({ data: {...req.body, qte : parseInt(req.body.qte) } })
            .then(data => { res.status(201).json(data) })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr get all vaccin
    * @route GET /vaccin
    * @access public
    */

    .get("/", async (req, res) => {

        vaccin.findMany({ where: req.query, orderBy: { id_: 'asc' } })
            .then(data => { res.json(data) })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr Show specify vaccin identified by id
    * @route GET /vaccin/id
    * @access public
    */

    .get("/:id", async (req, res) => {

        vaccin.findUnique({ where: { id_: parseInt(req.params.id) } })
            .then(data => {
                if (data !== null) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ error: 'NotFound', message: "Record not found" })
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'InternalError', message: "Something wrong" })
            })

    })

    /**
    * @descr Modify specify vaccin identified by id
    * @route PUT /vaccin/id
    * @access public
    */

    .put("/:id", async (req, res) => {

        vaccin.update({ where: { id_: parseInt(req.params.id) }, data: req.body })
            .then(() => {
                res.status(201).json({ message: "vaccin updated succefully" })
            })
            .catch(error => {

                console.error(error);
                if (error?.code === "P2025") {
                    res.status(404).json({ error: 'NotFound', message: error.meta?.cause })
                } else {
                    res.status(500).json({ error: 'InternalError', message: "Something wrong" })
                }

            })

    })

    /**
    * @descr Delete specify vaccin identified by id
    * @route DELETE /vaccin/id
    * @access public
    */

    .delete("/:id", async (req, res) => {

        vaccin.delete({ where: { id_: parseInt(req.params.id) } })
            .then(() => {
                res.status(201).json({ message: "vaccin deleted succefully" })
            })
            .catch(error => {
                console.error(error);
                if (error?.code === "P2025") {
                    res.status(404).json({ error: error.name, message: error.meta?.cause })
                } else {
                    res.status(500).json({ error: 'InternalError', message: "Something wrong" })
                }
            })

    })

module.exports = router
