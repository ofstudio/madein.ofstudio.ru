var hbs = require('ghost/node_modules/express-hbs');


module.exports = function () {

    // {{#node_env}} Helper
    //
    // Example:
    // {{#node_env 'production'}}
    // ...production only 
    // {{/node_env}}
    //
    hbs.registerHelper('node_env', function (env, options) {
        return (options.data.root.settings.env === env) ? options.fn(this) : options.inverse(this)
    });


    // {{#ifCond}} Helper
    // http://stackoverflow.com/a/22469101/3071651
    //
    // Example:
    // {{#ifCond showDistance "&&" distance}}
    //     <span class="distance">
    //        {{distance}}
    //    </span>
    // {{/ifCond}}
    hbs.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
};
