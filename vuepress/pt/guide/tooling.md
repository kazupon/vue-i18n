# Ferramentas

Para suportar os aplicativos i18n do Vue, algumas ferramentas são fornecidas oficialmente.

Existem também ferramentas de terceiros que integram o Vue I18n.

## Ferramentas oficiais

### Plugin para Vue CLI

[vue-cli-plugin-i18n](https://github.com/kazupon/vue-cli-plugin-i18n) é o plugin oficial para o Vue CLI.

Com este plugin, você pode configurar um ambiente i18n para seu aplicativo Vue e oferecer suporte ao ambiente de desenvolvimento i18n.

### Módulo para Nuxt

[nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n/) é o módulo correspondente para Nuxt.js.

### Loader para Webpack

[vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader) — é o loader para webpack oficial.

Com este loader é possível usar blocos `i18n` personalizados em componentes de arquivo único.

Para obter mais informações sobre blocos `i18n` personalizados, consulte [Componentes de arquivo único](./sfc.md)

### Plugin para ESLint

[eslint-plugin-vue-i18n](https://intlify.github.io/eslint-plugin-vue-i18n/) - Plug-in ESLint para Vue I18n.

Permite que você integre facilmente alguns recursos de localização do lint ao seu aplicativo Vue.js.

### Extensões

[vue-i18n-extensions](https://github.com/kazupon/vue-i18n-extensions) fornece algumas extensões para Vue I18n.

Você pode usar esta extensão para habilitar o SSR e melhorar o desempenho do i18n.

## Ferramentas de terceiros

### BabelEdit

[BabelEdit](https://www.codeandweb.com/babeledit) é um editor de tradução para aplicativos da web.

O BabelEdit pode traduzir arquivos `json` e também pode trabalhar com blocos personalizados `i18n` de componentes de arquivo único.

Mais informações sobre o BabelEdit podem ser encontradas na página de [introdução](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n).

### i18n Ally

[i18n Ally] (https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally) é uma extensão i18n para VSCode.

i18n Ally oferece um DX(Experiência do desenvolvedor) incrível para o desenvolvimento de i18n.

Você pode aprender mais sobre a extensão i18n Ally em [README](https://github.com/antfu/i18n-ally/blob/master/README.md).

### i18nPlugin (plataforma intellij)

[i18nPlugin](https://github.com/nyavro/i18nPlugin) — Plugin de suporte para idea Intellij i18next ([Página do plugin Jetbrains](https://plugins.jetbrains.com/plugin/12981-i18n-support)).

Plugin para i18n typescript/javascript/PHP. Suporta vue-i18n. Para habilitar o suporte a vue-i18n vá em configurações -> Ferramentas -> Configuração do plugin i18n e selecione "Vue-i18n". É necessário instalar os diretórios com os arquivos de tradução (tradução por padrão).

### vue-i18n-extract

[vue-i18n-extract](https://github.com/pixari/vue-i18n-extract) faz uma análise estática de um projeto Vue.js com base em vue-i18n e relata as seguintes informações:

- lista de todas as **chaves vue-i18n não utilizadas** (entradas encontradas nos arquivos de idioma, mas não utilizadas no projeto)
- lista de todas as **chaves ausentes** (entradas encontradas no projeto, mas não nos arquivos de idioma)

É possível mostrar a saída no console ou gravá-la em um arquivo json.

As chaves ausentes também podem ser adicionadas automaticamente aos arquivos de tradução fornecidos.
