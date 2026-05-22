import api from '@api/axios';
import { formatDateForApi } from '@utils/formatters';
import {
  CallResponseDTO,
  CreateCallDTO,
  CreateCompleteCallDTO,
  FinishCallDTO
} from '@types/call';

const CALL_ENDPOINTS = {
  BASE: '/call',
  MY_CALLS: '/call/mycalls',
  MONTHLY: '/call/monthly'
} as const;

export const CallService = {
  async create(callData: Omit<CreateCallDTO, 'beginDate'> & { beginDate: Date }): Promise<CallResponseDTO> {
    const payload: CreateCallDTO = {
      ...callData,
      beginDate: formatDateForApi(callData.beginDate)
    };
    
    const response = await api.post<CallResponseDTO>(CALL_ENDPOINTS.BASE, payload);
    return response.data;
  },

  async finish(callId: string, finishData: FinishCallDTO): Promise<CallResponseDTO> {
    const payload: FinishCallDTO = {
      ...finishData,
      endDate: formatDateForApi(finishData.endDate)
    };
    
    const response = await api.patch<CallResponseDTO>(
      `${CALL_ENDPOINTS.BASE}/${callId}`, 
      payload
    );
    return response.data;
  },

  async createFinished(callData: Omit<CreateCompleteCallDTO, 'beginDate' | 'endDate'> & { 
    beginDate: Date; 
    endDate: Date 
  }): Promise<CallResponseDTO> {
    const payload: CreateCompleteCallDTO = {
      ...callData,
      beginDate: formatDateForApi(callData.beginDate),
      endDate: formatDateForApi(callData.endDate)
    };
    
    const response = await api.post<CallResponseDTO>(
      `${CALL_ENDPOINTS.BASE}/finishedcall`, 
      payload
    );
    return response.data;
  },

  async delete(callId: string): Promise<void> {
    await api.delete(`${CALL_ENDPOINTS.BASE}/${callId}`);
  },

  async getAll(): Promise<CallResponseDTO[]> {
    const response = await api.get<CallResponseDTO[]>(CALL_ENDPOINTS.BASE);
    return response.data;
  },

  async getById(callId: string): Promise<CallResponseDTO> {
    const response = await api.get<CallResponseDTO>(`${CALL_ENDPOINTS.BASE}/${callId}`);
    return response.data;
  },

  async getMyCalls(): Promise<CallResponseDTO[]> {
    const response = await api.get<CallResponseDTO[]>(CALL_ENDPOINTS.MY_CALLS);
    return response.data;
  },

  async getByMonth(beginDate: Date, lastDate: Date): Promise<CallResponseDTO[]> {
    const params = new URLSearchParams({
      beginDate: formatDateForApi(beginDate),
      lastDate: formatDateForApi(lastDate)
    });
    
    const response = await api.get<CallResponseDTO[]>(
      `${CALL_ENDPOINTS.MONTHLY}?${params}`
    );
    return response.data;
  }
};

export const { 
  create, 
  finish, 
  createFinished, 
  delete: deleteCall, 
  getAll, 
  getById, 
  getMyCalls, 
  getByMonth 
} = CallService;
