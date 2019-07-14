<template>
  <div class="root-el floating-box">
    <header>
      <span  class="system-txt">
        <slot name="headline">Default headline</slot>
      </span>
    </header>

    <main >
        <slot name="main">Default main</slot>
    </main>
  </div>
</template>


<script>
export default {};
</script>

<style>
.root-el {
  padding: 10px;
}
header {
  margin-bottom: 10px;
}
</style>








