const _ = require("lodash")
const { parseMultipartData } = require('strapi-utils');

module.exports = (ctx) => {
  return {
    set: (fields) => {
      if (ctx.is('multipart')) {
        ctx.request.body = { data: JSON.stringify(_.merge(parseMultipartData(ctx).data || {}, fields)) }
      } else {
        ctx.request.body = _.merge(ctx.request.body || {}, fields)
      }
    },
    data: (field = undefined, def = undefined) => {
      if (ctx.is('multipart')) {
        if (field) {
          return parseMultipartData(ctx).data[field] || _.get(ctx, `request.body.${field}`, def)
        } else {
          const { data, ...middlewareData } = _.get(ctx, "request.body", {})
          return _.merge(parseMultipartData(ctx).data || {}, middlewareData)
        }
      } else {
        if (field) {
          return _.get(ctx, `request.body.${field}`, def)
        } else {
          return _.get(ctx, "request.body", {})
        }
      }
    },
    files: (field = undefined) => {
      if (ctx.is("multipart")) {
        if (field) {
          return parseMultipartData(ctx).files[field] || undefined
        } else {
          return parseMultipartData(ctx).files || []
        }
      } else {
        return undefined
      }
    }
  }
}
