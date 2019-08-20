export class RhinoLineCurveTemplate {

    public From: number[] = [0,0,0];
    public To: number[] = [1,1,1];

    constructor(from?: number[], to?: number[]) {
        if (from) this.From = from;
        if (to) this.To = to;
    }

    public static Default() : RhinoLineCurveTemplate {
        return new RhinoLineCurveTemplate([0,0,0], [1,1,1]);
    }
}