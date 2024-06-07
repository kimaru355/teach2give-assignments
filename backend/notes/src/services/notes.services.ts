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
      console.log(result);
      if (result.length < 1) {
        return {
          success: true,
          message: "No notes found",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "Notes retrieved successfully",
          data: result,
        };
      }
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
        await (await pool).request().input("id", id).execute("get_note")
      ).recordset;
      console.log(result);

      if (result.length < 1) {
        return {
          success: false,
          message: "Note not found",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "Note retrieved successfully",
          data: result,
        };
      }
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
      const results = (
        await (await pool)
          .request()
          .input("id", note.id)
          .input("title", note.title)
          .input("content", note.content)
          .input("created_at", note.created_at)
          .execute("create_note")
      ).rowsAffected;
      if (results[0] > 0) {
        return {
          success: true,
          message: "Project created successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Error while creating project",
          data: null,
        };
      }
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
      const results = (
        await (await pool)
          .request()
          .input("id", id)
          .input("title", note.title)
          .input("content", note.content)
          .execute("update_note")
      ).rowsAffected;
      if (results[0] < 1) {
        return {
          success: false,
          message: "Error while updating",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "Project Updated successfully",
          data: null,
        };
      }
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
        await (await pool).request().input("id", id).execute("delete_note")
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
