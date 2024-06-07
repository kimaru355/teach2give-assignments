CREATE OR ALTER PROCEDURE create_note(
    @id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255),
    @created_at VARCHAR(255)
)
AS
BEGIN
    INSERT INTO notes (id, title, content, created_at)
    VALUES (@id, @title, @content, @created_at);
END;