import { 
    ConvertRhinoModel, ConvertRhinoModelContext, 
    ConvertRhinoPolyline, ConvertRhinoPolylineContext,
    ConvertRhinoPolylinecurve, ConvertRhinoPolylinecurveContext,
    ConvertRhinoGeometry, ConvertRhinoGeometryContext } 
    from './rhino/ConvertRhinoContexts';
import { File3dm, Polylinecurve, Polyline } from 'rhino3dm';

interface ConvertContext {
    Rhino: {
        Geometry: (geometry: RhinoGeometry, domain?: Domain) => ConvertRhinoGeometryContext,
        Polyline: (polyline: Polyline, domain: Domain) => ConvertRhinoPolylineContext,
        Polylinecurve: (curve: Polylinecurve, domain: Domain) => ConvertRhinoPolylinecurveContext,
        Model: (model: File3dm) => ConvertRhinoModelContext,
    }
}

const Convert: ConvertContext = {
    Rhino: {
        Geometry: ConvertRhinoGeometry,
        Polyline: ConvertRhinoPolyline,
        Polylinecurve: ConvertRhinoPolylinecurve,
        Model: ConvertRhinoModel
    }
}

export default Convert;





