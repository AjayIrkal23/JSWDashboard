import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    PieceID: {
      type: String,
      required: true,
      unique: true,
    },
    fceZone: {
      LoadingGapTime: {
        type: String,
        required: true,
      },
      ChargingGapTime: {
        type: String,
        required: true,
      },
      LoadingToChargingTravelTime: {
        type: String,
        required: true,
      },
      DischargingGapTime: {
        type: String,
        required: true,
      },
      PacingModeAutoCount: {
        type: String,
        required: true,
      },
      PercentOfPMACount: {
        type: String,
        required: true,
      },
      PacingOffsetPlus: {
        type: String,
        required: true,
      },
      PacingOffsetMinus: {
        type: String,
        required: true,
      },
      FCE1SlabCount: {
        type: String,
        required: true,
      },
      FCE2SlabCount: {
        type: String,
        required: true,
      },
      FCE3SlabCount: {
        type: String,
        required: true,
      },
      FCEWiseDischargeDelay: {
        type: String,
        required: true,
      },
      FCEWiseExtractorDelay: {
        type: String,
        required: true,
      },
      FCEWiseSlipDelay: {
        type: String,
        required: true,
      },
    },
    sspZone: {
      NoSspUse: {
        type: String,
        required: true,
      },
      SspUse: {
        type: String,
        required: true,
      },
      PercentSspUse: {
        type: String,
        required: true,
      },
      SSPProcessTime: {
        type: String,
        required: true,
      },
      SSPProcessDelay: {
        type: String,
        required: true,
      },
      ProcessTimeAverage: {
        type: String,
        required: true,
      },
      SSPGapTime: {
        type: String,
        required: true,
      },
    },
    rmZone: {
      R1GapTimeActual: {
        type: String,
        required: true,
      },
      R1ProcessTimeActual: {
        type: String,
        required: true,
      },
      R1ProcessTimeAverage: {
        type: String,
        required: true,
      },
      R1TravelDelay: {
        type: String,
        required: true,
      },
      R1ProcessDelay: {
        type: String,
        required: true,
      },
      R23PassesCount: {
        type: String,
        required: true,
      },
      R25PassesCount: {
        type: String,
        required: true,
      },
      PercentR23PassesCount: {
        type: String,
        required: true,
      },
      PercentR25PassesCount: {
        type: String,
        required: true,
      },
      R2GapTimeActual: {
        type: String,
        required: true,
      },
      R2ProcessTimeActual: {
        type: String,
        required: true,
      },
      R2ProcessTimeAverage: {
        type: String,
        required: true,
      },
      R2TravelDelay: {
        type: String,
        required: true,
      },
      R2ProcessDelay: {
        type: String,
        required: true,
      },
      R1RevPassKickOutTime: {
        type: String,
        required: true,
      },
      R1FwdPassKickOutTime: {
        type: String,
        required: true,
      },
      R2RevPassKickOutTime: {
        type: String,
        required: true,
      },
      R2FwdPassKickOutTime: {
        type: String,
        required: true,
      },
      RMTransferBarThickness: {
        type: String,
        required: true,
      },
      R1R2TravelDelay: {
        type: String,
        required: true,
      },
    },
    fmZone: {
      FMRockingManCount: {
        type: String,
        required: true,
      },
      FMRockingAutoCount: {
        type: String,
        required: true,
      },
      ManualRockTime: {
        type: String,
        required: true,
      },
      AutoRockTime: {
        type: String,
        required: true,
      },
      FMETravelDelay: {
        type: String,
        required: true,
      },
      FMProcessTimeActual: {
        type: String,
        required: true,
      },
      FMProcessTimeAverage: {
        type: String,
        required: true,
      },
      FMGapTime: {
        type: String,
        required: true,
      },
      FMPredictedGap: {
        type: String,
        required: true,
      },
      FMProcessDelayTime: {
        type: String,
        required: true,
      },
      RollChangeDelay: {
        type: String,
        required: true,
      },
      Delay2to5: {
        type: String,
        required: true,
      },
      DelayMoreThen5: {
        type: String,
        required: true,
      },
      DCProcessTime: {
        type: String,
        required: true,
      },
      DCGapTime: {
        type: String,
        required: true,
      },
      BottleNeckAreaWise: {
        type: String,
        required: true,
      },
    },
    DelayVisualization: {
      FCEWiseDischargeDelay: {
        type: String,
        required: true,
      },
      FCEWiseExtratorDelay: {
        type: String,
        required: true,
      },
      FCEWiseSlipDelay: {
        type: String,
        required: true,
      },
      R1TravelDelay: {
        type: String,
        required: true,
      },
      R1ProcessDelay: {
        type: String,
        required: true,
      },
      R2TravelDelay: {
        type: String,
        required: true,
      },
      R2ProcessDelay: {
        type: String,
        required: true,
      },
      FMETravelDelay: {
        type: String,
        required: true,
      },
      Delay2to5: {
        type: String,
        required: true,
      },
      DelayMoreThen5: {
        type: String,
        required: true,
      },
      FCESSPTravelTimeDelay: {
        type: String,
        required: true,
      },
      SSPProcessTimeDelay: {
        type: String,
        required: true,
      },
      SSPR1TravelTimeDelay: {
        type: String,
        required: true,
      },
      FMRockingAutoCount: {
        type: String,
        required: true,
      },
      ManualRockTime: {
        type: String,
        required: true,
      },
      AutoRockTime: {
        type: String,
        required: true,
      },
      DelayDetails: {
        type: String,
        required: true,
      },
    },
    GapTime: {
      SSPGapTimeActual: {
        type: String,
        required: true,
      },
      R1GapTimeActual: {
        type: String,
        required: true,
      },
      R2GapTimeActual: {
        type: String,
        required: true,
      },
      FMGapTime: {
        type: String,
        required: true,
      },
    },
    ProcessTime: {
      SSPProcessDelayTime: {
        type: String,
        required: true,
      },
      R1ProcessDelayTime: {
        type: String,
        required: true,
      },
      R2ProcessDelayTime: {
        type: String,
        required: true,
      },
      FMProcessDelayTime: {
        type: String,
        required: true,
      },
    },
    ProcessTime: {
      RMRollChangeDelay: {
        type: String,
        required: true,
      },
      FMRollChangeDelay: {
        type: String,
        required: true,
      },
    },
    BottleNeck: {
      BottleNecks: {
        type: String,
        required: true,
      },
    },
    GRTWRT: {
      GRTWiseTrend: {
        type: String,
        required: true,
      },
      WRTWiseTrend: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("UploadedData", dataSchema);

export default Data;
