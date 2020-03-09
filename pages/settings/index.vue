<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Settings</h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 col-lg-4">
                <div class="form-group">
                  <select class="form-control custom-select"
                    v-model="organizationId"
                  >
                    <option value="">Select Organization</option>
                    <option v-for="org in organizations" :key="`'org'${org.id}`" :value="org.value">{{ org.text }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-block"
                    @click="updateDetails"
                  >Update Details</button>
                  <nuxt-link to="/versions">
                    Add New Version
                  </nuxt-link>
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
  name: 'AdminSettings',
  async asyncData({$axios}) {
    let organizations = await $axios.get('/companies');
    organizations = organizations.data.data.map(organization => ({
      'text': organization.name,
      'value': organization.id,
      'time_zone': organization.time_zone ? organization.time_zone : 'Asia/Calcutta'
    }));
    return {
      organizations: organizations
    }
  },
  data: () => ({
    organizationId: ''
  }),
  mounted() {
    this.organizationId = this.$store.getters['settings/organization'].value;
  },
  methods: {
    updateDetails() {
      if(this.organizationId){
        let organization = this.organizations.filter(o => o.value == this.organizationId)
        if(organization.length) {
          this.$store.dispatch('settings/setOrganization', organization[0])
          alert("Details Updated")
        }
      } else {
        alert("Please select the organization")
      }
    }
  }
}
</script> 