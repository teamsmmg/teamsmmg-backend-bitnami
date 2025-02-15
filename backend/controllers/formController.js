const Form = require("../models/formModel");

exports.submitForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newForm = new Form({ name, email, subject, message });
        await newForm.save();
        
        res.status(201).json({ message: "Form submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
