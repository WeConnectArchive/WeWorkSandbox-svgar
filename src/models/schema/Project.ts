import Create from './../../predicates/create/create';
import { UpdatePredicate } from './../../predicates/update/update';
import { Drawing } from "./drawing/Drawing";

export class Project {

    public Drawings:Array<Drawing>;
    public Data!:any;

    constructor() {
        this.Drawings = new Array<Drawing>();
    }

    public Named(name: string): Project {
        let newData = Create.Svgar.NameData.With(name);
        this.Data = {...this.Data, ...newData}

        return this;
    }

    public AddDrawing(drawing: Drawing): Project {
        let existingNameCache = new Array<string>();

        this.Drawings.forEach(x => {
            let name = x.Data["original-name"];

            if (name != undefined) {
                existingNameCache.push(name);
            }
        });

        let name = drawing.Data["original-name"];

        if (name == undefined) {
            throw new Error("Cannot add drawing without name to project.");
        }

        let collisions = 0;

        while (existingNameCache.indexOf(name) > -1) {
            collisions++;
            name = name + collisions.toString();
        }

        if (collisions > 0) {
            let Update = new UpdatePredicate();
            Update.DrawingNames(drawing, name);
        }

        this.Drawings.push(drawing);
        
        return this;
    }
}