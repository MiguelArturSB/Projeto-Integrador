create database DataBase_Prof_Tereza_Costa;


use DataBase_Prof_Tereza_Costa;




#cria a tabela do Professor
create table Professores (
	ID_professor int auto_increment primary key,
	nome_professor varchar(100) not null,
	materia varchar(100) not null,
    turma_professor varchar(100) not null,
	qntd_aula int,
    aulas_dadas int,
	cpf_professor varchar(14) null unique ,
	senha_professor varchar(100) not null

);



#cria a tabela do aluno
create table Alunos (
	ID_aluno int auto_increment primary key,
	nome_aluno varchar(100) not null,
    turma varchar(100) not null,
    RA_aluno varchar(11) null unique,
    senha_aluno varchar(100) not null
);



#cria a tabela do Coordenador
create table Coordenador (
	ID_coordenador int auto_increment primary key,
	cpf_coordenador varchar(14) null unique ,
	senha_coordenador varchar(100) not null,
    
    #parte da chave estrangeira onde pegar os dos professores e alunos
    ID_professor int,
    ID_aluno int,
    FOREIGN KEY (ID_professor) REFERENCES Professores(ID_professor)
    ON delete cascade
    ON UPDATE RESTRICT,
    FOREIGN KEY (ID_aluno) REFERENCES alunos(ID_aluno)
    ON delete cascade
    ON UPDATE RESTRICT
);



create table freq_aulas (
	ID_freq int auto_increment primary key,
	freq_LER int default 0,
	freq_ARI int default 0,
    freq_LOPAL int default 0,
    freq_PBE int default 0,
    freq_SOP int default 0,
    
    #parte da chaver estrangeira onde pegar os dos professores e alunos
	ID_professor int,
    ID_aluno int,
    FOREIGN KEY (ID_professor) REFERENCES Professores(ID_professor)
    ON delete cascade
    ON UPDATE RESTRICT,
    FOREIGN KEY (ID_aluno) REFERENCES alunos(ID_aluno)
    ON delete cascade
    ON UPDATE RESTRICT
);




#inserir os dados do Coordenador
insert into Coordenador (cpf_coordenador, senha_coordenador, ID_professor, ID_aluno)
values ('99911111111', 'senha123', 1, 1),('99922222222', 'senha123', 2, 2),('99933333333', 'senha123', 3, 3);


#inserir os dados dos Professores
insert into Professores (nome_professor, materia,turma_professor, qntd_aula,aulas_dadas, cpf_professor, senha_professor) values
('Carlos Silva', 'LER','2md', 96,0, '11111111111', 'senha123'),
('Ana Costa', 'ARI','2md', 96,0, '22222222222', 'senha123'),
('João Souza', 'LOPAL','2md', 96,0, '33333333333', 'senha123'),
('Marina Dias', 'PBE','2md', 96,0, '44444444444', 'senha123'),
('Pedro Rocha', 'SOP','2md', 96,0, '55555555555', 'senha123'),

('Lucas Almeida', 'LER','2td', 96,48, '66666666666', 'senha123'),
('Bianca Martins', 'ARI','2td', 96,48, '77777777777', 'senha123'),
('Rafael Mendes', 'LOPAL','2td', 96,48, '88888888888', 'senha123'),
('Juliana Freitas', 'PBE','2td', 96,48, '99999999999', 'senha123'),
('Thiago Nunes', 'SOP','2td', 96,48, '12222222222', 'senha123'),

('Fernanda Lima', 'LER','2nd', 96,0, '23333333333', 'senha123'),
('Marcelo Tavares', 'ARI','2nd', 96,0, '34444444444', 'senha123'),
('Patrícia Ramos', 'LOPAL','2nd', 96,0, '45555555555', 'senha123'),
('Gustavo Ferreira', 'PBE','2nd', 96,0, '56666666666', 'senha123'),
('Camila Andrade', 'SOP','2nd', 96,0, '67777777777', 'senha123');



#inserir os dados dos Alunos
insert into alunos (nome_aluno, turma, RA_aluno, senha_aluno) values
-- Turma 2md
('Lucas Oliveira', '2md', '10000000001', 'senha123'),
('Maria Eduarda Souza', '2md', '10000000002', 'senha123'),
('João Pedro Lima', '2md', '10000000003', 'senha123'),
('Ana Beatriz Costa', '2md', '10000000004', 'senha123'),
('Gabriel Fernandes', '2md', '10000000005', 'senha123'),
('Larissa Rocha', '2md', '10000000006', 'senha123'),
('Pedro Henrique Dias', '2md', '10000000007', 'senha123'),
('Isabela Martins', '2md', '10000000008', 'senha123'),
('Matheus Almeida', '2md', '10000000009', 'senha123'),
('Julia Ribeiro', '2md', '10000000010', 'senha123'),

