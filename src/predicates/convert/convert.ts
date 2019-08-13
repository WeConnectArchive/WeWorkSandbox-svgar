import { PolylineBuilder } from "../../models/geometry/builders/PolylineBuilder"
import { GeometryElement } from "../../models/geometry/GeometryElement";
//import rhino3dm from 'rhino3dm';

export default [
    LineToSvgar
]

function LineToSvgar(line:any) : GeometryElement {
    return new GeometryElement([]);
}