/// <reference path = "auto.ts" />


namespace RecPrimerParcial
{
    export class ManejadoraOriginal
    {

        public static AgregarAutoJSON()
        {
            
            var ruta= "http://localhost:2023/altaAutoJSON";
    
            var patente = (<HTMLInputElement>document.getElementById("patente")).value;
            var marca = (<HTMLInputElement>document.getElementById("marca")).value;
            var color = (<HTMLInputElement>document.getElementById("color")).value;
            var precio = (<HTMLInputElement>document.getElementById("precio")).value;
    
            let json = {patente: patente, marca: marca, color: color, precio:precio};
            let data = JSON.stringify(json);
            data = "patente=" + patente + "&marca=" + marca + "&color=" +color + "&precio=" + precio;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
        public static ListarAutosJSON()
        {
            var ruta :string = "http://localhost:2023/listadoAutosJSON"; 
            var xhttp = new XMLHttpRequest();
            alert(ruta);
            xhttp.open("GET", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
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
                
                
            }
            
        }
        public static VerificarAutoJSON()
        {
            var ruta :string = "./backend/verificarAutoJSON.php";
            var patente = (<HTMLInputElement>document.getElementById("patente")).value;
            
            let json = {patente: patente};
            let data = JSON.stringify(json);
            data = "patente=" + patente;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", ruta, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(data);
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4) 
                {
                  if (xhttp.status === 200) 
                  {
                      alert(xhttp.responseText);
                      console.log(xhttp.responseText);
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