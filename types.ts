export enum SolanaStage {
  USERS = 'USERS',
  GULF_STREAM = 'GULF_STREAM',
  BLOCK_BUILDING = 'BLOCK_BUILDING',
  CONSENSUS = 'CONSENSUS',
  BLOCK_VERIFICATION = 'BLOCK_VERIFICATION',
  TURBINE = 'TURBINE',
}

export interface Stage {
  id: SolanaStage;
  title: string;
  description: string;
  gridArea: string;
}

export interface Explanation {
  role: string;
  mechanism: string;
  importance: string;
}