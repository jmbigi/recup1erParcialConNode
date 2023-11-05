"use strict";
var Apellidoestudiante;
(function (Apellidoestudiante) {
    class Auto {
        constructor(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        ToJSON() {
            return { Patente: this.patente, Marca: this.marca, Color: this.color, Precio: this.precio };
        }
    }
    Apellidoestudiante.Auto = Auto;
})(Apellidoestudiante || (Apellidoestudiante = {}));
/// <reference path = "auto.ts" />
var Apellidoestudiante;
(function (Apellidoestudiante) {
    class AutoBD extends Apellidoestudiante.Auto {
        constructor(patente, marca, color, precio, foto) {
            super(patente, marca, color, precio);
            this.foto = foto;
        }
    }
    Apellidoestudiante.AutoBD = AutoBD;
})(Apellidoestudiante || (Apellidoestudiante = {}));
/// <reference path = "autoBD.ts" />
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class Manejadora {
        static AgregarAutoBD() {
            var ruta = "http://localhost:2023/agregarAutoBD";
            var patente = document.getElementById("patente").value;
            var marca = document.getElementById("marca").value;
            var color = document.getElementById("color").value;
            var precio = document.getElementById("precio").value;
            let data = new FormData();
            data.append("patente", patente);
            data.append("marca", marca);
            data.append("color", color);
            data.append("precio", precio);
            //
            // var fotoElement = <HTMLInputElement>document.getElementById("foto");
            // if (fotoElement.files) {
            // data.append("foto", fotoElement.files[0]);
            // }
            /*
            let json = {patente: patente, marca: marca, color: color, precio:precio};
            let data = JSON.stringify(json);
            data = "patente=" + patente + "&marca=" + marca + "&color=" +color + "&precio=" + precio;
            */
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            console.log(data);
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp);
                    }
                    else {
                        console.log("error");
                    }
                }
            };
        }
        static ListarAutosBD() {
            var ruta = "http://localhost:2023/listarAutosBD";
            var xhttp = new XMLHttpRequest();
            alert(ruta);
            xhttp.open("GET", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send();
            var elementoTabla = document.getElementById("divTabla");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        var resultado = JSON.parse(xhttp.responseText);
                        console.log(resultado);
                        var contenidoTabla = "<table>";
                        contenidoTabla += "<tr>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Patente";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Marca";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Color";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "precio";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "acciones";
                        contenidoTabla += "</th>";
                        contenidoTabla += "</tr>";
                        resultado.forEach((elemento) => {
                            contenidoTabla = contenidoTabla + "<tr>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.patente;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.marca;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + `<input type="color" value="${elemento.color}" readonly />`;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.precio;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + `<input type="button" value="Eliminar" id="btn-eliminar" class="btn btn-danger" onclick="RecPrimerParcial.Manejadora.EliminarAutoBD('${elemento.patente}')"/>`;
                            contenidoTabla = contenidoTabla + `<input type="button" value="Modificar" id="btn-editar" class="btn btn-warning" onclick="RecPrimerParcial.Manejadora.EditarAutoBD('${elemento}')"/>`;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "</tr>";
                        });
                        contenidoTabla = contenidoTabla + "</table>";
                        elementoTabla.innerHTML = contenidoTabla;
                    }
                }
            };
        }
    }
    RecPrimerParcial.Manejadora = Manejadora;
})(RecPrimerParcial || (RecPrimerParcial = {}));
/// <reference path = "autoBD.ts" />
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class ManejadoraAutoBDOriginal {
        static AgregarAutoBD() {
            var ruta = "./backend/agregarAutoSinFoto.php";
            var patente = document.getElementById("patente").value;
            var marca = document.getElementById("marca").value;
            var color = document.getElementById("color").value;
            var precio = document.getElementById("precio").value;
            let json = { patente: patente, marca: marca, color: color, precio: precio };
            let data = JSON.stringify(json);
            data = "patente=" + patente + "&marca=" + marca + "&color=" + color + "&precio=" + precio;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            console.log(data);
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp);
                    }
                    else {
                        console.log("error");
                    }
                }
            };
        }
        static ListarAutosBD() {
        }
    }
    RecPrimerParcial.ManejadoraAutoBDOriginal = ManejadoraAutoBDOriginal;
})(RecPrimerParcial || (RecPrimerParcial = {}));
/// <reference path = "auto.ts" />
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class ManejadoraOriginal {
        static AgregarAutoJSON() {
            var ruta = "http://localhost:2023/altaAutoJSON";
            var patente = document.getElementById("patente").value;
            var marca = document.getElementById("marca").value;
            var color = document.getElementById("color").value;
            var precio = document.getElementById("precio").value;
            let json = { patente: patente, marca: marca, color: color, precio: precio };
            let data = JSON.stringify(json);
            data = "patente=" + patente + "&marca=" + marca + "&color=" + color + "&precio=" + precio;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            console.log(data);
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp);
                    }
                    else {
                        console.log("error");
                    }
                }
            };
        }
        static ListarAutosJSON() {
            var ruta = "http://localhost:2023/listadoAutosJSON";
            var xhttp = new XMLHttpRequest();
            alert(ruta);
            xhttp.open("GET", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send();
            var elementoTabla = document.getElementById("divTabla");
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        var resultado = JSON.parse(xhttp.responseText);
                        console.log(resultado);
                        var contenidoTabla = "<table>";
                        contenidoTabla += "<tr>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Patente";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Marca";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "Color";
                        contenidoTabla += "</th>";
                        contenidoTabla += "<th>";
                        contenidoTabla += "precio";
                        contenidoTabla += "</th>";
                        contenidoTabla += "</tr>";
                        resultado.forEach((elemento) => {
                            contenidoTabla = contenidoTabla + "<tr>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.patente;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.marca;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.color;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "<td>";
                            contenidoTabla = contenidoTabla + elemento.precio;
                            contenidoTabla = contenidoTabla + "</td>";
                            contenidoTabla = contenidoTabla + "</tr>";
                        });
                        contenidoTabla = contenidoTabla + "</table>";
                        elementoTabla.innerHTML = contenidoTabla;
                    }
                }
            };
        }
        static VerificarAutoJSON() {
            var ruta = "./backend/verificarAutoJSON.php";
            var patente = document.getElementById("patente").value;
            let json = { patente: patente };
            let data = JSON.stringify(json);
            data = "patente=" + patente;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                    }
                    else {
                        console.log("error");
                    }
                }
            };
        }
    }
    RecPrimerParcial.ManejadoraOriginal = ManejadoraOriginal;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=app.js.map