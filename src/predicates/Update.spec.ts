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

    describe("when updating its camera by changing the extents", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(5, 2, 10, 4);
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
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.anchorTo(10, 8);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(5);
            expect(cube.scope.maximum[0]).to.equal(15);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(3);
            expect(cube.scope.maximum[1]).to.equal(13);
        });

    });

    describe("when updating the camera by panning", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.withPan(4.5, 11);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it("should accurately set the horizontal extents", () => {
            expect(cube.scope.minimum[0]).to.equal(4.5);
            expect(cube.scope.maximum[0]).to.equal(14.5);
        });

        it("should accurately set the vertical extents", () => {
            expect(cube.scope.minimum[1]).to.equal(11);
            expect(cube.scope.maximum[1]).to.equal(21);
        });

    });

    describe("when updating the camera by zooming in", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).camera.extentsTo(0, 0, 10, 10);
            Update().svgar.cube(cube).camera.withZoom(1.5);
        });

        it("should flag the root scope as changed", () => {
            expect(cube.checkFlag("root")).to.be.true;
        });

        it('should accurately set the horizontal extents', () => {
            expect(cube.scope.minimum[0]).to.equal(1.5);
            expect(cube.scope.maximum[0]).to.equal(8.5);
        });

        it('should accurately set the vertical extents', () => {
            expect(cube.scope.minimum[1]).to.equal(1.5);
            expect(cube.scope.maximum[1]).to.equal(8.5);
        });

        it('should throw an error when asked to zoom in more than possible', () => {
            expect(() => Update().svgar.cube(cube).camera.withZoom(50)).to.throw("Cannot zoom beyond a zero-width camera.");
        });

    });

    describe("when updating its slabs", () => {

        beforeEach(() => {
            cube.compile(100, 100);
            Update().svgar.cube(cube).slabs.to([]);
        });

        it("should allow slabs to be set in aggregate", () => {
            let slabs: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b"),
                new SvgarSlab("c")
            ];

            Update().svgar.cube(cube).slabs.to(slabs);

            expect(cube.slabs.length).to.equal(3);
        });

        it("should allow slabs to be added one at a time", () => {
            let slab = new SvgarSlab("a");

            Update().svgar.cube(cube).slabs.add(slab);

            expect(cube.slabs.length).to.equal(1);
        });

        it("should allow slabs to be added multiple at a time", () => {
            let slabs: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b")
            ];

            Update().svgar.cube(cube).slabs.add(slabs);

            expect(cube.slabs.length).to.equal(2);
        });

        it("should allow slabs to be removed by a given filter criteria", () => {
            let slabsTriple: SvgarSlab[] = [
                new SvgarSlab("a"),
                new SvgarSlab("b"),
                new SvgarSlab("c")
            ];

            Update().svgar.cube(cube).slabs.to(slabsTriple);
            Update().svgar.cube(cube).slabs.remove(x => x.getName() == "b");

            expect(cube.slabs.length).to.equal(2);
        });

    });

});