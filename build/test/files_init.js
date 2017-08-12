const mkdirp = require('mkdirp');
    
const userId = "6c84fb90-12c4-11e1-840d-7b25c5ee775a";
const addressId = "6c84fb90-12c4-11e1-840d-7b25c5ee775a";
const fileName = "house_pic1.png";
const path = `${__dirname}/../../dist/server/img/${userId}/addresses`;

function initAddressPic1() {
    mkdirp.sync(path);
}

module.exports = function() {
    initAddressPic1();
}