# 🚀 Space Impact

Um remake moderno, multiplataforma e inspirado nos clássicos jogos **Space Impact** dos celulares Nokia.

Este projeto está sendo desenvolvido com **React Native**, **Expo**, **Expo Router** e **React Native Skia** para criar uma experiência arcade simples, responsiva e nostálgica, executável na **web**, no **Android** e no **iOS**.

> ⚠️ O projeto está em desenvolvimento. A versão atual contém a base jogável: uma nave em um canvas, movimentação horizontal e suporte aos principais ambientes. Inimigos, tiros, colisões, pontuação e fases ainda podem ser adicionados.

## ✨ Destaques

- 🎮 Experiência inspirada no Space Impact dos Nokias clássicos.
- 📱 Código compartilhado para Android e iOS.
- 🌐 Versão web executada pelo Metro.
- 🖼️ Renderização do jogo com React Native Skia.
- 🧭 Orientação configurada para modo paisagem.
- 📐 Área lógica do jogo de `320 × 180`, escalada proporcionalmente para cada tela.
- 👆 Controle por gesto de arrastar no Android e no iOS.
- ⌨️ Controle por teclado na web:
  - `←` ou `A`: mover para a esquerda.
  - `→` ou `D`: mover para a direita.
- 🎨 Estrutura preparada para temas claro e escuro.
- 🧩 Rotas baseadas em arquivos com Expo Router.
- ⚡ React Compiler habilitado no projeto.

## 🕹️ Estado atual do jogo

No momento, o jogo possui:

- Um fundo preto que representa o espaço.
- Uma nave verde posicionada na parte inferior da tela.
- Movimentação horizontal limitada aos limites do cenário.
- Velocidade da nave baseada no tempo do frame na web.
- Redimensionamento proporcional do cenário para diferentes telas.
- Centralização automática do cenário quando a proporção da tela é diferente de `16:9`.
- Interação por `Gesture.Pan` em dispositivos móveis.
- Interação por teclado usando `requestAnimationFrame` na versão web.

### Próximas evoluções sugeridas

- 👾 Adicionar inimigos e padrões de movimentação.
- 🔫 Implementar disparos da nave.
- 💥 Criar colisões, explosões e efeitos visuais.
- ❤️ Adicionar vidas, energia e estado de game over.
- 🏆 Implementar pontuação e recordes.
- 🌌 Criar fases, chefes e diferentes cenários.
- 🔊 Adicionar efeitos sonoros e música.
- 💾 Persistir progresso e melhor pontuação.
- 🎛️ Adicionar controles virtuais para telas sensíveis ao toque.

