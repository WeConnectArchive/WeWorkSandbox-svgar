import Create from "../../../predicates/create/create";
import { Layer } from "../layer/Layer";
import { State } from "../state/State";
import { GeometryElement } from "../../geometry/GeometryElement";

export class SvgarDrawing {

    // Top level <svg /> attributes
    public xmlns:string = "http://www.w3.org/2000/svg";
    public version:string ="1.1";
    public viewBox:string = "0 0 1 1";
    public width:string = "0";
    public height:string = "0";

    // Array of <g /> svgar layers
    public layers:SvgarLayer[] = [];

    // Compile on instantiation to guarantee attributes have data
    constructor(drawing: Drawing, targetState: string, width: number, height: number) {
        // Set top level attributes
        this.viewBox = "0 0 " + width.toString() +  " " + height.toString();
        this.width = width.toString();
        this.height = height.toString();

        // Determine active state
        let state = this.StageState(drawing, targetState);

        // Determine active layers in state and their draw order
        let layers = this.StageLayers(drawing, state);

        // Compile each layer
        layers.forEach(x => {
            this.layers.push(new SvgarLayer(x, state, width, height))
        });
    }

    private StageState(drawing: Drawing, state: string) : State {
        let activeState = drawing.States.filter(x => x.Data["original-name"] == state)[0];
        
        if (activeState == undefined) {
            activeState = drawing.States[0];
        }

        return activeState;
    }

