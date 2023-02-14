<template>
  <b-table hover :items="list" :fields="fields" responsive="sm"></b-table>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  list: [Record<string, any>];
  fields: [Record<string, any>];
}>();
</script>

<style scoped></style>
