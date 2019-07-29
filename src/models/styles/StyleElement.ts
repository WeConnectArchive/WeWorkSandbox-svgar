export class StyleElement {

    public Name:string;
    public Style:string;

    constructor(style: string, name: string = "") {
        this.Name = name;
        this.Style = style;
    }
}