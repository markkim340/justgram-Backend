-- migrate:up
CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment VARCHAR(2000) DEFAULT NULL,
    posting_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_ibfk_1 FOREIGN KEY (posting_id) REFERENCES postings (id),
    CONSTRAINT comments_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE comments;