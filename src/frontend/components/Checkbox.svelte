<script>
  export let id;
  export let checked = false;
</script>

<element class:checked>
  <input type="checkbox" name="check" id={`check-${id}`} bind:checked={checked}>
  <label for={`check-${id}`}><span></span></label>
</element>

<style>
  element {
    height: 100%;
    cursor: pointer !important;
  }

  input[type="checkbox"] {
    display: none;
  }

  element.checked > label span {
    transform: scale(1.25);
    border-color: var(--primary-500);
  }

  element.checked > label span::before {
    width: 5px;
    background-color: var(--primary-500);
  }

  element.checked > label span::after {
    width: 10px;
    background-color: var(--primary-500);
  }

  label {
    display: grid;
    place-items: center;
  }

  span {
    display: inline-block;
    position: relative;
    background-color: transparent;
    width: 1.25em;
    aspect-ratio: 1;
    transform-origin: center;
    border: 2px solid;
    border-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: 
      background-color 150ms 200ms, 
      transform 350ms cubic-bezier(0.78, -1.22, 0.17, 1.89),
      border-color 150ms ease;
  }

  span:before {
    content: "";
    width: 0px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    transform: rotate(45deg);
    top: 9px;
    left: 5px;
    transition: all 50ms ease 50ms;
    transform-origin: 0% 0%;
  }
  span:after {
    content: "";
    width: 0;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    transform: rotate(305deg);
    top: 12px;
    left: 6px;
    transition: all 50ms ease;
    transform-origin: 0% 0%;
  }

  label:hover span::before {
    width: 5px;
    transition: width 100ms ease;
  }

  label:hover span::after {
    width: 10px;
    transition: width 150ms ease 100ms;
  }
</style>