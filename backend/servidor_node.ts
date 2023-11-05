
// const express = require("express");

import { json } from "stream/consumers";

// const app = express();

// const fs = require("fs");

// app.use(express.json());

// const cors = require("cors");

// app.use(cors());

// const path_archivo = "./archivos/productos_fotos.txt";

// // Establecer puertos.
// app.set("puerto",8008);
// app.listen(app.get("puerto"), ()=> 
// {
//     console.log("servidor corriendo sobre puerto", app.get("puerto"));
// });

// // Establecer una ruta.
// // / raiz.

// app.get('/', (request:any, response:any)=>
// {

// });

// app.post('/', (request:any, response:any)=>
// {

// });

// app.put('/', (request:any, response:any)=>
// {
//     response.send("PUT - servidor - NodeJS");
// });

// app.delete('/', (request:any, response:any)=>
// {
//     response.send("DELETE - servidor - NodeJS");
// });

// // A PRODUCTOS.

// app.get('/productos', (request:any, response:any)=>
// {
//     fs.readFile(path_archivo, "UTF-8", (error:any, contenido:any)=>
//     {
//         if (error)
//         {
//             throw ("No se pudo leer el archivo.");
//         }
//         let array = contenido.split(",\r\n");
//         response.send(JSON.stringify(array));
//     });
// });

// app.post('/productos', (request:any, response:any)=>
// {
//     let dato = request.body;
//     let contenido = JSON.stringify(dato);

//     fs.appendFile(path_archivo, contenido + ",\r\n", (err:any) =>
//     {
//         if(err)
//         {
//             throw("error al intentar escribir en el archivo."); 
//         }

//         console.log("Archivo escrito correctamente.");
//         response.send("archivo escrito correctamente.");
//     });
// });

// app.put('/productos', (request:any, response:any)=>{   
//     let obj = request.body;

//     fs.readFile(path_archivo, "UTF-8", (err:any, contenido:any) => {
//         if (err) {
//             throw ("Error al leer el archivo.");
//         }

//         let array = contenido.split(",\r\n");
//         let productosString = "";

//         array.forEach((item:any) => {
//             if (item != "" && item != undefined) {
//                 let itemObj = JSON.parse(item);

//                 if (itemObj.codigo == obj.codigo) {
//                     itemObj.marca = obj.marca;
//                     itemObj.precio = obj.precio;
//                 }

//                 productosString += JSON.stringify(itemObj) + ",\r\n";
//             }
//         });

//         fs.writeFile(path_archivo, productosString, (err:any) => {
//             if (err) {
//                 throw ("Error al escribir el archivo.");
//             }

//             console.log("Archivo escrito exitosamente.");
//             response.send("Archivo escrito exitosamente.");
//         });
//     });
// });

// app.delete('/productos', (request:any, response:any)=>
// {
//     let obj = request.body;
//     let productosString = "";

//     fs.readFile(path_archivo, "UTF-8", (error:any, contenido:any)=>
//     {
//         if (error)
//         {
//             throw("No se pudo leer el archivo.");
//         }
//         let array = contenido.split(',\r\n');


//         array.forEach((item:any)=>
//         {
//             if (item != "" && item != undefined)
//             {
//                 let itemObj = JSON.parse(item);

//                 if (itemObj.codigo != obj.codigo)
//                 {
//                     productosString += JSON.stringify(itemObj) + ",\r\n";
//                 }
//             }
//         });
//     });
//     fs.writeFile(path_archivo, productosString, (error:any) =>
//     {
//         if (error)
//         {
//             throw ("No se pudo escribir en el archivo");
//         }

//         console.log("Archivo escrito.");
//         response.send("Archivo escrito.");
//     });
// });

const express = require('express');

const app = express();
const mysql = require("mysql");
const expressMyConnection = require("express-myconnection");
const opciones = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'productos_node'
};
app.use(expressMyConnection(mysql, opciones, 'single'));
app.get('/productos_db', (req: any, res: any) => {
    req.getConnection((error: any, conexion: any) => {
        if (error) {
            throw ("Ha ocurrido un error al conectarse a la base de datos");
        }
        // res.send('conexion exitosa');

        conexion.query('SELECT * FROM productos', (error: any, resultado: any) => {
            if (error) {
                throw ("Hubo un error en la consulta.");
            }
            res.send(JSON.stringify(resultado));
        });
    });
});


// const fs = require("fs");

// app.use(express.json());

app.set('puerto', 8008);

//AGREGO CORS (por default aplica a todos los 'origin')
const cors = require("cors");

//AGREGO MW 
app.use(cors());

/*
let listaBlanca = ["http://localhost", "http://127.0.0.1", "http://mi_host.com"];

let corsOptions = {
    origin: (origin:any, callback:any)=>{
        if(listaBlanca.indexOf(origin) != -1)
            callback(null, true);
        else
            callback(new Error("no permitido por CORS."));
    }
}
routes.get("/", cors(corsOptions), (request:any, response:any)=>{
    response.send("Solo accedia si se encuentra en la 'lista blanca'");
});
*/

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));

