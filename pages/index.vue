<template>
  <v-row justify="center" align="bottom" style="height: 100%; align-items: center; justify-content: center;">
    <v-col lg="4" md="6">
      <v-card>
        <v-card-title>
          Login Form
        </v-card-title>
        <v-form class="form">
          <v-text-field class="input" placeholder="Nickname" dark />
          <v-text-field class="input" placeholder="Password" dark type="password"/>
          <div class="buttons">
            <v-btn
              class="ma-1"
              color="grey"
              plain
              @click="handleSubmit"
            >
              Log in
            </v-btn>

            <v-btn
              class="ma-1"
              color="error"
              plain
              @click="handleRegister"
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
// :loading przy buttonie
export default {
  methods: {
    handleSubmit () {
      // eslint-disable-next-line no-console
      console.log('hehe')
      this.$router.push('main')
    },
    handleRegister () {
      // eslint-disable-next-line no-console
      console.log('ziutek')
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
