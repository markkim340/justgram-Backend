-- migrate:up
CREATE TABLE posting_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    posting_id INT NOT NULL,
    image_url VARCHAR(3000) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posting_images_ibfk_1 FOREIGN KEY (posting_id) REFERENCES postings(id)
);

-- migrate:down
DROP TABLE posting_images;