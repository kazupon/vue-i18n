# Alternando localização

Normalmente a instância raiz do Vue é usada como o ponto de verdade, e todos os componentes filhos usam a propriedade `locale` da classe` VueI18n` passada por referência.

Às vezes você pode querer alternar dinamicamente os locais. Para fazer isso, você precisa alterar o valor da propriedade `locale` na instância` VueI18n`.

```js
const i18n = new VueI18n({
  locale: 'pt', // definir a localização padrão
  ...
})

// Crie uma instância raiz do Vue
new Vue({
  i18n,
  ...
}).$mount('#app')

// Mudar para uma localização diferente
i18n.locale = 'en'
```

Cada componente contém uma instância `VueI18n` que se refere à propriedade `$i18n`, que também pode ser usada para alterar o local.

Exemplo:

```vue
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'locale-changer',
    data() {
      return { langs: ['pt', 'en'] }
    }
  }
</script>
```

:::warning Aviso
:warning: As alterações de localização são ignoradas pelos componentes com a opção `sync: false`.
:::

:::warning Componente vs. escopo root
:warning: Alterarando `$i18n.locale` dentro do componente não altera a localização root. Se você está contando com a localização root, por exemplo, ao usar [root fallback](./fallback.html), use `$root.$I18n.locale` ao vez de `$i18n.locale`.
:::
