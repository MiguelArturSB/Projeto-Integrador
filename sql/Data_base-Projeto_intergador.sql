create database DataBase_Prof_Tereza_Costa;

#drop database database_prof_tereza_costa;

use DataBase_Prof_Tereza_Costa;






#cria a tabela do Professor
create table Professores (
	ID_professor int auto_increment primary key,
	nome_professor varchar(100) not null,
	materia varchar(100) not null,
    turma_professor varchar(100) not null,
	qntd_aula int,
    aulas_dadas int,
	cpf_professor varchar(14) not null unique ,
	senha_professor varchar(100) not null

);



#cria a tabela do aluno
create table Alunos (
	ID_aluno int auto_increment primary key,
	nome_aluno varchar(100) not null,
    turma varchar(100) not null,
    RA_aluno varchar(11) not null unique,
    senha_aluno varchar(100) not null
);



#cria a tabela do Coordenador
-- Uma tabela de Coordenador mais simples e correta
create table Coordenador (
	ID_coordenador int auto_increment primary key,
	cpf_coordenador varchar(14) not null unique ,
	senha_coordenador varchar(100) not null
);



create table historico_aluno (
	ID_historico int auto_increment primary key,
    ID_professor int,
    ID_aluno int,
    materia varchar(100) not null,
    data_falta DATETIME,
    
        FOREIGN KEY (ID_professor) REFERENCES Professores(ID_professor)
    ON delete cascade
    ON UPDATE RESTRICT,
        FOREIGN KEY (ID_aluno) REFERENCES alunos(ID_aluno)
    ON delete cascade
    ON UPDATE RESTRICT
    
	

);

#drop table historico_aluno;



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





