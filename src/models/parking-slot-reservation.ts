import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const parkingSlotReservationSchema = new Schema({
  booking_date: {type: Date, default: Date.now()},
  customer_id: {type: String},
  duration_in_minutes: {type: Number},
  parking_slip: {
    actual_entry_time: {type: Date},
    actual_exit_time: {type: Date},
    basic_cost: {type: Number},
    is_paid: {type: Boolean},
    penalty: {type: Number},
    total_cost: {type: Number},
  },
  start_timestamp: {type: String, default: Date.now()},
});

export const ParkingSlotReservation = mongoose.model('ParkingSlotReservation', parkingSlotReservationSchema);
