const { Schema, model, default: mongoose } = require("mongoose");

const InquirySchema = Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    doctor: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Doctor"
    }],
    dateInquiry: {
      type: String,
      required: [true, "Date - Is required"]
    },
    created: {
      type: Date,
      date: Date.now()
    },
  },
  {
    timesTamps: true,
    versionKey: false,
  }
);

/* Prueba peticion

{
  "patient":[
    {
      "_id": "62ef26aa74c22867c3dcfe93",
      "dni": "1065008647",
      "name": "Sandra",
      "email": "sandra@gmail.com",
      "phoneNumber": "6056359874",
      "address": "Barrio el Cerrito",
      "city": "Valledupar",
      "country": "Colombia"
    }],
      "doctor":[
    {
      "_id": "62f45aa0110571e400bb7d67",
      "dni": "1081785",
      "doctorName": "José Sanchez",
      "doctorEmail": "josesanchez@gmail.com",
      "doctorAddress": "Cra 68 # 12-107",
      "doctorCity": "Barranquilla",
      "doctorCountry": "Colombia",
      "doctorPhone": "6042569874"
    }],
  "dateInquiry":"02/10/2022 12:30am"
}*/

module.exports = model("Inquiry", InquirySchema);