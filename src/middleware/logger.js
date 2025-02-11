const logger = (req, res, next) => {
  console.log(
    `req from ${req.hostname} || ${req.method} from - " ${
      req.url
    } " at ${new Date().toLocaleDateString()}`
  );
  next();
};

module.exports = logger;
