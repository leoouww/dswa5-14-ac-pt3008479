module.exports = function (app) {
   var Curso = app.models.curso;
   var controller = app.controllers.curso;
   var sanitize = require('mongo-sanitize');

   controller.listaCursos = function (req, res) {
      Curso.find()
         .exec()
         .then(
            function (cursos) {
               res.json(cursos);
            },
            function (erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
         );
   };

   controller.obtemCurso = function (req, res) {
      var _id = req.params.id;
      Curso.findById(_id)
         .exec()
         .then(
            function (curso) {
               if (!curso) throw new Error('Curso não encontrado');
               res.json(curso);
            },
            function (erro) {
               console.log(erro);
               res.status(404).json(erro);
            }
         );
   };

   controller.removeCurso = function (req, res) {
      var _id = sanitize(req.params.id);
      Curso.remove({ "_id": _id })
         .exec()
         .then(
            function () {
               res.end();
            },
            function (erro) {
               return console.error(erro);
            }
         );
   };

   controller.salvaCurso = function (req, res) {
      var _id = req.body._id;
      var dados = {
         "curso" : req.body.curso,
         "orientador" : req.body.orientador,
         "emergencia" : req.body.emergencia || null
      };
      if (_id) {
         Curso.findByIdAndUpdate(_id, dados)
            .exec()
            .then(
               function (curso) {
                  res.json(curso);
               },
               function (erro) {
                  console.error(erro);
                  res.status(500).json(erro);
               }
            );
      } else {
         Curso.create(dados).then(
            function (curso) {
               res.status(201).json(curso);
            },
            function (erro) {
               console.log(erro);
               res.status(500).json(erro);
            }
         );
      }
   };

   return controller;
};
