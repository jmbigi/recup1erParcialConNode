/// <reference path = "autoBD.ts" />

namespace RecPrimerParcial
{
    export class ManejadoraAutoBDOriginal
    {
        public static AgregarAutoBD()
        {
            var ruta= "./backend/agregarAutoSinFoto.php";
    
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
    
        public static ListarAutosBD()
        {
    
        }

    }
}