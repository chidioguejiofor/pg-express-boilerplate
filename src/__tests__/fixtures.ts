import chai from "chai";
import chaiHttp from "chai-http";
import sinonChai from "sinon-chai";
import chaiSubset from "chai-subset";
import chaiAsPromised from "chai-as-promised";

// Runs at require-time, before infrastructure/settings is ever first
// imported by any test file - these need to be set here (not per-test) so
// settings.ts's module-load-time env reads see them regardless of test order.
process.env.GOOGLE_CLIENT_ID ||= "client-instance-1";
process.env.MICROSOFT_CLIENT_ID ||= "micro-instance-1";
process.env.ALLOWED_LOGIN_EMAILS ||= "mock@company1.com";

export const mochaGlobalSetup = function () {
  chai.should();

  chai.use(chaiHttp);
  chai.use(sinonChai);
  chai.use(chaiSubset);
  chai.use(chaiAsPromised);
};
