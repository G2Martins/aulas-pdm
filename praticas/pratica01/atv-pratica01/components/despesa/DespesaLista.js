import { FlatList } from "react-native";
import DespesaItem from "./DespesaItem";

function renderDespesaItem(itemData) {
    return <DespesaItem {...itemData.item} />;
}

export default function DespesaLista({ despesas }) {
    return (
        <FlatList
            data={despesas}
            renderItem={renderDespesaItem}
            keyExtractor={(item) => item.id}
        />
    );
}
