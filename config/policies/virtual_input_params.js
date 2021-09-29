const _ = require('lodash');

module.exports = async (ctx, next) => {
  const route = strapi.plugins.tunning.services.resolve_route(ctx)
  if (route) {
    if (_.get(route, "config.virtual_input") && _.isObject(route.config.virtual_input)) {
      strapi.plugins.tunning.services.input(ctx).set(route.config.virtual_input)
    }
  }
  await next()
};
