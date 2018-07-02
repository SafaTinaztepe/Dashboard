CREATE DATABASE motor;

use motor;

CREATE TABLE Controller(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  knob_sb INTEGER,
  knob_bb INTEGER,
  knob_sb_fw INTEGER,
  knob_sb_bw INTEGER,
  knob_bb_fw INTEGER,
  knob_bb_bw INTEGER,
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
  elock BOOLEAN,
  pump BOOLEAN,
  PRIMARY KEY (id, ts)
);

CREATE TABLE MotorBb(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  rpm FLOAT,
  motor_temp FLOAT,
  coolant_temp FLOAT,
  elock BOOLEAN,
  pump BOOLEAN,
  PRIMARY KEY (id, ts)
);

CREATE TABLE Switch(
  id INTEGER NOT NULL AUTO_INCREMENT,
  ts TIMESTAMP NOT NULL,
  battery BOOLEAN,
  fuel_cell BOOLEAN,
  charger BOOLEAN,
  sw4 BOOLEAN,
  sw5 BOOLEAN,
  sw6 BOOLEAN,
  sw7 BOOLEAN,
  sw8 BOOLEAN,
  PRIMARY KEY (id, ts)
);
