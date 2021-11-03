<script>
  import Mod from './Mod.svelte'

  const modInfo = [
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
    {id:7},
    {id:8},
    {id:9},
    {id:10},
  ]
</script>

<div>
  {#each modInfo as mod}
     <Mod data={mod} />
  {/each}
</div>

<style>
  div {
    box-sizing: border-box;
    display: grid;
    gap: 0.5em;
    padding: 0.5em;
  }
</style>