import { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
    Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconButton from "../components/UI/IconButton";
import { DespesasContext } from "../store/despesas-context";

export default function GerenciarDespesa({ route, navigation }) {
    const despesasCtx = useContext(DespesasContext);
    const editDespesaId = route.params?.despesaId;
    const isEditing = !!editDespesaId;

    const despesaSelecionada = despesasCtx.despesas.find(
        (d) => d.id === editDespesaId,
    );

    const [valor, setValor] = useState(
        despesaSelecionada ? despesaSelecionada.valor : "",
    );
    const [descricao, setDescricao] = useState(
        despesaSelecionada ? despesaSelecionada.descricao : "",
    );

    // Adicione o estado do valorPago logo abaixo dos outros estados (valor, descricao, data)
    const [valorPago, setValorPago] = useState(
        despesaSelecionada && despesaSelecionada.valorPago
            ? despesaSelecionada.valorPago.toString()
            : "0",
    );

    // Adicione o validador do valor pago (mesma lógica do valor original)
    const handleChangeValorPago = (text) => {
        const cleanText = text.replace(",", ".");
        const match = cleanText.match(/^\d*\.?\d{0,2}$/);
        if (match) setValorPago(cleanText);
    };

    // 1. Estado para armazenar o objeto Date real e controlar a visibilidade do calendário
    const [dataSelecionada, setDataSelecionada] = useState(
        despesaSelecionada && despesaSelecionada.data
            ? new Date(despesaSelecionada.data.split("/").reverse().join("-")) // Converte a string salva de volta para Date
            : new Date(),
    );
    const [mostrarCalendario, setMostrarCalendario] = useState(false);

    // Regra do slide 40 para garantir apenas 2 casas decimais
    const handleChangeValor = (text) => {
        const cleanText = text.replace(",", ".");
        const match = cleanText.match(/^\d*\.?\d{0,2}$/);
        if (match) {
            setValor(cleanText);
        }
    };

    // 2. Função que captura a data escolhida no Modal
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dataSelecionada;
        setMostrarCalendario(Platform.OS === "ios"); // No iOS, precisamos lidar diferente para fechar
        setDataSelecionada(currentDate);
    };

    // 3. Formata a data de um Objeto Date para o padrão String brasileiro (DD/MM/AAAA)
    const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR");

    function apagarDespesa() {
        despesasCtx.removerDespesa(editDespesaId);
        navigation.goBack();
    }

    function cancelarHandler() {
        navigation.goBack();
    }

    function confirmarHandler() {
        // O valorPago só é atualizado se estiver editando, caso contrário envia 0
        const despesaData = {
            descricao,
            valor,
            data: dataFormatada,
            valorPago: isEditing ? valorPago : 0,
        };

        if (isEditing) {
            despesasCtx.atualizarDespesa(editDespesaId, despesaData);
        } else {
            despesasCtx.adicionarDespesa(despesaData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor da Despesa</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    maxLength={10}
                    value={valor}
                    onChangeText={handleChangeValor}
                />
            </View>

            {/* 5. Interface da Data ajustada com Pressable e DatePicker */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Data da Despesa</Text>
                <Pressable onPress={() => setMostrarCalendario(true)}>
                    <View pointerEvents="none">
                        <TextInput
                            style={styles.input}
                            value={dataFormatada}
                            editable={false} // Trava o teclado
                        />
                    </View>
                </Pressable>

                {mostrarCalendario && (
                    <DateTimePicker
                        value={dataSelecionada}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    maxLength={20}
                    value={descricao}
                    onChangeText={setDescricao}
                />
            </View>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button
                        title="Cancelar"
                        color="#f31282"
                        onPress={cancelarHandler}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title={isEditing ? "Atualizar" : "Adicionar"}
                        onPress={confirmarHandler}
                    />
                </View>
            </View>

            {isEditing && (
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: "#10b981" }]}>
                        Valor Já Pago
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            { backgroundColor: "#d1fae5", color: "#047857" },
                        ]}
                        keyboardType="decimal-pad"
                        maxLength={10}
                        value={valorPago}
                        onChangeText={handleChangeValorPago}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "#ffffff" },
    inputContainer: { marginVertical: 8 },
    label: { fontSize: 12, color: "#3b82f6", marginBottom: 4 },
    input: {
        backgroundColor: "#e6f4fe",
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: "#1d4ed8",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    button: { minWidth: 120, marginHorizontal: 8 },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: "#e6f4fe",
        alignItems: "center",
    },
});
