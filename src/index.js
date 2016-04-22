import 'source-map-support/register';

import Promise from 'bluebird';
import fs from 'fs'; Promise.promisifyAll(fs);
import _, {pick, defaults} from 'lodash';
try { require('debug-utils'); } catch (err) {/**/}
import {Label, Project} from './models';
import Sequelize from 'sequelize';
import log from './utils/log';

export default class GitLabTools {
  static defaults = {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    username: 'gitlab',
    password: 'password',
    database: 'gitlabhq_production',
    truncate: false,
    global: false
  };
  constructor(argv) {
    this.config = defaults({}, pick(argv, ...Object.keys(GitLabTools.defaults)), GitLabTools.defaults);
    this.initialize();
  }
  initialize() {
    this.sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, {
      host: this.config.host,
      port: this.config.port,
      dialect: this.config.dialect
    });
    this.Label = this.sequelize.import('Label', Label);
    this.Project = this.sequelize.import('Project', Project);
    // this.sequelize.sync();
  }
  cloneLabels(projectName) {
    if (!projectName) {
      throw new Error('Required `projectName`');
    }
    return Promise.cast(this.Project.find({where: {name: projectName}}))
      .tap(d)
      .get('dataValues')
      .get('id')
      .then(projectId => {
        if (!projectId) {
          throw new Error('Missing project id');
        }
        return Promise.resolve()
        .then(() => {
          if (this.config.truncate) {
            return Promise.cast(this.Label.destroy({where: {project_id: projectId}}))
              .tap((deletedCount) => {
                log.info('Deleted %d previous labels', deletedCount);
              });
          }
          return 0;
        })
        .then(() => Promise.all([
          this.Label.findAll({
            attributes: ['title', 'color', 'project_id'],
            where: {project_id: null}
          }),
          this.Label.findAll({
            attributes: ['title', 'color', 'project_id'],
            where: {project_id: projectId}
          })
        ]))
        .spread((fromLabels, toLabels) => {
          log.info('Found %d previous labels', toLabels.length);
          const existingLabels = _.map(toLabels, 'dataValues');
          const toCreate = _(fromLabels).map('dataValues').map(label => {
            label.project_id = projectId;
            delete label.id;
            return label;
          }).reject(label => {
            return _.some(existingLabels, {title: label.title});
          }).value();
          return this.Label.bulkCreate(toCreate);
        })
        .then((labels) => {
          log.info('Created %d new labels', labels.length);
        });
      });
  }
}
