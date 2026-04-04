import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DespesaItem({ id, descricao, valor, data }) {
    const navigation = useNavigation();

    function despesaPressHandler() {
        navigation.navigate("GerenciarDespesa", { despesaId: id });
    }

    return (
        <Pressable
            onPress={despesaPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.despesaItem}>
                <View>
                    <Text style={styles.descricao}>{descricao}</Text>
                    <Text style={styles.data}>{data}</Text>
                </View>
                <View style={styles.valorContainer}>
                    <Text style={styles.valor}>
                        R$ {parseFloat(valor).toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: { opacity: 0.75 },
    despesaItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: "#3b82f6",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
    },
    descricao: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold",
        color: "white",
    },
    data: { fontSize: 12, color: "white" },
    valorContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80,
    },
    valor: { color: "#3b82f6", fontWeight: "bold" },
});
