import SvgarPath from "./../models/SvgarPath";

export default class CurveBuilder {

    public coordinates: number[] = [];

    constructor(startX: number, startY: number) {
        this.coordinates = [startX, startY];
    }

    public build(): SvgarPath {
        let path: number[] = [];
        let c = this.coordinates;

        for(let i = 0; i < this.coordinates.length - 2; i += 4) {
            path = path.concat([
                c[i],
                c[i + 1],
                c[i + 2],
                c[i + 3],
                c[i + 2],
                c[i + 3],
                c[i + 4],
                c[i + 5]
            ]);
        }

        return new SvgarPath(path);
    }

    public via(x: number, y: number): CurveBuilderAnchor {
        return new CurveBuilderAnchor(this.coordinates, x, y);
    }

}

class CurveBuilderAnchor {

    private coordinates: number[];

    constructor(coordinates: number[], x: number, y: number) {
        this.coordinates = [...coordinates, x, y];
    }

    public through(x: number, y: number): CurveBuilder {
        let cb = new CurveBuilder(0, 0);

        cb.coordinates = [...this.coordinates, x, y];

        return cb;
    }
    
}