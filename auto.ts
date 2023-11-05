

namespace Dattilo
{
    export class Auto
    {
        public patente:string;
        public marca:string;
        public color:string;
        public precio:number;


        public constructor(patente:string, marca:string, color:string, precio:number)
        {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }

        public ToJSON()
        {
            return {Patente: this.patente, Marca: this.marca, Color: this.color, Precio: this.precio };
        }


    }


}