//RUTAS
// app.get('/', (request:any, response:any)=>{
//     response.send('GET - servidor NodeJS');
// });

app.post('/', (request: any, response: any) => {
    response.send('POST - servidor NodeJS');
});

app.put('/', (request: any, response: any) => {
    response.send('PUT - servidor NodeJS');
});

app.delete('/', (request: any, response: any) => {
    response.send('DELETE - servidor NodeJS');
});


//AGREGO FILE SYSTEM
const fs = require('fs');

//AGREGO JSON
app.use(express.json());

//INDICO RUTA HACIA EL ARCHIVO
const path_archivo = "./archivos/productos.txt";

//INDICO RUTA PARA EL ARCHIVO PRODUCTOS-FOTOS
const path_archivo_foto = "./archivos/productos_fotos.txt";

//AGREGO MULTER
const multer = require('multer');

//AGREGO MIME-TYPES
const mime = require('mime-types');

//AGREGO STORAGE
const storage = multer.diskStorage({

    destination: "public/fotos/",
});

const upload = multer({

    storage: storage
});


app.post('/productos_db', upload.single("foto"), (request: any, response: any) => {
    //console.log(request.file);

    let file = request.file;
    let extension = mime.extension(file.mimetype);
    console.log(request.body.obj);
    let obj = JSON.parse(request.body.obj);
    let path: string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    let contenido = JSON.stringify(obj) + ",\r\n";

    request.getConnection((error: any, conexion: any) => {
        if (error) {
            throw ("error");
        }
        conexion.query("INSERT INTO productos SET ?", [obj], (error: any, res: any) => {
            if (error) {
                throw ("Error en la consulta");
            }
            response.send("Producto agregado correctamente");
        });
    });
});


app.put('/productos_db', upload.single("foto"), (request: any, response: any) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path: string = file.destination + obj.codigo + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    let obj_modif: any = {};
    obj_modif.marca = obj.marca;
    obj_modif.precio = obj.precio;
    obj_modif.path = obj.path;
    request.getConnection((error: any, conexion: any) => {
        if (error) {
            throw ("error");
        }
        conexion.query("UPDATE productos SET ? WHERE codigo = ?", [obj_modif, obj.codigo], (error: any, res: any) => {
            if (error) {
                throw ("Error en la consulta");
            }
            response.send("Producto modificado correctamente");
        });
    });
});

app.delete('/productos_db', (request: any, response: any) => {
    let obj = request.body;
    let path_foto: string = "public/";

    request.getConnection((error: any, conexion: any) => {
        if (error) {
            throw ("error");
        }
        conexion.query("SELECT path FROM productos WHERE codigo = ?", [obj.codigo], (error: any, res: any) => {
            if (error) {
                throw ("Error en la consulta");
            }
            path_foto += res[0].path;
            
        });
    });

    request.getConnection((error: any, conexion: any) => {
        if (error) {
            throw ("error");
        }
        conexion.query("DELETE FROM productos WHERE codigo = ?", [obj.codigo], (error: any, res: any) => {
            if (error) {
                throw ("Error en la consulta");
            }
            fs.unlink(path_foto, (err: any) => {
                if (err) {
                    throw ("No se pudo borrar");
                }
                response.send("Producto borrado correctamente");
            });
        });
    });

});

//##############################################################################################//
//RUTAS PARA EL CRUD ARCHIVOS
//##############################################################################################//

//LISTAR
// app.get('/productos', (request:any, response:any)=>{

//     fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

//         if(err) throw("Error al intentar leer el archivo.");

//         console.log("Archivo leído.");

//         let prod_array = archivo.split(",\r\n");

//         response.send(JSON.stringify(prod_array));
//     });
// });

//AGREGAR
app.post('/productos', (request: any, response: any) => {

    let dato = request.body;
    let contenido = JSON.stringify(dato) + ",\r\n";

    //agrega texto
    fs.appendFile(path_archivo, contenido, (err: any) => {

        if (err) throw ("Error al intentar agregar en archivo.");

        console.log("Archivo escrito.");

        response.send("Archivo producto escrito.");
    });

});

//MODIFICAR
app.put('/productos', (request: any, response: any) => {

    let obj = request.body;

    fs.readFile(path_archivo, "UTF-8", (err: any, archivo: any) => {

        if (err) throw ("Error al intentar leer el archivo.");

        let prod_array = archivo.split(",\r\n");

        let productos_string: string = "";

        prod_array.forEach((prod_str: any) => {

            if (prod_str != "" && prod_str != undefined) {

                let prod = JSON.parse(prod_str);

                if (prod.codigo == obj.codigo) {

                    prod.marca = obj.marca;
                    prod.precio = obj.precio;
                }

                productos_string += JSON.stringify(prod) + ",\r\n";
            }
        });

        //escribe texto
        fs.writeFile(path_archivo, productos_string, (err: any) => {

            if (err) throw ("Error al intentar escribir en archivo.");

            console.log("Archivo modificado.");

            response.send("Archivo producto modificado.");
        });
    });
});

