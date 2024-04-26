
<script setup lang="ts">

import axios from "axios";

const path = 'http://localhost:8080/items'

axios.get(path)
  .then(response => {
    items = response.data
  })
</script>

<template>

</template>



