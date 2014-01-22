
CREATE TABLE base.dinner_menu (
  dinner_menu_id SERIAL NOT NULL,
  conference_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  vegetarian BOOL,
  rank INTEGER
);

CREATE TABLE dinner_menu (
  FOREIGN KEY (conference_id) REFERENCES conference (conference_id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (dinner_menu_id)
) INHERITS( base.dinner_menu );

CREATE TABLE log.dinner_menu (
) INHERITS( base.logging, base.dinner_menu );

CREATE INDEX log_dinner_menu_dinner_menu_id_idx ON log.dinner_menu( dinner_menu_id );
CREATE INDEX log_dinner_menu_log_transaction_id_idx ON log.dinner_menu( log_transaction_id );

