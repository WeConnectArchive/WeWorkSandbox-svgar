import rhino3dm, { RhinoModule, LineCurve, Point3dList, File3dm } from 'rhino3dm';
import { CreateRhinoModelContext } from './CreateRhinoModelContext';
import fs from 'fs';

export class CreateRhinoContext {

    public rhino!:RhinoModule;

    constructor() {
        rhino3dm().then(x => {
            this.rhino = x;
        })
    }

    public LineCurve(from: number[], to: number[]) : LineCurve {
        return new this.rhino.LineCurve(from, to);
    }

    public Model() : CreateRhinoModelContext {
        return new CreateRhinoModelContext(new this.rhino.File3dm(), this.rhino);
    }

    public Point3dList() : Point3dList {
        return new this.rhino.Point3dList(1);
    }
}