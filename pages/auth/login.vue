<template>
  <div class="page">
    <div class="page-single">
      <div class="container">
        <div class="row">
          <div class="col col-login mx-auto">
            <div class="text-center mb-6">
              <img src="/brand/logo.png" class="h-6" alt="">
            </div>
            <div class="card" >
              <div class="card-body p-6">
                <div class="card-title">Login to your account</div>
                <div class="form-group">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" placeholder="Enter email"
                    v-model="form.email"
                  >
                  <span class="help-block" 
                    v-if="errors.email"
                  >{{ errors.email[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Password
                    <a href="./forgot-password.html" class="float-right small">I forgot password</a>
                  </label>
                  <input type="password" class="form-control" placeholder="Password"
                    v-model="form.password"
                  >
                  <span class="help-block" 
                    v-if="errors.password"
                  >{{ errors.password[0] }}</span>
                </div>
                <div class="form-footer">
                  <button type="submit" class="btn btn-primary btn-block"
                    @click="login"
                  >Sign in</button>
                </div>
              </div>
            </div>
            <!-- <div class="text-center text-muted">
              Don't have account yet? 
              <nuxt-link to="/auth/register">Sign up</nuxt-link>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Login',
  middleware: 'guest',
  auth: false,
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login() {
      await this.$axios.post('/login', this.form)
      await this.$auth.login({data: this.form})
      this.$router.push('/')
    }
  }
}
</script>
