import rhino3dm, { RhinoModule, LineCurve, Point3dList } from 'rhino3dm';

export class CreateRhinoContext {

    public rhino!:RhinoModule;

    constructor() {
        rhino3dm().then(r => {
            this.rhino = r;
        });
    }

    public LineCurve(from: number[], to: number[]) : LineCurve {
        return new this.rhino.LineCurve(from, to);
    }

    public Point3dList() : Point3dList {
        return new this.rhino.Point3dList(1);
    }
}