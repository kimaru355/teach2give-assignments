import { Request, Response } from "express";
import { v4 } from "uuid";
import { Note } from "../interfaces/Note";
import { Res } from "../interfaces/Res";
import { Notes } from "../services/notes.services";

export const createNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const note: Note = req.body;
  note.id = v4();
  note.created_at = new Date().toISOString();
  const notes = new Notes();
  const response = await notes.createNote(note);
  return res.status(201).json(response);
};

export const getNotes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const notes = new Notes();
  const response = await notes.getNotes();
  return res.status(200).json(response);
};

export const getNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const notes = new Notes();
  const response = await notes.getNote(id);
  return res.status(200).json(response);
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const note: Note = req.body;
  note.id = id;
  const notes = new Notes();
  const response = await notes.updateNote(id, note);
  return res.status(200).json(response);
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const notes = new Notes();
  const response = await notes.deleteNote(id);
  return res.status(200).json(response);
};
