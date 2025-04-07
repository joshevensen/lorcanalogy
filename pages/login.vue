<script lang="ts" setup>
const supabase = useSupabaseClient()

definePageMeta({title: "Login"})

const email = ref('')
const password = ref('')

const signIn = async () => {
  const auth = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (auth.error) console.log(auth.error)
}
</script>

<template>
  <div class="mt-10 w-lg mx-auto flex flex-col gap-2">
    <UiField label="Email">
      <UiInput v-model="email" type="email"/>
    </UiField>

    <UiField label="Password">
      <UiInput v-model="password" type="password"/>
    </UiField>

    <UiButton :outlined="false" class="mt-6" color="primary" label="Login" size="medium" @click="signIn"/>
  </div>
</template>
