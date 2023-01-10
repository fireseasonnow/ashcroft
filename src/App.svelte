<script>
  import { onMount } from 'svelte';

  let summaryDetail = null;
  
  onMount(async () => {
		const res = await fetch('/api/v11/finance/quoteSummary/AAPL?modules=summaryDetail');
    const resBody = await res.json();

    summaryDetail = resBody.quoteSummary.result[0].summaryDetail;

    console.log(summaryDetail);
	});
</script>

<main>
  {#if summaryDetail}
    <div>
      {`$${summaryDetail.previousClose.fmt}`}
    </div>
    <div>
      {`$${summaryDetail.dividendRate.fmt}`}
    </div>
  {/if}
</main>

<style>

</style>
