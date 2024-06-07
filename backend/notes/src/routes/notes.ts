import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes.controller";

const notesRouter = Router();

notesRouter.post("/create", createNote);
notesRouter.get("/all", getNotes);
notesRouter.get("/:id", getNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
