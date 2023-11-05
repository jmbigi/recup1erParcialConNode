/// <reference path = "auto.ts" />

namespace Apellidoestudiante
{

    export class AutoBD extends Auto
    {
        public foto:string;

        public constructor(patente:string, marca:string, color:string, precio:number, foto:string)
        {
            super(patente, marca, color, precio);
            this.foto = foto;
        }

    }
}