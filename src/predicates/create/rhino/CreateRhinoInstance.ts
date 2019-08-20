import rhino3dm, { RhinoModule } from "rhino3dm";

export class CreateRhinoInstance {

    private _rhino!: RhinoModule;
    get Rhino(): RhinoModule {
        if (this._rhino) {
            return this._rhino
        }
        else {
            rhino3dm().then(r => {
                this._rhino = r;
                return this._rhino;
            });
        }
        return this._rhino;
    }

    constructor() {
        rhino3dm().then(r => {
            this._rhino = r;
        })
    }

    Instance() : RhinoModule {
        let rh: any;
        setTimeout(x => {
            rhino3dm().then(r => {
                rh = r;
            })
        }, 500);
        return rh as RhinoModule;


        if (this._rhino == undefined) {
           (async () => {
               await this.GetInstance();
               return this._rhino;
           });
           return this._rhino;
        }
        else {
            return this._rhino;
        }
     }
     
     async GetInstance() {
        rhino3dm().then(r => {
            this._rhino = r;
        })
     }
}