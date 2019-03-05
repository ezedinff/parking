import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    default: 'customer',
    type: String,
  },
  user_id: {
    type: String,
  },
  username: {
    index: {unique: true},
    type: String,
  },
});

export const User = mongoose.model('User', userSchema);
