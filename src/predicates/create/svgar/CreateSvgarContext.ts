
export class CreateSvgarContext {

    public static NameData(name: string) : any {
        let names:any = {};

        names['original-name'] = name;
        names['sanitized-name'] = name.toLowerCase().replace(" ", "_");

        return names;
    }
}