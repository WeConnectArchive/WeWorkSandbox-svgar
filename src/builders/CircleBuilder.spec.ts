import CircleBuilder from "./CircleBuilder";
import { expect } from "chai";
import "mocha";

describe("given a circle builder in arbitrary coordinate space", () => {

    let builder = new CircleBuilder(75, 75, 25);

    describe("when building", () => {

        let geometry = builder.build();

        it("should generate a bezier approximation from four segments", () => {
            expect(geometry.getCoordinates().length).to.equal(32);
        });

        it("should generate a closed shape", () => {
            expect(geometry.isClosed()).to.equal(true);
        });

        it("should generate a contiguous shape", () => {
            expect(geometry.isContiguous()).to.equal(true);
        });

    });

    describe("when generating anchor points", () => {

        let geometry = builder.build();

        it("should align right-side anchors vertically", () => {
            expect(geometry.getCoordinates()[2]).to.equal(geometry.getCoordinates()[30]).and.not.equal(undefined);
        });

        it("should align left-side anchors vertically", () => {
            expect(geometry.getCoordinates()[12]).to.equal(geometry.getCoordinates()[18]).and.not.equal(undefined);
        });

        it("should align top-side anchors horizontally", () => {
            expect(geometry.getCoordinates()[5]).to.equal(geometry.getCoordinates()[11]).and.not.equal(undefined);
        });

        it("should align bottom-side anchors horizontally", () => {
            expect(geometry.getCoordinates()[21]).to.equal(geometry.getCoordinates()[27]).and.not.equal(undefined);
        });

        it("should pull right and left side anchors to the same vertical extents", () => {
            expect(geometry.getCoordinates()[3]).to.equal(geometry.getCoordinates()[13]).and.not.equal(undefined);
            expect(geometry.getCoordinates()[19]).to.equal(geometry.getCoordinates()[29]).and.not.equal(undefined);
        });

        it("should top and bottom anchors to the same horizontal extents", () => {
            expect(geometry.getCoordinates()[10]).to.equal(geometry.getCoordinates()[20]).and.not.equal(undefined);
            expect(geometry.getCoordinates()[4]).to.equal(geometry.getCoordinates()[26]).and.not.equal(undefined);
        });

    });

});