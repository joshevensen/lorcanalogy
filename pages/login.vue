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
  <div>
    <UiInput v-model="email" placeholder="Email" type="email"/>
    <UiInput v-model="password" placeholder="Password" type="password"/>

    <UiButton color="primary" label="Login" @click="signIn"/>
  </div>
</template>
