import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TodasDespesas from "./screens/TodasDespesas";
import DespesasRecentes from "./screens/DespesasRecentes";
import GerenciarDespesa from "./screens/GerenciarDespesa";
import IconButton from "./components/UI/IconButton";
import DespesasContextProvider from "./store/despesas-context";
import Dashboard from "./screens/Dashboard";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: "#3b82f6" },
                headerTintColor: "white",
                tabBarStyle: { backgroundColor: "#3b82f6" },
                tabBarActiveTintColor: "#ffffff",
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => {
                            navigation.navigate("GerenciarDespesa");
                        }}
                    />
                ),
            })}
        >
            <Tab.Screen
                name="DespesasRecentes"
                component={DespesasRecentes}
                options={{
                    title: "Despesas Recentes",
                    tabBarLabel: "Recentes",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="TodasDespesas"
                component={TodasDespesas}
                options={{
                    title: "Todas as Despesas",
                    tabBarLabel: "Todas",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="wallet-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: "Dashboard Geral",
                    tabBarLabel: "Painel",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pie-chart" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <DespesasContextProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: "#3b82f6" },
                        headerTintColor: "white",
                    }}
                >
                    <Stack.Screen
                        name="DespesasOverview"
                        component={BottomTabScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="GerenciarDespesa"
                        component={GerenciarDespesa}
                        options={{
                            presentation: "modal",
                            title: "Gerenciar Despesa",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DespesasContextProvider>
    );
}
