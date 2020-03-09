<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Create New Version</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" to="/versions">
              GO Back
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Version</label>
                  <input type="text" class="form-control" placeholder="Enter version"
                    v-model="form.version"
                  >
                  <span class="help-block" 
                    v-if="errors.version"
                  >{{ errors.version[0] }}</span>
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Create Version</button>
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
  name: 'CreateVersion',
  data: () => ({
    form: {
      version: ''
    }
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      await this.$axios.post(`/versions`, this.form)
      this.$router.push(`/versions`);
    }
  }
}
</script> 