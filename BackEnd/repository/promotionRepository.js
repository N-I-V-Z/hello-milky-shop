const promotionDAO = require("../dao/promotionDAO");

const promotionRepository = {
    getPromotionByDate: async () => {
        return await promotionDAO.getPromotionByDate();
    },

    getAllPromotions: async () => {
        return await promotionDAO.getAllPromotions();
    },
    addPromotion: async (promotionObject) => {
        return await promotionDAO.addPromotion(promotionObject);
    },

    updatePromotion: async (promotionID, promotionObject) => {
        return await promotionDAO.updatePromotion(promotionID, promotionObject);
    },

    getProductsApplyAnPromotion: async (promotionID) => {
        return await promotionDAO.getProductsApplyAnPromotion(promotionID);
    },
    deleteProductPromotionsByPromotionID: async (promotionID) => {
        return await promotionDAO.deleteProductPromotionsByPromotionID(promotionID);
    },
    insertProductPromotions: async (productIDs, promotionID) => {
        return await promotionDAO.insertProductPromotions(productIDs, promotionID);
    },
    updateProductPriceAfterDiscount: async (productID, promotionID) => {
        return await promotionDAO.updateProductPriceAfterDiscount(productID, promotionID);
    },
    getCurrentProductsHavingPromotion: async () => {
        return await promotionDAO.getCurrentProductsHavingPromotion();
    },

    deletePromotion: async (promotion_id) => {
        return await promotionDAO.deletePromotion(promotion_id);
    },
    openPromotion: async (promotion_id) => {
        return await promotionDAO.openPromotion(promotion_id);
    },
    updatePromotionStatusAuto: (oldStatus, newStatus) => {
        return promotionDAO.updatePromotionStatusAuto(oldStatus, newStatus);
    },

};

module.exports = promotionRepository;