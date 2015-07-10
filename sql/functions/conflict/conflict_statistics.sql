
CREATE OR REPLACE FUNCTION conflict.conflict_statistics( IN conference_id INTEGER, OUT conflict_level TEXT, OUT conflicts INTEGER ) RETURNS SETOF RECORD AS $$
  DECLARE
    conflict TEXT;
    conflict_rows INTEGER;
    v_conference_id ALIAS FOR $1;
    v_conflict_level ALIAS FOR $2;
  BEGIN
    FOR v_conflict_level IN
      SELECT conflict_level.conflict_level FROM conflict.conflict_level WHERE conflict_level.conflict_level <> 'silent' ORDER BY rank
    LOOP
      conflicts = 0;
        FOR conflict IN
          SELECT conference_phase_conflict.conflict
          FROM
            conflict.conference_phase_conflict
            INNER JOIN conference ON (
              conference.conference_id = v_conference_id AND
              conference.conference_phase = conference_phase_conflict.conference_phase )
          WHERE conference_phase_conflict.conflict_level = v_conflict_level
        LOOP
          EXECUTE 'SELECT count(1) FROM conflict.conflict_' || conflict || '(' || v_conference_id || ');' INTO STRICT conflict_rows;
          conflicts := conflicts + conflict_rows;
        END LOOP;
      RETURN NEXT;
    END LOOP;
  END;
$$ LANGUAGE PLPGSQL;