## 🧰 Tecnologias utilizadas

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| [React](https://react.dev/) | `19.2.3` | Construção da interface e componentes |
| [React Native](https://reactnative.dev/) | `0.86.3` | Desenvolvimento multiplataforma |
| [Expo](https://expo.dev/) | `~57.0.30` | Ferramentas, execução e distribuição |
| [Expo Router](https://docs.expo.dev/router/introduction/) | `~57.0.28` | Navegação baseada em arquivos |
| [React Native Skia](https://shopify.github.io/react-native-skia/) | `2.6.2` | Canvas e renderização do jogo |
| [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | `~2.32.0` | Gestos e interação por arraste |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | `4.5.1` | Animações |
| [TypeScript](https://www.typescriptlang.org/) | `~6.0.3` | Tipagem estática |

## ✅ Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) em uma versão compatível com o Expo SDK 57.
- npm, instalado junto com o Node.js.
- Para Android: Android Studio e um emulador configurado, ou um dispositivo físico.
- Para iOS: macOS com Xcode e um simulador, ou um dispositivo físico.
- Para a web: um navegador moderno.

> 💡 O projeto usa `npm`. Se você preferir outro gerenciador, adapte os comandos conforme o seu ambiente, mas mantenha o `package-lock.json` atualizado quando trabalhar com npm.

## 🚀 Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/SEU_USUARIO/space-impact.git
cd space-impact
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executando o projeto

### Iniciar o servidor de desenvolvimento

```bash
npm start
```

Depois de iniciar, o Expo exibirá as opções disponíveis no terminal. Também é possível usar os comandos específicos abaixo.

### Web 🌐

```bash
npm run web
```

Na versão web, use `A`/`D` ou as setas esquerda/direita para movimentar a nave.

### Android 🤖

```bash
npm run android
```

O comando abre o projeto no Android usando o emulador ou dispositivo disponível.

### iOS 🍎

```bash
npm run ios
```

Este comando requer macOS e uma configuração funcional do Xcode.

## 🧪 Verificação do projeto

Para executar o lint:

```bash
npm run lint
```

Para verificar os tipos TypeScript:

```bash
npx tsc --noEmit
```

## 🗂️ Estrutura do projeto

```text
space-impact/
├── assets/                  # Ícones, splash screen e imagens do aplicativo
├── scripts/                 # Scripts auxiliares do projeto Expo
├── src/
│   ├── app/                 # Telas e layouts do Expo Router
│   │   ├── _layout.tsx     # Layout raiz e GestureHandlerRootView
│   │   └── index.tsx        # Tela principal e carregamento do jogo
│   ├── components/          # Componentes reutilizáveis e componentes do template
│   ├── constants/
│   │   └── theme.ts         # Cores, fontes e espaçamentos
│   ├── game/
│   │   ├── GameCanvas.tsx   # Canvas, nave, escala e controles
│   │   └── constants.ts     # Dimensões lógicas do jogo
│   ├── hooks/               # Hooks de tema e esquema de cores
│   └── global.css           # Variáveis CSS utilizadas na web
├── app.json                 # Configurações do Expo
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
└── README.md
```

## 🧠 Como o jogo funciona

### Resolução lógica

O jogo usa uma área fixa de `320 × 180` pixels lógicos, definida em [`src/game/constants.ts`](./src/game/constants.ts). Essa área não muda conforme o tamanho do dispositivo.

O componente [`GameCanvas`](./src/game/GameCanvas.tsx) calcula uma escala com base no menor fator entre largura e altura disponíveis:

```text
escala = menor(
  largura_da_tela / 320,
  altura_da_tela / 180
)
```

Assim, a proporção do jogo é preservada e o cenário fica centralizado com barras laterais ou superiores quando necessário.

### Renderização

O canvas é desenhado com `@shopify/react-native-skia`:

- `Fill` cria o fundo preto.
- `Group` aplica deslocamento e escala ao cenário.
- `Rect` desenha a nave.

Na web, o Skia é carregado sob demanda em [`src/app/index.tsx`](./src/app/index.tsx) com `LoadSkiaWeb`. Isso evita tentar renderizar o canvas antes que o CanvasKit esteja disponível no navegador.

### Controles

Nos dispositivos móveis, o `GestureDetector` acompanha o movimento horizontal do dedo e converte o deslocamento da tela para a resolução lógica do jogo.

Na web, listeners de `keydown` e `keyup` controlam as teclas de movimento. A posição é atualizada em um loop com `requestAnimationFrame`, usando o tempo transcorrido entre os frames para manter a velocidade consistente.

## 📱 Configuração multiplataforma

O arquivo [`app.json`](./app.json) concentra as configurações principais:

- Orientação `landscape`.
- Identidade do aplicativo `space-impact`.
- Ícones para iOS e Android.
- Splash screen personalizada.
- Metro como bundler da web.
- Saída web no modo `single`.
- Rotas tipadas habilitadas.
- React Compiler habilitado.

O [`src/app/_layout.tsx`](./src/app/_layout.tsx) envolve a aplicação com `GestureHandlerRootView`, necessário para que os gestos funcionem corretamente nas plataformas nativas.

## 🛠️ Desenvolvimento

As telas devem ficar em `src/app/`, seguindo o padrão de rotas do Expo Router. Componentes reutilizáveis, lógica do jogo, hooks e constantes devem permanecer fora dessa pasta.

Ao criar uma nova funcionalidade:

1. Separe a lógica do jogo dos componentes visuais quando possível.
2. Preserve a resolução lógica de `320 × 180`.
3. Teste na web e em pelo menos uma plataforma nativa.
4. Considere orientação paisagem em todos os layouts.
5. Evite APIs específicas de uma plataforma sem uma alternativa para as outras.
6. Execute o lint e a verificação de tipos antes de abrir um pull request.

## 🔄 Resetar o projeto

O template do Expo inclui o script abaixo:

```bash
npm run reset-project
```

Esse script pode mover ou remover as pastas `src/` e `scripts/` e gerar uma estrutura inicial. **Não execute esse comando em um projeto com trabalho não salvo**, pois ele pode apagar ou mover o código atual.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para propor uma melhoria:

1. Faça um fork do projeto.
2. Crie uma branch para sua alteração:

   ```bash
   git checkout -b feature/minha-melhoria
   ```

3. Implemente a mudança.
4. Execute o lint e o TypeScript:

   ```bash
   npm run lint
   npx tsc --noEmit
   ```

5. Faça um commit descritivo:

   ```bash
   git commit -m "feat: adiciona disparo da nave"
   ```

6. Envie a branch e abra um pull request.

## 📄 Licença

Consulte o arquivo [`LICENSE`](./LICENSE) para conhecer os termos de uso deste projeto.

## 💙 Agradecimentos

Este projeto é uma homenagem ao estilo dos jogos de nave dos celulares Nokia e uma oportunidade de praticar desenvolvimento multiplataforma com React Native e Expo.

Construído com código, nostalgia e muitos meteoros. 🚀☄️
