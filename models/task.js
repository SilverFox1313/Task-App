import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  body: {
    type: String,
    required: [true, 'Body is required.'],
  },
  priority: {
    type: String,
  }
}, { timestamps: true });

const Task = models.Task || model('Task', TaskSchema);

export default Task;