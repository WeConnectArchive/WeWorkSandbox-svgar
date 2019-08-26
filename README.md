# svgar

[![Travis CI](https://img.shields.io/travis/com/WeWorkSandbox/svgar?style=flat-square)](https://travis-ci.com/WeWorkSandbox/svgar)
[![Coveralls github](https://img.shields.io/coveralls/github/WeWorkSandbox/svgar?style=flat-square)](https://coveralls.io/github/WeWorkSandbox/svgar)
[![npm](https://img.shields.io/npm/v/svgar.svg?style=flat-square)](https://www.npmjs.com/package/svgar)
[![NPM](https://img.shields.io/npm/l/svgar.svg?style=flat-square)](https://github.com/WeWorkSandbox/svgar/blob/master/LICENSE)

Syntactic sugar for reactive and data-infused svg drawings. No more Rhino screenshots!

Design automation tools are constrained by the interfaces they're written for. Grasshopper and Dynamo provide battle-tested geometric tools, but consideration for graphical output or user experience often requires [some pretty extreme measures](https://www.food4rhino.com/app/human-ui). What if we could use the drawing *as* the interface?

Svgar (pronounced sugar) drawings are collections of layers and states. Layers contain logical groups of geometry, and states contain svg style definitions. The library provides a fluent syntax for composing information, attaching events/classes, and switching between states. The output is still svg, but the drawing process is a little bit sweeter.

Svgar offers:

* High fidelity vector visuals without an imposed graphic opinion. If svg can do it, svgar can do it.
* A new paradigm of cooking-based package names because all the good animals and bugs are taken.

**(Under active development. Targeting an August `0.2.X` public release.)**

## Installation

`npm install svgar`

## Examples

Visit [svgar.dev](https://svgar.dev).
