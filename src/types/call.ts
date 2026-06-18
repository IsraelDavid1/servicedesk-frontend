import { Assets, AssetsType, CallState } from './enums';

export interface CallResponseDTO {
  id: string;
  beginDate: string;
  asset: Assets;
  assetsType: AssetsType;
  department: string;
  firstAnalysis: string;
  solution: string | null;
  endDate: string | null;
  callState: CallState;
  createdById: string | null;
  assignedToId: string | null;
}

export interface CreateCallDTO {
  beginDate: string;
  techLogin: string;
  asset: Assets;
  assetType: AssetsType;
  department: string;
  firstAnalysis: string;
}

export interface CreateCompleteCallDTO extends CreateCallDTO {
  solution: string;
  endDate: Date;
}

export interface FinishCallDTO {
  solution: string;
  endDate: Date;
}

export interface CallFormData {
  beginDate: Date;
  techLogin: string;
  asset: Assets;
  assetType: AssetsType;
  department: string;
  firstAnalysis: string;
  solution?: string;
  endDate?: Date;
}

export interface CallFilters {
  status?: CallState;
  asset?: Assets;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}