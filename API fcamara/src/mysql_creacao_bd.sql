DROP SCHEMA IF EXISTS `fcamara` ;
CREATE SCHEMA IF NOT EXISTS `fcamara` DEFAULT CHARACTER SET utf8 ;
USE `fcamara` ;


DROP TABLE IF EXISTS `fcamara`.`publicacao` ;

CREATE TABLE IF NOT EXISTS `fcamara`.`publicacao` (
  `nm_autor` VARCHAR(50) NOT NULL,
  `nm_titulo` VARCHAR(50) NOT NULL,
  `ds_publicacao` TEXT NULL,
  `dt_publicacao` DATETIME NOT NULL
);
