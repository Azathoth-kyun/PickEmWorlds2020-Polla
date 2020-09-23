<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item title-nav" @click.prevent="go_dash">
        <img
          src="../assets/images/tahm_kench_ate_a_minion_by_ewwdoshik_ddz85s0-fullview.png"
          width="70"
          height="28"
        />
        KSEL
      </a>
      <div class="navbar-burger burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div :class="{ 'is-active': showNav }" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click.prevent="go_predict">Predecir</a>
        <a class="navbar-item" @click.prevent="go_table">Puntaje</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" style="margin-right: 2vw;">
          <div class="field is-grouped">
            <p class="control">
              <a class="button is-secondary" @click.prevent="signOut">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Salir</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "~bulma/css/bulma.css";
@import url("https://fonts.googleapis.com/css2?family=Fondamento&display=swap");

.navbar {
  background-color: transparent;
}
.navbar-item {
  color: white;
}
.title-nav {
  font-family: "Fondamento", cursive;
  font-size: 18px;
}
.navbar-menu{
    background-color: transparent;
    &.is-active{
        .navbar-start{
            .navbar-item{
                text-align: center;
                text-decoration: underline;
            }
        }
        .navbar-end{
            .navbar-item{
                .field{
                    &.is-grouped{
                        .control{
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data: function () {
    return {
      showNav: false,
    };
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
    go_dash() {
      this.$router.replace({
        name: "dashboard",
      });
    },
    go_table() {
      this.$router.replace({
        name: "tabla",
      });
    },
    go_predict() {
      this.$router.replace({
        name: "predict",
      });
    },
  },
};
</script>