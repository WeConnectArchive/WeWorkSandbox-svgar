import { ConvertRhinoModel, ConvertRhinoModelContext, ConvertRhinoGeometry, ConvertRhinoGeometryContext } from './rhino/ConvertRhinoContexts';
import { File3dm } from 'rhino3dm';

interface ConvertContext {
    Rhino: {
        Geometry: (geometry: RhinoGeometry) => ConvertRhinoGeometryContext,
        Model: (model: File3dm) => ConvertRhinoModelContext,
    }
}

const Convert: ConvertContext = {
    Rhino: {
        Geometry: ConvertRhinoGeometry,
        Model: ConvertRhinoModel
    }
}

export default Convert;





