import { ConvertRhinoModel, ConvertRhinoModelContext } from './rhino/model/ConvertRhinoModel';
import { File3dm } from 'rhino3dm';

interface ConvertContext {
    Rhino: {
        Model: (model: File3dm) => ConvertRhinoModelContext
    }
}

const Convert: ConvertContext = {
    Rhino: {
        Model: ConvertRhinoModel
    }
}

export default Convert;





