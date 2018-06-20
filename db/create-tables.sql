CREATE DATABASE motor;

use motor;

CREATE TABLE Controller(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  knob_sb INTEGER,
  knob_bb INTEGER,
  knob_fw_sb INTEGER,
  knob_bw_sb INTEGER,
  knob_fw_bb INTEGER,
  knob_bw_bb INTEGER,
  PRIMARY KEY (id, ts)
);

CREATE TABLE PduController(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  current_sb FLOAT,
  current_bb FLOAT,
  v12_bus FLOAT,
  v12_battery FLOAT,
  v48_bus FLOAT,
  v48_dcdc FLOAT,
  PRIMARY KEY (id, ts)
);

CREATE TABLE MotorSb(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  rpm FLOAT,
  motor_temp FLOAT,
  coolant_temp FLOAT,
  e_lock BOOLEAN,
  pump BOOLEAN,
  PRIMARY KEY (id, ts)
);

CREATE TABLE MotorBb(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  rpm FLOAT,
  motor_temp FLOAT,
  coolant_temp FLOAT,
  e_lock BOOLEAN,
  pump BOOLEAN,
  PRIMARY KEY (id, ts)
);
