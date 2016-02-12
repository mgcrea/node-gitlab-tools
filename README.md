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
npm i -g gitlab-tools
# Clone global labels into projects (does drop projects labels!)
gitlab clone-labels project-name --global
```

## Usage

```bash
Usage: gitlab <command> [options]

Commands:
  clone-labels  Clone labels between projects

Options:
  --dialect   Database dialect                    [string] [default: "postgres"]
  --username  Database username                     [string] [default: "gitlab"]
  --password  Database password                   [string] [default: "password"]
  --database  Database name            [string] [default: "gitlabhq_production"]
  -h, --help  Show help                                                [boolean]
  --version   Show version number                                      [boolean]
```

## Testing

- You can quickly start hacking around

```bash
git clone -o github git@github.com:mgcrea/node-gitlab-tools.git
cd node-gitlab-tools
npm i
npm start
```
