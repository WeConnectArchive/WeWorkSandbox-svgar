import { Project } from "./Project";
import { expect } from 'chai';
import 'mocha';
import { Drawing } from "./drawing/Drawing";
import { Layer } from "./layer/Layer";
import { PolylineBuilder } from "../geometry/builders/PolylineBuilder";
import { State } from "./state/State";
import { StyleBuilder } from "../styles/builders/StyleBuilder";

describe('given a blank project', () => {

    let project = new Project();

    describe('when setting name data', () => {

        project.Named("Test Name");

        it('should store unmodified name as "original-name" in data', () => {
            expect(project.Data["original-name"]).to.equal("Test Name");
        });

        it('should store formatted name as "sanitized-name" in data', () => {
            expect(project.Data["sanitized-name"]).to.equal("test_name");
        });

    });

    describe('when adding a new drawing', () => {

        let newDrawingA = new Drawing("Test Drawing");
        project.AddDrawing(newDrawingA);

        let newDrawingB = new Drawing("Test Drawing");
        project.AddDrawing(newDrawingB);

        /*
        project
        .AddDrawing(
            new Drawing("Drawing")
            .AddLayer(
                new Layer("Layer")
                .AddGeometry(
                    new PolylineBuilder([0.5, 0.5])
                    .LineTo([0.75, 0.75])
                    .Build()
                )       
            )
            .AddState(
                new State("State")
                .AddStyle(
                    new StyleBuilder("Style")
                    .Stroke("2px")
                    .Build()
                )
            )
        );
        */

        it('store drawings in the order they were added', () => {
            expect(project.Drawings[project.Drawings.length - 1]).to.equal(newDrawingB);
        });

        it('should prohibit name collisions with any existing drawings', () => {
            let nameA = project.Drawings[0].Data["original-name"];
            let nameB = project.Drawings[1].Data["original-name"];

            expect(nameA).to.not.equal(nameB);
        });

        it('should rename any collisions by appending the lowest possible number', () => {
            let nameA = project.Drawings[1].Data["original-name"];

            expect(nameA).to.equal("Test Drawing1");
        });

    });

});