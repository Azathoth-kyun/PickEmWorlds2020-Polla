<template>
  <div>
    <div class="modal" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Que paso, pedazo de gobernado xd? -->
        <div v-if="Ismatchempty== true" class="notification is-danger" style="text-align: center;">
          <strong>Error!</strong> problema al cargar los datos.
        </div>
        <div v-else-if="selectedMatch.closed == true" class="notification is-warning" style="text-align: center;">
          <strong>Cerrado!</strong> ya no puede predecir este juego, porque ya ha pasado el tiempo disponible.
        </div>
        <div v-else>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Pronosticar el juego N°{{selectedMatch.id}}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="columns is-mobile">
                  <div class="column">
                    <figure class="image is-square">
                      <img :src="selectedMatch.team1.img" />
                    </figure>
                  </div>
                  <div class="column">
                    <figure class="image is-square">
                      <img :src="selectedMatch.team2.img" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a
                @click.prevent="predict(selectedMatch.team1.name);"
                class="card-footer-item"
              >{{selectedMatch.team1.name}}</a>
              <a
                @click.prevent="predict(selectedMatch.team2.name);"
                class="card-footer-item"
              >{{selectedMatch.team2.name}}</a>
            </footer>
          </div>
          <transition name="fade" mode="out-in">
            <div
              v-if="showMessage==true"
              class="notification"
              :class="[statusMessage, {'is-active': showMessage}]"
              style="text-align: center; margin-top: 10px;"
            >
              <strong>{{saveMessage}}</strong>
            </div>
          </transition>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click.prevent="closeModal();"></button>
    </div>
    <div class="columns is-mobile">
      <div class="column"></div>
      <div
        class="column center_div is-two-thirds-fullhd is-two-thirds-widescreen is-two-thirds-desktop is-two-thirds-tablet is-three-quarters-mobile"
      >
        <div class="select">
          <select @change="readMatchs()" v-model="selected">
            <option selected value="1">Day 1</option>
            <option value="2">Day 2</option>
          </select>
        </div>
      </div>
      <div class="column"></div>
    </div>
    <div class="columns is-mobile">
      <div class="column"></div>
      <div
        class="column center_div is-two-thirds-fullhd is-two-thirds-widescreen is-two-thirds-desktop is-two-thirds-tablet is-three-quarters-mobile"
      >
        <table class="table is-fullwidth">
          <tbody>
            <tr
              v-for="match in matchs"
              :key="match.key"
              class="size-font-predict"
              style="cursor: pointer;"
              @click.prevent="voteModal(match.id);"
            >
              <td>
                <figure class="image is-48x48">
                  <img :src="match.team1.img" />
                </figure>
                <b>{{match.team1.name}}</b>
              </td>
              <td style="text-align: center; vertical-align: middle;">VS</td>
              <td style="text-align: right;">
                <figure class="image is-48x48" style="margin-left:auto; margin-right:0;">
                  <img :src="match.team2.img" />
                </figure>
                <b>{{match.team2.name}}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.card {
  background-color: black;
}
.card-header-title {
  color: white;
}
.card-header {
  box-shadow: 0 0.125em 0.25em rgb(255 255 255 / 10%);
}
.modal-content {
  bottom: 10%;
}
.center_div {
  display: flex;
  justify-content: center;
}
.select select {
  background-color: transparent;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #ffffff;
}
select {
  option {
    color: black;
  }
}
.size-font-predict {
  font-size: 1.2em;
}
</style>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "predict_comp",
  data() {
    return {
      teams: [],
      matchs: [],
      selected: "1",
      showModal: false,
      selectedMatch: [],
      Ismatchempty: true,
      saveMessage: "",
      statusMessage: "",
      showMessage: false,
    };
  },
  methods: {
    readTeams() {
      const db = firebase.firestore();
      db.collection("equipos")
        .orderBy("id", "desc")
        .onSnapshot((snapshotChange) => {
          this.teams = [];
          snapshotChange.forEach((doc) => {
            this.teams.push({
              key: doc.id,
              name: doc.data().name,
              img: doc.data().team_img,
              id: doc.data().id,
            });
          });
        });
    },
    readMatchs() {
      const db = firebase.firestore();
      db.collection("games")
        .where("day", "==", this.selected)
        .onSnapshot((snapshotChange) => {
          this.matchs = [];
          snapshotChange.forEach((doc) => {
            var aux1 = doc.get("team1");
            var team1_aux = this.team_asignation(aux1);
            var aux2 = doc.get("team2");
            var team2_aux = this.team_asignation(aux2);
            this.matchs.push({
              key: doc.id,
              team1: team1_aux,
              team2: team2_aux,
              id: doc.data().id,
              closed: doc.data().closed,
            });
          });
          this.matchs.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        });
    },
    team_asignation(value) {
      var team;
      for (let index = 0; index < this.teams.length; index++) {
        if (this.teams[index].id == value) {
          team = this.teams[index];
        }
      }
      return team;
    },
    get_match(value) {
      var match;
      for (let index = 0; index < this.matchs.length; index++) {
        if (this.matchs[index].id == value) {
          match = this.matchs[index];
        }
      }
      return match;
    },
    voteModal(value) {
      this.selectedMatch = this.get_match(value);
      this.Ismatchempty = false;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.showMessage = false;
    },
    pruebaMessage(message,status) {
      this.saveMessage = message;
      this.statusMessage = status;
      this.showMessage = true;
      var self = this;
      setTimeout(function () {
        self.showMessage = false;
        self.saveMessage = "";
        self.statusMessage = "";
        //self.closeModal();
      }, 2000);
    },
    predict(value) {
      var name_aux = this.user.data.uid + this.selectedMatch.key;
      const db = firebase.firestore();
      var self = this;
      db.collection("predictions")
        .doc(name_aux)
        .set({
          match: this.selectedMatch.id,
          predict: value,
          result: "",
          user: this.user.data.uid,
        })
        .then(function () {
          self.pruebaMessage("Guardado correctamente"," is-success");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
          self.pruebaMessage("Error al guardar"," is-danger");
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.readTeams();
    this.readMatchs();
  },
};
</script>