//ELIMINAR
app.delete('/productos', (request: any, response: any) => {

    let obj = request.body;

    fs.readFile(path_archivo, "UTF-8", (err: any, archivo: any) => {

        if (err) throw ("Error al intentar leer el archivo.");

        let prod_array = archivo.split(",\r\n");

        let productos_string: string = "";

        prod_array.forEach((prod_str: any) => {

            if (prod_str != "" && prod_str != undefined) {

                let prod = JSON.parse(prod_str);

                if (prod.codigo != obj.codigo) {

                    //se agregan todos los productos, menos el que se quiere eliminar
                    productos_string += JSON.stringify(prod) + ",\r\n";
                }
            }
        });

        //escribe texto
        fs.writeFile(path_archivo, productos_string, (err: any) => {

            if (err) throw ("Error al intentar escribir en archivo.");

            console.log("Archivo eliminado.");

            response.send("Archivo producto eliminado.");
        });

    });
});

//##############################################################################################//
//RUTAS PARA EL CRUD - CON FOTOS -
//##############################################################################################//

//LISTAR
app.get('/productos_fotos', (request: any, response: any) => {

    fs.readFile(path_archivo_foto, "UTF-8", (err: any, archivo: any) => {

        if (err) throw ("Error al intentar leer el archivo con foto.");

        console.log("Archivo leído con foto.");

        let prod_array = archivo.split(",\r\n");

        response.send(JSON.stringify(prod_array));

    });

});

//AGREGAR
app.post('/productos_fotos', upload.single("foto"), (request: any, response: any) => {
    //console.log(request.file);

    let file = request.file;
    let extension = mime.extension(file.mimetype);

    console.log(request.body.obj);

    let obj = JSON.parse(request.body.obj);
    let path: string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    let contenido = JSON.stringify(obj) + ",\r\n";

    //agrega texto
    fs.appendFile(path_archivo_foto, contenido, (err: any) => {

        if (err) throw ("Error al intentar agregar en archivo con foto.");

        console.log("Archivo escrito con foto.");

        response.send("Archivo producto escrito - con foto.");
    });

});

//MODIFICAR
app.put('/productos_fotos', upload.single("foto"), (request: any, response: any) => {

    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.obj);
    let path: string = file.destination + obj.codigo + "." + extension;

    fs.renameSync(file.path, path);

    obj.path = path.split("public/")[1];

    fs.readFile(path_archivo_foto, "UTF-8", (err: any, archivo: any) => {

        if (err) throw ("Error al intentar leer el archivo con foto.");

        let prod_array = archivo.split(",\r\n");

        let productos_string: string = "";

        prod_array.forEach((prod_str: any) => {

            if (prod_str != "" && prod_str != undefined) {

                let prod = JSON.parse(prod_str);

                if (prod.codigo == obj.codigo) {

                    prod.marca = obj.marca;
                    prod.precio = obj.precio;
                }

                productos_string += JSON.stringify(prod) + ",\r\n";
            }
        });

        //escribe texto
        fs.writeFile(path_archivo_foto, productos_string, (err: any) => {

            if (err) throw ("Error al intentar escribir en archivo.");

            console.log("Archivo modificado con foto.");

            response.send("Archivo producto modificado con foto.");
        });
    });
});

//ELIMINAR
app.delete('/productos_fotos', (request: any, response: any) => {

    let obj = request.body;

    fs.readFile(path_archivo_foto, "UTF-8", (err: any, archivo: any) => {

        if (err) throw ("Error al intentar leer el archivo con foto.");

        let prod_array = archivo.split(",\r\n");

        let productos_string: string = "";

        let path_foto: string = "public/";

        prod_array.forEach((prod_str: any) => {

            if (prod_str != "" && prod_str != undefined) {

                let prod = JSON.parse(prod_str);

                if (prod.codigo != obj.codigo) {

                    //se agregan todos los productos, menos el que se quiere eliminar
                    productos_string += JSON.stringify(prod) + ",\r\n";
                }
                else {
                    //se guarda el path de la foto a ser eliminada
                    path_foto += prod.path;
                }
            }
        });

        if (path_foto !== "public/") {

            //escribe texto
            fs.writeFile(path_archivo_foto, productos_string, (err: any) => {

                if (err) throw ("Error al intentar escribir en archivo con foto.");

                console.log("Archivo eliminado con foto.");

                fs.unlink(path_foto, (err: any) => {
                    if (err) throw err;
                    console.log(path_foto + ' fue borrado.');
                });

                response.send("Archivo producto con foto eliminado.");
            });
        }
    });
});

//BONUS TRACK - AGREGAR ARCHIVOS MÚLTIPLES
app.post('/test_fotos_multiples', upload.array("fotos"), (request: any, response: any) => {
    console.log(request.files);

    let files = request.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let extension = mime.extension(file.mimetype);
        let path: string = file.destination + "__foto__" + i + "." + extension;

        fs.renameSync(file.path, path);
    }

    response.send("Archivos múltiples subidos exitosamente!!!");

});
app.listen(app.get('puerto'), () => {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});

