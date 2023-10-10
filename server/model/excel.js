import mongoose from "mongoose";

const excelSchema = new mongoose.Schema(
  {
    c_PieceName: {
      type: mongoose.SchemaTypes.Mixed,
      unique: true,
    },
    c_HistoryKeyTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    gt_HistoryKeyTm: {
      type: Date,
      required: true,
    },
    f_FEntF1TravelTimePre: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FEntF1TravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    b_IsRejected: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_GapOffsetOper: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_L2L1ExtRdyTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCDTravelTmeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabDetecL2ExtRdyTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPR1TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1R2TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2FEntTravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FMEntryOpInhibit: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FEntF1TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FceNum: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPGapTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1GapTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2GapTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_F1GapTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DCGapTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DisPrevTailPos: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMPrevTailPos: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_SSPUse: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_PacingMode: {
      type: mongoose.SchemaTypes.Mixed,
    },
    spy_code: {
      type: mongoose.SchemaTypes.Mixed,
    },
    ISC1: {
      type: mongoose.SchemaTypes.Mixed,
    },
    ISC2: {
      type: mongoose.SchemaTypes.Mixed,
    },
    ISC3: {
      type: mongoose.SchemaTypes.Mixed,
    },
    ISC4: {
      type: mongoose.SchemaTypes.Mixed,
    },
    ISC5: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_TotalGapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ExtractCycleTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_CoilLen: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_R1PassAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_R2PassAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdStripSpd_C2: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabWid: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelThkTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelWidTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    c_GrdName: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_indGrd: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_famIdx: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_grtIdx: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_WRTIdx: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_HSBOpInhTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPOpInhTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1OpInhTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2OpInhTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_MPCDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabDetDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_MPCL1TrackDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabDetL1TrackDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const ExcelData = mongoose.model("ExcelData", excelSchema);

export default ExcelData;
