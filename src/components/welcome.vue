<template>
  <div v-if="this.usuario !== null && this.show == true" class="has-text-centered text-white">
    <p class="is-size-2">Bienvenido!</p>
    <p class="is-size-4">{{usuario.name}}</p>
    <figure class="image size-256">
      <img class="rounded" :src="usuario.user_img" />
    </figure>
    <p class="is-size-6" style="margin-top: 10px;">Tu puntaje actual es: {{usuario.score}} ptos</p>
  </div>
  <div v-else-if="this.show == false" class="error_text has-text-centered">
    <h2>Error: No se pudo cargar los datos</h2>
  </div>
  <div v-else class="center-spinner">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss">
.text-white {
  color: white;
  padding-top: 5vh;
}
.center-spinner {
  position: absolute;
  top: 40%;
  left: 45%;
  margin: -25px 0 0 -25px;
}
.error_text {
  color: red;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 800px) {
  .size-256 {
    height: 128px !important;
    width: 128px;
    margin: 0 auto;
  }
  .rounded {
    border-radius: 50%;
    height: 128px !important;
  }
}
@media (min-width: 800px) {
  .size-256 {
    height: 192px !important;
    width: 192px;
    margin: 0 auto;
  }

  .rounded {
    border-radius: 50%;
    height: 192px !important;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "welcome",
  data() {
    return {
      usuario: null,
      show: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    readData() {
      const db = firebase.firestore();
      let usuario_aux = null;
      db.collection("usuarios")
        .where("id", "==", this.user.data.uid)
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              //console.log(doc.data());
              usuario_aux = doc.data();
            });
            this.usuario = usuario_aux;
            this.show = true;
          }.bind(this)
        )
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          this.show = false;
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>