<template>
  <div class="columns is-mobile">
    <div class="column"></div>
    <div
      class="column is-one-thirds-fullhd is-one-thirds-widescreen is-one-thirds-desktop is-one-thirds-tablet is-three-quarters-mobile"
    >
      <div class="card box">
        <div class="box-inner">
          <div class="notification is-warning" v-if="this.error != null">
            <center>
              <b>{{error}}</b>
            </center>
          </div>
          <form action="#" @submit.prevent="submit">
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Usuario" value required autofocus v-model="form.email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Contraseña" value required autofocus v-model="form.password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </div>
            </div>
            <button type="submit" class="button btn_log is-warning">Entrar</button>
          </form>
        </div>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(result => {
          console.log(result);
          this.$router.replace({ name: "dashboard" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style lang="scss">
$color-alpha: #b78846;
@import "~bulma/css/bulma.css";
.notification {
  font-size: 0.8em;
  padding: 0.75rem 0.75rem 0.75rem 0.75rem;
}
.box {
  background-color: rgba(#000, 0.5);
  padding: 5px;
  border: 2px solid $color-alpha;
  &:before,
  &:after {
    content: "•";
    position: absolute;
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: $color-alpha;
    border: 2px solid $color-alpha;
    line-height: 12px;
    top: 5px;
    text-align: center;
  }
  &:before {
    left: 5px;
  }
  &:after {
    right: 5px;
  }
  .box-inner {
    position: relative;
    border: 2px solid $color-alpha;
    padding: 40px;
    &:before,
    &:after {
      content: "•";
      position: absolute;
      width: 14px;
      height: 14px;
      font-size: 14px;
      color: $color-alpha;
      border: 2px solid $color-alpha;
      line-height: 12px;
      bottom: -2px;
      text-align: center;
    }
    &:before {
      left: -2px;
    }
    &:after {
      right: -2px;
    }
  }
}
.card {
  // box-shadow: 2px 2px 4px 1px rgb(87, 86, 87);
  margin-top: 15vh;
  @media (max-width: 800px) {
    margin-top: 10vh;
  }
  // height: 35vh;
  background-color: transparent;
}
.field {
  max-width: 100%;
}
.btn_log {
  left: 50%;
  transform: translateX(-50%);
  background-color: $color-alpha;
}
</style>