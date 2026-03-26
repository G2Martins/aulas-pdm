import { View, Text, StyleSheet } from "react-native";

export default function DespesaSumario({ despesas, periodo }) {
    const somaDespesas = despesas.reduce((soma, despesa) => {
        return soma + parseFloat(despesa.valor);
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.periodo}>{periodo}</Text>
            <Text style={styles.soma}>R$ {somaDespesas.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#e6f4fe",
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    periodo: { fontSize: 14, color: "#3b82f6" },
    soma: { fontSize: 16, fontWeight: "bold", color: "#1d4ed8" },
});
