import { SistemaDTO } from './sistema-dto.model';

export interface AcessosResponse {
  id: number;
  username: string;
  nome: string;
  sistemas: SistemaDTO[];
}
