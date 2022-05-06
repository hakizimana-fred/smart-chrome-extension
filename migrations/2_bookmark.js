const BookMark = artifacts.require("BookMark");

module.exports = function(deployer) {
  deployer.deploy(BookMark);
};
