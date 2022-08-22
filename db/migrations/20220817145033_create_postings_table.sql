-- migrate:up
CREATE TABLE postings (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    contents VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT postings_id_fk_1 FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE postings;