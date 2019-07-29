import * as declare from '.';
import { expect } from 'chai';
import 'mocha';

describe('Intent declaration', () => {

    it('should mention something about svg', () => {
        const result = declare.intent();
        expect(result).to.contain('svg');
    });

    it('should really double down on the package name', () => {
        const result = declare.intent();
        expect(result).to.contain('sweeter');
    });

});