import Update from './Update';
import { expect } from 'chai';
import 'mocha';
import SvgarSlab from './../models/SvgarSlab';
import SvgarCube from './../models/SvgarCube';

describe("given a default svgar slab", () => {

    const slab = new SvgarSlab("test");
    slab.compile();

    describe("when updating its state", () => {

        Update().svgar.slab(slab).state.to("newstate");

        it("should flag its state as changed", () => {
            expect(slab.changedScope("state")).to.be.true;
        });

        it("should update the current state to the declared value", () => {
            expect(slab.getCurrentState()).to.equal("newstate");
        });

    });

});

describe("given a default svgar cube", () => {

    const cube = new SvgarCube();

    describe("when updating its camera by extents", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentTo(5, 2, 10, 4);
        });

        it("should allow extents to be set", () => {
            expect(cube.scope.minimum).to.not.include(0);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(5);
            expect(cube.scope.maximum[0]).to.equal(10);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(2);
            expect(cube.scope.maximum[1]).to.equal(4);
        });

    });

    describe("when updating its camera by changing the anchor", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.anchorTo(10, 8);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(5);
            expect(cube.scope.maximum[0]).to.equal(15);
        })
    })

});