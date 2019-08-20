import rhino3dm, { RhinoModule, LineCurve } from "rhino3dm";
import { RhinoLineCurveTemplate } from './RhinoLineCurveTemplate';

export class RhinoLineCurveBuilder {
    
    private rhino!: RhinoModule
    private from!: number[];
    private to!: number[];

    constructor() {
        rhino3dm().then(r => {
            this.rhino = r;
        })
    }

    public static With(template?: RhinoLineCurveTemplate) : LineCurve {   
        if (template) {
            // Return a LineCurve based on the template
            return new LineCurve(template.From, template.To);
        }
        else {
            // Return a default linecurve
            return new LineCurve([0,0,0], [1,1,1]);
        }
    }

    public From(from: number[]) : RhinoLineCurveBuilder {
        this.from = from;

        return this;
    }

    public To(to: number[]) : RhinoLineCurveBuilder {
        this.to = to;

        return this;
    }

    public Build(from: number[], to: number[]) : LineCurve {
        return new this.rhino.LineCurve(this.from, this.to);
    }
}