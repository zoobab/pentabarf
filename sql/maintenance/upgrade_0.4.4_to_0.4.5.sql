
BEGIN;
ALTER TABLE conference_person_travel ADD COLUMN accommodation_mate_id INTEGER;

COMMIT;
