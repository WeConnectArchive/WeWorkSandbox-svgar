import { ArcCurve, Polylinecurve } from 'rhino3dm';
import { ToSvgarGeometry } from './svgar/ToSvgarGeometry'
import { GeometryElement } from '../../../../models/geometry/GeometryElement';

export interface ConvertRhinoGeometryContext {
    To: {
        Svgar: {
            Geometry: GeometryElement | undefined;
        }
    }
}

export function ConvertRhinoGeometry(geometry: RhinoGeometry) : ConvertRhinoGeometryContext {
    return {
        To: {
            Svgar: {
                Geometry: ToSvgarGeometry(geometry),
            }
        }
    }
}