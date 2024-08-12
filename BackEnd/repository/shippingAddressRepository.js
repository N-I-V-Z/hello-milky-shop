const shippingAddressDAO = require("../dao/shippingAddressDAO");

const shippingAddressRepository = {
  getInfoShippingByUserID: async (ID) => {
    return await shippingAddressDAO.findInfoShippingByUserID(ID);
  },

  getInfoShippingByOrderID: (orderID) => {
    return shippingAddressDAO.findInfoShippingByOrderID(orderID);
  },
  updateDeleted: async (shippingAddress_id) => {
    return await shippingAddressDAO.updateIsDeleted(shippingAddress_id);
  },

  getInfoAddressWithOrderNearest: async (UserID) => {
    return await shippingAddressDAO.findInfoAddressWithOrderNearest(UserID);
  },
  updateShippingAddress: async (id, shippingAddress)=>{
    return await shippingAddressDAO.editShippingAddress(id, shippingAddress);
  }
}

module.exports = shippingAddressRepository;