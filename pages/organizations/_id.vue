<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Update Organizations</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" to="/organizations">
              GO Back
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Organization name</label>
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
                <div class="form-group">
                  <label class="form-label">Address</label>
                  <input type="text" class="form-control" placeholder="Enter address"
                    v-model="form.address"
                  >
                  <span class="help-block" 
                    v-if="errors.address"
                  >{{ errors.address[0] }}</span>
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Update Organization</button>
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

import moment from 'moment'
import moment_timezone from 'moment-timezone'

export default {
  name: 'UpdateOrganization',
  async asyncData({$axios, params}) {
    let organization = await $axios.get(`/companies/${params.id}`)
    return {
      form: organization.data.data
    }
  },
  data: () => ({
    form: {
      name: '',
      time_zone: ''
    },
    time_zones: []
  }),
  components: {
    BackButton
  },
  mounted() {
    var timezones = moment.tz.names();
    for (var i = 0; i < timezones.length; i++) {
      this.time_zones.push({
        'text': timezones[i],
        'value': timezones[i]
      })
    }
  },
  methods: {
    async store() {
      await this.$axios.patch(`/companies/${this.$route.params.id}`, this.form)
      this.$router.push('/organizations');
    }
  }
}
</script> 