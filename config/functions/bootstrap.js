module.exports = async () => {

  // *************************************************** //
  // append tunning as a middleware to register policies //
  // *************************************************** //
  strapi.config.middleware.load.after.push('tunning')

  // *************************************************** //
  // Inject tunning func as an extension of strapi       //
  // *************************************************** //
  strapi.tunning = {
    input: strapi.plugins.tunning.services.input,
    keep: strapi.plugins.tunning.services.keep,
  }

};
