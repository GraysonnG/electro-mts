<script>
  import EvaIcon from "./EvaIcon.svelte"

  let maximized = false;

  const handleMinimize = () => {
    window.titleBar.minimize()
  }
  const handleMaximize = () => {
    window.titleBar.maximize()
    maximized = true
  }
  const handleUnMaximize = () => {
    window.titleBar.unmaximize()
    maximized = false
  }
  const handleClose = () => {
    window.titleBar.close()
  }

</script>

<div class="main">
  <div class="window-info">
    { window.titleBar.title }
  </div>
  <div class="window-controls">
    <div class="close">
      <EvaIcon 
        name="close-outline"
        size=28
        on:click={handleClose}
      />
    </div>

    {#if !maximized}
      <div class="full">
        <EvaIcon 
          name="square-outline"
          size=20
          on:click={handleMaximize}
        />
      </div>
    {:else}
      <div class="small">
        <EvaIcon 
          name="copy-outline"
          size=20
          on:click={handleUnMaximize}
        />
      </div>
    {/if}

    <div class="min">
      <EvaIcon 
        name="minus-outline"
        size=28
        on:click={handleMinimize}
      />
    </div>
  </div>
</div>

<style>
  .main {
    background-color: var(--grey-300);
    color: var(--grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
    z-index: 20000;
  }

  .window-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  .window-controls > div {
    display: flex;
    height: 28px;
    width: 34px;
    align-items: center;
    justify-content: center;
  }

  
  .window-controls > div:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .close:hover {
    background-color: red !important;
  }

  .window-info {
    padding: 0.25em 0.5em;
    font-weight: bold;
    padding-left: 1em;
  }

</style>