import SvgarSlab from './SvgarSlab';
import { expect } from 'chai';
import 'mocha';

describe('given a new default svgar slab', () => {

    const slab = new SvgarSlab('test');

    describe('when getting its id', () => {

        const id = slab.getId();

        it('should return a string', () => {
            expect(id).to.exist;
        });

        it('should return a string with 36 characters', () => {
            expect(id.length).to.equal(36);
        })

    });

    describe('when getting its name', () => {

        const name = slab.getName();

        it('should return a string', () => {
            expect(typeof name).to.equal("string");
        });

        it('should return the name declared at initialization', () => {
            expect(name).to.equal("test");
        });

    });

});