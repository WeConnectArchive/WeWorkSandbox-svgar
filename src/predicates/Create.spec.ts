import Create from './Create';
import { expect } from 'chai';
import 'mocha';

import SvgarSlab from './../models/SvgarSlab';
import SvgarState from './../models/SvgarState';
import SvgarStyle from './../models/SvgarStyle';

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

describe("given a new create slab context", () => {

    let ctx = Create().svgar.slab("slabtest");

    describe("when declaring its name at initialization", () => {

        it("should accurately set the slab name to the declared value", () => {
            let slab = ctx.then.build();
            expect(slab.getName()).to.equal("slabtest");
        });

    });

    describe("when declaring its id", () => {

        const id = "testid";

        before(() => {
            ctx.withId(id);
        });

        it("should accurately set the slab id to the declared value", () => {
            let slab = ctx.then.build();
            expect(slab.getId()).to.equal(id);
        });

    });

    describe("when declaring its elevation", () => {

        const elevation = 25;

        before(() => {
            ctx.withElevation(elevation);
        });

        it("should accurately set the slab elevation to the declared value", () => {
            let slab = ctx.then.build();
            expect(slab.getElevation()).to.equal(elevation);
        });

    });

    describe("when declaring its states", () => {

        const states: SvgarState[] = [
            {
                name: "a",
                styles: {

                }
            },
            {
                name: "default",
                styles: {

                }
            }
        ]

        before(() => {
            ctx.withStates(states);
        });

        it("should accurately set the slab states to the declared values", () => {
            let slab = ctx.then.build();
            expect(slab.getAllStates().map(x => x.name)).to.include("a").and.to.include("default");
        });

    });

    describe("when declaring its styles", () => {

        const styles: SvgarStyle[] = [
            {
                name: "default",
                attributes: {

                }
            },
            {
                name: "red-fill",
                attributes: {

                }
            },
            {
                name: "grey-stroke",
                attributes: {

                }
            }
        ];

        before(() => {
            ctx.withStyles(styles);
        });

        it("should accurately set the slab styles to the declared values", () => {
            let slab = ctx.then.build();
            expect(slab.getAllStyles().map(x => x.name)).to.include("red-fill").and.include("grey-stroke");
        });

    });

    describe("when declaring its local style", () => {

        const style: SvgarStyle = {
            name: "slabstyle",
            attributes: {

            }
        }

        before(() => {
            ctx.withLocalStyle(style);
        });

        it("should accurately set the slab local style to the declared value", () => {
            let slab = ctx.then.build();
            expect(slab.getLocalStyle()).to.equal(style);
        });
        
    });

    describe("when declaring its clip path", () => {

        const clip = new SvgarSlab("clipslab");

        before(() => {
            ctx.withClipPath(clip);
        });

        it("should accurately set the slab clip path to the declared slab", () => {
            let slab = ctx.then.build();
            expect(slab.getClip()?.getName()).to.equal("clipslab");
        });

    });

    describe("when declaring its mask", () => {

        const mask = new SvgarSlab("maskslab");

        before(() => {
            ctx.withMask(mask);
        });

        it("should accurately set the slab mask to the declared slab", () => {
            let slab = ctx.then.build();
            expect(slab.getMask()?.getName()).to.equal("maskslab");
        });

    });

});