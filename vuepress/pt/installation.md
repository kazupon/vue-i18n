# Instalação

## Nota de compatibilidade

- Vue.js versões `2.0.0`+

## Download direto / CDN

<https://unpkg.com/vue-i18n/dist/vue-i18n>

O serviço [unpkg.com](https://unpkg.com) fornece links CDN com base em pacotes NPM. O link acima sempre apontará para a versão mais recente do NPM. Você pode usar uma versão ou tag específica usando um URL como este <https://unpkg.com/vue-i18n@8.17.5/dist/vue-i18n.js>

Ao conectar o vue-i18n após o Vue, o plug-in será instalado automaticamente:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
```

## NPM

```bash
npm install vue-i18n
```

## Yarn

```bash
yarn add vue-i18n
```

Ao usar o sistema de módulos, você deve definir explicitamente `vue-i18n`
via `Vue.use()`:

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

Você não precisa fazer isso ao usar tags de script globais `<script>`.

## Vue CLI 3.x

```bash
vue add i18n
```

O Vue CLI 3.x deve ser instalado previamente, podendo instalá-lo com o próximo comando:

```bash
npm install @vue/cli -g
```

## Dev Build

Se você precisa utilizar a última compilação de dev, precisará clonar o repositório do GitHub e compilar `vue-i18n` você mesmo.

```bash
git clone https://github.com/kazupon/vue-i18n.git node_modules/vue-i18n
cd node_modules/vue-i18n
npm install # ou `yarn`
npm run build  # ou `yarn run build`
```

## Explicação sobre diferentes versões

[Dentro do diretório dist/ do pacote NPM](https://cdn.jsdelivr.net/npm/vue-i18n/dist/) você encontrará muitas compilações diferentes do VueI18n. Aqui está uma visão geral da diferença entre eles:

- UMD: `vue-i18n.js`
- CommonJS: `vue-i18n.common.js`
- ES Module para empacotadores: `vue-i18n.esm.js`
- ES Module para navegadores: `vue-i18n.esm.browser.js`

### Termos

- **[UMD](https://github.com/umdjs/umd)**: As compilações UMD podem ser usadas diretamente no navegador através de uma tag `<script>`. O arquivo padrão do Unpkg CDN em [https://unpkg.com/vue-i18n](https://unpkg.com/vue-i18n) é a versão UMD compilada (`vue-i18n.js`).

- **[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)**: As compilações do CommonJS são destinadas ao uso com sistemas de compilação mais antigos, como [browserify](http://browserify.org/) ou [webpack 1](https://webpack.github.io). O arquivo padrão para esses sistemas de compilação (`pkg.main`) é a compilação CommonJS (`vue-i18n.common.js`).

- **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: VueI18n desde a versão 8.11 fornece duas compilações de Módulos ES (ESM):

  - ESM para sistemas de compilação: projetado para uso com sistemas de compilação modernos, como [webpack 2](https://webpack.js.org) ou [Rollup](https://rollupjs.org/). O formato ESM é projetado para análise estática para que os sistemas de construção possam realizar uma "agitação de árvore" e remover o código não utilizado no pacote final. O arquivo padrão para esses sistemas de construção (`pkg.module`) é a construção do Módulo ES somente em tempo de execução (`vue-i18n.esm.js`).
  - ESM para navegadores (apenas para 8.11+, `vue-i18n.esm.browser.js`): destinado a importações diretas em navegadores modernos usando a tag `<script type="module">`.
