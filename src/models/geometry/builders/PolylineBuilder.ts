import { GeometryElement } from "../GeometryElement";
import { Normalize, MirrorY, Midpoint } from "./BuilderUtils";

export class PolylineBuilder {

    public Coordinates:number[];
    public XDomain:number[];
    public YDomain:number[];
    public InvertY:boolean;

    constructor(startPt: number[] = [0, 0], xDomain: number[] = [0, 1], yDomain: number[] = [0, 1], invertY: boolean = true) {
        this.Coordinates = [startPt[0], startPt[1]];
        this.XDomain = xDomain;
        this.YDomain = yDomain;
        this.InvertY = invertY;
    }

    // Convert builder to asvg geometry element
    public Build() : GeometryElement {
        let coords = [];

        for (let i = 0; i < this.Coordinates.length - 2; i += 2) {
            let currentX = this.Coordinates[i];
            let currentY = this.Coordinates[i + 1];
            let nextX = this.Coordinates[i + 2];
            let nextY = this.Coordinates[i + 3];

            let midpoint = Midpoint([currentX, currentY], [nextX, nextY]);

            coords.push(currentX);
            coords.push(currentY);
            coords.push(midpoint[0]);
            coords.push(midpoint[1]);
            coords.push(midpoint[0]);
            coords.push(midpoint[1]);
            coords.push(nextX);
            coords.push(nextY);
        }

        Normalize(coords, this.XDomain, this.YDomain);
        MirrorY(coords);

        return new GeometryElement(coords);
    }

    // Scale coordinates from provided domain to asvg coordinate space [0, 1]
    private Normalize(coordinates:number[]) : void {

        for (let i = 0; i < coordinates.length; i++) {
            if (i % 2 == 0) {
                // x coordinate
                coordinates[i] = (coordinates[i] - this.XDomain[0]) / (this.XDomain[1] - this.XDomain[0]);
            }
            else {
                // y coordinate
                coordinates[i] = (coordinates[i] - this.YDomain[0]) / (this.YDomain[1] - this.YDomain[0]);
            }
        }

    }

    // Mirror all y coordinates over the x axis
    private MirrorY(coordinates:number[]) : void {

        for (let i = 1; i < coordinates.length; i += 2) {
            coordinates[i] = 1 - coordinates[i];
        }

    }

    // Get midpoint of two points
    private Midpoint(ptA: number[], ptB: number[]) : number[] {
        return [ ( ptA[0] + ptB[0] ) / 2 , ( ptA[1] + ptB[1] ) / 2 ];
    }

    // Draw line from previous coordinate to provided coordinate
    public LineTo(pt: number[]) : PolylineBuilder {
        this.Coordinates.push(pt[0]);
        this.Coordinates.push(pt[1]);
        return this;
    }

    // Draw vertical line from previous coordinate to provided y elevation
    public VerticalTo(yCoordinate: number) : PolylineBuilder {
        this.Coordinates.push(this.Coordinates[this.Coordinates.length - 2]);
        this.Coordinates.push(yCoordinate);
        return this;
    }

    // Draw horizontal line from previous coordinate to provided x elevation
    public HorizontalTo(xCoordinate: number) : PolylineBuilder {
        this.Coordinates.push(xCoordinate);
        this.Coordinates.push(this.Coordinates[this.Coordinates.length - 2]);
        return this;
    }

}