const express = require("express");
const router = express.Router();
const {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
} = require("../controllers/discountController");

const { protect, authorize } = require("../Auth/middlewear")

router.post("/",protect, createDiscount);
router.get("/",protect, getAllDiscounts);
router.get("/:id",protect, getDiscountById);
router.put("/:id",protect, updateDiscount);
router.delete("/:id", protect,deleteDiscount);

module.exports = router;