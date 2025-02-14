USE attendance_management;


INSERT INTO attendance (user_id, date, status, remarks) VALUES
(999, "0001-01-01", "Present", ""),
(999, "0001-01-01", "Leave", ""),
(999, "0001-01-01", "Absent", ""),
(999, "0001-01-01", "Sunday", ""),
(999, "0001-01-01", "Holiday", "");

INSERT INTO attendance (id, user_id, date, status, remarks) VALUES
-- User ID 100
(1, 100, "2025-01-01", "Present", ""),
(2, 100, "2025-01-02", "Present", ""),
(3, 100, "2025-01-03", "Present", ""),
(4, 100, "2025-01-04", "Present", ""),
(5, 100, "2025-01-05", "Leave", ""),
(6, 100, "2025-01-06", "Present", ""),
(7, 100, "2025-01-07", "Present", ""),
(8, 100, "2025-01-08", "Present", ""),
(9, 100, "2025-01-09", "Present", ""),
(10, 100, "2025-01-10", "Present", ""),
(11, 100, "2025-01-11", "Present", ""),
(12, 100, "2025-01-12", "Present", ""),
(13, 100, "2025-01-13", "Present", ""),
(14, 100, "2025-01-14", "Present", ""),
(15, 100, "2025-01-15", "Present", ""),
(16, 100, "2025-01-16", "Leave", ""),
(17, 100, "2025-01-17", "Present", ""),
(18, 100, "2025-01-18", "Present", ""),
(19, 100, "2025-01-19", "Present", ""),
(20, 100, "2025-01-20", "Absent", ""),
(21, 100, "2025-01-21", "Present", ""),
(22, 100, "2025-01-22", "Present", ""),
(23, 100, "2025-01-23", "Present", ""),
(24, 100, "2025-01-24", "Present", ""),
(25, 100, "2025-01-25", "Present", ""),
(26, 100, "2025-01-26", "Leave", ""),
(27, 100, "2025-01-27", "Present", ""),
(28, 100, "2025-01-28", "Present", ""),
(29, 100, "2025-01-29", "Present", ""),
(30, 100, "2025-01-30", "Present", ""),
-- User ID 101
(31, 101, "2025-01-01", "Present", ""),
(32, 101, "2025-01-02", "Present", ""),
(33, 101, "2025-01-03", "Present", ""),
(34, 101, "2025-01-04", "Present", ""),
(35, 101, "2025-01-05", "Present", ""),
(36, 101, "2025-01-06", "Present", ""),
(37, 101, "2025-01-07", "Present", ""),
(38, 101, "2025-01-08", "Present", ""),
(39, 101, "2025-01-09", "Present", ""),
(40, 101, "2025-01-10", "Present", ""),
(41, 101, "2025-01-11", "Present", ""),
(42, 101, "2025-01-12", "Present", ""),
(43, 101, "2025-01-13", "Present", ""),
(44, 101, "2025-01-14", "Present", ""),
(45, 101, "2025-01-15", "Absent", ""),
(46, 101, "2025-01-16", "Present", ""),
(47, 101, "2025-01-17", "Present", ""),
(48, 101, "2025-01-18", "Present", ""),
(49, 101, "2025-01-19", "Present", ""),
(50, 101, "2025-01-20", "Present", ""),
(51, 101, "2025-01-21", "Leave", ""),
(52, 101, "2025-01-22", "Present", ""),
(53, 101, "2025-01-23", "Present", ""),
(54, 101, "2025-01-24", "Present", ""),
(55, 101, "2025-01-25", "Present", ""),
(56, 101, "2025-01-26", "Present", ""),
(57, 101, "2025-01-27", "Present", ""),
(58, 101, "2025-01-28", "Present", ""),
(59, 101, "2025-01-29", "Present", ""),
(60, 101, "2025-01-30", "Present", ""),
-- User ID 102
(61, 102, "2025-01-01", "Present", ""),
(62, 102, "2025-01-02", "Present", ""),
(63, 102, "2025-01-03", "Present", ""),
(64, 102, "2025-01-04", "Present", ""),
(65, 102, "2025-01-05", "Present", ""),
(66, 102, "2025-01-06", "Present", ""),
(67, 102, "2025-01-07", "Present", ""),
(68, 102, "2025-01-08", "Present", ""),
(69, 102, "2025-01-09", "Present", ""),
(70, 102, "2025-01-10", "Present", ""),
(71, 102, "2025-01-11", "Present", ""),
(72, 102, "2025-01-12", "Present", ""),
(73, 102, "2025-01-13", "Present", ""),
(74, 102, "2025-01-14", "Present", ""),
(75, 102, "2025-01-15", "Present", ""),
(76, 102, "2025-01-16", "Present", ""),
(77, 102, "2025-01-17", "Present", ""),
(78, 102, "2025-01-18", "Present", ""),
(79, 102, "2025-01-19", "Present", ""),
(80, 102, "2025-01-20", "Present", ""),
(81, 102, "2025-01-21", "Present", ""),
(82, 102, "2025-01-22", "Present", ""),
(83, 102, "2025-01-23", "Present", ""),
(84, 102, "2025-01-24", "Leave", ""),
(85, 102, "2025-01-25", "Present", ""),
(86, 102, "2025-01-26", "Present", ""),
(87, 102, "2025-01-27", "Absent", ""),
(88, 102, "2025-01-28", "Present", ""),
(89, 102, "2025-01-29", "Present", ""),
(90, 102, "2025-01-30", "Present", ""),
-- User ID 103
(91, 103, "2025-01-01", "Present", ""),
(92, 103, "2025-01-02", "Leave", ""),
(93, 103, "2025-01-03", "Present", ""),
(94, 103, "2025-01-04", "Present", ""),
(95, 103, "2025-01-05", "Present", ""),
(96, 103, "2025-01-06", "Present", ""),
(97, 103, "2025-01-07", "Present", ""),
(98, 103, "2025-01-08", "Present", ""),
(99, 103, "2025-01-09", "Present", ""),
(100, 103, "2025-01-10", "Present", ""),
(101, 103, "2025-01-11", "Present", ""),
(102, 103, "2025-01-12", "Present", ""),
(103, 103, "2025-01-13", "Present", ""),
(104, 103, "2025-01-14", "Present", ""),
(105, 103, "2025-01-15", "Present", ""),
(106, 103, "2025-01-16", "Present", ""),
(107, 103, "2025-01-17", "Present", ""),
(108, 103, "2025-01-18", "Present", ""),
(109, 103, "2025-01-19", "Present", ""),
(110, 103, "2025-01-20", "Present", ""),
(111, 103, "2025-01-21", "Present", ""),
(112, 103, "2025-01-22", "Present", ""),
(113, 103, "2025-01-23", "Present", ""),
(114, 103, "2025-01-24", "Present", ""),
(115, 103, "2025-01-25", "Present", ""),
(116, 103, "2025-01-26", "Present", ""),
(117, 103, "2025-01-27", "Present", ""),
(118, 103, "2025-01-28", "Present", ""),
(119, 103, "2025-01-29", "Present", ""),
(120, 103, "2025-01-30", "Present", ""),
-- User ID 104
(121, 104, "2025-01-01", "Present", ""),
(122, 104, "2025-01-02", "Present", ""),
(123, 104, "2025-01-03", "Present", ""),
(124, 104, "2025-01-04", "Absent", ""),
(125, 104, "2025-01-05", "Present", ""),
(126, 104, "2025-01-06", "Present", ""),
(127, 104, "2025-01-07", "Present", ""),
(128, 104, "2025-01-08", "Present", ""),
(129, 104, "2025-01-09", "Present", ""),
(130, 104, "2025-01-10", "Present", ""),
(131, 104, "2025-01-11", "Present", ""),
(132, 104, "2025-01-12", "Present", ""),
(133, 104, "2025-01-13", "Present", ""),
(134, 104, "2025-01-14", "Present", ""),
(135, 104, "2025-01-15", "Present", ""),
(136, 104, "2025-01-16", "Present", ""),
(137, 104, "2025-01-17", "Present", ""),
(138, 104, "2025-01-18", "Present", ""),
(139, 104, "2025-01-19", "Present", ""),
(140, 104, "2025-01-20", "Present", ""),
(141, 104, "2025-01-21", "Present", ""),
(142, 104, "2025-01-22", "Present", ""),
(143, 104, "2025-01-23", "Present", ""),
(144, 104, "2025-01-24", "Present", ""),
(145, 104, "2025-01-25", "Present", ""),
(146, 104, "2025-01-26", "Present", ""),
(147, 104, "2025-01-27", "Present", ""),
(148, 104, "2025-01-28", "Present", ""),
(149, 104, "2025-01-29", "Present", ""),
(150, 104, "2025-01-30", "Present", ""),
-- User ID 105
(151, 105, "2025-01-01", "Present", ""),
(152, 105, "2025-01-02", "Leave", ""),
(153, 105, "2025-01-03", "Present", ""),
(154, 105, "2025-01-04", "Present", ""),
(155, 105, "2025-01-05", "Present", ""),
(156, 105, "2025-01-06", "Present", ""),
(157, 105, "2025-01-07", "Present", ""),
(158, 105, "2025-01-08", "Present", ""),
(159, 105, "2025-01-09", "Present", ""),
(160, 105, "2025-01-10", "Absent", ""),
(161, 105, "2025-01-11", "Present", ""),
(162, 105, "2025-01-12", "Present", ""),
(163, 105, "2025-01-13", "Present", ""),
(164, 105, "2025-01-14", "Present", ""),
(165, 105, "2025-01-15", "Present", ""),
(166, 105, "2025-01-16", "Present", ""),
(167, 105, "2025-01-17", "Present", ""),
(168, 105, "2025-01-18", "Present", ""),
(169, 105, "2025-01-19", "Present", ""),
(170, 105, "2025-01-20", "Present", ""),
(171, 105, "2025-01-21", "Present", ""),
(172, 105, "2025-01-22", "Present", ""),
(173, 105, "2025-01-23", "Present", ""),
(174, 105, "2025-01-24", "Present", ""),
(175, 105, "2025-01-25", "Present", ""),
(176, 105, "2025-01-26", "Present", ""),
(177, 105, "2025-01-27", "Present", ""),
(178, 105, "2025-01-28", "Present", ""),
(179, 105, "2025-01-29", "Present", ""),
(180, 105, "2025-01-30", "Present", ""),
-- User ID 106
(181, 106, "2025-01-01", "Present", ""),
(182, 106, "2025-01-02", "Present", ""),
(183, 106, "2025-01-03", "Present", ""),
(184, 106, "2025-01-04", "Present", ""),
(185, 106, "2025-01-05", "Present", ""),
(186, 106, "2025-01-06", "Present", ""),
(187, 106, "2025-01-07", "Present", ""),
(188, 106, "2025-01-08", "Present", ""),
(189, 106, "2025-01-09", "Present", ""),
(190, 106, "2025-01-10", "Present", ""),
(191, 106, "2025-01-11", "Present", ""),
(192, 106, "2025-01-12", "Present", ""),
(193, 106, "2025-01-13", "Present", ""),
(194, 106, "2025-01-14", "Present", ""),
(195, 106, "2025-01-15", "Leave", ""),
(196, 106, "2025-01-16", "Present", ""),
(197, 106, "2025-01-17", "Present", ""),
(198, 106, "2025-01-18", "Present", ""),
(199, 106, "2025-01-19", "Present", ""),
(200, 106, "2025-01-20", "Present", ""),
(201, 106, "2025-01-21", "Present", ""),
(202, 106, "2025-01-22", "Present", ""),
(203, 106, "2025-01-23", "Present", ""),
(204, 106, "2025-01-24", "Present", ""),
(205, 106, "2025-01-25", "Present", ""),
(206, 106, "2025-01-26", "Present", ""),
(207, 106, "2025-01-27", "Present", ""),
(208, 106, "2025-01-28", "Present", ""),
(209, 106, "2025-01-29", "Present", ""),
(210, 106, "2025-01-30", "Present", ""),
-- User ID 107
(211, 107, "2025-01-01", "Present", ""),
(212, 107, "2025-01-02", "Present", ""),
(213, 107, "2025-01-03", "Present", ""),
(214, 107, "2025-01-04", "Present", ""),
(215, 107, "2025-01-05", "Present", ""),
(216, 107, "2025-01-06", "Present", ""),
(217, 107, "2025-01-07", "Present", ""),
(218, 107, "2025-01-08", "Present", ""),
(219, 107, "2025-01-09", "Present", ""),
(220, 107, "2025-01-10", "Present", ""),
(221, 107, "2025-01-11", "Present", ""),
(222, 107, "2025-01-12", "Present", ""),
(223, 107, "2025-01-13", "Present", ""),
(224, 107, "2025-01-14", "Present", ""),
(225, 107, "2025-01-15", "Present", ""),
(226, 107, "2025-01-16", "Present", ""),
(227, 107, "2025-01-17", "Present", ""),
(228, 107, "2025-01-18", "Present", ""),
(229, 107, "2025-01-19", "Present", ""),
(230, 107, "2025-01-20", "Leave", ""),
(231, 107, "2025-01-21", "Present", ""),
(232, 107, "2025-01-22", "Present", ""),
(233, 107, "2025-01-23", "Present", ""),
(234, 107, "2025-01-24", "Present", ""),
(235, 107, "2025-01-25", "Present", ""),
(236, 107, "2025-01-26", "Present", ""),
(237, 107, "2025-01-27", "Present", ""),
(238, 107, "2025-01-28", "Present", ""),
(239, 107, "2025-01-29", "Present", ""),
(240, 107, "2025-01-30", "Present", ""),
-- User ID 108
(241, 108, "2025-01-01", "Present", ""),
(242, 108, "2025-01-02", "Present", ""),
(243, 108, "2025-01-03", "Present", ""),
(244, 108, "2025-01-04", "Present", ""),
(245, 108, "2025-01-05", "Present", ""),
(246, 108, "2025-01-06", "Present", ""),
(247, 108, "2025-01-07", "Present", ""),
(248, 108, "2025-01-08", "Present", ""),
(249, 108, "2025-01-09", "Leave", ""),
(250, 108, "2025-01-10", "Present", ""),
(251, 108, "2025-01-11", "Present", ""),
(252, 108, "2025-01-12", "Present", ""),
(253, 108, "2025-01-13", "Present", ""),
(254, 108, "2025-01-14", "Present", ""),
(255, 108, "2025-01-15", "Present", ""),
(256, 108, "2025-01-16", "Present", ""),
(257, 108, "2025-01-17", "Present", ""),
(258, 108, "2025-01-18", "Present", ""),
(259, 108, "2025-01-19", "Present", ""),
(260, 108, "2025-01-20", "Present", ""),
(261, 108, "2025-01-21", "Present", ""),
(262, 108, "2025-01-22", "Present", ""),
(263, 108, "2025-01-23", "Present", ""),
(264, 108, "2025-01-24", "Present", ""),
(265, 108, "2025-01-25", "Present", ""),
(266, 108, "2025-01-26", "Present", ""),
(267, 108, "2025-01-27", "Present", ""),
(268, 108, "2025-01-28", "Present", ""),
(269, 108, "2025-01-29", "Present", ""),
(270, 108, "2025-01-30", "Leave", ""),
-- User ID 109
(271, 109, "2025-01-01", "Present", ""),
(272, 109, "2025-01-02", "Present", ""),
(273, 109, "2025-01-03", "Present", ""),
(274, 109, "2025-01-04", "Present", ""),
(275, 109, "2025-01-05", "Present", ""),
(276, 109, "2025-01-06", "Present", ""),
(277, 109, "2025-01-07", "Present", ""),
(278, 109, "2025-01-08", "Present", ""),
(279, 109, "2025-01-09", "Present", ""),
(280, 109, "2025-01-10", "Present", ""),
(281, 109, "2025-01-11", "Present", ""),
(282, 109, "2025-01-12", "Present", ""),
(283, 109, "2025-01-13", "Present", ""),
(284, 109, "2025-01-14", "Present", ""),
(285, 109, "2025-01-15", "Present", ""),
(286, 109, "2025-01-16", "Present", ""),
(287, 109, "2025-01-17", "Present", ""),
(288, 109, "2025-01-18", "Present", ""),
(289, 109, "2025-01-19", "Present", ""),
(290, 109, "2025-01-20", "Present", ""),
(291, 109, "2025-01-21", "Present", ""),
(292, 109, "2025-01-22", "Present", ""),
(293, 109, "2025-01-23", "Present", ""),
(294, 109, "2025-01-24", "Present", ""),
(295, 109, "2025-01-25", "Present", ""),
(296, 109, "2025-01-26", "Present", ""),
(297, 109, "2025-01-27", "Present", ""),
(298, 109, "2025-01-28", "Present", ""),
(299, 109, "2025-01-29", "Present", ""),
(300, 109, "2025-01-30", "Present", ""),
-- User ID 500
(301, 500, "2025-01-01", "Present", ""),
(302, 500, "2025-01-02", "Present", ""),
(303, 500, "2025-01-03", "Present", ""),
(304, 500, "2025-01-04", "Present", ""),
(305, 500, "2025-01-05", "Present", ""),
(306, 500, "2025-01-06", "Present", ""),
(307, 500, "2025-01-07", "Present", ""),
(308, 500, "2025-01-08", "Present", ""),
(309, 500, "2025-01-09", "Present", ""),
(310, 500, "2025-01-10", "Present", ""),
(311, 500, "2025-01-11", "Present", ""),
(312, 500, "2025-01-12", "Present", ""),
(313, 500, "2025-01-13", "Present", ""),
(314, 500, "2025-01-14", "Present", ""),
(315, 500, "2025-01-15", "Present", ""),
(316, 500, "2025-01-16", "Present", ""),
(317, 500, "2025-01-17", "Present", ""),
(318, 500, "2025-01-18", "Present", ""),
(319, 500, "2025-01-19", "Present", ""),
(320, 500, "2025-01-20", "Present", ""),
(321, 500, "2025-01-21", "Present", ""),
(322, 500, "2025-01-22", "Present", ""),
(323, 500, "2025-01-23", "Present", ""),
(324, 500, "2025-01-24", "Present", ""),
(325, 500, "2025-01-25", "Present", ""),
(326, 500, "2025-01-26", "Present", ""),
(327, 500, "2025-01-27", "Present", ""),
(328, 500, "2025-01-28", "Present", ""),
(329, 500, "2025-01-29", "Present", ""),
(330, 500, "2025-01-30", "Present", ""),
-- User ID 501
(331, 501, "2025-01-01", "Present", ""),
(332, 501, "2025-01-02", "Present", ""),
(333, 501, "2025-01-03", "Present", ""),
(334, 501, "2025-01-04", "Present", ""),
(335, 501, "2025-01-05", "Present", ""),
(336, 501, "2025-01-06", "Present", ""),
(337, 501, "2025-01-07", "Present", ""),
(338, 501, "2025-01-08", "Present", ""),
(339, 501, "2025-01-09", "Present", ""),
(340, 501, "2025-01-10", "Present", ""),
(341, 501, "2025-01-11", "Present", ""),
(342, 501, "2025-01-12", "Present", ""),
(343, 501, "2025-01-13", "Present", ""),
(344, 501, "2025-01-14", "Present", ""),
(345, 501, "2025-01-15", "Present", ""),
(346, 501, "2025-01-16", "Present", ""),
(347, 501, "2025-01-17", "Present", ""),
(348, 501, "2025-01-18", "Present", ""),
(349, 501, "2025-01-19", "Present", ""),
(350, 501, "2025-01-20", "Present", ""),
(351, 501, "2025-01-21", "Present", ""),
(352, 501, "2025-01-22", "Present", ""),
(353, 501, "2025-01-23", "Present", ""),
(354, 501, "2025-01-24", "Present", ""),
(355, 501, "2025-01-25", "Present", ""),
(356, 501, "2025-01-26", "Present", ""),
(357, 501, "2025-01-27", "Present", ""),
(358, 501, "2025-01-28", "Present", ""),
(359, 501, "2025-01-29", "Present", ""),
(360, 501, "2025-01-30", "Present", "");