-- Turma 2td
('Felipe Cardoso', '2td', '10000000011', 'senha123'),
('Carolina Pires', '2td', '10000000012', 'senha123'),
('Bruno Santos', '2td', '10000000013', 'senha123'),
('Letícia Nunes', '2td', '10000000014', 'senha123'),
('Rafael Teixeira', '2td', '10000000015', 'senha123'),
('Amanda Duarte', '2td', '10000000016', 'senha123'),
('Vinícius Gomes', '2td', '10000000017', 'senha123'),
('Beatriz Carvalho', '2td', '10000000018', 'senha123'),
('Henrique Melo', '2td', '10000000019', 'senha123'),
('Camila Araújo', '2td', '10000000020', 'senha123'),

-- Turma 2nd
('Thiago Barbosa', '2nd', '10000000021', 'senha123'),
('Marina Castro', '2nd', '10000000022', 'senha123'),
('Eduardo Silveira', '2nd', '10000000023', 'senha123'),
('Natália Lima', '2nd', '10000000024', 'senha123'),
('André Pereira', '2nd', '10000000025', 'senha123'),
('Bianca Moraes', '2nd', '10000000026', 'senha123'),
('Diego Mendes', '2nd', '10000000027', 'senha123'),
('Fernanda Leal', '2nd', '10000000028', 'senha123'),
('Rodrigo Tavares', '2nd', '10000000029', 'senha123'),
('Daniela Farias', '2nd', '10000000030', 'senha123');





#inserir os dados das frequencia deles
insert into freq_aulas (freq_LER, freq_ARI, freq_LOPAL, freq_PBE, freq_SOP, ID_professor, ID_aluno) values

-- Aluno 1 -2md
(0, 0, 0, 0, 0, 1, 1),
(0, 0, 0, 0, 0, 2, 1),
(0, 0, 0, 0, 0, 3, 1),
(0, 0, 0, 0, 0, 4, 1),
(0, 0, 0, 0, 0, 5, 1),

-- Aluno 2 -2md
(0, 0, 0, 0, 0, 1, 2),
(0, 0, 0, 0, 0, 2, 2),
(0, 0, 0, 0, 0, 3, 2),
(0, 0, 0, 0, 0, 4, 2),
(0, 0, 0, 0, 0, 5, 2),

-- Aluno 3 -2md
(0, 0, 0, 0, 0, 1, 3),
(0, 0, 0, 0, 0, 2, 3),
(0, 0, 0, 0, 0, 3, 3),
(0, 0, 0, 0, 0, 4, 3),
(0, 0, 0, 0, 0, 5, 3),

-- Aluno 4 -2md
(0, 0, 0, 0, 0, 1, 4),
(0, 0, 0, 0, 0, 2, 4),
(0, 0, 0, 0, 0, 3, 4),
(0, 0, 0, 0, 0, 4, 4),
(0, 0, 0, 0, 0, 5, 4),

-- Aluno 5 -2md
(0, 0, 0, 0, 0, 1, 5),
(0, 0, 0, 0, 0, 2, 5),
(0, 0, 0, 0, 0, 3, 5),
(0, 0, 0, 0, 0, 4, 5),
(0, 0, 0, 0, 0, 5, 5),

-- Aluno 6 -2md
(0, 0, 0, 0, 0, 1, 6),
(0, 0, 0, 0, 0, 2, 6),
(0, 0, 0, 0, 0, 3, 6),
(0, 0, 0, 0, 0, 4, 6),
(0, 0, 0, 0, 0, 5, 6),

-- Aluno 7 -2md
(0, 0, 0, 0, 0, 1, 7),
(0, 0, 0, 0, 0, 2, 7),
(0, 0, 0, 0, 0, 3, 7),
(0, 0, 0, 0, 0, 4, 7),
(0, 0, 0, 0, 0, 5, 7),

-- Aluno 8 -2md
(0, 0, 0, 0, 0, 1, 8),
(0, 0, 0, 0, 0, 2, 8),
(0, 0, 0, 0, 0, 3, 8),
(0, 0, 0, 0, 0, 4, 8),
(0, 0, 0, 0, 0, 5, 8),

