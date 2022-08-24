const { Router } = require("express");
const { check } = require("express-validator");
const {
    postInquiry,
    deleteInquiry,
    getAllInquiries
} = require("../controllers/inquiry.controller");
const validarCampos = require("../middlewares/validator");

const router = Router();

router.get("/", getAllInquiries);

router.post(
    "/",
    [
        check("patient", 'Patient is required').not().isEmpty(),
        check("doctor", 'Doctor is required').not().isEmpty(),
        check("dateInquiry", 'Date is required').not().isDate(),
        check("created", 'Creation date is required').not().isDate(),
    ],
    postInquiry
);

router.delete("/:id", deleteInquiry);

module.exports = router;