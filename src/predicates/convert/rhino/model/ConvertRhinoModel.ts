import { RhinoModule, File3dm } from 'rhino3dm';
import { ToSvgarDrawing } from './svgar/ToSvgarDrawing'
import { Drawing } from '../../../../models/schema/drawing/Drawing';

export interface ConvertRhinoModelContext {
    To: {
        Svgar: {
            Drawing: Drawing
        }
    }
}

export function ConvertRhinoModel(model: File3dm) : ConvertRhinoModelContext {
    return {
        To: {
            Svgar: {
                Drawing: ToSvgarDrawing(model)
            }
        }
    }
}