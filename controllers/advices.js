import Advice from "../models/advices.js";

export const getAllAdvices = async (req, res) => {
  try {
    const skip = req.query.skip || 0;
    const advices = await Advice.find({}).skip(skip).limit(20).populate({
      path: "pharmacist",
    });

    if (!advices.length)
      return res
        .status(404)
        .json({ success: false, message: "No advices found" });
    res.status(200).json({ success: true, data: advices });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createAdvice = async (req, res) => {
  try {
    const advice = await Advice.create({
      ...req.body,
      pharmacist: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: advice,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateAdvice = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id);
    if (advice?.pharmacist.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });
    const newAdvice = await advice.updateOne(
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: newAdvice });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id);
    if (advice?.pharmacist.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized" });

    await advice.deleteOne();
    res.status(200).json({ success: true, data: advice });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAdviceById = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id);
    if (!advice)
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });
    res.status(200).json({ success: true, data: advice });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
