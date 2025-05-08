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
    
select * from pontuacao;