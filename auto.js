var Dattilo;
(function (Dattilo) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        Auto.prototype.ToJSON = function () {
            return { Patente: this.patente, Marca: this.marca, Color: this.color, Precio: this.precio };
        };
        return Auto;
    }());
    Dattilo.Auto = Auto;
})(Dattilo || (Dattilo = {}));
