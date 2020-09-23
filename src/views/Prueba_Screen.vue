<template>
  <div>
    <Title></Title>
    <div
      v-if="user"
      class="notification is-success"
      role="alert"
    >You are logged in! {{user.data.uid}}</div>
    <button class="button is-secondary" @click.prevent="signOut">Salir xd</button>
  </div>
</template>

<script>
import Title from "@/components/Polla_Title.vue";
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "prueba",
  components: {
    Title,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login",
          });
        });
    },
  },
};
</script>