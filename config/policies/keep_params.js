const _ = require('lodash');

module.exports = async (ctx, next) => {
  const route = strapi.plugins.tunning.services.resolve_route(ctx)
  if (route) {
    if (_.get(route, "config.keep") && Array.isArray(_.get(route, "config.keep"))) {
      strapi.plugins.tunning.services.keep(ctx, _.get(route, "config.keep"))
    }
  }
  await next()
};
