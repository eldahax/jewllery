const workService = require("../Services/WorkScheduleService");

const createWork = async (req, res) => {
    try {
        const cr = await workService.create(req.body, req.user);
        res.json(cr);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllWork = async (req, res) => {
    try {
        const al = await workService.getAll(req.user);
        res.json(al);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const id = await workService.getWorkScheduleById(req.params.id, req.user);
        res.json(id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const up = await workService.updateWorkSchedule(req.params.id, req.body, req.user);
        res.json(up);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteW = async (req, res) => {
    try {
        const id = await workService.deleteWorkSchedule(req.params.id, req.user);
        res.json(id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createWork,
    getAllWork,
    getById,
    update,
    deleteW
};