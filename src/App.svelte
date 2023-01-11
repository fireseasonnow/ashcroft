<script>
  import { onMount } from "svelte";

  let summaryDetail = {};

  $: ({ previousClose, dividendRate, dividendYield } = summaryDetail);

  onMount(async () => {
    const res = await fetch(
      "/api/v11/finance/quoteSummary/AAPL?modules=summaryDetail"
    );
    const resBody = await res.json();

    summaryDetail = resBody.quoteSummary.result[0].summaryDetail;

    console.log(summaryDetail);
  });

  const calculatePrice = ({ raw }, times) => {
    let withCommas = (raw * times).toLocaleString();
    const split = withCommas.split(".");
    let final = withCommas;

    if (split.length === 1) {
      final += ".00";
    }

    if (split.length === 2 && split[1].length === 1) {
      final += "0";
    }

    return `$${final}`;
  };
</script>

<main>
  {#if Object.keys(summaryDetail).length}
    <h1>Apple (AAPL) {new Date().toLocaleDateString()}</h1>
    <div>
      Previous Close Price
      {`$${previousClose.fmt}`}
      <ul>
        <li>
          10 shares -
          {`${calculatePrice(previousClose, 10)}`}
        </li>
        <li>
          100 shares -
          {`${calculatePrice(previousClose, 100)}`}
        </li>
        <li>
          1000 shares -
          {`${calculatePrice(previousClose, 1000)}`}
        </li>
      </ul>
    </div>
    <div>
      Dividend Rate Quarterly
      {`$${summaryDetail.dividendRate.fmt}`}
    </div>
    <div>
      Dividend Rate Yearly
      {`${calculatePrice(dividendRate, 4)}`}
      <ul>
        <li>
          10 shares -
          {`${calculatePrice(dividendRate, 40)}`}
        </li>
        <li>
          100 shares -
          {`${calculatePrice(dividendRate, 400)}`}
        </li>
        <li>
          1000 shares -
          {`${calculatePrice(dividendRate, 4000)}`}
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
