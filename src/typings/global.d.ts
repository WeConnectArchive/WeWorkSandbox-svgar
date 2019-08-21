import { ArcCurve, Polylinecurve, Extrusion, NurbsCurve, Point, Polycurve } from "rhino3dm";

declare global {
    type SupportedGeometry = ArcCurve | Polylinecurve
    type RhinoGeometry = ArcCurve | Extrusion | NurbsCurve | Point | Polycurve | Polylinecurve;
}