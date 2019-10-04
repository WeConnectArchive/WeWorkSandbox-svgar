import SvgarPath from "./../models/SvgarPath";

export default class CircleBuilder {

    private coordinates: number[];
    private center: number[];
    private radius: number;
    private sigma: number;
    
    // Magic circle-bezier-approximation number
    private s:number = 0.55191502449

    constructor(centerX: number, centerY: number, radius: number) {
        this.coordinates = [];
        this.center = [centerX, centerY];
        this.radius = radius;
        this.sigma = this.s * radius;
    }

    public build(): SvgarPath {
        let coords:number[] = [];

        // Aliases for readability
        let cx = this.center[0];
        let cy = this.center[1];
        let r = this.radius;
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

        return new SvgarPath(coords);
    }
}