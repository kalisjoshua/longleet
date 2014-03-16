var assert = require('chai').assert,
    utils = require('../utils');

describe('Utilities', function () {
  describe('#isOfType()', function () {
    it('should identify Object(s)', function () {
      assert(utils.isOfType('object', {}));
      assert(!utils.isOfType('object', 'hello'));
    });

    it('should identify String(s)', function () {
      assert(utils.isOfType('string', 'hello'));
      assert(!utils.isOfType('string', {}));
    });
  });

  describe('#objectType()', function () {
    it('should identify Boolean(s)', function () {
      assert.equal('Boolean', utils.objectType(true));
    });

    it('should identify Number(s)', function () {
      assert.equal('Number', utils.objectType(9));
    });

    it('should identify Object(s)', function () {
      assert.equal('Object', utils.objectType({}));
    });

    it('should identify RexExp(s)', function () {
      assert.equal('RegExp', utils.objectType(/a/));
    });

    it('should identify String(s)', function () {
      assert.equal('String', utils.objectType(''));
    });
  });

  describe('#parseStringPath()', function () {
    describe('should parse a string to an array of path parts', function () {
      it('empty and root level', function () {
        assert.deepEqual([''], utils.parseStringPath(''));
        assert.deepEqual([''], utils.parseStringPath('/'));
        assert.deepEqual([''], utils.parseStringPath('/     '));
        assert.deepEqual([''], utils.parseStringPath('     /     '));

      });
      it('simple parts', function () {
        assert.deepEqual(['', 'part'], utils.parseStringPath('/part'));
        assert.deepEqual(['', 'simple', 'part'], utils.parseStringPath('/simple/part'));
      });
    });
  });
});
