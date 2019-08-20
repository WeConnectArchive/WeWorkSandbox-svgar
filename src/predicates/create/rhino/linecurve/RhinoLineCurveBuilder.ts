import rhino3dm, { RhinoModule, LineCurve } from "rhino3dm";
import { RhinoLineCurveTemplate } from './RhinoLineCurveTemplate';

export class RhinoLineCurveBuilder {
    
    private rhino!: RhinoModule
    private from: number[] = [0,0,0];
    private to: number[] = [1,1,1];

    constructor() {
        rhino3dm().then(r => {
            this.rhino = r;
        })
    }

    public From(from: number[]) : RhinoLineCurveBuilder {
        this.from = from;

        return this;
    }

    public To(to: number[]) : RhinoLineCurveBuilder {
        this.to = to;

        return this;
    }

    public Build(template?: RhinoLineCurveTemplate) : LineCurve {
        if (template) {
            this.from = template.From;
            this.to = template.To;
        }

        return new this.rhino.LineCurve(this.from, this.to);
    }
}