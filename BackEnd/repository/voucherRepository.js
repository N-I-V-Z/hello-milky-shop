const voucherDAO = require("../dao/voucherDAO");

const voucherRepository = {
    getAllVouchers: async () => {
        return await voucherDAO.findAllVouchers();
    },
    deleteVoucher: async (VoucherID) => {
        return await voucherDAO.deleteVoucher(VoucherID);
    },
    addVoucher: async (voucher) => {
        return await voucherDAO.addVoucher(voucher);
    },
    updateVoucher: async (voucherID, voucherObject) => {
        return await voucherDAO.updateVoucher(voucherID, voucherObject);
    },
    getVoucherForUser: async (userID, voucherID) => {
        return await voucherDAO.getVoucherForUser(userID, voucherID);
    },
    saveVoucherForUser: async (userID, voucherID) => {
        return await voucherDAO.saveVoucherForUser(userID, voucherID);
    },
    removeVoucherFromUser: async (userID, voucherID) => {
        return await voucherDAO.removeVoucherFromUser(userID, voucherID);
    },
    getVouchersByUserID: async (userID) => {
        return await voucherDAO.getVouchersByUserID(userID);
    },
    getVouchersforUser: async (UserID) => {
        return await voucherDAO.getVouchersforUser(UserID);
    },
    updateVoucherStatusAndRemoveFromUser: (oldStatus, newStatus) => {
        return voucherDAO.updateVoucherStatusAndRemoveFromUser(oldStatus, newStatus);
    },

    openVoucher: async (VoucherID) => {
        return await voucherDAO.openVoucher(VoucherID);
    },



}

module.exports = voucherRepository;