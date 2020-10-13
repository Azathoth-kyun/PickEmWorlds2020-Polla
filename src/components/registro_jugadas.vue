<template>
  <div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <td
                v-for="jogos in jogosResult"
                :key="jogos.username"
                style="text-align: center"
              >
                <figure class="image is-48x48" style="margin: 0 auto">
                  <img
                    :src="jogos.user_img"
                    class="is-rounded height-logo-table"
                  />
                </figure>
                <br />{{ jogos.bet }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        class="modal-close is-large"
        @click.prevent="closeModal()"
        aria-label="close"
      ></button>
    </div>
    <div class="columns is-mobile">
      <div class="column"></div>
      <div
        class="column center_div is-two-thirds-fullhd is-two-thirds-widescreen is-two-thirds-desktop is-two-thirds-tablet is-three-quarters-mobile"
      >
        <div class="select">
          <select @change="readMatchs()" v-model="selected">
            <option v-for="day in days" :key="day.key" :value="day.id">
              {{ day.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column"></div>
    </div>
    <div v-if="this.show == false" class="center-spinner">
      <div class="loader"></div>
    </div>
    <div v-else>
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
                style="cursor: pointer"
                @click.prevent="openModal(match.id)"
              >
                <td>
                  <figure class="image is-48x48">
                    <img :src="match.team1.img" />
                  </figure>
                  <b>{{ match.team1.name }}</b>
                </td>
                <td
                  v-if="match.winner == ''"
                  style="text-align: center; vertical-align: middle"
                >
                  VS
                </td>
                <td v-else style="text-align: center; vertical-align: middle">
                  {{ match.winner }}
                </td>
                <td style="text-align: right">
                  <figure
                    class="image is-48x48"
                    style="margin-left: auto; margin-right: 0"
                  >
                    <img :src="match.team2.img" />
                  </figure>
                  <b>{{ match.team2.name }}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.height-logo-table {
  height: 100% !important;
}
.size-font-predict {
  font-size: 1.2em;
}
.center-spinner {
  position: absolute;
  top: 40%;
  left: 45%;
  margin: -25px 0 0 -25px;
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
</style>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "registroJogadas",
  data() {
    return {
      days: [],
      selected: "1",
      teams: [],
      jogadas: [],
      usuarios: [],
      show: false,
      selectedMatch: [],
      matchs: [],
      showModal: false,
      jogosResult: [],
    };
  },
  methods: {
    openModal(value) {
      this.jogosResult = this.getJogo(value);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.jogosResult = [];
    },
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
    readDays() {
      const db = firebase.firestore();
      db.collection("days")
        .orderBy("date", "asc")
        .onSnapshot((snapshotChange) => {
          this.days = [];
          snapshotChange.forEach((doc) => {
            this.days.push({
              key: doc.id,
              name: doc.data().name,
              date: doc.data().date,
              id: doc.data().id,
            });
          });
        });
    },
    readUsers() {
      const db = firebase.firestore();
      db.collection("usuarios")
        .orderBy("score", "desc")
        .onSnapshot((snapshotChange) => {
          this.usuarios = [];
          snapshotChange.forEach((doc) => {
            this.usuarios.push({
              key: doc.id,
              name: doc.data().name,
              score: doc.data().score,
              img: doc.data().user_img,
              id: doc.data().id,
            });
          });
        });
    },
    readJogadas() {
      this.jogadas = [];
      for (let index = 0; index < 5; index++) {
        var user_aux = this.getUser(index);
        var jogos = this.getJogos(user_aux.id);
        this.jogadas.push({
          usuario: user_aux,
          jogos: jogos,
        });
      }
      console.log(this.jogadas);
    },
    getJogos(user) {
      var array_aux = [];
      const db = firebase.firestore();
      db.collection("predictions")
        .where("user", "==", user)
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            array_aux.push({
              key: doc.id,
              predict: doc.data().predict,
              match: doc.data().match,
              result: doc.data().result,
            });
          });
        });
      return array_aux;
    },
    getUser(index) {
      var user_aux;
      user_aux = this.usuarios[index];
      return user_aux;
    },
    getJogo(value) {
      var arrayResult = [];
      for (let index = 0; index < 5; index++) {
        var user_name = this.jogadas[index].usuario.name;
        var user_img = this.jogadas[index].usuario.img;
        var bet;
        for (
          let index2 = 0;
          index2 < this.jogadas[index].jogos.length;
          index2++
        ) {
          if (this.jogadas[index].jogos[index2].match == value) {
            bet = this.jogadas[index].jogos[index2].predict;
            break;
          } else {
            bet = "N/A";
          }
        }
        arrayResult.push({
          username: user_name,
          user_img: user_img,
          bet: bet,
        });
      }
      console.log(arrayResult);
      return arrayResult;
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
              day: doc.data().day,
              winner: doc.data().winner,
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
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    this.readUsers();
    this.readDays();
    this.readTeams();
    this.readMatchs();
    setTimeout(() => {
      this.readJogadas();
      this.show = true;
    }, 1000);
  },
};
</script>