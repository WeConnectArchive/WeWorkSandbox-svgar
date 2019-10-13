# svgar

[![Travis CI](https://img.shields.io/travis/com/WeWorkSandbox/svgar?style=flat-square)](https://travis-ci.com/WeWorkSandbox/svgar)
[![Coveralls github](https://img.shields.io/coveralls/github/WeWorkSandbox/svgar?style=flat-square)](https://coveralls.io/github/WeWorkSandbox/svgar)
[![npm](https://img.shields.io/npm/v/svgar.svg?style=flat-square)](https://www.npmjs.com/package/svgar)
[![NPM](https://img.shields.io/npm/l/svgar.svg?style=flat-square)](https://github.com/WeWorkSandbox/svgar/blob/master/LICENSE)

Svgar (pronounced sugar) is a fluent syntax wrapper for creating reactive svg drawings.

Design automation tools are constrained by the interfaces they're written for. Grasshopper and Dynamo provide battle-tested geometric tools, but consideration for graphical output or user experience often requires [some pretty extreme measures](https://www.food4rhino.com/app/human-ui). What if we could use the drawing *as* the interface?

Svgar cubes (read: drawings) contain a camera object and a collection 'stateful' layer objects called slabs. Slabs contain tagged 2D geometry, an encapsulated set of css styles, and any number of state declarations that map styles to tags. The library provides a fluent syntax for intuitively composing drawings from these. This schema offers three primary ways to dynamically control graphics:

- Altering the actual geometry
- Changing states for one/many slabs
- Moving the camera

Anything svg can do, svgar can do! But now the drawing process is a little bit sweeter.

**(Under active development. Targeting November for a complete `0.4.X` fluent syntax.)**

## Installation

`npm install svgar`

## Examples

Visit [svgar.dev](https://svgar.dev).
