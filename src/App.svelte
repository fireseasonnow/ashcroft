<script>
  import { onMount } from "svelte";

  let summaryDetail;

  $: ({ previousClose, dividendRate, dividendYield } = summaryDetail || {});

  onMount(async () => {
    try {
      const res = await fetch(
        "/api/v11/finance/quoteSummary/AAPL?modules=summaryDetail"
      );
      const resBody = await res.json();

      summaryDetail = resBody.quoteSummary.result[0].summaryDetail;
    } catch (error) {
      console.error(`Error getting quote summary: ${error}`);
    }
  });

  const formatValueToPrice = (value, factor) => {
    const sum = value.raw * factor;

    return sum.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };
</script>

<main>
  {#if summaryDetail}
    <h1>Apple (AAPL) {new Date().toLocaleDateString()}</h1>
    <div>
      Previous Close Price
      {`$${previousClose.fmt}`}
      <ul>
        <li>
          10 shares -
          {formatValueToPrice(previousClose, 10)}
        </li>
        <li>
          100 shares -
          {formatValueToPrice(previousClose, 100)}
        </li>
        <li>
          1000 shares -
          {formatValueToPrice(previousClose, 1000)}
        </li>
      </ul>
    </div>
    <div>
      Dividend Rate Quarterly
      {`$${dividendRate.fmt}`}
    </div>
    <div>
      Dividend Rate Yearly
      {formatValueToPrice(dividendRate, 4)}
      <ul>
        <li>
          10 shares -
          {formatValueToPrice(dividendRate, 40)}
        </li>
        <li>
          100 shares -
          {formatValueToPrice(dividendRate, 400)}
        </li>
        <li>
          1000 shares -
          {formatValueToPrice(dividendRate, 4000)}
        </li>
      </ul>
    </div>
    <div>
      Dividend Yield
      {dividendYield.fmt}
    </div>
  {/if}
</main>

<style>
</style>
