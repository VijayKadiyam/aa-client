<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Create Category</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/services`">
              GO Back
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Category name</label>
                  <input type="text" class="form-control" placeholder="Enter name"
                    v-model="form.name"
                  >
                  <span class="help-block" 
                    v-if="errors.name"
                  >{{ errors.name[0] }}</span>
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Create Category</button>
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
      workshop_type_id: ''
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      let user = await this.$axios.post(`/categories`, this.form)
      this.$router.push(`/organizations/${this.organization.value}/categories`);
    },
  }
}
</script> 