"use strict";

module.exports = {
    studies: {
        create_table_if_not_exists: `CREATE TABLE IF NOT EXISTS studies (
                                      id INTEGER PRIMARY KEY,
                                      user_id INTEGER NOT NULL,
                                      study_name TEXT UNIQUE NOT NULL);`,
        create: "INSERT INTO studies (user_id, study_name) VALUES (?, ?);",
        // used in test only
        // read: "SELECT * FROM studies;",
        delete: "DELETE FROM studies WHERE id = ?;",
        rename: `UPDATE studies
                 SET study_name = ?
                    WHERE id = ?
                    AND user_id = ?;`
    },
    tests: {
        create_table_if_not_exists: `CREATE TABLE IF NOT EXISTS tests (
                                      id INTEGER PRIMARY KEY,
                                      study_id INTEGER NOT NULL,
                                      test_name TEXT NOT NULL,
                                      test_type TEXT,
                                      test_lang TEXT NOT NULL,
                                      test_attributes JSON,
                                      FOREIGN KEY (study_id)
                                          REFERENCES studies (id)
                                          ON DELETE CASCADE);`,
        create: `INSERT INTO tests (study_id, test_name, test_type, test_lang, test_attributes)
                                    VALUES (?, ?, ?, ?, ?);`,
        read: `SELECT *`,
        update_attributes: `UPDATE tests
                             SET test_attributes = ?
                                WHERE study_id = (
                                    SELECT id from studies 
                                    WHERE id = ?
                                    AND user_id = ?);`,
    },
    available_tests: {
        create_table_if_not_exists: `CREATE TABLE IF NOT EXISTS available_tests (
                                      id INTEGER PRIMARY KEY,
                                      test_name TEXT NOT NULL,
                                      test_label TEXT,
                                      test_default_attributes JSON);`,
        read: `SELECT * FROM available_tests;`,
        create: `INSERT INTO available_tests (test_name, test_label, test_default_attributes)
                                    VALUES (?, ?, ?);`,
    },
    studies_tests: {
        search: `SELECT s.id as study_id, s.study_name, t.study_id, t.test_name, t.test_type, t.test_lang, t.test_attributes
                    FROM tests t 
                    INNER JOIN studies s 
                    ON t.study_id = s.id
                    WHERE s.user_id = ?
                    AND t.test_name = ?
                    AND t.test_type = ?
                    AND t.test_lang = ?
                    COLLATE NOCASE;`,
        search_by_study_id: `SELECT s.id as study_id, s.study_name, t.study_id, t.test_name, t.test_type, t.test_lang, t.test_attributes
                    FROM tests t 
                    INNER JOIN studies s 
                    ON t.study_id = s.id
                    WHERE t.study_id = ?;`
    },
    patients: {
        create_table_if_not_exists: `CREATE TABLE IF NOT EXISTS patients (
                                      id INTEGER PRIMARY KEY,
                                      study_id INTEGER NOT NULL,
                                      email TEXT NOT NULL
        );`
    }
};