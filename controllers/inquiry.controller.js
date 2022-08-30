const { response, request } = require("express");
const Inquiry = require("../models/inquiry");

const getInquiry = async (req = request, res = response) => {
    const inquiry = await Inquiry.aggregate([
        {
            $lookup: {
                from: "inquiries", // Revise
                localField: "_id", // Campo local en Patient
                foreignField: "_id", // Condición
                as: "inquiry", // Alias
            },
        },
    ]);

    if(!inquiry) {
        res.status(400).json({
            msg: "No existe la cita.",
        });
    }
    res.json({ userDoctor });
}

const postInquiry = async (req = request, res = response) => {
    const body = req.body;
    const inquiry = new Inquiry(body);

    try {
        await inquiry.save();

        res.status(201).json({
            msg: "Create Inquiry - Success",
            inquiry,
        });
    } catch (error) {
        console.log("Error - No fue posible generar la cita", error);
    }

};

const deleteInquiry = async (req = request, res = response) => {
    const { id } = req.params;
    const inquiryDelete = await Inquiry.findByIdAndUpdate(id, { state: false });

    try {
        res.status(200).json({
            msg: "Success Delete",
            inquiryDelete,
        });
    } catch (error) {
        console.log("Error - No fue posible eliminar la cita.");
    }

};

const getAllInquiries = async (req = request, res = response) => {
    const inquiryData = await Inquiry.find({ state: true });
    res.json({ inquiryData });
}

module.exports = {
    getInquiry,
    postInquiry,
    deleteInquiry,
    getAllInquiries
}