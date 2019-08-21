import { Polylinecurve } from 'rhino3dm';
import { ToSvgarGeometry } from './svgar/ToSvgarGeometry'
import { GeometryElement } from '../../../../models/geometry/GeometryElement';

export interface ConvertRhinoPolylinecurveContext {
    To: {
        Svgar: {
            Geometry: GeometryElement
        }
    }
}

export function ConvertRhinoPolylinecurve(curve: Polylinecurve, domain: Domain) : ConvertRhinoPolylinecurveContext {
    return {
        To: {
            Svgar: {
                Geometry: ToSvgarGeometry(curve, domain),
            }
        }
    }
}