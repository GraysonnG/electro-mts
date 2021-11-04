<script>
  import Button from './Button.svelte'
  import { state } from '../state/store'
</script>

<footer>
  <Button on:click={() => {
    window.launcher.launchMts($state)
  }}>Launch</Button>
  
  <div>
    <span>Slay the Spire (12-22-2020): {$state.stsDir}</span>
    <span>ModTheSpire (3.23.2): D:/Steam/steamapps/workshop/content/646570/1605060445/ModTheSpire.jar</span>
  </div>
</footer>

<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4em;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    background-color: var(--grey-500);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    padding: 0 2em;
  }

  div {
    display: flex;
    gap: 0.1em;
    flex-direction: column;
  }

  span {
    font-size: 0.7em;
    color: var(--grey-100);
  }
</style>