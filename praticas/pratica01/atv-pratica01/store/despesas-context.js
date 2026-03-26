import { createContext, useState } from 'react';

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: ({ descricao, valor, data }) => {},
  removerDespesa: (id) => {},
  atualizarDespesa: (id, { descricao, valor, data }) => {},
});

export default function DespesasContextProvider({ children }) {
  const [despesasState, setDespesasState] = useState([]);

  function adicionarDespesa(despesaData) {
    setDespesasState((estadoAtual) => [
      { ...despesaData, id: Math.random().toString() },
      ...estadoAtual,
    ]);
  }

  function removerDespesa(id) {
    setDespesasState((estadoAtual) => estadoAtual.filter((despesa) => despesa.id !== id));
  }

  function atualizarDespesa(id, despesaData) {
    setDespesasState((estadoAtual) => {
      const index = estadoAtual.findIndex((despesa) => despesa.id === id);
      const despesaAtualizavel = estadoAtual[index];
      const itemAtualizado = { ...despesaAtualizavel, ...despesaData };
      const novoEstado = [...estadoAtual];
      novoEstado[index] = itemAtualizado;
      return novoEstado;
    });

    function adicionarDespesa(despesaData) {
    setDespesasState((estadoAtual) => [
      { ...despesaData, valorPago: 0, id: Math.random().toString() }, 
      ...estadoAtual,
    ]);
  }
  }

  const value = {
    despesas: despesasState,
    adicionarDespesa,
    removerDespesa,
    atualizarDespesa,
  };

  return <DespesasContext.Provider value={value}>{children}</DespesasContext.Provider>;
}