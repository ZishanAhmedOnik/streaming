ALTER TABLE `Files` 
ADD COLUMN `Order` INT NOT NULL DEFAULT 0 AFTER `Duration`;