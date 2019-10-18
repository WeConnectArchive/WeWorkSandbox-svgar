import Create from './Create';
import { expect } from 'chai';
import 'mocha';

import SvgarSlab from './../models/SvgarSlab';

describe("given a new create cube context", () => {

    let ctx = Create().svgar.cube("test");

    describe("when declaring its name at initialization", () => {

        it("should accurately set the cube's name to the declared value", () => {
            let cube = ctx.then.build();
            expect(cube.getName()).to.equal("test");
        });

    });

    describe("when declaring a collection of slabs", () => {

        before(() => {
            ctx.withSlabs([
                new SvgarSlab("a"),
                new SvgarSlab("b"),
                new SvgarSlab("c")
            ]);
        });

        it("should accurately set the cube's slabs to the declared values", () => {
            let cube = ctx.then.build();
            expect(cube.slabs.length).to.equal(3);
            expect(cube.slabs.map(x => x.getName())).to.include("a");
        });

    });

    describe("when declaring a camera", () => {

        before(() => {
            ctx.withCameraExtents(2, 3, 4, 5);
        });

        it("should accurately set the cube's camera to the declared extents", () => {
            let cube = ctx.then.build();
            expect(cube.scope.minimum[0]).to.equal(2);
            expect(cube.scope.minimum[1]).to.equal(3);
            expect(cube.scope.maximum[0]).to.equal(4);
            expect(cube.scope.maximum[1]).to.equal(5);
        });

    });

    describe("when not declaring a camera", () => {

        let noCameraContext = Create().svgar.cube("c");

        it("should use the default camera", () => {
            let cube = noCameraContext.then.build();
            expect(cube.scope.minimum).to.include(0);
            expect(cube.scope.maximum).to.include(1);
        });

    });

});