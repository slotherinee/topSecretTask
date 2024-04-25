<script lang="ts">
  const currencies: string[] = ['USD', 'EUR', 'RUB', 'BYN', 'CAD', 'CNY', 'GBP', 'KZT', 'THB', 'UAH' ]
  const currencyToFlag: {[key: string]: string} = {
    'USD': '🇺🇸',
    'EUR': '🇪🇺',
    'RUB': '🇷🇺',
    'BYN': '🇧🇾',
    'CAD': '🇨🇦',
    'CNY': '🇨🇳',
    'GBP': '🇬🇧',
    'KZT': '🇰🇿',
    'THB': '🇹🇭',
    'UAH': '🇺🇦'
  }

  let rates: {[key: string]: number} = {}
  let fromCurrency: string = currencies[0]
  let toCurrency: string = currencies[1]
  let fromAmount: number = 1
  let toAmount: string = '0'

  const fetchCurrencies = async (): Promise<void> => {
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
    const data: {rates: {[key: string]: number}} = await response.json()
    rates = data.rates
    convert()
  }

  const convert = (): void => {
    const result = fromAmount * (rates[toCurrency] || 0);
    toAmount = isNaN(result) ? '0' : result.toFixed(2);
  }

  const reverseConvert = (): void => {
    const result = parseFloat((parseFloat(toAmount) / (rates[toCurrency] || 1)).toFixed(2));
    fromAmount = isNaN(result) ? 0 : result;
  }

  $: fetchCurrencies(), fromCurrency, toCurrency
</script>

<main class="max-w-screen-lg mx-auto antialiased">
  <section class="flex flex-col justify-center items-center min-h-screen gap-2">
    <h1 class="font-semibold text-lg">Currency converter</h1>
    <div class="flex gap-4">
      <div class="flex items-center justify-center rounded border-2">
        <select bind:value={fromCurrency} on:change={fetchCurrencies}>
          {#each currencies as currency (currency)}
          <option value={currency}>
         {currencyToFlag[currency]} {currency}
          </option>
          {/each}
        </select>
        <input placeholder="1" type="text" bind:value={fromAmount} on:input={convert}>
      </div>
     <div class="flex items-center justify-center rounded border-2">
      <select bind:value={toCurrency} on:change={fetchCurrencies}>
        {#each currencies as currency (currency)}
        <option value={currency}>
          {currencyToFlag[currency]} {currency}
        </option>
        {/each}
      </select>
      <input placeholder="0" type="text" bind:value={toAmount} on:input={reverseConvert}>
     </div>
    </div>
  </section>
</main>