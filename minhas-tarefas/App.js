import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  rotulo_btn_cadastro_meta,
  rotulo_input_meta,
  rotulo_lista_metas,
} from './mensagens';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.inputRow}>
        <View style={{ width: '65%' }}>
          <TextInput
            style={styles.inputText}
            placeholder={rotulo_input_meta}
          />
        </View>
        <View style={{ width: '30%' }}>
          <Button title={rotulo_btn_cadastro_meta} />
        </View>
      </View>

      <View style={styles.metaContainer}>
        <Text>{rotulo_lista_metas}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
  },

  metaContainer: {
    flex: 1,
    marginTop: 20,
  },
});
