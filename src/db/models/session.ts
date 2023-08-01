import { Schema, model } from 'mongoose';

const Session = model(
  'session',
  new Schema({
    token: String,
    lastRequested: { type: Date, default: new Date() },
  })
);

export default Session;
