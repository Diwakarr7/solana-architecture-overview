import { SolanaStage, Stage } from './types';

export const STAGES: Stage[] = [
  {
    id: SolanaStage.USERS,
    title: "Users",
    description: "Wallets & dApps submitting transactions.",
    gridArea: "users",
  },
  {
    id: SolanaStage.GULF_STREAM,
    title: "Gulf Stream",
    description: "Transaction forwarding protocol.",
    gridArea: "gulfstream",
  },
  {
    id: SolanaStage.BLOCK_BUILDING,
    title: "Block Building",
    description: "Processing transactions into a block.",
    gridArea: "building",
  },
  {
    id: SolanaStage.CONSENSUS,
    title: "Consensus",
    description: "Confirming the sequence of blocks.",
    gridArea: "consensus",
  },
  {
    id: SolanaStage.BLOCK_VERIFICATION,
    title: "Block Verification",
    description: "Validators verify and replay the block.",
    gridArea: "verification",
  },
  {
    id: SolanaStage.TURBINE,
    title: "Turbine",
    description: "Block propagation protocol.",
    gridArea: "turbine",
  },
];