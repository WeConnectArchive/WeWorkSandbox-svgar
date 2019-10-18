import Locate from './Locate';
import SvgarCube from "./../models/SvgarCube";
import SvgarSlab from "./../models/SvgarSlab";
import SvgarPath from "./../models/SvgarPath";
import { expect } from 'chai';
import 'mocha';

describe("given a svgar cube with two slabs with two paths each", () => {

    let cube = new SvgarCube("cube");

    let slabA = new SvgarSlab("A");
    let pathA = new SvgarPath([]);
    let pathB = new SvgarPath([]);

    let testPathId = pathB.getId();

    slabA.setAllGeometry([
        pathA,
        pathB
    ]);

    let slabB = new SvgarSlab("B");
    let pathC = new SvgarPath([]);
    let pathD = new SvgarPath([]);

    let testSlabId = slabB.getId();

    slabB.setAllGeometry([
        pathC,
        pathD
    ]);

    cube.slabs = [slabA, slabB];

    describe("when locating a slab in a cube", () => {

        describe("via an id that exists", () => {

            let slab = Locate().svgar.slab.withId(testSlabId).in.svgar.cube(cube);

            it("should locate one slab", () => {
                expect(slab).to.exist;
            });

        });

        describe("via a name that exists", () => {

            let slab = Locate().svgar.slab.withName("A").in.svgar.cube(cube);

            it("should locate one slab", () => {
                expect(slab).to.exist;
            });

        });

        describe("via a name and id that exist", () => {

            let slab = Locate().svgar.slab.withName("B").withId(testSlabId).in.svgar.cube(cube);

            it("should locate one slab", () => {
                expect(slab).to.exist;
            });

        });

        describe("via a name that does not exist", () => {

            let slab = Locate().svgar.slab.withName("fake name").in.svgar.cube(cube);

            it("should return undefined", () => {
                expect(slab).to.not.exist;
            });
    
        });

    });

    describe("when locating a path in a cube", () => {

        describe("via an id that exists in the cube", () => {

            let path = Locate().svgar.path.withId(testPathId).in.svgar.cube(cube);

            it("should return one path", () => {
                expect(path).to.exist;
            });

        });

    });

    describe("when locating a path in a slab", () => {

        describe("via an id that exists in the slab", () => {

            let path = Locate().svgar.path.withId(testPathId).in.svgar.slab(slabA);

            it("should return one path", () => {
                expect(path).to.exist;
            });

        });

        describe("via an id that does not exist in the slab", () => {

            let path = Locate().svgar.path.withId("fake id").in.svgar.slab(slabA);

            it("should return undefined", () => {
                expect(path).to.not.exist;
            });

        });

        describe("via an id that exists in the cube but not in the slab", () => {

            let path = Locate().svgar.path.withId(testPathId).in.svgar.slab(slabB);

            it("should return undefined", () => {
                expect(path).to.not.exist;
            });

        });

    });

});