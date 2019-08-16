
export class CreateSvgarContext {

    public NameData(name: string) : any {
        let names:any = {};

        names['original-name'] = name;
        names['sanitized-name'] = name.toLowerCase().replace(" ", "_");

        return names;
    }
}