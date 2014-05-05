/**
 * import(s)
 */

var i18n = require('vue-i18n');
var Vue = require('vue');


describe('i18n', function () {
  var resources = {
    en: {
      message: {
        hello: 'the world',
        hoge: 'hoge'
      }
    },
    ja: {
      message: {
        hello: 'ザ・ワールド',
        hoge: 'ほげ'
      }
    }
  };

  describe('basic', function () {
    describe('en', function () {
      it('should translate an english', function () {
        mock('translate-en', '<p v-t="message.hello"></p>');

        Vue.use(i18n, {
          lang: 'en',
          resources: resources
        });

        new Vue({
          el: '#translate-en'
        });

        var el = document.querySelector('#translate-en');
        expect(el.textContent).to.be.eql(resources.en.message.hello);
      });
    });

    describe('ja', function () {
      it('should translate a japanese', function () {
        mock('translate-ja', '<p v-t="message.hello"></p>');

        Vue.use(i18n, {
          lang: 'ja',
          resources: resources
        });

        new Vue({
          el: '#translate-ja'
        });

        var el = document.querySelector('#translate-ja');
        expect(el.textContent).to.be.eql(resources.ja.message.hello);
      });
    });
  });

  describe('lang resource not found', function () {
    it('should not translate', function () {
      mock('translate-it', '<p v-t="message.hello"></p>');

      Vue.use(i18n, {
        lang: 'it',
        resources: resources
      });

      new Vue({
        el: '#translate-it'
      });

      var el = document.querySelector('#translate-it');
      expect(el.textContent).to.be.eql('message.hello');
    });
  });

  describe('resource key not found', function () {
    it('should not translate', function () {
      mock('translate-en-key-nothing', '<p v-t="message.foo"></p>');

      Vue.use(i18n, {
        lang: 'en',
        resources: resources
      });

      new Vue({
        el: '#translate-en-key-nothing'
      });

      var el = document.querySelector('#translate-en-key-nothing');
      expect(el.textContent).to.be.eql('message.foo');
    });
  });

  describe('resource key empty', function () {
    it('should not translate', function () {
      mock('translate-key-empty', '<p v-t=""></p>');

      Vue.use(i18n, {
        lang: 'en',
        resources: resources
      });

      new Vue({
        el: '#translate-key-empty'
      });

      var el = document.querySelector('#translate-key-empty');
      expect(el.textContent).to.be.eql('');
    });
  });

  /*
  describe('specify default value', function () {
    it('should translate with default value', function () {
      mock(
        'translate-default-value',
        '<p v-t="message.hello: {{hello}}"></p>'
      );

      Vue.use(i18n, {
        lang: 'en',
        resources: resources
      });

      new Vue({
        el: '#translate-default-value',
        data: {
          hello: 'スタープラチナ ザ・ワールド'
        }
      });

      var el = document.querySelector('#translate-default-value');
      expect(el.textContent).to.be.eql('スタープラチナ ザ・ワールド');
    });
  });
  */

  describe('translate component module', function () {
      mock(
        'translate-parent',
        '<div><p v-t="message.hello"></p><div v-component="hoge"></div></div>'
      );

      Vue.use(i18n, {
        lang: 'en',
        resources: resources
      });

      new Vue({
        el: '#translate-parent',
        components: {
          hoge: Vue.extend({
            template: '<p id="translate-child" v-t="message.hoge"></p>'
          })
        }
      });

      var child_el = document.querySelector('#translate-child');
      expect(child_el.textContent).to.be.eql(resources.en.message.hoge);

      var parent_el = document.querySelector('#translate-parent p');
      expect(parent_el.textContent).to.be.eql(resources.en.message.hello);
  });

  // NOTE: Don't use `v-text` directive !!
  describe('v-text', function () {
    it('should not translate', function () {
      mock('translate-use-text', '<p v-t="message.hello" v-text="hello"></p>');

      Vue.use(i18n, {
        lang: 'en',
        resources: resources
      });

      new Vue({
        el: '#translate-use-text',
        data: {
          hello: 'world'
        }
      });

      var el = document.querySelector('#translate-use-text');
      expect(el.textContent).to.be.eql('world');
    });
  });
});
