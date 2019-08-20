import Create from "../../../predicates/create/create";
import { StyleElement } from "../../styles/StyleElement";

export class State {

    public Data:any;
    public Tags:Array<string>;

    public Styles:Array<StyleElement>;
    public TargetsByStyle: {[key: string]: string}; //Target: { style name: tags to target}
    public TargetsByTag: {[key: string]: string};

    public Front:string[] = [];
    public Back:string[] = [];
    public Hidden:string[] = [];

    constructor(name: string) {
        this.Data = Create.Svgar.NameData.With(name);
        this.Tags = new Array<string>();

        this.TargetsByStyle = {};
        this.TargetsByTag = {};

        this.Styles = new Array<StyleElement>();
        this.AddStyle(new StyleElement("", "default"));

        this.TargetsByStyle["default"] = "all";
    }

    // Returns cascading style, assuming the first tag is the highest priority
    public CompileStyle(tags:string[]) : string {
        let style = 'style="';

        for (let i = 0; i < tags.length; i++) {
            let target = this.TargetsByTag[tags[i]];

            if (target == undefined) {
                continue;
            }

            let currentStyle = this.Styles.find(x => x.Name == target);

            if (currentStyle == undefined) {
                continue;
            }

            let currentStyleAtts = currentStyle.Style.split(";");
            let categories = currentStyleAtts.map(x => x.split(":")[0]);

            for (let i = 0; i < categories.length; i++) {
                if (style.indexOf(categories[i]) < 0) {
                    style = style + currentStyleAtts[i] + "; ";
                }
            }
        }

        style = style + '"';

        return style;
    }

    public AddStyle(style: StyleElement, targets: Array<string> = new Array<string>()) : State {
        
        // Add style to array
        this.Styles.push(style);

        // Check for existing target definition
        let target = this.TargetsByStyle[style.Name];

        if (target == undefined) {
            this.TargetsByStyle[style.Name] = "";
        }

        // Add any declared targets to target definition
        targets.forEach(x => {
            this.TargetsByStyle[style.Name] = this.TargetsByStyle[style.Name] + "," + x
        });

        return this;
    }

    public BringToFront(tag:string) : State {
        this.Front = this.Front.filter(x => x != tag);
        this.Back = this.Back.filter(x => x!= tag);
        this.Hidden = this.Hidden.filter(x => x!= tag);

        this.Front = [tag, ...this.Front];

        return this;
    }

    public SendToBack(tag:string) : State {
        this.Front = this.Front.filter(x => x != tag);
        this.Back = this.Back.filter(x => x!= tag);
        this.Hidden = this.Hidden.filter(x => x!= tag);

        this.Back.push(tag);

        return this
    }

    public Hide(tag:string) : State {
        this.Front = this.Front.filter(x => x != tag);
        this.Back = this.Back.filter(x => x!= tag);
        this.Hidden = this.Hidden.filter(x => x!= tag);

        this.Hidden.push(tag);

        return this;
    }

    public Target(style:string, tag:string): State {
        this.TargetsByStyle[style] = tag;
        this.TargetsByTag[tag] = style;

        return this;
    }

}