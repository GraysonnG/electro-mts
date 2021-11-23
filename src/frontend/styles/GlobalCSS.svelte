<style global>
  :global(*) {
    font-family: 'Ubuntu', sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :global(::-webkit-scrollbar) {
    width: 0.5em;
    background-color: transparent;
  }

  :global(::-webkit-scrollbar-track) {
    background: var(--grey-500);
  }

  :global(::-webkit-scrollbar-thumb) {
    width: 0.5em;
    background: var(--primary-500);
    border-radius: 1em;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }

  :global(body) {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--grey-500);
  }

  :root {
    --primary-500: #66fcf1;
    --primary-700: #45a29e;
    --grey-100: #c5c6c7;
    --grey-300: #293747;
    --grey-500: #1f2833;
    --grey-700: #171922;
    --grey-900: #0b0c10;
    --red-500: #ff5555;
    --yellow-500: #cccc55;
    --pink-500: #d43182;
  }
</style>