#inserir os dados dos Professores
insert into Professores (nome_professor, materia,turma_professor, qntd_aula,aulas_dadas, cpf_professor, senha_professor) values
('Carlos Silva', 'LER','2md', 96,0, '11111111111', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Ana Costa', 'ARI','2md', 96,0, '22222222222', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('João Souza', 'LOPAL','2md', 96,0, '33333333333', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Marina Dias', 'PBE','2md', 96,0, '44444444444', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Pedro Rocha', 'SOP','2md', 96,0, '55555555555', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),

('Lucas Almeida', 'LER','2td', 96,48, '66666666666', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Bianca Martins', 'ARI','2td', 96,48, '77777777777', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Rafael Mendes', 'LOPAL','2td', 96,48, '88888888888', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Juliana Freitas', 'PBE','2td', 96,48, '99999999999', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Thiago Nunes', 'SOP','2td', 96,48, '12222222222', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),

('Fernanda Lima', 'LER','2nd', 96,0, '23333333333', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Marcelo Tavares', 'ARI','2nd', 96,0, '34444444444', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Patrícia Ramos', 'LOPAL','2nd', 96,0, '45555555555', 'v$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Gustavo Ferreira', 'PBE','2nd', 96,0, '56666666666', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Camila Andrade', 'SOP','2nd', 96,0, '67777777777', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG');



#inserir os dados dos Alunos
insert into alunos (nome_aluno, turma, RA_aluno, senha_aluno) values
-- Turma 2md
('Lucas Oliveira', '2md', '100000001', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Maria Eduarda Souza', '2md', '100000002', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('João Pedro Lima', '2md', '100000003', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Ana Beatriz Costa', '2md', '100000004', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Gabriel Fernandes', '2md', '100000005', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Larissa Rocha', '2md', '100000006', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Pedro Henrique Dias', '2md', '100000007', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Isabela Martins', '2md', '100000008', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Matheus Almeida', '2md', '100000009', 'v$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Julia Ribeiro', '2md', '100000010', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),

-- Turma 2td
('Felipe Cardoso', '2td', '100000011', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Carolina Pires', '2td', '100000012', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Bruno Santos', '2td', '100000013', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Letícia Nunes', '2td', '100000014', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Rafael Teixeira', '2td', '100000015', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Amanda Duarte', '2td', '100000016', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Vinícius Gomes', '2td', '100000017', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Beatriz Carvalho', '2td', '100000018', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Henrique Melo', '2td', '100000019', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Camila Araújo', '2td', '100000020', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),

-- Turma 2nd
('Thiago Barbosa', '2nd', '100000021', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Marina Castro', '2nd', '100000022', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Eduardo Silveira', '2nd', '100000023', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Natália Lima', '2nd', '100000024', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('André Pereira', '2nd', '100000025', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Bianca Moraes', '2nd', '100000026', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Diego Mendes', '2nd', '100000027', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Fernanda Leal', '2nd', '100000028', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Rodrigo Tavares', '2nd', '100000029', 's$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),
('Daniela Farias', '2nd', '100000030', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG');



#inserir os dados do Coordenador
insert into Coordenador (cpf_coordenador, senha_coordenador)
values ('99911111111', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),('99922222222', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG'),('99933333333', '$2b$10$YrVU.y5/VRAHFB9qkCYuvuRbYuwntVVlmYpQuDqrQwrS7ZV8fNbcG');



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
(0, 0, 0, 0, 0, 11, 23),
(0, 0, 0, 0, 0, 12, 23),
(0, 0, 0, 0, 0, 13, 23),
(0, 0, 0, 0, 0, 14, 23),
(0, 0, 0, 0, 0, 15, 23),

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



DELIMITER $$

CREATE TRIGGER tg_atualizar_frequencia_apos_mudanca_turma
AFTER UPDATE ON Alunos
FOR EACH ROW
BEGIN
    -- Verifica se o valor da coluna 'turma' realmente mudou.
    -- OLD.turma se refere ao valor ANTES do update.
    -- NEW.turma se refere ao valor DEPOIS do update.
    IF OLD.turma <> NEW.turma THEN
    
        -- PASSO 1: Deleta os registros de frequência antigos.
        -- Deleta todas as associações de frequência deste aluno com os professores da turma antiga.
        DELETE FROM freq_aulas WHERE ID_aluno = NEW.ID_aluno;
        
        -- PASSO 2: Insere os novos registros de frequência.
        -- Associa o aluno a todos os professores da sua NOVA turma.
        INSERT INTO freq_aulas (ID_aluno, ID_professor, freq_LER, freq_ARI, freq_LOPAL, freq_PBE, freq_SOP)
        SELECT
            NEW.ID_aluno,       -- O ID do aluno que acabou de ser atualizado
            p.ID_professor,     -- O ID de cada professor da nova turma
            0, 0, 0, 0, 0       -- Zera as frequências iniciais
        FROM Professores p
        WHERE p.turma_professor = NEW.turma; -- Filtra apenas os professores da NOVA turma.
        
    END IF;
END$$

DELIMITER ;



DELIMITER $$
CREATE TRIGGER tg_associar_novo_professor_a_alunos
AFTER INSERT ON Professores
FOR EACH ROW
BEGIN
    -- Insere um registro de frequência inicial (zerado) para o novo professor,
    -- associando-o a todos os alunos que já estão na sua turma.
    INSERT INTO freq_aulas (ID_aluno, ID_professor, freq_LER, freq_ARI, freq_LOPAL, freq_PBE, freq_SOP)
    SELECT
        a.ID_aluno,         -- O ID de cada aluno da turma
        NEW.ID_professor,   -- O ID do novo professor que acabou de ser inserido
        0, 0, 0, 0, 0       -- Zera as frequências iniciais
    FROM Alunos a
    WHERE a.turma = NEW.turma_professor; -- Associa apenas aos alunos da mesma turma do novo professor
END$$
DELIMITER ;



DELIMITER $$
CREATE TRIGGER tg_criar_frequencia_aluno
AFTER INSERT ON Alunos
FOR EACH ROW
BEGIN
    INSERT INTO freq_aulas (ID_aluno, ID_professor, freq_LER, freq_ARI, freq_LOPAL, freq_PBE, freq_SOP)
    SELECT
        NEW.ID_aluno,
        p.ID_professor,
        0, 0, 0, 0, 0
    FROM Professores p
    WHERE p.turma_professor = NEW.turma;
END$$
DELIMITER ;




# cosulta dados da vieww para poder ver os da turma 2md da materia LER PARA O BACK AND
CREATE OR REPLACE VIEW freq_turma AS
WITH faltas_por_materia AS (
    SELECT
        p.ID_professor,
        a.ID_aluno,
        a.nome_aluno,
        a.RA_aluno,
        a.turma,
        p.nome_professor,
        cpf_professor,
        p.turma_professor,
        p.materia,
        p.aulas_dadas,
        p.qntd_aula,

        -- Frequência por matéria
        CASE
            WHEN p.materia = 'LER' THEN COALESCE(f.freq_LER, 0)
            WHEN p.materia = 'ARI' THEN COALESCE(f.freq_ARI, 0)
            WHEN p.materia = 'LOPAL' THEN COALESCE(f.freq_LOPAL, 0)
            WHEN p.materia = 'PBE' THEN COALESCE(f.freq_PBE, 0)
            WHEN p.materia = 'SOP' THEN COALESCE(f.freq_SOP, 0)
            ELSE 0
        END AS frequencia_materia,

        -- Faltas por matéria
        CAST(
            CASE 
                WHEN p.materia = 'LER' THEN p.aulas_dadas - COALESCE(f.freq_LER, 0)
                WHEN p.materia = 'ARI' THEN p.aulas_dadas - COALESCE(f.freq_ARI, 0)
                WHEN p.materia = 'LOPAL' THEN p.aulas_dadas - COALESCE(f.freq_LOPAL, 0)
                WHEN p.materia = 'PBE' THEN p.aulas_dadas - COALESCE(f.freq_PBE, 0)
                WHEN p.materia = 'SOP' THEN p.aulas_dadas - COALESCE(f.freq_SOP, 0)
                ELSE 0
            END AS DECIMAL(5,0)
        ) AS faltas,

        -- Percentual de frequência por matéria
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
    WHERE p.turma_professor IS NOT NULL
),

totais_por_aluno AS (
    SELECT
        ID_aluno,
        SUM(faltas) AS total_faltas,
        AVG(percentual_frequencia) AS media_percentual_frequencia
    FROM faltas_por_materia
    GROUP BY ID_aluno
),

aulas_por_turma AS (
    SELECT 
        turma_professor AS turma,
        SUM(qntd_aula) AS total_aulas_turma
    FROM Professores
    GROUP BY turma_professor
),

faltas_por_turma AS (
    SELECT
        turma_professor AS turma,
        materia,
        SUM(
            CASE 
                WHEN materia = 'LER' THEN aulas_dadas - COALESCE(freq_LER, 0)
                WHEN materia = 'ARI' THEN aulas_dadas - COALESCE(freq_ARI, 0)
                WHEN materia = 'LOPAL' THEN aulas_dadas - COALESCE(freq_LOPAL, 0)
                WHEN materia = 'PBE' THEN aulas_dadas - COALESCE(freq_PBE, 0)
                WHEN materia = 'SOP' THEN aulas_dadas - COALESCE(freq_SOP, 0)
                ELSE 0
            END
        ) AS total_faltas_turma
    FROM Professores p
    LEFT JOIN freq_aulas f ON p.ID_professor = f.ID_professor
    GROUP BY turma_professor, materia
),

faltas_por_professor AS (
    SELECT
        p.ID_professor,
        p.materia,
        SUM(
            CASE 
                WHEN p.materia = 'LER' THEN p.aulas_dadas - COALESCE(f.freq_LER, 0)
                WHEN p.materia = 'ARI' THEN p.aulas_dadas - COALESCE(f.freq_ARI, 0)
                WHEN p.materia = 'LOPAL' THEN p.aulas_dadas - COALESCE(f.freq_LOPAL, 0)
                WHEN p.materia = 'PBE' THEN p.aulas_dadas - COALESCE(f.freq_PBE, 0)
                WHEN p.materia = 'SOP' THEN p.aulas_dadas - COALESCE(f.freq_SOP, 0)
                ELSE 0
            END
        ) AS total_faltas_professor
    FROM Professores p
    LEFT JOIN freq_aulas f ON p.ID_professor = f.ID_professor
    GROUP BY p.ID_professor, p.materia
),

alunos_por_turma AS (
    SELECT
        turma,
        COUNT(*) AS total_alunos
    FROM alunos
    GROUP BY turma
)

-- SELECT final
SELECT
    fpm.*,
    tpa.total_faltas,
    tpa.media_percentual_frequencia,
    fpt.total_faltas_turma,
    fpp.total_faltas_professor,
    apt.total_aulas_turma,
    alt.total_alunos
FROM faltas_por_materia fpm
JOIN totais_por_aluno tpa ON fpm.ID_aluno = tpa.ID_aluno
LEFT JOIN aulas_por_turma apt ON fpm.turma_professor = apt.turma
LEFT JOIN faltas_por_turma fpt ON fpm.turma_professor = fpt.turma AND fpm.materia = fpt.materia
LEFT JOIN faltas_por_professor fpp ON fpm.ID_professor = fpp.ID_professor AND fpm.materia = fpp.materia
LEFT JOIN alunos_por_turma alt ON fpm.turma_professor = alt.turma;


 
 
 
 

 
CREATE OR REPLACE VIEW total_aluno AS
WITH faltas_por_materia AS (
    SELECT
        p.ID_professor,
        a.ID_aluno,
        a.nome_aluno,
        a.RA_aluno,
        a.turma,
        p.nome_professor,
        cpf_professor,
        p.turma_professor,
        p.materia,
        p.aulas_dadas,
        p.qntd_aula,
        -- Faltas por matéria
        CAST(
            CASE 
                WHEN p.materia = 'LER' THEN p.aulas_dadas - COALESCE(f.freq_LER, 0)
                WHEN p.materia = 'ARI' THEN p.aulas_dadas - COALESCE(f.freq_ARI, 0)
                WHEN p.materia = 'LOPAL' THEN p.aulas_dadas - COALESCE(f.freq_LOPAL, 0)
                WHEN p.materia = 'PBE' THEN p.aulas_dadas - COALESCE(f.freq_PBE, 0)
                WHEN p.materia = 'SOP' THEN p.aulas_dadas - COALESCE(f.freq_SOP, 0)
                ELSE 0
            END AS DECIMAL(5,0)
        ) AS faltas,
        -- Percentual de frequência por matéria
        CAST(
            CASE
                WHEN p.materia = 'LER' THEN COALESCE(f.freq_LER, 0) * 100 / p.aulas_dadas
                WHEN p.materia = 'ARI' THEN COALESCE(f.freq_ARI, 0) * 100 / p.aulas_dadas
                WHEN p.materia = 'LOPAL' THEN COALESCE(f.freq_LOPAL, 0) * 100 / p.aulas_dadas
                WHEN p.materia = 'PBE' THEN COALESCE(f.freq_PBE, 0) * 100 / p.aulas_dadas
                WHEN p.materia = 'SOP' THEN COALESCE(f.freq_SOP, 0) * 100 / p.aulas_dadas
                ELSE 0
            END AS UNSIGNED
        ) AS percentual_frequencia
    FROM alunos a
    LEFT JOIN freq_aulas f ON a.ID_aluno = f.ID_aluno
    LEFT JOIN Professores p ON f.ID_professor = p.ID_professor
    WHERE p.turma_professor IS NOT NULL
),

totais_por_aluno AS (
    SELECT
        ID_aluno,
        SUM(faltas) AS total_faltas,
        AVG(percentual_frequencia) AS media_percentual_frequencia
    FROM faltas_por_materia
    GROUP BY ID_aluno
),

aulas_por_turma AS (
    SELECT 
        turma_professor AS turma,
        SUM(qntd_aula) AS total_aulas_turma
    FROM Professores
    GROUP BY turma_professor
),

faltas_por_turma AS (
    SELECT
        turma_professor AS turma,
        SUM(
            CASE 
                WHEN materia = 'LER' THEN aulas_dadas - COALESCE(freq_LER, 0)
                WHEN materia = 'ARI' THEN aulas_dadas - COALESCE(freq_ARI, 0)
                WHEN materia = 'LOPAL' THEN aulas_dadas - COALESCE(freq_LOPAL, 0)
                WHEN materia = 'PBE' THEN aulas_dadas - COALESCE(freq_PBE, 0)
                WHEN materia = 'SOP' THEN aulas_dadas - COALESCE(freq_SOP, 0)
                ELSE 0
            END
        ) AS total_faltas_turma
    FROM Professores p
    LEFT JOIN freq_aulas f ON p.ID_professor = f.ID_professor
    GROUP BY turma_professor
)

-- SELECT final
SELECT
    fpm.*,
    tpa.total_faltas,
    tpa.media_percentual_frequencia,
    apt.total_aulas_turma,
    fpt.total_faltas_turma
FROM faltas_por_materia fpm
JOIN totais_por_aluno tpa ON fpm.ID_aluno = tpa.ID_aluno
LEFT JOIN aulas_por_turma apt ON fpm.turma_professor = apt.turma
LEFT JOIN faltas_por_turma fpt ON fpm.turma_professor = fpt.turma;






CREATE VIEW vw_historico_completo AS
SELECT 
    a.ID_aluno,
    a.nome_aluno,
    a.RA_aluno,
    a.turma,
    h.materia,
    h.data_falta,
    h.ID_professor
FROM 
    alunos a
INNER JOIN 
    historico_aluno h ON a.ID_aluno = h.ID_aluno;
