export class GeometryElement {

    public Coordinates:Array<number>;
    public Normal:Array<number>;
    public Tags:Array<string>;
    public Data:any;

    private _segments:number;

    constructor(coordinates:Array<number>, normal:Array<number> = [0, 0, -1]) {
        this.Coordinates = coordinates;
        this.Normal = normal;

        this._segments = this.Coordinates.length / 8;

        this.Data = {};
        this.Tags = new Array<string>();
    }

    // Convert to svg with given canvas info (returns 'd="..."')
    public CompileToSvgPath(width: number = 100, height: number = 100) : string {
        // Scale all coordinates based on canvas dimensions
        let coords:number[] = [];

        // (x:odd, y:even)
        for (let i = 0; i < this.Coordinates.length; i++) {
            if (i % 2 == 0) {
                // even
                coords.push(this.Coordinates[i] * width);
            }
            else {
                // odd
                coords.push(this.Coordinates[i] * height);
            }
        }
        
        // Begin compiling path geometry
        let svg = 'd="'

        // Set starting point in canvas coordinates
        svg = svg + "M " + coords[0] + " " + coords[1] + " ";

        // Complete first segment
        svg = svg + "C " +
        coords[2] + " " + coords[3] + " " +
        coords[4] + " " + coords[5] + " " +
        coords[6] + " " + coords[7] + " ";

        // Complete all later segments 
        for (let i = 8; i < this.Coordinates.length; i += 8) {
            // TODO: Add M command if not contiguous

            svg = svg + "C " +
            coords[i + 2] + " " + coords[i + 3] + " " +
            coords[i + 4] + " " + coords[i + 5] + " " +
            coords[i + 6] + " " + coords[i + 7] + " ";
        }

        // If shape is closed, terminate with Z command
        let terminate = this.IsClosed() ? 'Z"' : '"';

        // Complete svg markup and return value
        svg = svg + terminate;

        return svg;
    }

    // Geometric property checks
    public IsContiguous() : boolean {
        if (this.Coordinates.length < 8) {
            return false;
        }
        
        for (let i = 0; i < this.Coordinates.length - 8; i += 8) {
            if (this.Coordinates[i + 6] != this.Coordinates[i + 8]) {
                return false;
            }

            if (this.Coordinates[i + 7] != this.Coordinates[i + 9]) {
                return false;
            }
        }

        return true;
    }

    public IsClosed() : boolean {
        if (!this.IsContiguous()) {
            return false;
        }

        return this.Coordinates[0] == this.Coordinates[this.Coordinates.length - 2] && this.Coordinates[1] == this.Coordinates[this.Coordinates.length - 1];
    }

    // svg transforms? opt to modify coordinate data instead of applying transform style

    // Tag methods
    public AddTag(tag: string) : GeometryElement {
        if (this.Tags.indexOf(tag) < 0) {
            this.Tags.push(tag);
        }

        //this.Tags.sort();

        return this;
    }

    public AddTags(tags: string[]) : GeometryElement {
        tags.forEach(x => this.AddTag(x));

        return this;
    }

    public RemoveTag(tag: string) : GeometryElement {
        this.Tags = this.Tags.filter(x => x != tag);

        return this;
    }

    public RemoveTags(tags: string[]) : GeometryElement {
        tags.forEach(x => this.RemoveTag(x));
        
        return this;
    }
}