import Medicines from "../models/medicines.js";

export const getAllMedicines = async (req, res) => {
  try {
    let regex = new RegExp(req.query.name, "i");
    let filter = {
      $or: [
        { name: regex },
        { desc: regex },
        // { $text: { $search: req.params.name } },
      ],
    };
    const skip = req.query.skip || 0;
    const medicines = await Medicines.find(filter)
      .limit(20)
      .skip(skip)
      .populate({
        path: "pharmacist",
      })
      .populate("pharmacist");
    if (!medicines.length)
      return res
        .status(404)
        .json({ success: false, message: "No medicines found" });
    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicines.create({
      ...req.body,
      pharmacist: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicines.findById(req.params.id);
    if (medicine?.pharmacist.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });
    const newMedicine = await medicine.updateOne(
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: newMedicine });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicines.findById(req.params.id);
    if (medicine?.pharmacist.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });

    await medicine.deleteOne();
    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicines.findById(req.params.id);
    if (!medicine)
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/*
export const getMedicinesByName = async (req, res) => {
  try {
    let regex = new RegExp(req.params.name, "i");
    let filter = {
      $or: [
        { name: regex },
        { desc: regex },
        // { $text: { $search: req.params.name } },
      ],
    };

    
    const medicines = await Medicines.find(filter).limit(5);
    if (!medicines.length)
      return res
        .status(404)
        .json({ success: false, message: "No medicines found" });
    res.status(200).json({ success: true, data: medicines });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

*/
