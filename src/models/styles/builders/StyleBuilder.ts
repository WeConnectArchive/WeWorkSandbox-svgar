import { Color } from "../Colors";
import { StyleElement } from "../StyleElement";

export class StyleBuilder {
    public Name:string;
    public Styles:any;

    private SupportedAttributes:string[] = [
        "stroke",
        "stroke-width",
        "fill",
        "fill-opacity",
        "color"
    ];

    private SupportedUnits:string[] = [
        "cm",
        "mm",
        "in",
        "px",
        "pt",
        "pc",
        "em",
        "ex",
        "ch",
        "rem",
        "vw",
        "vh",
        "vmin",
        "vmax",
        "%"
    ];

    constructor(name: string) {
        this.Name = name;
        this.Styles = {};
    }

    // Format declared styles as accurate inline svg markup
    public Build() : StyleElement {
        var style = ""

        this.SupportedAttributes.forEach( x => {
            style = style + this.ParseStyleOrSkip(x);
        });

        return new StyleElement(style, this.Name);
    }

    private ParseStyleOrSkip(att: string) : string {
        var styleValue = this.Styles[att];
        return ( styleValue === undefined ) ? "" : att + ": " + styleValue + "; ";
    }

    // Set color attribute using predefined enums
    public ColorFromName(color: Color) : StyleBuilder {
        this.Styles["color"] = color;
        return this;
    }

    // Set color attibute using arbitrary string
    public Color(color: string) : StyleBuilder {
        this.Styles["color"] = color;

        // TODO: Verify string is formatted correctly, if attempting hex, or valid, if using named colors

        return this;
    }

    // Set stroke attribute using arbitrary string
    public Stroke(stroke: string) : StyleBuilder {
        this.Styles["stroke"] = stroke;

        return this;
    }

    // Set stroke-width attribute using arbitrary string
    public StrokeWidth(stroke: string) : StyleBuilder {
        var dimExp = stroke.match(/\d+/);
        var unitExp = stroke.match(/[a-z]+/);

        if (dimExp == null) {
            throw new Error("No dimension value has been declared.");
        }

        if (unitExp == null) {
            throw new Error("No unit has been declared.");
        }

        var unit = Array.from(unitExp).join();

        if (this.SupportedUnits.indexOf(unit) < 0) {
            throw new Error("Invalid unit declaration. (" + unit + " units invalid or unsupported)");
        }

        this.Styles["stroke-width"] = stroke;

        return this;
    }

    // Set fill color using arbitrary string
    public Fill(fill: string) : StyleBuilder {
        this.Styles["fill"] = fill;

        return this;
    }

    // Set fill opacity using a truncated number between 0 and 1
    public FillOpacity(opacity: number) : StyleBuilder {
        let num = opacity;

        if (num > 1) {
            num = 1;
        }

        if (num < 0) {
            num = 0;
        }
        
        this.Styles["fill-opacity"] = num;

        return this;
    }
}