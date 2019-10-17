import SvgarSlab from './SvgarSlab';
import { expect } from 'chai';
import 'mocha';
import SvgarPath from './SvgarPath';
import CircleBuilder from './../builders/CircleBuilder';

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

    describe('when reading its cache and flags', () => {

        it('should return an empty cache', () => {
            const cache = [
                slab.cache.geometry, 
                slab.cache.style, 
                slab.cache.maskStyle, 
                slab.cache.maskGeometry,
                slab.cache.clipPathStyle,
                slab.cache.clipPathGeometry
            ];

            expect(cache.filter(x => x != "").length).to.equal(0);
        });

        it('should have all fields flagged as changed', () => {
            expect(slab.changedAny()).to.be.true;
        });

    });

});

describe('given a slab with one path and one local style', () => {

    const slab = new SvgarSlab('circletest');
    slab.addPath(new CircleBuilder(0, 0, 1).build());
    slab.setLocalStyle({
        name: "test",
        attributes: {
            "stroke": "red",
        }
    });
    
    describe('when compiled', () => {

        slab.compile();

        it('should have all fields flagged as unchanged', () => {
            expect(slab.changedAny()).to.be.false;
        });

        it('should have cached style information', () => {
            expect(slab.cache.style).to.not.equal("");
        });

        it('should have cached local style as a wildcard child selector', () => {
            expect(slab.cache.style.includes(`> *`)).to.be.true;
        })

        it('should have cached geometric information', () => {
            expect(slab.cache.geometry).to.not.equal("");
        });

    });

});