import { CreatePredicate } from "../../../predicates/create/create";
import { Layer } from "../layer/Layer";
import { State } from "../state/State";

export class Drawing {

    public Layers:Array<Layer>;
    public States:Array<State>;

    public Data:any;
    public Tags:Array<string>;

    constructor(name: string) {
        this.Layers = new Array<Layer>();
        this.States = new Array<State>();
        
        let Create = new CreatePredicate();
        this.Data = Create.NameData(name);
        this.Tags = new Array<string>();
    }

    public Compile(state: string = "", width: number = 100, height: number = 100) : string {
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

            svg = svg + '"'

            // Add style for layer based on tag
            svg = svg + activeState.CompileStyle(x.Tags);

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