import { Project } from "./models/schema/Project";
import { Drawing, SvgarDrawing } from "./models/schema/drawing/Drawing";
import { Layer } from "./models/schema/layer/Layer";
import { State } from "./models/schema/state/State";
import { StyleBuilder } from "./models/styles/builders/StyleBuilder";

// Default model and idiom exports
export default {
    Project,
    Drawing,
    SvgarDrawing,
    Layer,
    State,
    StyleBuilder
}

// Individual schema model exports
export { Project } from "./models/schema/Project";
export { Drawing } from "./models/schema/drawing/Drawing";
export { Layer } from "./models/schema/layer/Layer";
export { State } from "./models/schema/state/State";
export { StyleBuilder } from "./models/styles/builders/StyleBuilder";

// Individual geometry element and builder exports
export { GeometryElement } from "./models/geometry/GeometryElement";
export { PolylineBuilder } from "./models/geometry/builders/PolylineBuilder";
export { CircleBuilder } from "./models/geometry/builders/CircleBuilder";

// Old intent test function
export function intent(): string {
    return "svg, but a little sweeter";
}