import Create from "./create";
import { expect } from 'chai';
import 'mocha';
import { File3dm } from "rhino3dm";

describe('given multiple separate rhino create predicates', () => {

    it('should create a Linecurve', () => {
        let crv = Create.Rhino.LineCurve.Builder.Build();

        expect(crv.pointAtEnd[0]).to.equal(1);
    });

    // it('should create a Point3dList', () => {
    //     let pts = Create.Rhino.Point3dList.Builder()
        
    //     pts.add(1,2,3);

    //     expect(pts.count).to.equal(1);
    // });

    // it('should create a Model', () => {
    //     let file = Create.Rhino.Model();
    //     expect(file).to.exist;
    // });

});

describe('given a create rhino model context', () => {

    describe('when adding curves', () => {
        
        it('should parse arc curves', () => {
            let file = Create.Rhino.Model.Builder.WithThesePoints([]).WithThesePoints([]).Build;
            expect(file).to.exist;
        });

        it('should allow a "then" callback', () => {
            let model= Create.Rhino.Model.Builder.WithThesePoints([[2,2,2], [1,1,1]]).Then(x => {
                expect(x).to.exist;
            });

            expect(model.objects().count).to.equal(3);
        })

    });

});