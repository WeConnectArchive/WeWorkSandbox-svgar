import { Polyline } from "rhino3dm";
import { GeometryElement, PolylineBuilder } from "./../../../../../index";
import { Normalize } from './../../../ConvertUtils';

export function ToSvgarGeometry(polyline: Polyline, domain: Domain) : GeometryElement {
    let segmentCount = polyline.segmentCount;

    let line = new PolylineBuilder(Normalize(polyline.get(0), domain));

    for (let i = 0; i < segmentCount; i++) {
        line.LineTo(Normalize(polyline.get(i + 1), domain));
    }

    return line.Build();
}