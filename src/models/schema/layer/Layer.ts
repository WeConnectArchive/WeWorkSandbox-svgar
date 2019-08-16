import Create from "../../../predicates/create/create";
import { GeometryElement } from "../../geometry/GeometryElement";

export class Layer {

    public Geometry:Array<GeometryElement>;
    public Normal:Array<number>;
    public Clip!:GeometryElement;
    public Data:any;
    public Tags:Array<string>;

    constructor(name: string) {
        this.Data = Create.Svgar.NameData(name);

        this.Normal = new Array<number>( 0, 0, -1 );

        this.Geometry = new Array<GeometryElement>();

        this.Tags = new Array<string>();
    }

    public AddGeometry(geometry: GeometryElement) : Layer {
        this.Geometry.push(geometry);
        return this;
    }

    public AddGeometries(geometry: Array<GeometryElement>) : Layer {
        this.Geometry = this.Geometry.concat(geometry);
        return this;
    }

    public ClipWith(geometry: GeometryElement) : Layer {
        if (!geometry.IsClosed()) {
            console.log("WARNING: Clipping geometry is not closed and has not been applied.");
            return this;
        }

        this.Clip = geometry;

        return this;
    }

    public AddTag(tag: string) : Layer {
        if (this.Tags.indexOf(tag) < 0) {
            this.Tags.push(tag);
        }

        //this.Tags.sort();

        return this;
    }

    public AddTags(tags: string[]) : Layer {
        tags.forEach(x => this.AddTag(x));

        return this;
    }

    public RemoveTag(tag: string) : Layer {
        this.Tags = this.Tags.filter(x => x != tag);

        return this;
    }

    public RemoveTags(tags: string[]) : Layer {
        tags.forEach(x => this.RemoveTag(x));

        return this;
    }
}