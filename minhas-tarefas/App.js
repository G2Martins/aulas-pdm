import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MetaInput from './components/MetaInput';
import MetasList from './components/MetasList';

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    if (inputMeta.trim() === '') return; // Evita adicionar metas em branco
    setMetas(metasAtuais => [...metasAtuais, inputMeta]);
  }

  return (
    <View style={styles.mainContainer}>
      
      {/* Componente de entrada recebendo a função de adicionar metas */}
      <MetaInput onAddMeta={adicionarMetaHandler} />

      {/* Componente de lista recebendo o array de metas atualizado */}
      <View style={styles.metaContainer}>
        <MetasList array={metas} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    paddingTop: 50,
    flex: 1,
    flexDirection: 'column',
  },
  metaContainer: {
    flex: 1,
    marginTop: 20,
  },
});