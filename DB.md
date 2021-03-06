# DATABASE UPDATES
1. CREATE USERS TABLE
```bash
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) ,
  `password` varchar(45) ,
  `salt` varchar(45) ,
  `first_name` varchar(45) ,
  `last_name` varchar(45),
  `email` varchar(45) ,
  `class_code` varchar(45) ,
  `type` varchar(45) ,
  `role` varchar(45) ,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

2. CREATE TOKENS TABLE
```bash
CREATE TABLE `tokens` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) ,
  `token` varchar(45),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

```bash
INSERT INTO mifa.users (`username`,`password`) VALUES('MrKenny','mathfacts');
```

3. CREATE ASSESMENT TYPE TABLE
```bash
CREATE TABLE `assesment_types` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(45),
  `index` int(10) ,
  `created_by` int(10),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```

4. CREATE LEVEL TABLE
```bash
CREATE TABLE `levels` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(45),
  `index` int(10) ,
  `assesment_type_id` int(10),
  `created_by` int(10),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assesment_type_id`) REFERENCES assesment_types(`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```

5. CREATE QUESTION TABLE
```bash
CREATE TABLE `questions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `level_id` int(10) ,
  `question` varchar(45),
  `index` int(10) ,
  `correct_answer` int(10),
  `created_by` int(10),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`level_id`) REFERENCES levels(`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```

6. CREATE SUBMISSIONS TABLE
```bash
CREATE TABLE `submissions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(45),
  `assigned_level` int(10) ,
  `created_by` int(10),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`assigned_level`) REFERENCES levels(`id`),
  FOREIGN KEY (`created_by`) REFERENCES users(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```

7. CREATE ANSWER TABLE
```bash
CREATE TABLE `answers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `submission_id` int(10) ,
  `question_id` int(10) ,
  `answer` varchar(45),
  `is_correct` int(1) ,
  `retry_count` int(10) ,
  `time_taken_in_ms` int(10),
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`question_id`) REFERENCES questions(`id`),
  FOREIGN KEY (`submission_id`) REFERENCES submissions(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

```


```
ALTER TABLE `mifa`.`tokens` 
DROP FOREIGN KEY `tokens_ibfk_1`;
ALTER TABLE `mifa`.`tokens` 
ADD CONSTRAINT `tokens_ibfk_1`
  FOREIGN KEY (`user_id`)
  REFERENCES `mifa`.`users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

```

```
ALTER TABLE `mifa`.`levels` 
CHANGE COLUMN `index` `levle_index` INT(10) NULL DEFAULT NULL ;

```

```
ALTER TABLE `mifa`.`assesment_types` 
CHANGE COLUMN `index` `assesment_type_index` INT(10) NULL DEFAULT NULL ;

```

```
ALTER TABLE `mifa`.`users` 
ADD COLUMN `level` INT(10) NULL AFTER `updated_at`;

```

```
ALTER TABLE `mifa`.`assesment_types` 
DROP FOREIGN KEY `assesment_types_ibfk_1`;
ALTER TABLE `mifa`.`assesment_types` 
ADD CONSTRAINT `assesment_types_ibfk_1`
  FOREIGN KEY (`created_by`)
  REFERENCES `mifa`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

```

```
ALTER TABLE `mifa`.`levels` 
DROP FOREIGN KEY `levels_ibfk_1`;

```
```
ALTER TABLE `mifa`.`submissions` 
CHANGE COLUMN `type` `status` VARCHAR(45) NULL DEFAULT NULL ;

```

```
ALTER TABLE `mifa`.`users` 
ADD COLUMN `is_retry_allowed` INT(1) NULL DEFAULT 0 AFTER `updated_at`;

```