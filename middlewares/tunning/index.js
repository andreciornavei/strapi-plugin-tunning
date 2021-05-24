const _ = require('lodash');

module.exports = strapi => {
  return {
    initialize() {

      // ************************************************* //
      // Register policy include/exclude to each GET route  //
      // ************************************************* //

      const POLICY_QUERY_PARAMS = 'plugins::tunning.query_params'
      const POLICY_KEEP_PARAMS = 'plugins::tunning.keep_params'
      const POLICY_INPUT_PARAMS = 'plugins::tunning.virtual_input_params'
      const POLICY_PICK_OUTPUT = 'plugins::tunning.pick_output'

      _.forEach(strapi.admin.config.routes, value => {
        if(_.get(value, "config.keep")) value.config.policies.push(POLICY_KEEP_PARAMS);
        if(_.get(value, "config.pick")) value.config.policies.push(POLICY_PICK_OUTPUT);
        if(_.get(value, "config.virtual_input")) value.config.policies.unshift(POLICY_INPUT_PARAMS);
        if (_.get(value, 'method') == "GET" && _.get(value, "config")) {
          if (_.get(value, "config.policies")) {
            value.config.policies.push(POLICY_QUERY_PARAMS);
          } else {
            value.config.policies = [POLICY_QUERY_PARAMS];
          }
        }
      });

      _.forEach(strapi.config.routes, value => {
        if(_.get(value, "config.keep")) value.config.policies.push(POLICY_KEEP_PARAMS);
        if(_.get(value, "config.pick")) value.config.policies.push(POLICY_PICK_OUTPUT);
        if(_.get(value, "config.virtual_input")) value.config.policies.unshift(POLICY_INPUT_PARAMS);
        if (_.get(value, 'method') == "GET" && _.get(value, "config")) {
          if (_.get(value, "config.policies")) {
            value.config.policies.push(POLICY_QUERY_PARAMS);
          } else {
            value.config.policies = [POLICY_QUERY_PARAMS];
          }
        }
      });

      if (strapi.plugins) {
        _.forEach(strapi.plugins, plugin => {
          _.forEach(plugin.config.routes, value => {
            if(_.get(value, "config.keep")) value.config.policies.push(POLICY_KEEP_PARAMS);
            if(_.get(value, "config.pick")) value.config.policies.push(POLICY_PICK_OUTPUT);
            if(_.get(value, "config.virtual_input")) value.config.policies.unshift(POLICY_INPUT_PARAMS);
            if (_.get(value, 'method') == "GET" && _.get(value, "config")) {
              if (_.get(value, "config.policies")) {
                value.config.policies.push(POLICY_QUERY_PARAMS);
              } else {
                value.config.policies = [POLICY_QUERY_PARAMS];
              }
            }
          });
        });
      }

    },
  };
};
