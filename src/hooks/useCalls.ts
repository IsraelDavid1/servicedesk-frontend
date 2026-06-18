import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CallService } from '@/services/CallService';
import { CreateCallDTO, FinishCallDTO, CallFormData } from '@models/call';


const QUERY_KEYS = {
  ALL_CALLS: ['calls'] as const,
  MY_CALLS: ['calls', 'mine'] as const,
  CALL_BY_ID: (id: string) => ['calls', id] as const,
};

export function useAllCalls() {
  return useQuery({
    queryKey: QUERY_KEYS.ALL_CALLS,
    queryFn: CallService.getAll,
    staleTime: 1000 * 60 * 2,
  });
}

export function useMyCalls() {
  return useQuery({
    queryKey: QUERY_KEYS.MY_CALLS,
    queryFn: CallService.getMyCalls,
    staleTime: 1000 * 60,
  });
}

export function useCallById(callId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.CALL_BY_ID(callId ?? ''),
    queryFn: () => CallService.getById(callId!),
    enabled: !!callId, // Só roda se callId existir (!! converte para boolean)
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CallFormData) => {
      const payload: Omit<CreateCallDTO, 'beginDate'> & { beginDate: Date } = {
        beginDate: formData.beginDate,
        techLogin: formData.techLogin,
        asset: formData.asset,
        assetType: formData.assetType,
        department: formData.department,
        firstAnalysis: formData.firstAnalysis,
      };
      return CallService.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_CALLS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_CALLS });
      toast.success('Chamado criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar chamado: ${error.message}`);
    },
  });
}

export function useFinishCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      callId,
      finishData,
    }: {
      callId: string;
      finishData: { solution: string; endDate: Date };
    }) => {
      const payload: FinishCallDTO = {
        solution: finishData.solution,
        endDate: finishData.endDate,
      };
      return CallService.finish(callId, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_CALLS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CALL_BY_ID(variables.callId) });
      toast.success('Chamado finalizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao finalizar chamado: ${error.message}`);
    },
  });
}

export function useDeleteCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (callId: string) => CallService.delete(callId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_CALLS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_CALLS });
      toast.success('Chamado excluído.');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir chamado: ${error.message}`);
    },
  });
}