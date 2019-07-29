import { StyleBuilder } from "./StyleBuilder";
import { Color } from "../Colors"
import { expect } from "chai";
import "mocha";

describe("given a style builder instance", () => {

    let builder = new StyleBuilder("Test Style");

    describe("when color has been set to red with the enum string", () => {

        builder.ColorFromName(Color.Red);

        it("should store the value #ff0000 under color", () => {
            expect(builder.Styles["color"]).to.equal("#ff0000");
        });

        let style = builder.Build();

        it("should return accurately formatted svg markup when built", () => {       
            expect(style.Style).to.contain("color: #ff0000;");
        });

        it("should not declare any other styles when built", () => {
            expect(style.Style).to.equal("color: #ff0000; ");
        });

    });

    describe("when stroke-width has been to a valid dimension", () => {

        builder.StrokeWidth("2px");

        it("should store the value under stroke", () =>  {
            expect(builder.Styles["stroke-width"]).to.equal("2px");
        });

        let style = builder.Build();

        it("should return accurately formatted svg markup when built", () => {
            expect(style.Style).to.contain("stroke-width: 2px;");
        });

    });

    describe("when stroke has been set to an invalid dimension", () => {

        it("should throw an error if there is no dimension value declared", () => {
            expect(() => { builder.StrokeWidth("px") }).to.throw("No dimension value has been declared.");
        });

        it("should throw an error if there is no unit declared", () => {
            expect(() => { builder.StrokeWidth("2") }).to.throw("No unit has been declared.");
        });

        it("should throw an error if an invalid unit declared", () => {
            expect(() => { builder.StrokeWidth("2 feet") }).to.throw("Invalid unit declaration. (feet units invalid or unsupported)")
        });

    });

});

describe("given a style builder with no styles", () => {

    let builder = new StyleBuilder("Test Style");

    describe ("when building", () => {

        let style = builder.Build();

        it("should return a style with an empty style string", () => {
            expect(style.Style).to.equal("");
        });

    });

});