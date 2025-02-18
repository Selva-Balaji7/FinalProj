DESC LeaveTypes;
DESC LeaveRequests;

SELECT * FROM LeaveTypes;
SELECT * FROM AttendanceRequests;
SELECT * FROM LeaveRequests;

INSERT INTO LeaveTypes (id, name, description) VALUES
(1, "SL", "Sick Leave"), (2, "EL", "Emergency Leave");

INSERT INTO AttendanceRequests (user_id, date, status, remarks) VALUES
(100, "2025-01-31", "Present", ""),
(101, "2025-01-31", "Present", ""),
(102, "2025-01-31", "Present", ""),
(103, "2025-01-31", "Present", ""),
(104, "2025-01-31", "Present", ""),
(105, "2025-01-31", "Present", ""),
(106, "2025-01-31", "Present", ""),
(107, "2025-01-31", "Present", ""),
(108, "2025-01-31", "Present", ""),
(500, "2025-01-31", "Present", ""),
(501, "2025-01-31", "Present", "");


insert into LeaveRequests (user_id, leave_type_id, date, status, reason) VALUES
(101, 1, "2025-02-1", "pending", "Going to Doctors"),
(102, 1, "2025-02-25", "pending", "Going to Home Town"),
(104, 2, "2025-02-20", "pending", "Marrage"),
(103, 2, "2025-02-20", "pending", "Vacation"),
(104, 2, "2025-02-20", "pending", "Doctor Appointment"),
(107, 2, "2025-02-20", "pending", "Family Function"),
(500, 2, "2025-02-20", "pending", "Marrage"),
(501, 2, "2025-02-22", "pending", "Family Emergency");
