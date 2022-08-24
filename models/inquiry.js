const { Schema, model, default: mongoose } = require("mongoose");

const InquirySchema = Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Patients'
        },
        doctor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor'
        },
        dateInquiry: {
            type: String,
            required: [true, "Date - Is required"]
        },
        created: {
            date: Date.now()
        },
    },
    {
        timesTamps: true,
        versionKey: false,
    }
);

module.exports = model("Inquiry", InquirySchema);