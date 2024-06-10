import { v4 } from "uuid";
import addImageToBody from "./add-image-to-body";
import { NextFunction, Request, Response } from "express";

describe("addImageToBody middleware unit tests", () => {
    test('adds Image To Body', ()=>{
  const req = {
    body: {},
    files:{
        image: v4()
    }
  } as unknown as Request;
  const res = {}  as Response;
  const next = (() => {}) as NextFunction;
  addImageToBody(req, res, next);
  expect(req.body).toHaveProperty('image');
  expect(req.body.image).toEqual(req.files.image);
})

test('does not adds Image To Body in files', ()=>{
    const req = {
      body: {},
      
    } as unknown as Request;
    const res = {}  as Response;
    const next = (() => {}) as NextFunction;
    addImageToBody(req, res, next);
    expect(req.body).toHaveProperty('image');
    expect(req.body.image).not.toBeDefined
  })

});
