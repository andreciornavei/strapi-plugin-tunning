const _ = require('lodash');
const deepPick = require("deepPick");

module.exports = async (ctx, next) => {
  await next();
  if (ctx.status == 200 && ctx.response.body) {
    let picks = []
    const route = strapi.plugins.tunning.services.resolve_route(ctx)
    if (route) {
      if (Array.isArray(_.get(route, "config.pick"))) {
        picks = _.get(route, "config.pick", [])
      }
    }

    // *********** //
    // APPLY PICKS //
    // *********** //
    if (picks.length > 0) {
      ctx.response.body = deepPick(ctx.response.body, picks)
    }
  }
};
