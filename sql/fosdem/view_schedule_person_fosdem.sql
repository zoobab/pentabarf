CREATE OR REPLACE VIEW view_schedule_person_fosdem AS
SELECT DISTINCT person.person_id, COALESCE(person.public_name, COALESCE(person.first_name || ' '::text, ''::text) || person.last_name, person.nickname) AS name, conference_person.email, conference.conference_id, conference_person.conference_person_id, conference_person.abstract, conference_person.description, event_role, event_role_state, last_name, first_name
   FROM person
  CROSS JOIN conference
   LEFT JOIN conference_person USING (conference_id, person_id)
   LEFT JOIN event_person USING (person_id)
  WHERE event_role_state != 'canceled' AND event_role = 'speaker'
;

