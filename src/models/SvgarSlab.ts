import * as uuid from 'uuid/v4';
import SvgarPath from './SvgarPath';

export default class SvgarSlab {

    private Name: string;
    private Id: string;
    private Elevation: number;

    private State: string;
    private States: {
        Name: string,
        Styles: {
            [Tag: string]: string,
        }
    }[]
    private Styles: {
        Name: string,
        Attributes: {
            [Attribute: string]: string,
        }
    }[]

    private Anchor: number[];
    private Geometry: SvgarPath[];

    constructor(name: string) {
        this.Name = name;
        this.Id = uuid.default();
        this.Elevation = 0;

        this.State = "default";
        this.States = [{
            Name: 'default',
            Styles: {

            }
        }]

        this.Styles = [{
            Name: 'default',
            Attributes: {
                "fill": "none",
                "stroke": "#000000",
                "stroke-width": "1px"
            }
        }]

        this.Anchor = [0, 0];
        this.Geometry = [];
    }

    public GetId(): string {
        return this.Id;
    }

    public GetName(): string {
        return this.Name;
    }

}