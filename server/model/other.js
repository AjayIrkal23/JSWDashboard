import mongoose from "mongoose";

const otherData = new mongoose.Schema(
  {
    c_PieceName: {
      type: mongoose.SchemaTypes.Mixed,
    },
    RMTransferBarThickness: {
      type: mongoose.SchemaTypes.Mixed,
    },
  },

  {
    timestamps: true,
  }
);

const OtherData = mongoose.model("OtherData", otherData);

export default OtherData;
