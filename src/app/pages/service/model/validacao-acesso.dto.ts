export interface ValidacaoAcessoDTO {
  codigo: number; // 1: OK, 0: Não encontrado, 2: Desativado, 3: Sem permissão
  podeAcessar: boolean;
  mensagem: string;
}
