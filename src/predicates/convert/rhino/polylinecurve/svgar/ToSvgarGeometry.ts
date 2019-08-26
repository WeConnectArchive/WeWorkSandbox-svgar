import { Polylinecurve } from "rhino3dm";
import { GeometryElement } from "./../../../../../index";
import Convert from './../../../convert';

export function ToSvgarGeometry(curve: Polylinecurve, domain: Domain) : GeometryElement {
    
    // Defer Polylinecurve conversion to equivalent polyline conversion
    return Convert.Rhino.Polyline(curve.ToPolyline(), domain).To.Svgar.Geometry;
}