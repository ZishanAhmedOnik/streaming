ALTER TABLE `streaming_dev`.`Files` 
ADD COLUMN `Order` INT NOT NULL DEFAULT 0 AFTER `Duration`;

ALTER TABLE `streaming_dev`.`Files` 
CHANGE COLUMN `Order` `OrderInList` INT NOT NULL DEFAULT '0' ;