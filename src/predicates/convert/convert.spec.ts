import Convert from './convert';
import { expect } from 'chai';
import * as rhino3dm from 'rhino3dm';
import 'mocha';

describe('given a line to convert', () => {
   
    let line:any;

    it('should create a line', (done) => {

        rhino3dm().then((rhino:any) => {
            line = new rhino.Line([0,0,0], [1,0,0]);
            expect(line.length).to.equal(1);
            done();
        });
        
    });

});