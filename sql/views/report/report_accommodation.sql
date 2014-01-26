
CREATE OR REPLACE VIEW view_report_accommodation AS
  SELECT view_conference_person.conference_id,
         view_conference_person.person_id,
         COALESCE(view_person.first_name || ' '::text, ''::text) || view_person.last_name AS name,
         conference_person_travel.accommodation_roomtype,
         conference_person_travel.accommodation_affiliation,
         ( SELECT COALESCE(view_person.first_name || ' '::text, ''::text) || view_person.last_name
             FROM view_conference_person JOIN view_person USING (person_id)
            WHERE view_conference_person.conference_person_id = conference_person_travel.accommodation_roommate
         ) AS accommodation_roommate,
         conference_person_travel.arrival_date,
         conference_person_travel.departure_date
    FROM view_conference_person
         JOIN view_person USING (person_id)
         JOIN conference_person_travel USING (conference_person_id)
   WHERE conference_person_travel.need_accommodation = true
ORDER BY conference_person_travel.accommodation_affiliation,
         COALESCE(view_person.first_name || ' '::text, ''::text) || view_person.last_name
;

