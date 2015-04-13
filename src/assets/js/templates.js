this["JST"] = this["JST"] || {};

this["JST"]["src/templates/post-assets.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "    "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <br>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"asset-link\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.download : depth0),{"name":"if","hash":{},"fn":this.noop,"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.download : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "        </a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "                <i class=\"mdi-file-file-download\"></i>\n                "
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "                <strong>"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</strong>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.assets : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});