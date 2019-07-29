import { State } from "./State";
import { expect } from 'chai';
import 'mocha';
import { GeometryElement } from "../../geometry/GeometryElement";
import { StyleElement } from "../../styles/StyleElement";

describe('given a blank state', () => {

    let state = new State("Test State");

    describe('when constructed', () => {

        it('should instantiate a default style', () => {
            expect(state.Styles[0].Name).to.equal("default");
        });

        it('should instantiate a target for the default style', () => {
            expect(state.TargetsByStyle["default"]).to.not.equal(undefined);
        });

        it('should have the default style target all tags', () => {
            expect(state.TargetsByStyle["default"]).to.equal("all");
        });

    });

    describe('when adding a style', () => {

        state.AddStyle(new StyleElement("", "style"), ["wall", "floor"]);

        it('should generate a target definition for the new style', () => {
            expect(state.TargetsByStyle["style"]).to.not.equal(undefined);
        });

        it('should append any declared targets to the target definition', () => {
            expect(state.TargetsByStyle["style"]).to.contain("floor");
        })

    });

    describe('when bringing tags to front', () => {

        state
        .BringToFront('first-tag')
        .BringToFront('second-tag')
        .SendToBack('first-tag')
        .BringToFront('first-tag');

        it('should place the most recently declared tag at the front of the list', () => {
            expect(state.Front[0]).to.equal('first-tag');
        });

        it('should preserve tag order as more tags are declared', () => {
            expect(state.Front[1]).to.equal('second-tag');
        });

        it('should move tag if already declared in front car', () => {
            expect(state.Front[2]).to.not.equal("first-tag");
        });

        it('should move tag if already declared in back car', () => {
            expect(state.Back[0]).to.not.equal("first-tag");
        });

    });

    describe('when sending tags to back', () => {

        state
        .SendToBack('last-tag')
        .SendToBack('other-tag')
        .BringToFront('last-tag')
        .SendToBack('last-tag');

        it('should place the most recently declared tag at the back of the list', () => {
            expect(state.Back[1]).to.equal('last-tag');
        });

        it('should preserve tag order as more tags are declared', () => {
            expect(state.Back[0]).to.equal("other-tag");
        });

        it('should move tag if already declared in front car', () => {
            expect(state.Front[0]).to.not.equal("last-tag");
        });

        it('should move tag if already declared in back car', () => {
            expect(state.Back[2]).to.not.equal("last-tag");
        });

    });

});