-- Aluno 9 -2md
(0, 0, 0, 0, 0, 1, 9),
(0, 0, 0, 0, 0, 2, 9),
(0, 0, 0, 0, 0, 3, 9),
(0, 0, 0, 0, 0, 4, 9),
(0, 0, 0, 0, 0, 5, 9),

-- Aluno 10 -2md
(0, 0, 0, 0, 0, 1, 10),
(0, 0, 0, 0, 0, 2, 10),
(0, 0, 0, 0, 0, 3, 10),
(0, 0, 0, 0, 0, 4, 10),
(0, 0, 0, 0, 0, 5, 10),

-- Aluno 11 -2td
(27, 35, 43, 16, 21, 6, 11),
(39, 28, 12, 32, 47, 7, 11),
(18, 40, 25, 14, 33, 8, 11),
(47, 24, 30, 20, 38, 9, 11),
(31, 17, 46, 27, 22, 10, 11),

-- Aluno 12 -2td
(44, 21, 30, 12, 18, 6, 12),
(16, 37, 22, 29, 46, 7, 12),
(38, 11, 40, 34, 23, 8, 12),
(20, 27, 41, 45, 30, 9, 12),
(24, 15, 33, 39, 47, 10, 12),

-- Aluno 13 -2td
(28, 43, 36, 14, 32, 6, 13),
(12, 26, 48, 21, 19, 7, 13),
(40, 15, 29, 33, 44, 8, 13),
(35, 39, 22, 17, 30, 9, 13),
(18, 47, 41, 28, 24, 10, 13),

-- Aluno 14 -2td
(15, 31, 27, 46, 20, 6, 14),
(22, 18, 44, 29, 38, 7, 14),
(37, 41, 13, 24, 35, 8, 14),
(26, 30, 17, 45, 28, 9, 14),
(39, 14, 33, 21, 43, 10, 14),

-- Aluno 15 -2td
(19, 34, 46, 20, 27, 6, 15),
(31, 29, 22, 40, 13, 7, 15),
(44, 18, 39, 15, 38, 8, 15),
(27, 45, 24, 32, 21, 9, 15),
(20, 12, 35, 43, 30, 10, 15),

-- Aluno 16 -2td
(23, 47, 18, 34, 29, 6, 16),
(36, 21, 30, 44, 15, 7, 16),
(40, 13, 39, 26, 41, 8, 16),
(28, 35, 20, 17, 32, 9, 16),
(15, 43, 24, 37, 22, 10, 16),

-- Aluno 17 -2td
(32, 20, 44, 29, 14, 6, 17),
(39, 26, 15, 43, 31, 7, 17),
(18, 34, 27, 37, 40, 8, 17),
(21, 41, 22, 30, 35, 9, 17),
(45, 12, 38, 24, 28, 10, 17),

-- Aluno 18 -2td
(14, 28, 33, 45, 20, 6, 18),
(29, 40, 24, 19, 38, 7, 18),
(35, 17, 41, 22, 30, 8, 18),
(43, 21, 37, 15, 26, 9, 18),
(20, 36, 31, 44, 13, 10, 18),

-- Aluno 19 -2td
(22, 39, 15, 32, 47, 6, 19),
(30, 18, 27, 40, 24, 7, 19),
(41, 29, 38, 14, 33, 8, 19),
(13, 45, 21, 37, 20, 9, 19),
(36, 23, 44, 19, 28, 10, 19),

-- Aluno 20 -2td
(17, 31, 26, 43, 22, 6, 20),
(25, 40, 35, 18, 39, 7, 20),
(38, 14, 44, 29, 20, 8, 20),
(43, 22, 30, 15, 27, 9, 20),
(19, 37, 21, 32, 41, 10, 20),


-- Aluno 21 -2nd
(0, 0, 0, 0, 0, 11, 21),
(0, 0, 0, 0, 0, 12, 21),
(0, 0, 0, 0, 0, 13, 21),
(0, 0, 0, 0, 0, 14, 21),
(0, 0, 0, 0, 0, 15, 21),

-- Aluno 22 -2nd
(0, 0, 0, 0, 0, 11, 22),
(0, 0, 0, 0, 0, 12, 22),
(0, 0, 0, 0, 0, 13, 22),
(0, 0, 0, 0, 0, 14, 22),
(0, 0, 0, 0, 0, 15, 22),

-- Aluno 23 -2nd
(0, 0, 0, 0, 0, 1, 23),
(0, 0, 0, 0, 0, 2, 23),
(0, 0, 0, 0, 0, 3, 23),
(0, 0, 0, 0, 0, 4, 23),
(0, 0, 0, 0, 0, 5, 23),

