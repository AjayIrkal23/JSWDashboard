import mongoose from "mongoose";

const otherData = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    report: {
      Total_Slabs: {
        type: String,
        required: true,
      },
      Crew_ID: {
        type: String,
        required: true,
      },
      Total_Coils:{
        type: String,
        required: true,
      },
      Total_Length: {
        type: String,
        required: true,
      },
      Timespan: {
        type: String,
        required: true,
      },
      Total_Rejects: {
        type: String,
        required: true,
      },
      Total_Cobbles:{
        type: String,
        required: true,
      },
      Total_Plates: {
        type: String,
        required: true,
      },
      Total_Runbacks: {
        type: String,
        required: true,
      },
      Total_Kickbacks:{
        type: String,
        required: true,
      },
      Total_Pressbacks: {
        type: String,
        required: true,
      },
      Reject_Coils: {
        type: String,
        required: true,
      },
      FM_Gap: {
        type: String,
        required: true,
      },
      Total_FM_Gap:{
        type: String,
        required: true,
      },
      Avg_Act_thk: {
        type: String,
        required: true,
      },
      Avg_Act_Width: {
        type: String,
        required: true,
      },
      Tot_Avg_Act_thk: {
        type: String,
        required: true,
      },
      Tot_Avg_Act_Width: {
        type: String,
        required: true,
      },
      Avg_FT: {
        type: String,
        required: true,
      },
      Tot_Avg_FT: {
        type: String,
        required: true,
      },
      Total_Coil_Weight: 15861,
      Runtime: '19:36:56',
      Utilization: 81.79,
      Productivity: 689.63,
      Furnace_1: 204,
      Coiler_1: 223,
      Furnace_2: 206,
      Coiler_2: 191,
      Furnace_3: 207,
      Coiler_3: 189,
      Delay_2to5: 128,
      Tot_Delay_2to5: 128,
    }
  }

  {
    timestamps: true,
  }
);

const OtherData = mongoose.model("OtherData", otherData);

export default OtherData;
