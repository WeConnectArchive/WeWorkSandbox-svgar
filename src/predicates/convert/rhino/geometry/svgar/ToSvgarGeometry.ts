import { GeometryElement } from "../../../../../models/geometry/GeometryElement";
import rhino3dm, { Extrusion, RhinoModule, Polylinecurve } from "rhino3dm";
import Convert from "../../../../../predicates/convert/convert";

export function ToSvgarGeometry(geometry: RhinoGeometry, domain: Domain = { xDomain: [0,1], yDomain: [0,1], zDomain: [0,1] }) : GeometryElement | undefined {

    let type = geometry.constructor.name;

    switch(type) {
        case "Polylinecurve":
            return Convert.Rhino.Polylinecurve(geometry as Polylinecurve, domain).To.Svgar.Geometry;
        default:
            console.log("Geometry of type " + type + " is not currently supported.");
            return undefined;
    }

    return new GeometryElement([]);
}