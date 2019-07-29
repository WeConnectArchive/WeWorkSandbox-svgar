import { Drawing } from "./Drawing";
import { expect } from 'chai';
import 'mocha';

describe('given a blank drawing', () => {

    let drawing = new Drawing("Test Drawing");

    describe('when constructed', () => {

        it('should always be named', () => {
            expect(drawing.Data["original-name"]).to.equal("Test Drawing");
        });

    });

});