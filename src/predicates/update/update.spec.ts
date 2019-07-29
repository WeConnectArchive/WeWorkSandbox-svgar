import { UpdatePredicate } from "./update";
import { expect } from 'chai';
import 'mocha';
import { Drawing } from "../../models/schema/drawing/Drawing";

describe('given the predicate update', () => {

    let Update = new UpdatePredicate();

    describe('when updating drawing names', () => {

        let drawing = new Drawing("First Name");
        Update.DrawingNames(drawing, "Second Name");

        it('should replace data stored under "original-name"', () => {
            expect(drawing.Data["original-name"]).to.equal("Second Name");
        });

        it('should replace data stored under "sanitized-name"', () => {
            expect(drawing.Data["sanitized-name"]).to.equal("second_name");
        })

    });

});