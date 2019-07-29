import { GeometryElement } from "../GeometryElement";
import { Normalize, MirrorY } from "./BuilderUtils";

export class CircleBuilder {
    public CenterPt:number[];
    public Radius: number;
    public XDomain:number[];
    public YDomain:number[];
    public InvertY:boolean;

    // Magic circle-bezier-approximation number
    private sigma:number = 0.55191502449

    constructor(centerPt: number[] = [0.5, 0.5], radius: number = 0.5, xDomain: number[] = [0, 1], yDomain: number[] = [0, 1], invertY: boolean = true) {
        this.CenterPt = centerPt;
        this.Radius = radius;
        this.XDomain = xDomain;
        this.YDomain = yDomain;
        this.InvertY = invertY;

        this.sigma = radius * 0.55191502449;
    }

    public Build() : GeometryElement {
        let coords:number[] = [];

        // Aliases for readability
        let cx = this.CenterPt[0];
        let cy = this.CenterPt[1];
        let r = this.Radius;
        let sigma = this.sigma;

        // Segment I
        coords.push(cx + r);
        coords.push(cy);
        coords.push(cx + r);
        coords.push(cy + sigma);
        coords.push(cx + sigma);
        coords.push(cy + r);
        coords.push(cx);
        coords.push(cy + r)

        // Segment II
        coords.push(cx);
        coords.push(cy + r)
        coords.push(cx - sigma);
        coords.push(cy + r);
        coords.push(cx - r);
        coords.push(cy + sigma);
        coords.push(cx - r);
        coords.push(cy);

        // Segment III
        coords.push(cx - r);
        coords.push(cy);
        coords.push(cx - r);
        coords.push(cy - sigma);
        coords.push(cx - sigma);
        coords.push(cy - r);
        coords.push(cx);
        coords.push(cy - r);

        // Segment IV
        coords.push(cx);
        coords.push(cy - r);
        coords.push(cx + sigma);
        coords.push(cy - r);
        coords.push(cx + r);
        coords.push(cy - sigma);
        coords.push(cx + r);
        coords.push(cy);

        Normalize(coords, this.XDomain, this.YDomain);
        MirrorY(coords);

        return new GeometryElement(coords);
    }
}