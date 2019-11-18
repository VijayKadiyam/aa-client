<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Create User</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/technicians`">
              GO Back
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">User name</label>
                  <input type="text" class="form-control" placeholder="Enter name"
                    v-model="form.name"
                  >
                  <span class="help-block" 
                    v-if="errors.name"
                  >{{ errors.name[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" placeholder="Enter email"
                    v-model="form.email"
                  >
                  <span class="help-block" 
                    v-if="errors.email"
                  >{{ errors.email[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input type="number" class="form-control" placeholder="Enter phone"
                    v-model="form.phone"
                  >
                  <span class="help-block" 
                    v-if="errors.phone"
                  >{{ errors.phone[0] }}</span>
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Create User</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import BackButton from '@/components/back-button.vue'

export default {
  name: 'CreateUser',
  data: () => ({
    form: {
      name: '',
      email: '',
      phone: '',
      active: 1,
      role_id: 3,
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      let user = await this.$axios.post(`/users`, this.form)
      // RoleUser
      let role_user = {
        user_id: user.data.data.id,
        role_id: this.form.role_id
      }
      await this.$axios.post('/role_user', role_user)
      // Company User
      let company_user = {
        user_id: user.data.data.id,
        company_id: this.organization.value
      }
      await this.$axios.post('/company_user', company_user)
      this.$router.push(`/organizations/${this.organization.value}/users`);
    },
  }
}
</script> 