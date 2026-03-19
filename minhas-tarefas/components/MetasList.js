import { StyleSheet, Text, View } from 'react-native';

export default function MetasList(props) {
  return (
    <View>
      {props.array.map((meta, index) => (
        <Text key={index} style={styles.item}>
          {meta}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,       // Aplica margem acima e abaixo de cada item
    padding: 12,             // Espaçamento interno do texto para a borda
    borderRadius: 6,         // Arredonda as bordas
    backgroundColor: '#5e0acc', // Cor de fundo (pode ajustar para a cor da sua preferência)
    color: '#ffffff',        // Cor do texto
    fontSize: 16,
  },
});