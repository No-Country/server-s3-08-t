const { response, request } = require("express");
const Inquiry = require("../models/inquiry");

const postInquiry = async (req = request, res = response) => {
    const body = req.body;
    const inquiry = new Inquiry(body);

    await inquiry.save();

    res.status(201).json({
        msg: "Create Inquiry - Success",
        inquiry,
    });
};

const deleteInquiry = async (req = request, res = response) => {
    const { id } = req.params;
    const inquiryDelete = await Inquiry.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: "Success Delete",
        inquiryDelete,
    });
};

const getAllInquiries = async (req = request, res = response) => {
    const inquiryData = await Inquiry.find({ state: true });
    res.json({ inquiryData });
}

module.exports = {
    postInquiry,
    deleteInquiry,
    getAllInquiries
}