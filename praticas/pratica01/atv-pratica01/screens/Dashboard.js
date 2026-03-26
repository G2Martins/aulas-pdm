import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DespesasContext } from "../store/despesas-context";

export default function Dashboard() {
    const despesasCtx = useContext(DespesasContext);

    const [filtro, setFiltro] = useState("todos"); // 'todos' ou 'mes'
    const [mesSelecionado, setMesSelecionado] = useState(
        new Date().getMonth() + 1,
    ); // 1 a 12
    const [anoSelecionado, setAnoSelecionado] = useState(
        new Date().getFullYear(),
    );

    // 1. Filtragem dos dados
    const despesasFiltradas = despesasCtx.despesas.filter((despesa) => {
        if (filtro === "todos") return true;

        const [, mesStr, anoStr] = despesa.data.split("/");
        return (
            parseInt(mesStr) === mesSelecionado &&
            parseInt(anoStr) === anoSelecionado
        );
    });

    // 2. Cálculos dos Totalizadores
    const totalDespesas = despesasFiltradas.reduce(
        (soma, item) => soma + parseFloat(item.valor || 0),
        0,
    );
    const totalPago = despesasFiltradas.reduce(
        (soma, item) => soma + parseFloat(item.valorPago || 0),
        0,
    );
    const saldoPendente = totalDespesas - totalPago;

    return (
        <View style={styles.container}>
            {/* HEADER DE FILTROS */}
            <View style={styles.filtroContainer}>
                <Picker
                    selectedValue={filtro}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFiltro(itemValue)}
                >
                    <Picker.Item label="Todos os Registros" value="todos" />
                    <Picker.Item label="Filtrar por Mês/Ano" value="mes" />
                </Picker>

                {filtro === "mes" && (
                    <View style={styles.rowPicker}>
                        <Picker
                            selectedValue={mesSelecionado}
                            style={[styles.picker, { flex: 1 }]}
                            onValueChange={(itemValue) =>
                                setMesSelecionado(itemValue)
                            }
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                (m) => (
                                    <Picker.Item
                                        key={m}
                                        label={`Mês ${m}`}
                                        value={m}
                                    />
                                ),
                            )}
                        </Picker>
                        <Picker
                            selectedValue={anoSelecionado}
                            style={[styles.picker, { flex: 1 }]}
                            onValueChange={(itemValue) =>
                                setAnoSelecionado(itemValue)
                            }
                        >
                            {[2024, 2025, 2026, 2027].map((a) => (
                                <Picker.Item key={a} label={`${a}`} value={a} />
                            ))}
                        </Picker>
                    </View>
                )}
            </View>

            {/* CARDS DO DASHBOARD */}
            <View style={styles.cardsContainer}>
                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: "#fee2e2",
                            borderLeftColor: "#ef4444",
                        },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: "#ef4444" }]}>
                        Total Despesas
                    </Text>
                    <Text style={[styles.cardValue, { color: "#dc2626" }]}>
                        R$ {totalDespesas.toFixed(2)}
                    </Text>
                </View>

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: "#dbeafe",
                            borderLeftColor: "#3b82f6",
                        },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: "#3b82f6" }]}>
                        Total Pago
                    </Text>
                    <Text style={[styles.cardValue, { color: "#2563eb" }]}>
                        R$ {totalPago.toFixed(2)}
                    </Text>
                </View>

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: "#f3f4f6",
                            borderLeftColor: "#4b5563",
                        },
                    ]}
                >
                    <Text style={[styles.cardTitle, { color: "#4b5563" }]}>
                        Saldo a Pagar
                    </Text>
                    <Text style={[styles.cardValue, { color: "#1f2937" }]}>
                        R$ {saldoPendente.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
    filtroContainer: {
        marginBottom: 24,
        backgroundColor: "#f8fafc",
        padding: 8,
        borderRadius: 8,
        elevation: 2,
    },
    picker: { height: 50, backgroundColor: "transparent" },
    rowPicker: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
    },
    cardsContainer: { flex: 1 },
    card: {
        padding: 20,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 6,
        elevation: 2,
    },
    cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    cardValue: { fontSize: 28, fontWeight: "bold" },
});
