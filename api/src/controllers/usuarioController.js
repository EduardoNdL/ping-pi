var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                            jogoFav: resultadoAutenticar[0].jogoFav,
                            generoFav: resultadoAutenticar[0].generoFav,
                            fotoPerfil: resultadoAutenticar[0].fotoPerfil
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkJogo = req.body.jogoFavServer;
    var fkGenero = req.body.genFavServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkJogo == undefined) {
        res.status(400).send("Seu jogo favorito está undefined!");
    } else if (fkGenero == undefined) {
        res.status(400).send("Seu genero favorito está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, fkJogo, fkGenero)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    const userId = req.body.userId;
    const fotoUser = req.body.fotoUsuario;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    const imagemPerfil = req.file ? req.file.filename : fotoUser;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (userId == undefined) {
        res.status(400).send("Seu id está undefined!");
    }

    usuarioModel.atualizar(nome, email, userId, imagemPerfil)
        .then(
            function (resultado) {
                res.status(200).json({ message: "Perfil atualizado com sucesso!", data: resultado,
                     usuario: {
                        imagemPerfil: imagemPerfil,
                        nomePerfil: nome,
                        emailPerfil: email
                     }});
            }
        ).catch(
            function (erro) {
                console.log(erro);
                if (erro instanceof multer.MulterError) {
                    return res.status(400).json({ message: erro.message });
                }
                console.log(
                    "\nHouve um erro ao atualizar o usuário! Erro: ",
                    erro.sqlMessage

                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    atualizar
}