import { Drawing } from "../../models/schema/drawing/Drawing";
import { Layer } from "../../models/schema/layer/Layer";
import { PolylineBuilder } from "../../models/geometry/builders/PolylineBuilder";
import { State } from "../../models/schema/state/State";
import { StyleBuilder } from "../../models/styles/builders/StyleBuilder";
import { CircleBuilder } from "../../models/geometry/builders/CircleBuilder";

export default class Donut {

    // Input values
    public Values:number[];
    public Labels:string[];
    public Colors:string[];

    // Calculation values
    private Radius:number = 0.425;
    private ValueTotal:number;
    private ValueParameters:number[];
    private CosCoordinates:number[] = [];
    private SinCoordinates:number[] = [];

    // Drawing output
    public Drawing!:Drawing;

    // Creates a drawing (layers, states, and all) of a donut graph based on proportional input data.
    constructor(values: number[], labels: string[] = [], colors: string[] = []) {
        this.Values = values;
        this.Labels = labels;
        this.Colors = colors;

        this.ValueTotal = this.Values.reduce((a, b) => a + b, 0);

        this.ValueParameters = [this.Values[0] / this.ValueTotal];

        for (let i = 1; i < this.Values.length; i++) {
            this.ValueParameters.push((this.Values[i] / this.ValueTotal) + this.ValueParameters[i - 1])
        }

        this.ValueParameters.forEach(x => {
            this.CosCoordinates.push((this.Radius + 0.02) * Math.cos((2 * Math.PI) * x));
            this.SinCoordinates.push((this.Radius + 0.02) * Math.sin((2 * Math.PI) * x));
        });
    }

    public Build() : Drawing {
        var DonutGraph = new Drawing("Donut Graph");

        // Calculate data proportions

        // Generate layers
        DonutGraph
        .AddLayer(
            new Layer("donut-hole")
            .AddTag("donut-hole")
            .AddGeometry(new CircleBuilder([0.5, 0.5], 0.2).Build())          
        )
        .AddLayer(
            new Layer("ring-extents")
            .AddTags(["controls"])
            .AddGeometry(new CircleBuilder([0.5, 0.5], 0.2).Build().AddTag("inner-ring"))
            .AddGeometry(new CircleBuilder([0.5, 0.5], this.Radius).Build().AddTag("outer-ring"))
        );

        var slicesLayer = new Layer("donut-slices").ClipWith(new CircleBuilder([0.5, 0.5], this.Radius).Build());

        for (let i = 0; i < this.Values.length; i++) {
            if (this.Labels[i] == undefined || this.Labels[i] == "") {
                this.Labels[i] = "donut-data-" + (i + 1);
            }

            let x = 0.5 + this.CosCoordinates[i];
            let y = 0.5 + this.SinCoordinates[i];
            let nextX = i == this.Values.length - 1 ? 0.5 + this.CosCoordinates[0] : 0.5 + this.CosCoordinates[i + 1];
            let nextY = i == this.Values.length - 1 ? 0.5 + this.SinCoordinates[0] : 0.5 + this.SinCoordinates[i + 1];

            // Determine extents to bounding box
            let aX = x > 0.5 ? 1 : 0;
            let aY = y;

            let bX = nextX > 0.5 ? 1 : 0;
            let bY = nextY;

            let line = new PolylineBuilder([0.5, 0.5])

            // Determine if slice passed over middle x
            if (aX != bX) {
                // Slice passes
                line
                .LineTo([x, y])
                .LineTo([aX, aY])
                .VerticalTo(aY > 0.5 ? 1 : 0)
                .HorizontalTo(1 - aX)
                .VerticalTo(bY)
                .LineTo([nextX, nextY])
                .LineTo([0.5, 0.5])
            }
            else {
                // Slice does not pass and can be simpler
                line
                .LineTo([x, y])
                .LineTo([aX, aY])
                .LineTo([aX, bY])
                .LineTo([bX, bY])
                .LineTo([nextX, nextY])
                .LineTo([0.5, 0.5])
            }

            slicesLayer
            .AddGeometry( line
                .Build()
                .AddTags([this.Labels[i], "slice"])      
            ) 
        }

        DonutGraph.AddLayer(slicesLayer);

        // Generate states
        var defaultState = new State("default-display");

        defaultState
        .BringToFront("donut-hole")
        .AddStyle(
            new StyleBuilder("white-fill-only")
            .Stroke("none")
            .Fill("#ffffff")
            .Build()
        )
        .Target("white-fill-only", "donut-hole")
        .Hide("controls")
        .AddStyle(
            new StyleBuilder("slice-opacity")
            .Fill("#220022")
            .Build()
        )
        .Target("slice-opacity", "slice");

        for(let i = 0; i < this.Values.length; i++) {
            let tag = this.Labels[i];

            if (this.Colors[i] == undefined) {
                let pct = (i / this.Values.length) * 255;
                this.Colors[i] = this.RGBtoHex([pct, pct, pct]);
            }

            defaultState
            .Target(tag + "-default", tag)
            .AddStyle(
                new StyleBuilder(tag + "-default")
                .Stroke("#ffffff")
                .StrokeWidth("2px")
                .Fill(this.Colors[i])
                .Build()
            )
        }

        DonutGraph.AddState(defaultState);
        
        return DonutGraph;
    }

    private RGBtoHex(rgb: number[]) : string {
        let hex = "#";
        
        for (let i = 0; i < 3; i++) {
            let chex = Math.round(rgb[i]).toString(16);
            let hexval = chex.length == 1 ? "0" + chex : chex;
            hex = hex + hexval;
        }

        return hex;
    }
}