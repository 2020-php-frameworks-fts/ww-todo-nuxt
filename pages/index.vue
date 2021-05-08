<template>
  <v-row justify="center" align="bottom" style="height: 100%; align-items: center; justify-content: center;">
    <v-col lg="4" md="6">
      <v-card>
        <v-card-title>
          Login Form
        </v-card-title>
        <v-form class="form">
          <v-text-field v-model="form.login" class="input" placeholder="Nickname" dark />
          <v-text-field v-model="form.password" class="input" placeholder="Password" dark type="password"/>
          <span v-if="error.length > 0">{{ error }}</span>
          <div class="buttons">
            <v-btn
              class="ma-1"
              color="grey"
              plain
              @click="handleSubmit"
              :loading="isLoading"
            >
              Log in
            </v-btn>

            <v-btn
              class="ma-1"
              color="error"
              plain
              @click="handleRegister"
              :loading="isLoading"
            >
              Register
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// :loading przy buttonie
export default {
  data: () => ({
    form: {
      login: '',
      password: ''
    }
  }),
  computed: {
    ...mapGetters('session', ['error', 'isLoading']),
    isFormValid () {
      return (this.form.login.length > 0 && this.form.password.length > 0)
    }
  },
  methods: {
    ...mapActions('session', ['login', 'register']),
    handleSubmit () {
      // eslint-disable-next-line no-console
      this.$router.push('main')
    },
    async handleRegister () {
      if (!this.isFormValid) {
        return
      }
      await this.register(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap:15px;
    padding: 0 25px;
  }
  .buttons {
    align-self: center;
  }
</style>
