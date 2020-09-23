<template>
  <div>
    <div class="columns is-mobile margin-table-up">
      <div class="column"></div>
      <div
        class="column is-two-thirds-fullhd is-two-thirds-widescreen is-two-thirds-desktop is-two-thirds-tablet is-three-quarters-mobile"
      >
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Usuario</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.key">
              <td>{{usuario.pos}}</td>
              <td>
                <figure class="image is-24x24">
                  <img :src="usuario.img" class="is-rounded height-logo-table" />
                </figure>
              </td>
              <td v-if="usuario.id==user.data.uid" style="color: #6e58ed;">{{usuario.name}}</td>
              <td v-else>{{usuario.name}}</td>
              <td>{{usuario.score}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<style lang="scss">
.table {
  background-color: transparent;
  color: white;
  thead {
    th {
      color: white;
    }
  }
}
.th {
  color: white !important;
}
.margin-table-up {
  margin-top: 10vh;
}
.height-logo-table{
    height: 100% !important;
}
</style>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "tablapos",
  data() {
    return {
      usuarios: [],
      myself: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  created() {
    const db = firebase.firestore();
    db.collection("usuarios")
      .orderBy("score", "desc")
      .onSnapshot((snapshotChange) => {
        this.usuarios = [];
        let aux_o = 1;
        snapshotChange.forEach((doc) => {
          let aux = aux_o;
          this.usuarios.push({
            key: doc.id,
            name: doc.data().name,
            score: doc.data().score,
            img: doc.data().user_img,
            id: doc.data().id,
            pos: aux,
          });
          aux_o++;
        });
      });
  },
};
</script>