import { Request, Response } from "express";
import { v4 } from "uuid";
import { Note } from "../interfaces/Note";
import { Res } from "../interfaces/Res";

export const createNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const note: Note = req.body;
  note.id = v4();
  note.created_at = new Date().toISOString();
  console.log(note);
  const response: Res = {
    success: true,
    message: "Note created",
    data: note,
  };
  return res.status(201).json(response);
};

export const getNotes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response: Res = {
    success: true,
    message: "Notes retrieved",
    data: [],
  };
  return res.status(200).json(response);
};

export const getNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  console.log(id);
  const response: Res = {
    success: true,
    message: "Note retrieved",
    data: {},
  };
  return res.status(200).json(response);
};

export const updateNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const note: Note = req.body;
  console.log(id, note);
  const response: Res = {
    success: true,
    message: "Note updated",
    data: note,
  };
  return res.status(200).json(response);
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  console.log(id);
  const response: Res = {
    success: true,
    message: "Note deleted",
    data: {},
  };
  return res.status(200).json(response);
};
