import rhino3dm, { File3dm, ArcCurve, Polyline, Polylinecurve, Polycurve, Point, Point3d, RhinoModule } from "rhino3dm";

export class RhinoModelBuilder {

    private rhino!: RhinoModule;
    private _model!: File3dm;
    get Build() : File3dm {
        return this._model;
    }

    constructor() {
        rhino3dm().then(r => {
            this.rhino = r;
            this._model = new r.File3dm();
        })
    }

    Then(callback?: (model: File3dm) => any) : File3dm {
        if (callback) {
            callback(this._model)
        }
        return this._model;
    }

    WithTheseCurves(curves:(ArcCurve | Polylinecurve | Polycurve)[]) : RhinoModelBuilder {
        let objs = this._model.objects();

        curves.forEach(x => {
            objs.addCurve(x);
        });
        
        return this;
    }

    WithThesePoints(points:(Point |  number[])[]) : RhinoModelBuilder {
        let objs = this._model.objects();

        points.forEach(pt => {
            if (pt instanceof this.rhino.Point) {
                let loc = pt.getBoundingBox().center;
                objs.addPoint(loc[0], loc[1], loc[2]);
            }
            else {
                objs.addPoint(pt[0], pt[1], pt[2]);
            }
        });

        return this;
    }

}