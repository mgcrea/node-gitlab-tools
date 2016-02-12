# Gitlab Tools

[![npm version](https://img.shields.io/npm/v/gitlab-tools.svg)](https://www.npmjs.com/package/gitlab-tools)
[![build status](http://img.shields.io/travis/mgcrea/node-gitlab-tools/master.svg?style=flat)](http://travis-ci.org/mgcrea/node-gitlab-tools)
[![dependency status](http://img.shields.io/david/mgcrea/node-gitlab-tools.svg?style=flat)](https://david-dm.org/mgcrea/node-gitlab-tools)
[![devDependency status](http://img.shields.io/david/dev/mgcrea/node-gitlab-tools.svg?style=flat)](https://david-dm.org/mgcrea/node-gitlab-tools#info=devDependencies)
[![npm downloads](https://img.shields.io/npm/dm/gitlab-tools.svg)](https://www.npmjs.com/package/gitlab-tools)

NodeJS Toolkit & CLI for GitLab

## Quickstart

- Command Line Interface

```bash
npm i -g gitlab
# Clone global labels into projects (does drop projects labels!)
gitlab clone-labels project-name --global
```

## Testing

- You can quickly start hacking around

```bash
git clone -o github git@github.com:mgcrea/node-gitlab-tools.git
cd node-gitlab-tools
npm i
npm start
```