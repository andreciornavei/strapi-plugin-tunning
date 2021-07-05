const _ = require('lodash');

module.exports = async (ctx, next) => {


  // ************************************** //
  // PARSE REQUESTED ROUTE TO ORIGINAL PATH //
  // ************************************** //
  let originalPath = ctx.request.url.split("?")[0]
  if (ctx.params && Object.keys(ctx.params).length > 0) {
    const tmpParams = ctx.params
    originalPath = originalPath.split("/").map(partValue => {
      for (const partKey in tmpParams) {
        if (tmpParams[partKey] == partValue) {
          delete tmpParams[partKey]
          return `:${partKey}`
        }
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

  // ******************************* //
  // FIND ROUTE AND INPUT ITS FIELDS //
  // ******************************* //
  const route = routes.find(route => route.method == ctx.request.method && route.path == originalPath)
  if (route) {
    if (_.get(route, "config.virtual_input") && _.isObject(route.config.virtual_input)) {
      strapi.plugins.tunning.services.input(ctx).set(route.config.virtual_input)
    }
  }
  await next()
};
