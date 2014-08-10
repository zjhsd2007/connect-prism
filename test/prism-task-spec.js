'use strict';

var _ = require('lodash');
var assert = require('assert');

var proxies = require('../lib/proxies');
var prism = require('../index');

describe('prism', function() {
  afterEach(function() {
    proxies.reset();
  });

  describe('task initialization', function() {
    it('should have initialized 2 proxies', function() {
      prism.create({
        name: 'proxy1',
        context: '/proxy1',
        host: 'localhost'
      });
      prism.create({
        name: 'proxy2',
        context: '/proxy2',
        host: 'localhost'
      });

      assert.equal(2, proxies.proxies().length);
    });

    it('request options should be correctly mapped', function() {
      prism.create({
        name: 'proxyTest',
        mode: 'proxy',
        context: '/proxyRequest',
        host: 'localhost',
        port: 8090
      });

      var proxy = proxies.getProxy('/proxyRequest');

      assert.equal(_.isUndefined(proxy), false);
      assert.equal(proxy.config.mode, 'proxy');
      assert.equal(proxy.config.mocksPath, './mocks');
      assert.equal(proxy.config.context, '/proxyRequest');
      assert.equal(proxy.config.host, 'localhost');
      assert.equal(proxy.config.port, 8090);
      assert.equal(proxy.config.https, false);
      assert.equal(proxy.config.changeOrigin, false);
    });
  });
});