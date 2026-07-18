const contactService = require("../Services/ContactService");

const add = async (req, res) => {
    try {

        const {
            fullname,
            email,
            phone_number,
            message
        } = req.body;

        const result = await contactService.createContact(
    
    fullname,
            email,
            phone_number,
            message
);

        res.json(result);

    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};



const getAllContacts = async (req, res) => {
    try {

        const result = await contactService.readallContacts();

        res.json(result);

    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};

const getContactById = async (req, res) => {
    try {

        const result = await contactService.getId(req.params.id);

        res.json(result);

    } catch (err) {

        res.status(404).json({ error: "Contact not found" });
    }
};

const deleteContact = async (req, res) => {
    try {

        const result = await contactService.deleteContact(req.params.id);

        res.json(result);

    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    add,
    getAllContacts,
    getContactById,
    deleteContact,
};