
'use strict';

class TuDoController {
    constructor() {
        this.ToDo = require('../../../models/ToDo.model');
        this.post = this.post.bind(this);
        this.getAll = this.getAll.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async post({ body }, res) {
        try {
            await new this.ToDo(body).save();
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const result = await this.ToDo.find().lean();
            res.json(result);
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

    async getOne({ parans: { id } }, res) {
        try {
            const result = await this.ToDo.findById(id).lean();
            res.json(result);
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

    async update({ parans: { id }, body }, res) {
        try {
            await this.ToDo.findByIdAndUpdate(id, body).lean();
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }

    async delete({ parans: { id } }, res) {
        try {
            await this.ToDo.findByIdAndDelete(id).lean();
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(400).json(error);
        }
    }
}

module.exports = new TuDoController();