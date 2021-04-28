const { parseMultipartData } = require('strapi-utils');

module.exports = (ctx, keeps) => {
  if (ctx.is("multipart")) {
    const bodydata = parseMultipartData(ctx).data
    for (const field in bodydata) {
      if (!keeps.includes(field)) {
        delete bodydata[field]
      }
    }
    ctx.request.body.data = JSON.stringify(bodydata)
  } else {
    for (const field in ctx.request.body) {
      if (!keeps.includes(field)) {
        delete ctx.request.body[field]
      }
    }
  }

}
