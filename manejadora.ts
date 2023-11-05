/// <reference path = "autoBD.ts" />

namespace RecPrimerParcial
{
    export class Manejadora
    {
        public static AgregarAutoBD()
        {
            var ruta= "http://localhost:2023/agregarAutoBD";
    
            var patente = (<HTMLInputElement>document.getElementById("patente")).value;
            var marca = (<HTMLInputElement>document.getElementById("marca")).value;
            var color = (<HTMLInputElement>document.getElementById("color")).value;
            var precio = (<HTMLInputElement>document.getElementById("precio")).value;
    
            let data = new FormData();
            data.append("patente", patente);
            data.append("marca", marca);
            data.append("color", color);
            data.append("precio", precio);

            /*
            // let json = {patente: patente, marca: marca, color: color, precio:precio};
            // let data = JSON.stringify(json);
            let data = "patente=" + patente + "&marca=" + marca + "&color=" +color + "&precio=" + precio;
            */

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            
            // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            console.log(data);
    
            xhttp.send(data);
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4) 
                {
                  if (xhttp.status === 200) 
                  {
                      alert(xhttp.responseText);
                      console.log(xhttp);
                  }
                  else
                  {
                    console.log("error");
                  }
                }
                
            }
    
        
        }
    
        public static ListarAutosBD()
        {
            var ruta= "http://localhost:2023/listarAutosBD";
            console.log("version 3");
            var xhttp = new XMLHttpRequest();
            alert(ruta);
            xhttp.open("GET", ruta, true);
            // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            xhttp.send();
            
            var elementoTabla = <HTMLInputElement>document.getElementById("divTabla");
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4) 
                {
                  if (xhttp.status === 200) 
                  {
                      
                      var resultado =JSON.parse( xhttp.responseText);
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
                      resultado.forEach((elemento: any) => {
                      
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
                
                
            }
            
        }

        public static AgregarAutoFotoBD()
        {
            var ruta= "http://localhost:2023/agregarAutoFotoBD";
    
            var patente = (<HTMLInputElement>document.getElementById("patente")).value;
            var marca = (<HTMLInputElement>document.getElementById("marca")).value;
            var color = (<HTMLInputElement>document.getElementById("color")).value;
            var precio = (<HTMLInputElement>document.getElementById("precio")).value;
    
            let data = new FormData();
            data.append("patente", patente);
            data.append("marca", marca);
            data.append("color", color);
            data.append("precio", precio);
            //
            var fotoElement = <HTMLInputElement>document.getElementById("foto");
            if (fotoElement?.files) {
                data.append("foto", fotoElement.files[0]);
            }    

            /*
            // let json = {patente: patente, marca: marca, color: color, precio:precio};
            // let data = JSON.stringify(json);
            let data = "patente=" + patente + "&marca=" + marca + "&color=" +color + "&precio=" + precio;
            */

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            
            // xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            console.log(data);
    
            xhttp.send(data);
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4) 
                {
                  if (xhttp.status === 200) 
                  {
                      alert(xhttp.responseText);
                      console.log(xhttp);
                  }
                  else
                  {
                    console.log("error");
                  }
                }
                
            }
    
        
        }

    }
}