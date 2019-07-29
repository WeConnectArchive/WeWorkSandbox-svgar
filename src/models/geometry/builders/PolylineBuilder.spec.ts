import { PolylineBuilder } from "./PolylineBuilder";
import { expect } from "chai"
import "mocha"

describe("given a new polyline builder instance", () => {

    describe("when constructed with defaults", () => {

        let builder = new PolylineBuilder();

        it("should store 0 as the first x coordinate", () => {
            expect(builder.Coordinates[1]).to.equal(0);
        });

        it("should store 0 as the first y coordinate", () => {
            expect(builder.Coordinates[0]).to.equal(0);
        })

    });

    describe("when constructed with a starting point", () => {

        let startPt = [0.5, 0.5]
        let builder = new PolylineBuilder(startPt);

        it("should store the first input coordinate as the first x coordinate", () => {
            expect(builder.Coordinates[0]).to.equal(startPt[0]);
        });

        it("should store the second input coordinate as the first y coordinate", () => {
            expect(builder.Coordinates[1]).to.equal(startPt[1]);
        });

    });

});

describe("given a polyline builder in arbitrary coordinate space", () => {

    let builder = new PolylineBuilder([50, 25], [0, 100], [0, 50]);

    let yElevation = 50;
    builder.VerticalTo(yElevation);

    let xElevation = 100;
    builder.HorizontalTo(xElevation);

    let coordinate = [4, 2];
    builder.LineTo(coordinate);

    describe("when drawing a vertical segment", () => {

        it("should add a coordinate with the same x value as the previous coordinate", () => {
            expect(builder.Coordinates[2]).to.equal(builder.Coordinates[0]);
        });

        it("should add a coordinate with the provided y elevation as the y value", () => {
            expect(builder.Coordinates[3]).to.equal(yElevation);
        });
    });

    describe("when drawing a horizontal segment", () => {

        it("should add a coordinate with the provided x elevation as the x value", () => {
            expect(builder.Coordinates[4]).to.equal(xElevation);
        });

        it("should add a coordinate with the same y value as the previous coordinate", () => {
            expect(builder.Coordinates[5]).to.equal(builder.Coordinates[3]);
        });

    });

    describe("when drawing a segment to arbitrary coordinates", () => {

        it("should add a coordinate with the provided x coordinate as the x value", () => {
            expect(builder.Coordinates[6]).to.equal(coordinate[0]);
        });

        it ("should add a coordinate with the provided y coordinate as the y value", () => {
            expect(builder.Coordinates[7]).to.equal(coordinate[1]);
        });

    });

    describe("when building from 4 coordinates", () => {

        let geometry = builder.Build();

        it("should generate a geometry element with 24 coordinate values", () => {
            expect(geometry.Coordinates.length).to.equal(24);
        });

        it("should normalize the points to svgar coordinate space", () => {
            expect(geometry.Coordinates.filter(x => x > 1 || x < 0).length).to.equal(0);
        });

        it("should invert y values for svg coordinate space", () => {
            expect(geometry.Coordinates[7]).to.equal(0);
        });

        it("should generate a contiguous shape", () => {
            expect(geometry.IsContiguous()).to.equal(true);
        });

        it("should generate an open shape (based on mock data)", () => {
            expect(geometry.IsClosed()).to.equal(false);
        });

    });

});