-- Aluno 24 -2nd
(0, 0, 0, 0, 0, 11, 24),
(0, 0, 0, 0, 0, 12, 24),
(0, 0, 0, 0, 0, 13, 24),
(0, 0, 0, 0, 0, 14, 24),
(0, 0, 0, 0, 0, 15, 24),

-- Aluno 25 -2nd
(0, 0, 0, 0, 0, 11, 25),
(0, 0, 0, 0, 0, 12, 25),
(0, 0, 0, 0, 0, 13, 25),
(0, 0, 0, 0, 0, 14, 25),
(0, 0, 0, 0, 0, 15, 25),

-- Aluno 26 -2nd
(0, 0, 0, 0, 0, 11, 26),
(0, 0, 0, 0, 0, 12, 26),
(0, 0, 0, 0, 0, 13, 26),
(0, 0, 0, 0, 0, 14, 26),
(0, 0, 0, 0, 0, 15, 26),

-- Aluno 27 -2nd
(0, 0, 0, 0, 0, 11, 27),
(0, 0, 0, 0, 0, 12, 27),
(0, 0, 0, 0, 0, 13, 27),
(0, 0, 0, 0, 0, 14, 27),
(0, 0, 0, 0, 0, 15, 27),

-- Aluno 28 -2nd
(0, 0, 0, 0, 0, 11, 28),
(0, 0, 0, 0, 0, 12, 28),
(0, 0, 0, 0, 0, 13, 28),
(0, 0, 0, 0, 0, 14, 28),
(0, 0, 0, 0, 0, 15, 28),

-- Aluno 29 -2nd
(0, 0, 0, 0, 0, 11, 29),
(0, 0, 0, 0, 0, 12, 29),
(0, 0, 0, 0, 0, 13, 29),
(0, 0, 0, 0, 0, 14, 29),
(0, 0, 0, 0, 0, 15, 29),

-- Aluno 30 -2nd
(0, 0, 0, 0, 0, 11, 30),
(0, 0, 0, 0, 0, 12, 30),
(0, 0, 0, 0, 0, 13, 30),
(0, 0, 0, 0, 0, 14, 30),
(0, 0, 0, 0, 0, 15, 30);




# cosulta dados da vieww para poder ver os da turma 2md da materia LER PARA O BACK AND
CREATE OR REPLACE VIEW freq_turma AS
SELECT 
    a.nome_aluno, 
    a.RA_aluno, 
    a.turma,
    p.turma_professor,
    p.materia,
    
    CASE 
        WHEN p.materia = 'LER' THEN COALESCE(f.freq_LER, 0)
        WHEN p.materia = 'ARI' THEN COALESCE(f.freq_ARI, 0)
        WHEN p.materia = 'LOPAL' THEN COALESCE(f.freq_LOPAL, 0)
        WHEN p.materia = 'PBE' THEN COALESCE(f.freq_PBE, 0)
        WHEN p.materia = 'SOP' THEN COALESCE(f.freq_SOP, 0)
        ELSE 0
    END AS frequencia_materia,

    CAST(
        CASE 
            WHEN p.materia = 'LER' THEN COALESCE(f.freq_LER, 0) * 100.0 / p.aulas_dadas
            WHEN p.materia = 'ARI' THEN COALESCE(f.freq_ARI, 0) * 100.0 / p.aulas_dadas
            WHEN p.materia = 'LOPAL' THEN COALESCE(f.freq_LOPAL, 0) * 100.0 / p.aulas_dadas
            WHEN p.materia = 'PBE' THEN COALESCE(f.freq_PBE, 0) * 100.0 / p.aulas_dadas
            WHEN p.materia = 'SOP' THEN COALESCE(f.freq_SOP, 0) * 100.0 / p.aulas_dadas
            ELSE 0
        END AS DECIMAL(5,0)
    ) AS percentual_frequencia

FROM alunos a
LEFT JOIN freq_aulas f ON a.ID_aluno = f.ID_aluno
LEFT JOIN Professores p ON f.ID_professor = p.ID_professor
WHERE p.turma_professor IS NOT NULL;




#isso o que o banck end vai pegar e muda so as variaveis
SELECT nome_aluno, RA_aluno, turma, materia, frequencia_materia, percentual_frequencia
FROM freq_turma
WHERE turma_professor = '2td'
and turma = '2td'
 AND materia = 'LER';

