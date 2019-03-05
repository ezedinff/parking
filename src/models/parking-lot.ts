import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
  blocks: [
    {
      block_code: {
        type: String,
      },
      floors: [
        {
          floor_number: {
            type: String,
          },
          is_accessible: {
            type: Boolean,
          },
          is_covered: {
            type: Boolean,
          },
          is_floor_full: {
            type: Boolean,
          },
          is_reserved_reg_cust: { // indicates whether a floor is strictly reserved for regular customers.
            type: Boolean,
          },
          max_height_in_meter: {
            type: String,
          },
          number_of_slots: {
            type: Number,
          },
          number_of_wings: {
            type: String,
          },
          parking_slot: [
            {
              slot_number: Number,
              wing_slot: Number,
            },
          ],
        },
      ], // floor,
      is_block_full: {
        type: Boolean,
      },
      number_of_floors: {
        type: String,
      },
    },
  ],
  created_date: {
    default: Date.now,
    type: Date,
  },
  is_reentry_allowed: {
    type: Boolean,
  },
  is_slot_available: {
    type: Boolean,
  },
  is_valet_parking_available: {
    type: Boolean,
  },
  location: [],
  number_of_blocks: {
    type: Number,
  },
  operating_company_name: {
    type: String,
  },
});

export const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);
