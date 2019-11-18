<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Reset Password [{{ user.roles[0].name }}]</h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input disabled type="email" class="form-control" placeholder="Enter email"
                    v-model="form.email"
                  >
                  <span class="help-block" 
                    v-if="errors.email"
                  >{{ errors.email[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Password
                  </label>
                  <input type="password" class="form-control" placeholder="Password"
                    v-model="form.password"
                  >
                  <span class="help-block" 
                    v-if="errors.password"
                  >{{ errors.password[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Password Confirmation
                  </label>
                  <input type="password" class="form-control" placeholder="Password"
                    v-model="form.password_confirmation"
                  >
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Update Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar :dark="darkStatus" :height="baseHeight" :color="baseColor">
            <v-toolbar-title>Reset Password [{{ user.roles[0].name }}]</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field 
                :error-messages="errors.email"
                prepend-icon="email" 
                name="email" 
                label="Email" 
                v-model="form.email"
                disabled
                type="text"></v-text-field>
              <v-text-field 
                :error-messages="errors.password"
                id="password" 
                prepend-icon="lock" 
                name="password" 
                label="New Password" 
                v-model="form.password"
                type="password"></v-text-field>
              <v-text-field
                id="password_confirmation" 
                prepend-icon="lock_open" 
                name="password_confirmation" 
                label="Confirm New Password" 
                v-model="form.password_confirmation"
                type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :dark="darkStatus" @click="store" :color="baseColor">Update Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script type="text/javascript">
import BackButton from '@/components/back-button.vue'

export default {
  name: 'MyProfile',
  async asyncData({$axios, store}) {
    let user = await $axios.get(`/users/${store.getters['auth/user'].id}`);
    return {
      form: user.data.data
    }
  },
  mounted() {
    this.form.role_id = this.form.roles[0].id
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      await this.$axios.post(`/reset_password`, this.form)
      alert("Password Updated");
      this.$auth.logout();
    }
  }
}
</script> 