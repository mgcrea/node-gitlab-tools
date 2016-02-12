
// import fs from 'fs';
import chai from 'chai';
// import sinon from 'sinon';
// import path from 'path';
const expect = chai.expect;
import GitLabTools from './..';

const options = {
  global: true
};

describe('GitLabTools', () => {
  describe('#constructor()', () => {
    it('should properly merge options', () => {
      const tools = new GitLabTools();
      expect(tools.config).to.be.a('object');
    });
  });
  describe('#cloneLabels()', () => {
    it('should properly return a privateKey and a cert', () => {
      const tools = new GitLabTools(options);
      return tools.cloneLabels('coucou-backoffice').then(() => {
      });
    });
  });
});
