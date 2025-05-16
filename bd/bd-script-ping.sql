create database ping;
use ping;

create table usuario (
	idUsuario int primary key not null auto_increment,
    nome varchar(100) not null,
    email varchar(255) not null,
    senha varchar(255) not null,
    fkJogo int not null,
    fkGenero int not null
);

create table genero (
	idGenero int primary key not null auto_increment,
    nomeGenero varchar(75) not null
);

create table jogo (
	idJogo int primary key not null auto_increment,
    nomeJogo varchar(75) not null
);

create table pontuacao (
	tentativa int not null,
    fkQuiz int not null,
    fkUsuario int not null,
    pontuacao int not null,
    dataHora datetime not null default current_timestamp,
    primary key(tentativa, fkQuiz, fkUsuario)
);

create table quiz (
	idQuiz int primary key not null auto_increment,
    tema varchar(75) not null,
    numPergunta int not null
);

-- FK's
alter table usuario add constraint fkJogo foreign key (fkJogo) references jogo(idJogo);
alter table usuario add constraint fkGenero foreign key (fkGenero) references genero(idGenero);

alter table pontuacao add constraint fkUsuario foreign key (fkUsuario) references usuario(idUsuario);
alter table pontuacao add constraint fkQuiz foreign key (fkQuiz) references quiz(idQuiz);

-- Inserts
insert into jogo (nomeJogo) values
	('A Short Hike'),
	('Celeste'),
	('Cuphead'),
	('Gris'),
	('Hollow Knight'),
	('Inside'),
	('Inscryption'),
	('Journey'),
	('Katana ZERO'),
	('Limbo'),
	('Little Nightmares'),
	('Ori and the Blind Forest'),
	('Outer Wilds'),
	('Oxenfree'),
	('Slay the Spire'),
	('Spiritfarer'),
	('Stardew Valley'),
	('The Witness'),
	('Tunic'),
	('Undertale');
    
insert into genero (nomeGenero) values
	('Plataforma'),
	('Aventura'),
	('Puzzle / Quebra-cabeça'),
	('RPG'),
	('Ação'),
	('Terror'),
	('Simulação'),
	('Metroidvania'),
	('Visual Novel'),
	('Point and Click'),
	('Narrativo / Foco em história'),
	('Estratégia'),
	('Sandbox / Mundo aberto'),
	('Musical / Ritmo'),
	('Experiência Artística');
    
insert into quiz (tema, numPergunta) values 
	('Hollow Knight', 5),
    ('Outer Wilds', 5);
    
SELECT 
            tentativa, 
            tema, 
            pontuacao, 
            dataHora,
            (SELECT SUM(pontuacao) FROM pontuacao WHERE fkUsuario = 6) AS totalAcertos,
            (SELECT SUM(numPergunta) FROM pontuacao p inner join quiz on idQuiz = fkQuiz and fkUsuario = 6) AS totalPerguntas,
            (SELECT MAX(dataHora) FROM pontuacao WHERE fkUsuario = 6) AS ultimaTentativa
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = fkQuiz
        WHERE fkUsuario = 6
        GROUP BY tentativa, tema, pontuacao, dataHora;
        
SELECT 
            tentativa, 
            tema, 
            pontuacao, 
            dataHora,
            (select sum(pontuacao) from pontuacao where fkUsuario = 1 and fkQuiz = 2) as totalAcertos,
            (select count(tentativa) from pontuacao where fkUsuario = 1 and fkQuiz = 2) as totalTentativas,
            numPergunta
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = 2
        WHERE fkUsuario = 1 and fkQuiz = 2
        group by tentativa, tema, pontuacao, dataHora
        order by dataHora;
        
SELECT 
    nomeJogo,
    ROUND((COUNT(idUsuario) / (SELECT COUNT(*) FROM usuario)) * 100, 2) AS porcentagemJogo,
    nomeGenero,
    ROUND((COUNT(idUsuario) / (SELECT COUNT(*) FROM usuario)) * 100, 2) AS porcentagemGenero
FROM usuario
inner JOIN jogo  ON fkJogo = idJogo
inner join genero on fkGenero = idGenero
GROUP BY nomeJogo, nomeGenero;

select * from usuario;

 SELECT 
            nomeJogo,
            ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM usuario), 2) AS porcentagemJogo
        FROM usuario
        JOIN jogo ON fkJogo = idJogo
        GROUP BY nomeJogo;
        
SELECT 
            nomeGenero,
            ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM usuario), 2) AS porcentagemGenero
        FROM usuario
        JOIN genero ON fkGenero = idGenero
        GROUP BY nomeGenero;

select * from pontuacao;
SELECT idUsuario, nome, email, fkJogo as jogo_favorito, fkGenero as genero_favorito,
nomeJogo as jogoFav, nomeGenero as generoFav
FROM usuario
inner join jogo on fkJogo = idJogo
inner join genero on fkGenero = idGenero
WHERE email = 'teste@gmail.com' AND senha = 1234567;

select * from pontuacao;

CREATE USER 'meraki_api'@'%' IDENTIFIED BY 'Meraki@123';
grant select, insert on ping.* to 'meraki_api'@'%';

show grants for 'meraki_api'@'%';