const _ = require('lodash');

module.exports = async (ctx, next) => {

  // ************************************** //
  // PARSE REQUESTED ROUTE TO ORIGINAL PATH //
  // ************************************** //
  let originalPath = ctx.request.url
  if (ctx.params && Object.keys(ctx.params).length > 0) {
    originalPath = ctx.request.url.split("/").map(partValue => {
      for (const partKey in ctx.params) {
        if (ctx.params[partKey] == partValue) return `:${partKey}`
      }
      return partValue
    }).join("/")
  }

  // Get all application routes
  let routes = strapi.config.routes
  _.forEach(strapi.plugins, (plugin) => {
    _.forEach(plugin.config.routes, (route) => {
      if(route && route.method && route.path){
        routes.push(route)
      }
    })
  })

  // ****************************** //
  // FIND ROUTE AND KEEP ITS FIELDS //
  // ****************************** //
  const route = routes.find(route => route.method == ctx.request.method && route.path == originalPath)
  if (route) {
    if (_.get(route, "config.keep") && Array.isArray(_.get(route, "config.keep"))) {
      strapi.plugins.tunning.services.keep(ctx, _.get(route, "config.keep"))
    }
  }
  await next()
};