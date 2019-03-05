import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const customerSchema = new Schema({
  contact_number: {
    type: String,
  },
  is_regular_customer: {
    default: false,
    type: Boolean,
  },
  registration_date: {
    default: Date.now(),
    type: Date,
  },
  regular_pass: [
    {
      cost: {
        type: Number,
      },
      duration_in_days: {
        type: Number,
      },
      purchase_date: {
        type: Date,
      },
      start_date: {
        type: Date,
      },
    },
  ],
  vehicle_number: {
    type: String,
  },
});

export const Customer = mongoose.model('Customer', customerSchema);
