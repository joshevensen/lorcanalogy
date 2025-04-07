<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';


const model = defineModel<string>()

defineProps<{
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
}>()
</script>

<template>
  <Password v-if="type === 'password'" v-model="model" :placeholder fluid toggleMask/>
  <InputText v-else v-model="model" :placeholder :type fluid/>
</template>
