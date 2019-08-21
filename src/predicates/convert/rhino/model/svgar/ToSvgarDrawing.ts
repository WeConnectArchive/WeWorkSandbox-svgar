import rhino3dm, { RhinoModule, File3dm, File3dmObject, Layer, File3dmLayerTable } from 'rhino3dm';
import * as Svgar from '../../../../../index';
import Create from '../../../../../predicates/create/create';
import Update from '../../../../../predicates/update/update';

export function ToSvgarDrawing(model: File3dm) : Svgar.Drawing {
    let dwg = new Svgar.Drawing(model.applicationName);
    
    // Grab all layers in model
    let layers = model.layers();
    let allLayers: Layer[] = [];
    let objectContainer = new Map<string, File3dmObject[]>();

    for (let i = 0; i < layers.count(); i++) {
        let rLayer = layers.get(i);
        let newLayer = new Svgar.Layer(rLayer.name);

        newLayer.Data["id"] = rLayer.id;
        
        allLayers.push(rLayer);
        objectContainer.set(rLayer.name, [] as File3dmObject[]); 
        dwg.AddLayer(newLayer); 
    }

    // Store all objects in model by layer
    let objects = model.objects();
    let allObjects: File3dmObject[] = [];

    for (let i = 0; i < objects.count; i++) {
        let obj = objects.get(i);
        let atts = obj.attributes();

        let layer = layers.findIndex(atts.layerIndex);

        // TODO: Parse line styles from layer for default state
        let container = objectContainer.get(layer.name);
        if (container) {
            container.push(obj);
        }

        allObjects.push(obj);
    }

    // Determine model extents, explicitly if possible
    let extentsLayer = objectContainer.get("_extents");

    if (extentsLayer) {
        //Use explicit extents
        if (extentsLayer.length > 0) {
            let extentsObj = extentsLayer[0]
            let box = extentsObj.geometry().getBoundingBox();

            Update.Svgar.Drawing(dwg).Extents(box.min, box.max);
        }  
    }
    else {
        // Determine implicit extents (bounding box of all objects)
    }

    // Convert each rhino layer to a svgar drawing layer
    allLayers.forEach(layer => {
        let layerObjects = objectContainer.get(layer.name);

        if(layerObjects) {
            layerObjects.forEach(obj => {

            });
        }
    });

    return dwg;
}