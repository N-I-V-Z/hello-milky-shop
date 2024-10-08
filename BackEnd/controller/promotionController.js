const promotionService = require('../service/promotionService');


const getPromotionByDate = async (req, res) => {
    promotionService.getPromotionByDate()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}

const getAllPromotions = async (req, res) => {
    promotionService.getAllPromotions()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}

const addPromotion = async (req, res) => {
    promotionService.addPromotion(req.body)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}


const updatePromotion = async (req, res) => {
    const promotionID = req.params.id;
    const promotionData = req.body;
    try {
        await promotionService.updatePromotion(promotionID, promotionData);
        res.status(200).json({ message: 'Promotion have been updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductsApplyAnPromotion = async (req, res) => {
    try {
        const promotionID = req.params.promotionID;
        const result = await promotionService.getProductsApplyAnPromotion(promotionID);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const applyPromotionToProduct = async (req, res) => {
    try {
        const { productIDs, promotionID } = req.body;
        const result = await promotionService.applyPromotionToProducts(productIDs, promotionID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getCurrentProductsHavingPromotion = async (req, res) => {
    promotionService.getCurrentProductsHavingPromotion()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message }));
}

const deletePromotion = async (req, res) => {
    promotionService.deletePromotion(req.params.promotion_id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ message: err.message }));
};

const openPromotion = async (req, res) => {
    promotionService.openPromotion(req.params.promotion_id)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ message: err.message })
        );
}


module.exports = {
    getAllPromotions,
    addPromotion,
    updatePromotion,
    getPromotionByDate,
    getProductsApplyAnPromotion,
    applyPromotionToProduct,
    getCurrentProductsHavingPromotion,
    deletePromotion,
    openPromotion
};