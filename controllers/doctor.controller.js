const { response, request } = require("express");
const Type = require("../models/doctorTypes");

const getDoctor = async (req = request, res = response) => {
  const doctorData = await Type.aggregate([
    {
      $lookup: {
        from: "doctors", // Revise (2)
        let: {
          asNameType: "$nameType", // Obtiene nombre del type (ginecologo, internista, etc) String
        },
        pipeline: [
          // (2)
          {
            $match: {
              $expr: {
                $in: ["$$asNameType", "$type"], // $$ hace referencia a las variables dentro del let
              },
            },
          },
        ],
        as: "Doctor Types", // filtro
      },
    },
  ]);
  if (!doctorData) {
    res.status(400).json({
      msg: "No existe el usuario de este pasiente",
    });
  }
  res.json({ doctorData });
};

module.exports = {
  getDoctor,
};
