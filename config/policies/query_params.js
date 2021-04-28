const _ = require('lodash');
const deepPick = require("deepPick");

module.exports = async (ctx, next) => {
  const picks = _.get(ctx, "query._pick")
  delete ctx.query["_pick"]
  await next();
  if (ctx.status == 200 && ctx.response.body) {
    if (picks && picks.length > 0) {
      ctx.response.body = deepPick(ctx.response.body, picks.split(",").map(field => field.trim()))
    }
  }
};
