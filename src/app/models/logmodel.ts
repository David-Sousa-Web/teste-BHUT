import { Schema, model, Document } from "mongoose";

interface Log extends Document {
  data_hora: Date;
  car_id: string;
}

const logSchema = new Schema<Log>({
  data_hora: { type: Date, default: Date.now },
  car_id: { type: String, required: true },
});

const LogModel = model<Log>("Logs", logSchema);

export default LogModel;
