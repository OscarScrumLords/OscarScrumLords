DROP DATABASE IF EXISTS bike;

CREATE DATABASE bike;

USE bike;

CREATE TABLE locations (
    coordinates int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    time_id TIME,
    date_id DATE,
    media MEDIUMBLOB NOT NULL
);


CREATE TABLE events (
  id varchar(40) NOT NULL PRIMARY KEY,
  date_id DATE,
  time_id TIME,
  location_id varchar(40)
);


CREATE TABLE routes (
  route_name varchar(40) NOT NULL PRIMARY KEY,
  st_location VARCHAR(40),
  end_location VARCHAR(40),
  rating INT
);

CREATE TABLE user (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(40) NOT NULL,
  events_id varchar(40),
  FOREIGN KEY (events_id) REFERENCES events(id)
);

CREATE TABLE landmarks (
    address_id varchar(60) NOT NULL PRIMARY KEY,
    phone varchar(20),
    services varchar(60),
    bus_hours varchar(100)
);