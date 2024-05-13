-- view po
CREATE VIEW vw_po AS
SELECT
    `p`.`po_id` AS `po_id`,
    `p`.`po_date` AS `po_date`,
    `p`.`po_time` AS `po_time`,
    `p`.`created_by` AS `created_by`,
    `p`.`supplier_id` AS `supplier_id`,
    `s`.`name` AS `supplier_name`,
    `s`.`email` AS `email`,
    `s`.`phone` AS `phone`,
    `s`.`address` AS `address`,
    `p`.`note` AS `note`,
    `p`.`total` AS `total`,
    `p`.`status` AS `status`
FROM
    (
        `domkomputer_pos`.`tb_po` `p`
    JOIN `domkomputer_pos`.`tb_supplier` `s`
    ON
        (`p`.`supplier_id` = `s`.`supplier_id`)
    )


-- view po detail
CREATE VIEW vw_po_detail AS
SELECT
    `p`.`po_detail_id` AS `po_detail_id`,
    `p`.`po_id` AS `po_id`,
    `p`.`product_id` AS `product_id`,
    `pr`.`product_name` AS `product_name`,
    `u`.`unit_name` AS `unit_name`,
    `p`.`qty` AS `qty`,
    `p`.`price` AS `price`
FROM
    (
        (
            `domkomputer_pos`.`tb_po_detail` `p`
        LEFT JOIN `domkomputer_pos`.`tb_product` `pr`
        ON
            (`p`.`product_id` = `pr`.`product_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_unit` `u`
    ON
        (`pr`.`unit_id` = `u`.`unit_id`)
    )


-- view product
CREATE VIEW vw_product AS
SELECT
    `p`.`product_id` AS `product_id`,
    `p`.`product_code` AS `product_code`,
    `p`.`product_name` AS `product_name`,
    `p`.`photo` AS `photo`,
    `t`.`type_id` AS `type_id`,
    `t`.`type_name` AS `type_name`,
    `c`.`category_id` AS `category_id`,
    `c`.`category_name` AS `category_name`,
    `u`.`unit_id` AS `unit_id`,
    `u`.`unit_name` AS `unit_name`,
    `p`.`sale` AS `sale`,
    `p`.`buy` AS `buy`,
    `p`.`stock` AS `stock`,
    `p`.`is_sale` AS `is_sale`,
    `p`.`is_ppn` AS `is_ppn`,
    `p`.`is_variant` AS `is_variant`,
    `p`.`addon` AS `addon`,
    `p`.`created_date` AS `created_date`
FROM
    (
        (
            (
                `domkomputer_pos`.`tb_product` `p`
            LEFT JOIN `domkomputer_pos`.`tb_type` `t`
            ON
                (`p`.`type_id` = `t`.`type_id`)
            )
        LEFT JOIN `domkomputer_pos`.`tb_category` `c`
        ON
            (`p`.`category_id` = `c`.`category_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_unit` `u`
    ON
        (`p`.`unit_id` = `u`.`unit_id`)
    )


-- view sales
SELECT
    `a`.`id` AS `id`,
    `a`.`sale_id` AS `sale_id`,
    `a`.`user_id` AS `user_id`,
    `a`.`employee_id` AS `employee_id`,
    `e`.`name` AS `employee_name`,
    `e`.`role` AS `role`,
    `a`.`sale_date` AS `sale_date`,
    `a`.`sale_time` AS `sale_time`,
    `a`.`customer` AS `customer`,
    `a`.`customer_id` AS `customer_id`,
    `b`.`name` AS `customer_name`,
    `b`.`address` AS `address`,
    `b`.`phone` AS `phone`,
    `a`.`order_type` AS `order_type`,
    `a`.`sale_type` AS `sale_type`,
    `a`.`table_id` AS `table_id`,
    `c`.`table_name` AS `table_name`,
    `d`.`area_name` AS `area_name`,
    `a`.`total` AS `total`,
    `a`.`payment_type` AS `payment_type`,
    `a`.`payment_account` AS `payment_account`,
    `p`.`payment_name` AS `payment_name`,
    `a`.`payment` AS `payment`,
    `a`.`shipping_cost` AS `shipping_cost`,
    `a`.`status` AS `status`,
    `a`.`note` AS `note`,
    `a`.`is_refund` AS `is_refund`
FROM
    (
        (
            (
                (
                    (
                        `tb_sales` `a`
                    LEFT JOIN `tb_customer` `b`
                    ON
                        (
                            (`a`.`customer_id` = `b`.`customer_id`)
                        )
                    )
                LEFT JOIN `tb_table_management_det` `c`
                ON
                    (
                        (`a`.`table_id` = `c`.`table_detail_id`)
                    )
                )
            LEFT JOIN `tb_table_management` `d`
            ON
                (
                    (
                        `c`.`table_management_id` = `d`.`table_management_id`
                    )
                )
            )
        LEFT JOIN `tb_payment_account` `p`
        ON
            (
                (
                    `a`.`payment_account` = `p`.`payment_account_id`
                )
            )
        )
    LEFT JOIN `tb_employee` `e`
    ON
        (
            (`a`.`employee_id` = `e`.`employee_id`)
        )
    )


-- view vw_sales_detail
CREATE VIEW vw_sales_detail AS
SELECT
    `a`.`sale_detail_id` AS `sale_detail_id`,
    `a`.`sale_id` AS `sale_id`,
    `b`.`photo` AS `photo`,
    `a`.`product_id` AS `product_id`,
    `b`.`product_code` AS `product_code`,
    `b`.`product_name` AS `product_name`,
    `c`.`category_name` AS `category_name`,
    `d`.`unit_name` AS `unit_name`,
    `a`.`qty` AS `qty`,
    `a`.`buy` AS `buy`,
    `a`.`sale` AS `sale`,
    `a`.`variant` AS `variant`,
    `v`.`name` AS `variant_name`,
    `a`.`addon` AS `addon`
FROM
    (
        (
            (
                (
                    `domkomputer_pos`.`tb_sales_detail` `a`
                JOIN `domkomputer_pos`.`tb_product` `b`
                ON
                    (`a`.`product_id` = `b`.`product_id`)
                )
            JOIN `domkomputer_pos`.`tb_category` `c`
            ON
                (`b`.`category_id` = `c`.`category_id`)
            )
        JOIN `domkomputer_pos`.`tb_unit` `d`
        ON
            (`b`.`unit_id` = `d`.`unit_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_variant` `v`
    ON
        (`a`.`variant` = `v`.`variant_id`)
    )


-- view vw_si_detail
CREATE VIEW vw_si_detail AS
SELECT
    `s`.`stock_in_detail_id` AS `stock_in_detail_id`,
    `s`.`stock_in_id` AS `stock_in_id`,
    `s`.`product_id` AS `product_id`,
    `pr`.`product_name` AS `product_name`,
    `u`.`unit_name` AS `unit_name`,
    `s`.`qty` AS `qty`,
    `s`.`price` AS `price`
FROM
    (
        (
            `domkomputer_pos`.`tb_stock_in_detail` `s`
        LEFT JOIN `domkomputer_pos`.`tb_product` `pr`
        ON
            (`s`.`product_id` = `pr`.`product_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_unit` `u`
    ON
        (`pr`.`unit_id` = `u`.`unit_id`)
    )


-- view vw_stock_card
CREATE VIEW vw_stock_card AS
SELECT
    `od`.`product_id` AS `product_id`,
    `p`.`product_name` AS `product_name`,
    `od`.`init_stock` AS `init_stock`,
    `od`.`actual_stock` AS `actual_stock`,
    `id`.`qty` AS `stock_in`,
    `ou`.`qty` AS `stock_out`
FROM
    (
        (
            (
                (
                    `domkomputer_pos`.`tb_stock_opname` `o`
                JOIN `domkomputer_pos`.`tb_stock_opname_detail` `od`
                ON
                    (
                        `o`.`stock_opname_id` = `od`.`stock_opname_id`
                    )
                )
            LEFT JOIN `domkomputer_pos`.`tb_product` `p`
            ON
                (`p`.`product_id` = `od`.`product_id`)
            )
        LEFT JOIN `domkomputer_pos`.`tb_stock_in_detail` `id`
        ON
            (`id`.`product_id` = `od`.`product_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_stock_out_detail` `ou`
    ON
        (`ou`.`product_id` = `od`.`product_id`)
    )


-- view sop_detail
CREATE VIEW sop_detail AS
SELECT
    `s`.`stock_opname_detail_id` AS `s_op_id`,
    `s`.`stock_opname_id` AS `stock_opname_id`,
    `s`.`product_id` AS `product_id`,
    `pr`.`product_code` AS `product_code`,
    `pr`.`product_name` AS `product_name`,
    `u`.`unit_name` AS `unit_name`,
    `s`.`init_stock` AS `init_stock`,
    `s`.`actual_stock` AS `actual_stock`,
    `s`.`init_price` AS `init_price`,
    `s`.`new_price` AS `new_price`
FROM
    (
        (
            `domkomputer_pos`.`tb_stock_opname_detail` `s`
        LEFT JOIN `domkomputer_pos`.`tb_product` `pr`
        ON
            (`s`.`product_id` = `pr`.`product_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_unit` `u`
    ON
        (`pr`.`unit_id` = `u`.`unit_id`)
    )


-- view so_detail
CREATE VIEW so_detail AS
SELECT
    `s`.`stock_out_detail_id` AS `stock_out_detail_id`,
    `s`.`stock_out_id` AS `stock_out_id`,
    `s`.`product_id` AS `product_id`,
    `pr`.`product_name` AS `product_name`,
    `u`.`unit_name` AS `unit_name`,
    `s`.`qty` AS `qty`,
    `s`.`price` AS `price`
FROM
    (
        (
            `domkomputer_pos`.`tb_stock_out_detail` `s`
        LEFT JOIN `domkomputer_pos`.`tb_product` `pr`
        ON
            (`s`.`product_id` = `pr`.`product_id`)
        )
    LEFT JOIN `domkomputer_pos`.`tb_unit` `u`
    ON
        (`pr`.`unit_id` = `u`.`unit_id`)
    )


-- view vw_table
CREATE VIEW vw_table AS
SELECT
    `t`.`table_management_id` AS `table_management_id`,
    `t`.`user_id` AS `user_id`,
    `t`.`area_name` AS `area_name`,
    `t`.`status` AS `status`,
    `d`.`table_detail_id` AS `table_detail_id`,
    `d`.`table_name` AS `table_name`,
    `d`.`capacity` AS `capacity`,
    `t`.`created_date` AS `created_date`
FROM
    (
        `db_pos_dev`.`tb_table_management` `t`
    JOIN `db_pos_dev`.`tb_table_management_det` `d`
    ON
        (
            `t`.`table_management_id` = `d`.`table_management_id`
        )
    )


-- view vw_sales_detail
CREATE VIEW vw_sales_report AS
SELECT
    `s`.`sale_id` AS `sale_id`,
    `s`.`user_id` AS `user_id`,
    `s`.`sale_date` AS `sale_date`,
    `s`.`sale_time` AS `sale_time`,
    `s`.`customer_id` AS `customer_id`,
    `cs`.`name` AS `customer_name`,
    `a`.`sale_detail_id` AS `sale_detail_id`,
    `b`.`photo` AS `photo`,
    `a`.`product_id` AS `product_id`,
    `b`.`product_code` AS `product_code`,
    `b`.`product_name` AS `product_name`,
    `c`.`category_name` AS `category_name`,
    `d`.`unit_name` AS `unit_name`,
    `a`.`qty` AS `qty`,
    `a`.`buy` AS `buy`,
    `a`.`sale` AS `sale`,
    `a`.`variant` AS `variant`,
    `v`.`name` AS `variant_name`,
    `a`.`addon` AS `addon`
FROM
	`db_pos_dev`.`tb_sales` `s`
	LEFT JOIN `db_pos_dev`.`tb_customer` `cs`  ON(`cs`.`customer_id` = `s`.`customer_id`)
	JOIN `db_pos_dev`.`tb_sales_detail` `a`  ON(`a`.`sale_id` = `s`.`sale_id`)
	JOIN `db_pos_dev`.`tb_product` `b` ON(`a`.`product_id` = `b`.`product_id`)
	JOIN `db_pos_dev`.`tb_category` `c` ON (`b`.`category_id` = `c`.`category_id`)
	JOIN `db_pos_dev`.`tb_unit` `d` ON (`b`.`unit_id` = `d`.`unit_id`)
	LEFT JOIN `db_pos_dev`.`tb_variant` `v` ON (`a`.`variant` = `v`.`variant_id`)

-- view payment_account
CREATE VIEW vw_payment_account AS
SELECT
    `p`.`payment_account_id` AS `payment_account_id`,
    `p`.`user_id` AS `user_id`,
    `p`.`payment_type` AS `payment_type`,
    `p`.`payment_name` AS `payment_name`,
    `p`.`created_by` AS `created_by`,
    `s`.`bank_id` AS `bank_id`,
    `s`.`bank_name` AS `bank_name`,
    `s`.`bank_code` AS `bank_code`,
    `p`.`publish` AS `publish`
FROM
    (
        `db_pos_dev`.`tb_payment_account` `p`
    JOIN `db_pos_dev`.`tb_bank` `s`
    ON
        (`p`.`provider` = `s`.`bank_id`)
    )


-- view payment_account
CREATE VIEW vw_payment_user AS
SELECT
    `s`.`payment_user_id` AS `payment_user_id`,
    `p`.`payment_account_id` AS `payment_account_id`,
    `s`.`user_id` AS `user_id`,
    `p`.`logo` AS `logo`,
    `p`.`payment_type` AS `payment_type`,
    `p`.`payment_name` AS `payment_name`,
    `t`.`total` AS `service_fee`,
    `s`.`status` AS `status`
FROM
    (
        `tb_payment_account` `p`
    JOIN `tb_payment_user` `s`
    ON(
            `p`.`payment_account_id` = `s`.`payment_account_id`
        )
    LEFT JOIN `tb_tax` `t`
    ON(`p`.`payment_type` = `t`.`service_id`)
    )



SELECT
    `s`.`payment_user_id` AS `payment_user_id`,
    `s`.`payment_account_id` AS `payment_account_id`,
    `s`.`user_id` AS `user_id`,
    `p`.`logo` AS `logo`,
    `p`.`payment_type` AS `payment_type`,
    `p`.`payment_name` AS `payment_name`,
    `s`.`status` AS `status`
FROM
    `tb_payment_user` `s` 
    JOIN `tb_payment_account` `p`
    ON `s`.`payment_account_id` = `p`.`payment_account_id`
    -- JOIN `tb_tax` `t`
    -- ON `p`.`payment_type` = `t`.`service_id`


SELECT
    `s`.`payment_user_id` AS `payment_user_id`,
    `p`.`payment_account_id` AS `payment_account_id`,
    `s`.`user_id` AS `user_id`,
    `p`.`logo` AS `logo`,
    `p`.`payment_type` AS `payment_type`,
    `p`.`payment_name` AS `payment_name`,
    `t`.`total` AS `service_fee`,
    `s`.`status` AS `status`
FROM
    (
        (
            `tb_payment_account` `p`
        JOIN `tb_payment_user` `s`
        ON
            (
                (
                    `p`.`payment_account_id` = `s`.`payment_account_id`
                )
            )
        )
    LEFT JOIN `tb_tax` `t`
    ON
        (
            (`p`.`payment_type` = `t`.`service_id`)
        )
    )
