const _ = require('lodash');
const deepPick = require("deepPick");

module.exports = async (ctx, next) => {
  await next();
  if (ctx.status == 200 && ctx.response.body) {
    // ************************************** //
    // PARSE REQUESTED ROUTE TO ORIGINAL PATH //
    // ************************************** //
    let originalPath = ctx.request.url
    if (ctx.params && Object.keys(ctx.params).length > 0) {
      originalPath = ctx.request.url.split("/").map(partValue => {
        for (const partKey in ctx.params) {
          if (partKey != "0" && ctx.params[partKey] == partValue) return `:${partKey}`
        }
        return partValue
      }).join("/")
    }

    // Get all application routes
    let routes = strapi.config.routes
    _.forEach(strapi.plugins, (plugin) => {
      _.forEach(plugin.config.routes, (route) => {
        if (route && route.method && route.path) {
          routes.push(route)
        }
      })
    })

    // ****************************** //
    // FIND ROUTE AND KEEP ITS FIELDS //
    // ****************************** //
    let picks = []
    const route = routes.find(route => route.method == ctx.request.method && route.path == originalPath)
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
