/// <reference path = "autoBD.ts" />
var RecPrimerParcial;
(function (RecPrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarAutoBD = function () {
            var ruta = "./backend/agregarAutoSinFoto.php";
            var patente = document.getElementById("patente").value;
            var marca = document.getElementById("marca").value;
            var color = document.getElementById("color").value;
            var precio = document.getElementById("precio").value;
            var json = { patente: patente, marca: marca, color: color, precio: precio };
            var data = JSON.stringify(json);
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
        };
        Manejadora.ListarAutosBD = function () {
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
                        contenidoTabla += "</tr>";
                        resultado.forEach(function (elemento) {
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
        };
        return Manejadora;
    }());
    RecPrimerParcial.Manejadora = Manejadora;
})(RecPrimerParcial || (RecPrimerParcial = {}));
