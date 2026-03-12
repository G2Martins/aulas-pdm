# 📚 Aula 02: Fundamentos de Interface no React Native

Nesta aula, deixamos a web de lado (adeus HTML e CSS tradicional) e mergulhamos na forma nativa de construir interfaces. Vamos entender como o React Native traduz o nosso código JavaScript para elementos visuais reais no Android e no iOS.

## 🎯 Objetivos da Aula
* Compreender o mapeamento de tags Web (HTML) para Componentes Core do React Native.
* Entender o funcionamento do `StyleSheet`.
* Dominar o básico do **Flexbox** voltado para o ambiente mobile.

## 🧱 Componentes Core (O "HTML" do Mobile)
No React Native, não usamos `<div>`, `<h1>` ou `<input>`. Precisamos importar componentes específicos do pacote `react-native`:

| Web (ReactJS) | Mobile (React Native) | Para que serve? |
| :--- | :--- | :--- |
| `<div>` | `<View>` | Container principal para agrupar outros elementos e criar layouts. |
| `<p>`, `<h1>`, `<span>` | `<Text>` | Qualquer texto **precisa** estar dentro desta tag para ser exibido. |
| `<img>` | `<Image>` | Componente para exibir diferentes tipos de imagens (locais ou remotas). |
| `<input type="text">` | `<TextInput>` | Campo de entrada de texto para o usuário digitar informações. |
| `<div>` (rolável) | `<ScrollView>` | Container de rolagem genérico que pode conter vários componentes e views. |
| `<button>` | `<TouchableOpacity>` | Botão customizável que reduz a opacidade ao ser pressionado. |

---

## 🎨 Estilização (O "CSS" do Mobile)
Não temos arquivos `.css`. Toda a estilização é feita via JavaScript:

* **StyleSheet**: É uma abstração similar ao CSS que permite criar objetos de estilo validados e otimizados através do método `StyleSheet.create({})`.
* As propriedades são escritas em `camelCase` (ex: `backgroundColor` em vez de `background-color`).
* Não usamos `px` (pixels). Os valores numéricos são unidades independentes de densidade. Ex: `fontSize: 16`.

## 📦 Flexbox no React Native
O Flexbox é a única forma de criar layouts no React Native. Ele funciona quase igual à web, mas com **uma diferença crucial**:
* Na Web, o padrão do Flexbox é colocar os itens em linha (`flexDirection: 'row'`).
* No Mobile, o padrão é colocar os itens em coluna (`flexDirection: 'column'`), um embaixo do outro, respeitando o formato da tela do celular.

**Propriedades mais usadas:**
* `justifyContent`: Alinha os itens no eixo principal (vertical por padrão).
* `alignItems`: Alinha os itens no eixo secundário (horizontal por padrão).

---

## 🕹️ Interação e Controles Adicionais
Além dos componentes de estrutura, utilizamos elementos específicos para funcionalidades do sistema:

* **Button**: Um componente de botão básico, com renderização nativa que se adapta visualmente ao Android ou iOS automaticamente.
* **Switch**: Um componente de seleção visual (interruptor) usado para alternar entre estados verdadeiro (on) ou falso (off).

## 📋 Listas de Alto Desempenho
Diferente do ScrollView, que renderiza todos os itens de uma vez, estas listas são otimizadas para performance:

* **FlatList**: Ideal para exibir listas longas e simples de dados. Renderiza apenas os itens que estão atualmente visíveis na tela.
* **SectionList**: Similar ao FlatList, mas permite organizar os dados em seções com cabeçalhos (ex: lista de contatos dividida por letras).