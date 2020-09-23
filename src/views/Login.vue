<template>
  <div>
    <Title></Title>
    <Login></Login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Title from "@/components/Polla_Title.vue";

export default {
  name: "login",
  components: {
    Login,
    Title
  }
};
</script>