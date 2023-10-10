import mongoose from "mongoose";

const pacingData = new mongoose.Schema(
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
    gt_FceDisChgTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    c_PrevPieceName: {
      type: mongoose.SchemaTypes.Mixed,
    },
    gt_PrevFceDisChgTm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabThk: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabLen: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabWid: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMEntThk: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelThkTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelWidTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FceExtTemp: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_RMDelTempTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_RMDelTempAve: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMEntTempTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMEntTempAve: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelTempTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDelTempAve: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_CoilTempTarg: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_CTAve: {
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
    i_SSPUse: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FDTCMode: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_2ndAcceleration: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_PacingMode: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FceNum: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FceReheatTimeSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FceReheatTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_L2L1ExtRdyTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ExtractCycleTimeSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ExtractCycleTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ExtractCycleTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCDTravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCDTravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCDTravelTmeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCE1SSPTravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCE1SSPTravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FCE1SSPTravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPR1TravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPR1TravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPR1TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1R2TravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1R2TravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1R2TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2FEntTravelTimePre: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2FEntTravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2FEntTravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FEntF1TravelTimePre: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FEntF1TravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FEntF1TravelTimeDelay: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_F1ProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_F1ProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdStripSpd_C0: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdStripSpd_C2: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdStripSpd_CTC: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_SpeedCTC_Switch: {
      type: mongoose.SchemaTypes.Mixed,
    },
    meas_max_spd: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDCHeadTravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDCHeadTravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDCTailTravelTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMDCTailTravelTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DCProcessTimePred: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DCProcessTimeAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    c_BottleNeck: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_GapOffsetOper: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FceGapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPGapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPR1GapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1GapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2GapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMGapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DCGapSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_GapTarget: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_TotalGapSet: {
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
    f_NTXIntervalEstimate: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_TotalIntervalEstimate: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_TotalIntervalAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1Pass2IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1Pass3IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass2IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass3IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass4IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass5IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass6IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2Pass7IdleTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FMEntryTDOsc: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_FMEntryOpInhibit: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_R1PassAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_R2PassAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_ZsspSwitch: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_Zr1Switch: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_Zr2Switch: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_ZfmSwitch: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SSPProcessDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zssp_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R1ProcessTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zr1_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_R2ProcessTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zr2_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_F1ProcessTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zfm_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMProcessTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_Rejected: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ZsspOld_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ZsspNew_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zr1Old_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zr1New_: {
      type: mongoose.SchemaTypes.Mixed || null,
    },
    f_Zr2Old_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_Zr2New_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ZfmOld_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ZfmNew_: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_SlabDetecL2ExtRdyTimeDiff: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_Actual_Valid: {
      type: mongoose.SchemaTypes.Mixed,
    },
    F1GAPACT_extract_error: {
      type: mongoose.SchemaTypes.Mixed,
    },
    F1ProcessDiff_Zfm: {
      type: mongoose.SchemaTypes.Mixed,
    },
    F1GAPError: {
      type: mongoose.SchemaTypes.Mixed,
    },
    F1GAPError_extract_error: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdSpeedAct: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_ThrdSpeedSet: {
      type: mongoose.SchemaTypes.Mixed,
    },
    i_HoldTime: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_DisPrevTailPos: {
      type: mongoose.SchemaTypes.Mixed,
    },
    f_FMPrevTailPos: {
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

const PacingData = mongoose.model("PacingData", pacingData);

export default PacingData;
