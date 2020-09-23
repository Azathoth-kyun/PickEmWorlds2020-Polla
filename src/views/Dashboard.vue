<template>
  <div>
    <navbar></navbar>
    <welcome></welcome>
  </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import welcome from "@/components/welcome.vue";

export default {
  name: "dashboard",
  components: {
    navbar,
    welcome,
  },
};
</script>