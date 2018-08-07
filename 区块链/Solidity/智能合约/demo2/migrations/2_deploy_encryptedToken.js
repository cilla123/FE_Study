var EncryptedToken = artifacts.require("./EncryptedToken");

module.exports = function (deployer) {
  deployer.deploy(EncryptedToken);
};
