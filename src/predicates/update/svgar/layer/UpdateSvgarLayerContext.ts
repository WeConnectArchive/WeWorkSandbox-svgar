import { Layer } from '../../../../models/schema/layer/Layer';
import { GeometryElement } from '../../../../models/geometry/GeometryElement';

export class UpdateSvgarLayerContext {

    public Layer: Layer;

    constructor(layer: Layer) {
        this.Layer = layer;
    }

    public AddGeometry(geometry: GeometryElement) : void {
        this.Layer.AddGeometry(geometry);
    }

    public AddGeometries(geometries: GeometryElement[]) : void {
        this.Layer.AddGeometries(geometries);
    }
    
}