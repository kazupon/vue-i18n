/**
 * import(s)
 */

var Vue = require('vue');


/**
 * exports(s)
 */

exports.install = function (Vue, opts) {
  opts = opts || {};
  var lang = opts.lang || 'en';
  var resources = opts.resources || {};

  Vue.directive('t', {
    isLiteral: true,
    bind: function () {
      if (this.el.nodeType !== 1) { return; }

      if (this.key === '') {
        this.el.textContent = '';
        return;
      }

      var res = resources[lang];
      if (!res) {
        this.el.textContent = this.key;
        return;
      }

      var namespaces = this.key.split('.');
      for (var i = 0; i < namespaces.length; i++) {
        res = res[namespaces[i]];
        if (res === undefined) { break; }
      }

      this.el.textContent = (res === undefined ? this.key : res);
    }
  });
};
