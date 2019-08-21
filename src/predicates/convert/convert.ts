import { 
    ConvertRhinoModel, ConvertRhinoModelContext, 
    ConvertRhinoPolylinecurve, ConvertRhinoPolylinecurveContext,
    ConvertRhinoGeometry, ConvertRhinoGeometryContext } 
    from './rhino/ConvertRhinoContexts';
import { File3dm, Polylinecurve } from 'rhino3dm';

interface ConvertContext {
    Rhino: {
        Geometry: (geometry: RhinoGeometry, domain?: Domain) => ConvertRhinoGeometryContext,
        Polylinecurve: (curve: Polylinecurve, domain: Domain) => ConvertRhinoPolylinecurveContext,
        Model: (model: File3dm) => ConvertRhinoModelContext,
    }
}

const Convert: ConvertContext = {
    Rhino: {
        Geometry: ConvertRhinoGeometry,
        Polylinecurve: ConvertRhinoPolylinecurve,
        Model: ConvertRhinoModel
    }
}

export default Convert;





