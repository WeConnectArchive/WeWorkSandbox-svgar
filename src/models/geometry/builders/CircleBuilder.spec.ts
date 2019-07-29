import { CircleBuilder } from "./CircleBuilder";
import { expect } from "chai";
import "mocha";

describe("given a new circle builder instance", () => {

    describe("when constructed with defaults", () => {

        let builder = new CircleBuilder();

        it("should declare a one-unit x domain", () => {
            expect(builder.XDomain).to.have.members([0, 1]);
        });

        it("should declare a one-unit y domain", () => {
            expect(builder.YDomain).to.have.members([0, 1]);
        });

        it("should place the center point in the middle of the domain", () => {
            expect(builder.CenterPt).to.have.members([0.5, 0.5]);
        });

        it("should declare a radius of 0.5 units", () => {
            expect(builder.Radius).to.equal(0.5);
        });

    });

});

describe("given a circle builder in arbitrary coordinate space", () => {

    let builder = new CircleBuilder([75, 75], 25, [0, 100], [0, 100]);

    describe("when building", () => {

        let geometry = builder.Build();

        it("should generate a bezier approximation from four segments", () => {
            expect(geometry.Coordinates.length).to.equal(32);
        });

        it("should normalize the points to svgar coordinate space", () => {
            expect(geometry.Coordinates.filter(x => x > 1 || x < 0).length).to.equal(0);
        });

        it("should invert y values for svg coordinate space", () => {
            expect(geometry.Coordinates[7]).to.equal(0);
        });

        it("should begin from cartesian coordinate sector I", () => {
            expect(geometry.Coordinates[0]).to.equal(1);
        });

        it("should generate a closed shape", () => {
            expect(geometry.IsClosed()).to.equal(true);
        });

        it("should generate a contiguous shape", () => {
            expect(geometry.IsContiguous()).to.equal(true);
        });

    });

    describe("when generating anchor points", () => {

        let geometry = builder.Build();

        it("should align right-side anchors vertically", () => {
            expect(geometry.Coordinates[2]).to.equal(geometry.Coordinates[30]).and.not.equal(undefined);
        });

        it("should align left-side anchors vertically", () => {
            expect(geometry.Coordinates[12]).to.equal(geometry.Coordinates[18]).and.not.equal(undefined);
        });

        it("should align top-side anchors horizontally", () => {
            expect(geometry.Coordinates[5]).to.equal(geometry.Coordinates[11]).and.not.equal(undefined);
        });

        it("should align bottom-side anchors horizontally", () => {
            expect(geometry.Coordinates[21]).to.equal(geometry.Coordinates[27]).and.not.equal(undefined);
        });

        it("should pull right and left side anchors to the same vertical extents", () => {
            expect(geometry.Coordinates[3]).to.equal(geometry.Coordinates[13]).and.not.equal(undefined);
            expect(geometry.Coordinates[19]).to.equal(geometry.Coordinates[29]).and.not.equal(undefined);
        });

        it("should top and bottom anchors to the same horizontal extents", () => {
            expect(geometry.Coordinates[10]).to.equal(geometry.Coordinates[20]).and.not.equal(undefined);
            expect(geometry.Coordinates[4]).to.equal(geometry.Coordinates[26]).and.not.equal(undefined);
        });

    });

});