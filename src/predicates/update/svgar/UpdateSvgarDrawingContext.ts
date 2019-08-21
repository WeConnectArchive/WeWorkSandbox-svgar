import { Drawing } from "./../../../models/schema/drawing/Drawing";

export class UpdateSvgarDrawingContext {

    public Drawing: Drawing;

    constructor(drawing: Drawing) {
        this.Drawing = drawing;
    }

    public Extents(min: number[], max: number[]) : void {
        let data = this.Drawing.Data;

        data["x-domain-min"] = min[0];
        data["x-domain-max"] = max[0];
        data["y-domain-min"] = min[1];
        data["y-domain-max"] = max[1];
        data["z-domain-min"] = min[2];
        data["z-domain-max"] = max[2];
    }
}