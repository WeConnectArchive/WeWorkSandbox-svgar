import { Polylinecurve } from "rhino3dm";
import { GeometryElement } from "../../../../../models/geometry/GeometryElement";

export function ToSvgarGeometry(curve: Polylinecurve, domain: Domain) : GeometryElement {
    console.log("Converting Polylinecurve to Svgar geometry!");

    return new GeometryElement([]);
}