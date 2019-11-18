<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Update User</h3>
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
                  >Update User</button>
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
  name: 'UpdateUser',
  async asyncData({$axios, params}) {
    let employee = await $axios.get(`users/${params.id}`)
    employee.data.data.can_send_email = parseInt(employee.data.data.can_send_email)
    return {
      form: employee.data.data,
    }
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      phone: '',
      active: 1,
      role_id: 3
    },
  }),
  created() {
    this.selectedUser = this.form
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      this.form.active = 1
      let user = await this.$axios.patch(`/users/${this.form.id}`, this.form)
      this.$router.push(`/organizations/${this.organization.value}/users`);
    },

    async forceLogout() {
      let user = {
        user_id: this.form.id
      }
      this.$axios.post('/logout', user)
    },
  }
}
</script> 