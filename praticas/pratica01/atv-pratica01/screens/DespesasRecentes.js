// screens/DespesasRecentes.js
import { useContext } from "react";
import DespesaSaida from "../components/despesa/DespesaSaida";
import { DespesasContext } from "../store/despesas-context";

export default function DespesasRecentes() {
    const despesasCtx = useContext(DespesasContext);

    const despesasRecentes = despesasCtx.despesas.filter((despesa) => {
        // 1. Converte a string "DD/MM/AAAA" salva no Contexto para um objeto Date real
        const [dia, mes, ano] = despesa.data.split("/");
        const dataDespesa = new Date(ano, mes - 1, dia); // O mês começa em 0 no JavaScript

        // 2. Calcula qual era a data exata 7 dias atrás a partir de hoje
        const hoje = new Date();
        const dataLimite = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() - 7,
        );

        // 3. Retorna verdadeiro apenas se a despesa ocorreu nos últimos 7 dias (ou hoje)
        return dataDespesa >= dataLimite && dataDespesa <= hoje;
    });

    return (
        <DespesaSaida
            despesas={despesasRecentes}
            periodoNome="Últimos 7 Dias"
        />
    );
}
