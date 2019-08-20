import { RhinoLineCurveTemplate } from './rhino/CreateRhinoTemplates';
import { RhinoLineCurveBuilder, RhinoModelBuilder } from './rhino/CreateRhinoBuilders';
import { LineCurve } from 'rhino3dm';
import { CreateSvgarContext } from './svgar/CreateSvgarContext';

interface CreateContext {
    Rhino: {
        LineCurve: {
            Builder: RhinoLineCurveBuilder,
            With: (template?: RhinoLineCurveTemplate) => LineCurve;
        },
        Model: {
            Builder: RhinoModelBuilder,
            With: "",
        },
        Point3dList: {
            Builder: "",
            With: "",
        }
    },
    Svgar: {
        NameData: {
            // TODO: Interface for namedata
            With: any,
        }
    }
}

const Create: CreateContext = {
    Rhino: {
        LineCurve: {
            Builder: new RhinoLineCurveBuilder(),
            With: RhinoLineCurveBuilder.With,
        },
        Model: {
            Builder: new RhinoModelBuilder(),
            With: "",
        },
        Point3dList: {
            Builder: "",
            With: "",
        },
    },
    Svgar: {
        NameData: {
            With: CreateSvgarContext.NameData
        }
    }
}

export default Create;
