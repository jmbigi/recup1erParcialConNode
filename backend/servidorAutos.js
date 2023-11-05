var express = require('express');
var app = express();
app.set('puerto', 2023);
app.use(express.static("public"));
//AGREGO FILE SYSTEM
var fs = require('fs');
//AGREGO JSON
app.use(express.json());
// urlencoded sirve solo si no utilizamos formData y codificamos sendData como querystring
// app.use(express.urlencoded({ extended: false }));
//
//AGREGO MULTER
var multer = require('multer');
//AGREGO MIME-TYPES
var mime = require('mime-types');
//AGREGO STORAGE
var storage = multer.diskStorage({
    destination: "public/autos/fotos/",
});
var upload = multer({
    storage: storage
});
//AGREGO MYSQL y EXPRESS-MYCONNECTION
var mysql = require('mysql');
var myconn = require('express-myconnection');
var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'garage_bd'
};
//AGREGO MW 
app.use(myconn(mysql, db_options, 'single'));
//AGREGO CORS (por default aplica a http://localhost)
var cors = require("cors");
//AGREGO MW 
app.use(cors());
//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));
//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD - AUTOS
//##############################################################################################//
//AGREGAR BD
app.post('/agregarAutoBD', upload.any(), function (request, response) {
    request.getConnection(function (err, conn) {
        var obj = request.body;
        console.log(request.body);
        var obj_rta = {};
        obj_rta.exito = true;
        obj_rta.mensaje = "Auto agregado en BD";
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
            response.send(JSON.stringify(obj_rta));
        }
        else {
            conn.query("insert into autos set ?", [obj], function (err, rows) {
                if (err) {
                    console.log(err);
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error en consulta de base de datos.";
                }
                else {
                    console.log(rows);
                }
                response.send(JSON.stringify(obj_rta));
            });
        }
    });
});
//LISTAR BD
app.get('/listarAutosBD', function (request, response) {
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("select patente, marca, color, precio from autos", function (err, rows) {
            if (err)
                throw ("Error en consulta de base de datos.");
            response.send(JSON.stringify(rows));
        });
    });
});
//MODIFICAR BD
app.post('/modificarAutoBD', function (request, response) {
    var obj = request.body;
    var obj_rta = {};
    obj_rta.exito = true;
    obj_rta.mensaje = "Auto modificado en BD";
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            conn.query("update autos set ? where patente = ?", [obj, obj.patente], function (err, rows) {
                if (err) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error en consulta de base de datos.";
                }
            });
        }
        response.send(JSON.stringify(obj_rta));
    });
});
//ELIMINAR BD
app.post('/eliminarAutoBD', function (request, response) {
    var obj = request.body;
    var obj_rta = {};
    obj_rta.exito = true;
    obj_rta.mensaje = "Auto eliminado en BD";
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            conn.query("delete from Autos where patente = ?", [obj.patente], function (err, rows) {
                if (err) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error en consulta de base de datos.";
                }
            });
        }
        response.send(JSON.stringify(obj_rta));
    });
});
//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD - AUTOS con FOTO
//##############################################################################################//
//LISTAR BD - autos con foto
app.get('/listarAutoFotosBD', function (request, response) {
    request.getConnection(function (err, conn) {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("select patente, marca, color, precio, foto from autos", function (err, rows) {
            if (err)
                throw ("Error en consulta de base de datos.");
            response.send(JSON.stringify(rows));
        });
    });
});
//AGREGAR BD - Auto con foto
app.post('/agregarAutoFotoBD', upload.single("foto"), function (request, response) {
    console.log('POST', '/agregarAutoFotoBD');
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = request.body;
    var path = file.destination + obj.patente + "." + extension;
    fs.renameSync(file.path, path);
    obj.foto = path.split("public/")[1];
    var obj_rta = {};
    obj_rta.exito = true;
    obj_rta.mensaje = "Auto con foto agregado en BD";
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            conn.query("insert into autos set ?", [obj], function (err, rows) {
                if (err) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error en consulta de base de datos.";
                }
                else {
                    console.log(rows);
                }
            });
        }
    });
    response.send(JSON.stringify(obj_rta));
});
//MODIFICAR BD - Auto con foto
app.post('/modificarAutoFotoBD', upload.single("foto"), function (request, response) {
    var file = request.file;
    var extension = mime.extension(file.mimetype);
    var obj = JSON.parse(request.body.autoFoto_json);
    var path = file.destination + obj.patente + "." + extension;
    fs.renameSync(file.path, path);
    var obj_modif = {};
    //para excluir la pk (patente)
    obj_modif.marca = obj.marca;
    obj_modif.color = obj.color;
    obj_modif.precio = obj.precio;
    obj_modif.foto = path.split("public/")[1];
    var obj_rta = {};
    obj_rta.exito = true;
    obj_rta.mensaje = "Auto con foto modificado en BD";
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            conn.query("update autos set ? where patente = ?", [obj_modif, obj.patente], function (err, rows) {
                if (err) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error en consulta de base de datos.";
                }
            });
        }
        response.send(JSON.stringify(obj_rta));
    });
});
//ELIMINAR BD - Auto con foto
app.post('/eliminarAutoFotoBD', function (request, response) {
    var obj = request.body;
    var path_foto = "public/";
    var obj_rta = {};
    obj_rta.exito = true;
    obj_rta.mensaje = "Auto con foto eliminado en BD";
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            //obtengo el path de la foto del producto a ser eliminado
            conn.query("select foto from autos where patente = ?", [obj.patente], function (err, result) {
                if (err) {
                    obj_rta.exito = false;
                    obj_rta.mensaje = "Error al conectarse a la base de datos.";
                }
                else {
                    path_foto += result[0].foto;
                }
            });
        }
    });
    request.getConnection(function (err, conn) {
        if (err) {
            obj_rta.exito = false;
            obj_rta.mensaje = "Error al conectarse a la base de datos.";
        }
        else {
            conn.query("delete from autos where patente = ?", [obj.patente], function (err, rows) {
                fs.unlink(path_foto, function (err) {
                    if (err) {
                        obj_rta.exito = false;
                        obj_rta.mensaje = "Error al eliminar foto.";
                    }
                });
            });
        }
        response.send(JSON.stringify(obj_rta));
    });
});
app.listen(app.get('puerto'), function () {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
