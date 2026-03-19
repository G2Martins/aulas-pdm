// components/MetaInput.js
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from '../mensagens';

export default function MetaInput(props) {
  // Estado local para guardar o que o usuário está digitando
  const [inputMetaText, setInputMetaText] = useState('');

  function metaInputHandler(enteredText) {
    setInputMetaText(enteredText);
  }

  function addMetaHandler() {
    props.onAddMeta(inputMetaText); // Envia o texto para o App.js
    setInputMetaText(''); // Limpa o campo após adicionar
  }

  return (
    <View style={styles.inputRow}>
      <View style={{ width: '65%' }}>
        <TextInput
          style={styles.inputText}
          placeholder={rotulo_input_meta}
          onChangeText={metaInputHandler}
          value={inputMetaText}
        />
      </View>
      <View style={{ width: '30%' }}>
        <Button title={rotulo_btn_cadastro_meta} onPress={addMetaHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputText: {
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 8, // Um paddingzinho para o texto não ficar colado na borda
  },
});