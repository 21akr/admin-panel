import express from 'express';

export interface BaseUserRequestInterface extends express.Request {
  user?: any;
  session: any;
}
