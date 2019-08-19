import { File3dm, ArcCurve, Polyline, Polylinecurve, Polycurve, Point, Point3d, RhinoModule } from "rhino3dm";

export class CreateRhinoModelContext {

    private rhino: RhinoModule;
    private _model: File3dm;
    get Emit() : File3dm {
        return this._model;
    }

    constructor(model: File3dm, rhino: RhinoModule) {
        this._model = model;
        this.rhino = rhino;
    }

    Then(callback: (model: File3dm) => any) : void {
        callback(this._model);
    }

    WithTheseCurves(curves:(ArcCurve | Polylinecurve | Polycurve)[]) : CreateRhinoModelContext {
        let objs = this._model.objects();

        curves.forEach(x => {
            objs.addCurve(x);
        });
        
        return this;
    }

    WithThesePoints(points:(Point |  number[])[]) : CreateRhinoModelContext {
        let objs = this._model.objects();

        points.forEach(pt => {
            if (pt instanceof this.rhino.Point) {
                let loc = pt.getBoundingBox(true).center;
                objs.addPoint(loc[0], loc[1], loc[2]);
            }
            else {
                objs.addPoint(pt[0], pt[1], pt[2]);
            }
        });

        return this;
    }

}