    private StageLayers(drawing: Drawing, state: State) : Layer[] {
        let activeState = state;

        // Remove layers hidden in state
        let activeLayers:Layer[] = []; 

        drawing.Layers.forEach(x => {

            let hidden = false;

            x.Tags.forEach(y => {
                
                if (activeState.Hidden.includes(y)) {
                    hidden = true
                }

            });

            if (!hidden) {
                activeLayers.push(x);
            }

        });

        // Order layers based on state declaration
        let orderedLayers:Layer[] = [];

        // Add layers in front car
        activeState.Front.forEach(x => {
            activeLayers.filter(y => y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        });

        // Add remaining layers not in back car
        if (activeState.Back.length == 0) {
            activeLayers.forEach(x => {
                if (!orderedLayers.includes(x)) {
                    orderedLayers.push(x);
                }
            });
        }

        activeState.Back.forEach(x => {
            activeLayers.filter(y => !y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        });

        // Finally, add layers in back
        activeState.Back.forEach(x => {
            activeLayers.filter(y => y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        })

        // Reverse ordered layer array
        // ( Chuck ) svg draws in order, so the last geometry exists on the top of the drawing
        orderedLayers.reverse();

        return orderedLayers;
    }
}

class SvgarLayer {

    // Top level <g /> attributes
    public clipPathUrl:string = "";
    public clipPath:string = "";
    public styleInline:string = "";
    public styleAttributes:{[key:string]:string} = {};
    public tags:string[] = [];

    // Array of <path /> svgar geometries
    public geometry:SvgarPath[] = [];

    // Compile on instantiation from layer and given state
    constructor(layer: Layer, state: State, width: number, height: number) {

        // Add clip information if declared
        if (layer.Clip != undefined) {
            let clipPathId = layer.Data["sanitized-name"] + "_clip";
            
            this.clipPathUrl = 'url(#' + clipPathId + ')';
            
            this.clipPath = '<clipPath id="' + clipPathId + '"> <path ' + layer.Clip.CompileToSvgPath(width, height) + ' /></clipPath';
        }

        // Add inline style
        this.styleInline = state.CompileStyle(layer.Tags).replace("style=", "").replace('"', "");

        // Set individual style attributes
        // TODO

        // Store tags
        this.tags = layer.Tags;

        // Compile each geometry
        layer.Geometry.forEach(x => {
            this.geometry.push(new SvgarPath(x, state, width, height));
        });
    }
}

class SvgarPath {

    // Top level <path /> attributes
    public d:string = "";
    public styleInline:string = "";
    public styleAttributes:{[key:string]:string} = {};
    public tags:string[] = [];

    constructor(geometry: GeometryElement, state: State, width: number, height: number) {
        
        // Compile path information
        this.d = geometry.CompileToSvgPath(width, height).replace('d="', "").replace('"', "");

        // Add inline style
        this.styleInline = state.CompileStyle(geometry.Tags).replace('style="', "").replace('"', "");;

        // Store tags
        this.tags = geometry.Tags;
    }
}

export class Drawing {

    // Svgar schema objects
    public Layers:Array<Layer>;
    public States:Array<State>;
    public Data:any;
    public Tags:Array<string>;

    constructor(name: string) {
        this.Layers = new Array<Layer>();
        this.States = new Array<State>();
        
        this.Data = Create.Svgar.NameData.With(name);
        this.Tags = new Array<string>();
    }

    public ToSvg(state: string = "", width: number = 100, height: number = 100) : SvgarDrawing {
        return new SvgarDrawing(this, state, width, height);
    }

    public Compile(state: string = "", width: number = 100, height: number = 100, flavor: string = "") : string {
        let activeState = this.States.filter(x => x.Data["original-name"] == state)[0];
        if (activeState == undefined) {
            activeState = this.States[0];
        }

        let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 ' + width + 'px ' + height + 'px" width="' + width + '" height="' + height + '" version="1.1">'

        // Remove layers hidden in state
        let activeLayers:Layer[] = []; 
        
        this.Layers.forEach(x => {

            let hidden = false;

            x.Tags.forEach(y => {
                
                if (activeState.Hidden.includes(y)) {
                    hidden = true
                }

            });

            if (!hidden) {
                activeLayers.push(x);
            }

        });

        // Order layers based on state declaration
        let orderedLayers:Layer[] = [];

        // Add layers in front car
        activeState.Front.forEach(x => {
            activeLayers.filter(y => y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        });

        // Add remaining layers not in back car
        if (activeState.Back.length == 0) {
            activeLayers.forEach(x => {
                if (!orderedLayers.includes(x)) {
                    orderedLayers.push(x);
                }
            });
        }

        activeState.Back.forEach(x => {
            activeLayers.filter(y => !y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        });

        // Finally, add layers in back
        activeState.Back.forEach(x => {
            activeLayers.filter(y => y.Tags.includes(x)).forEach(y => {
                if (!orderedLayers.includes(y)) {
                    orderedLayers.push(y);
                }
            });
        })

        // Reverse ordered layer array
        // ( Chuck ) svg draws in order, so the last geometry exists on the top of the drawing
        orderedLayers.reverse();

        // Compile layer geometry to svg
        orderedLayers.forEach(x => {
            svg = svg + '<g svgar-tags="';

            // Add tags as svgar property
            x.Tags.forEach(y => {
                svg = svg + y + ",";
            });

            svg = svg + '" '

            // Add style for layer based on tag
            svg = svg + activeState.CompileStyle(x.Tags);

            // Add flavor-based attributes
            // ( Chuck ) Current approach at reactivity is to pile on the event watchers
            if (flavor == "vue") {
                svg = svg + ' @click="svgarOnClick" ';
            }


            // Finally, add clip path reference if it exists
            if (x.Clip != undefined) {
                let clipPathId = x.Data["sanitized-name"] + "_clip";
                svg = svg + 'clip-path="url(#' + clipPathId + ')">'

                // Add clip path geometry
                svg = svg + '<clipPath id="' + clipPathId + '">';
                svg = svg + '<path ' + x.Clip.CompileToSvgPath(width, height) + '/>';
                svg = svg + '</clipPath>';
            }
            else {
                svg = svg + ">"
            }

            // Compile geometry elements
            x.Geometry.forEach(y => {
                // Initialize path element
                svg = svg + '<path ';
                
                // Attempt to locate and apply style
                svg = svg + activeState.CompileStyle(y.Tags);

                // Add classes for applied tags
                svg = svg + 'class="';

                y.Tags.forEach(x => {
                    svg = svg + x + " ";
                });

                svg = svg + '" ';
                
                // Compile path geometry
                svg = svg + y.CompileToSvgPath(width, height);

                // Terminate path element
                svg = svg + '/>'
            });

            // Finish layer creation
            svg = svg + "</g>"
        });

        // Finish svg creation and return result
        svg = svg + "</svg>"

        return svg;
    }

    public AddLayer(layer: Layer) : Drawing {
        this.Layers.push(layer);
        return this;
    }

    public AddState(state: State) : Drawing {
        this.States.push(state);
        return this;
    }

}