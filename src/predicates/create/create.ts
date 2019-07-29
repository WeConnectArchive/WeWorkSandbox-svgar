import { Project } from "../../models/schema/Project";

export class CreatePredicate {

    public Project(name: string) : Project {
        return new Project().Named(name);
    }

    public NameData(name: string) : any {
        var newData:any = {}

        newData["original-name"] = name;
        newData["sanitized-name"] = name.toLowerCase().replace(' ', '_');

        return newData;
    }

}