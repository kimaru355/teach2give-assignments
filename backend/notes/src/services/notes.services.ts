import mssql from "mssql";
import dotenv from "dotenv";
import { NotesService } from "../interfaces/NotesService";
import { Res } from "../interfaces/Res";
import { sqlConfig } from "../config/sqlConfig";
import { Note } from "../interfaces/Note";

dotenv.config();

export class Notes implements NotesService {
  public async getNotes(): Promise<Res> {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (await (await pool).request().execute("get_notes"))
        .recordset;
      return {
        success: true,
        message: "Notes retrieved successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving notes",
        data: error,
      };
    }
  }

  public async getNote(id: string): Promise<Res> {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool)
          .request()
          .input("id", mssql.Int, id)
          .execute("get_note")
      ).recordset;
      return {
        success: true,
        message: "Note retrieved successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error retrieving note",
        data: error,
      };
    }
  }

  public async createNote(note: Note): Promise<Res> {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool)
          .request()
          .input("title", mssql.VarChar, note.title)
          .input("content", mssql.VarChar, note.content)
          .execute("create_note")
      ).recordset;
      return {
        success: true,
        message: "Note created successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error creating note",
        data: error,
      };
    }
  }

  public async updateNote(id: string, note: Note): Promise<Res> {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool)
          .request()
          .input("id", mssql.Int, id)
          .input("title", mssql.VarChar, note.title)
          .input("content", mssql.VarChar, note.content)
          .execute("update_note")
      ).recordset;
      return {
        success: true,
        message: "Note updated successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error updating note",
        data: error,
      };
    }
  }

  public async deleteNote(id: string): Promise<Res> {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool)
          .request()
          .input("id", mssql.Int, id)
          .execute("delete_note")
      ).recordset;
      return {
        success: true,
        message: "Note deleted successfully",
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error deleting note",
        data: error,
      };
    }
  }
}
