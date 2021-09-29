const { parseMultipartData } = require('strapi-utils');
const _ = require('lodash')

function resolveKeepBody(body, fields){
  const newbody = {}
  for(const field of fields){
    _.set(newbody, field, _.get(body, field))
  }
  return newbody
}

module.exports = (ctx, keeps) => {
  if (ctx.is("multipart")) {
    const bodydata = parseMultipartData(ctx).data
    ctx.request.body.data = JSON.stringify(resolveKeepBody(bodydata, keeps))
  } else {
    ctx.request.body = resolveKeepBody(ctx.request.body, keeps)    
  }
}
