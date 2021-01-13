# Pluralização

Você pode usar pluralização para mensagens traduzidas. Para fazer isso, precisa definir a localidade e especificar as strings de tradução para os diferentes casos por meio do separador `|`.

*Seu template precisará usar `$tc()` em vez de `$t()`.*

Mensagens locais abaixo:

```js
const messages = {
  en: {
    car: 'car | cars',
    apple: 'no apples | one apple | {count} apples'
  },
  pt: {
    car: 'carro | carros',
    apple: 'sem maçãs | uma maçã | {count} maçãs'
  }
}
```

Template:

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>

<p>{{ $tc('apple', 0) }}</p>
<p>{{ $tc('apple', 1) }}</p>
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
```

O resultado será o seguinte:

```html
<p>carro</p>
<p>carros</p>

<p>sem maçãs</p>
<p>uma maçã</p>
<p>10 maçãs</p>
```

## Acessando o número por meio do argumento predefinido

Não há necessidade de passar explicitamente o número para pluralização. Em mensagens de localização, um número está disponível através dos argumentos nomeados `{contagem}` e/ou `{n}`. Você pode substituí-los, se desejar.

Mensagens locais abaixo:

```js
const messages = {
  en: {
    apple: 'no apples | one apple | {count} apples',
    banana: 'no bananas | {n} banana | {n} bananas'
  },
  pt: {
    apple: 'sem maçãs | uma maçã | {count} maçãs'
    banana: 'sem bananas | {n} banana | {n} bananas'
  }
}
```

Template:

```html
<p>{{ $tc('apple', 10, { count: 10 }) }}</p>
<p>{{ $tc('apple', 10) }}</p>

<p>{{ $tc('banana', 1, { n: 1 }) }}</p>
<p>{{ $tc('banana', 1) }}</p>
<p>{{ $tc('banana', 100, { n: 'Muitas' }) }}</p>
```

O resultado será o seguinte:

```html
<p>10 maçãs</p>
<p>10 maçãs</p>

<p>1 banana</p>
<p>1 banana</p>
<p>Muitas bananas</p>
```

## Pluralização personalizadas

Essa pluralização, entretanto, não se aplica a todas as línguas (as línguas eslavas, por exemplo, têm regras de pluralização diferentes).

Para implementar essas regras, você pode passar um objeto `pluralizationRules` opcional para as opções do construtor `VueI18n`.

Um exemplo simplificado para idiomas eslavos (russo, ucraniano e outros):
```js
new VueI18n({
  // Key - idioma para usar a regra, `'ru'`, neste caso
  // Value - função para escolher a forma plural correta
  pluralizationRules: {
    /**
     * @param choice {number} um índice de escolha dado pela entrada de $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} quantidade geral de opções disponíveis
     * @returns índice final para selecionar as palavras no plural
     */
    'ru': function(choice, choicesLength) {
      // this === Instância VueI18n, então a propriedade locale também existe aqui

      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return (choicesLength < 4) ? 2 : 3;
    }
  }
})
```

Essa implementação permitirá que você use:

```js
const messages = {
  ru: {
    car: '0 машин | {n} машина | {n} машины | {n} машин',
    banana: 'нет бананов | {n} банан | {n} банана | {n} бананов'
  }
}
```

Onde o formato é `0 coisas | número de itens termina em 1 | o número de coisas que termina em 2-4 | o número de coisas que termina com 5-9, 0 e o número coisas que termina de 11 a 19`.

No template, você ainda precisa usar `$tc()` em vez de `$t()`:

```html
<p>{{ $tc('car', 1) }}</p>
<p>{{ $tc('car', 2) }}</p>
<p>{{ $tc('car', 4) }}</p>
<p>{{ $tc('car', 12) }}</p>
<p>{{ $tc('car', 21) }}</p>

<p>{{ $tc('banana', 0) }}</p>
<p>{{ $tc('banana', 4) }}</p>
<p>{{ $tc('banana', 11) }}</p>
<p>{{ $tc('banana', 31) }}</p>
```

O resultado será o seguinte:

```html
<p>1 машина</p>
<p>2 машины</p>
<p>4 машины</p>
<p>12 машин</p>
<p>21 машина</p>

<p>нет бананов</p>
<p>4 банана</p>
<p>11 бананов</p>
<p>31 банан</p>
```

### Pluralização padrão

Se nenhuma regra de pluralização for fornecida para a localidade em uso, a regra [padrão](#pluralizacao) do idioma inglês será usada.
