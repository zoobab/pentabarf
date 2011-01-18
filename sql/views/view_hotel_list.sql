
CREATE OR REPLACE VIEW view_hotel_list AS
  SELECT name,
    ( SELECT name FROM view_conference_person WHERE conference_person_id = accommodation_mate_id) AS room_mate,
    roomtype,
    accommodation_name
  FROM view_conference_person
      JOIN conference_person_travel USING (conference_person_id)
      JOIN custom.custom_conference_person USING (person_id)
  ORDER BY accommodation_name
;

