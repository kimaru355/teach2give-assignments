CREATE OR ALTER PROCEDURE update_note(
    @id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255)
)
AS
BEGIN
    UPDATE notes
    SET title = @title, content = @content
    WHERE id = @id;
END;