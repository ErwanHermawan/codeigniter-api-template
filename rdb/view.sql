CREATE VIEW vw_user_logs AS
SELECT
    `l`.`log_id` AS `log_id`,
    `l`.`user_id` AS `user_id`,
    `u`.`username` AS `username`,
    `l`.`date_log` AS `date_log`,
    `l`.`user_ip` AS `user_ip`
FROM
	`tb_users_log` `l`
  JOIN `tb_users` `u` ON `u`.`user_id` = `l`.`user_id`