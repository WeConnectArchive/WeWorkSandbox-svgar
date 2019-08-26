import { Polyline } from 'rhino3dm';
import { ToSvgarGeometry } from './svgar/ToSvgarGeometry'
import { GeometryElement } from '../../../../models/geometry/GeometryElement';

export interface ConvertRhinoPolylineContext {
    To: {
        Svgar: {
            Geometry: GeometryElement
        }
    }
}

export function ConvertRhinoPolyline(curve: Polyline, domain: Domain) : ConvertRhinoPolylineContext {
    return {
        To: {
            Svgar: {
                Geometry: ToSvgarGeometry(curve, domain),
            }
        }
    }
}