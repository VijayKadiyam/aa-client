<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Create Link</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/links`">
              GO Back
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">Link Category</label>
                  <select class="form-control custom-select"
                    v-model="form.category_id"
                  >
                    <option value="">Select Category</option>
                    <option v-for="type in types" :key="`'type'${type.id}`" :value="type.value">{{ type.text }}</option>
                  </select>
                  <span class="help-block" 
                    v-if="errors.category_id"
                  >{{ errors.category_id[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" placeholder="Enter name"
                    v-model="form.name"
                  >
                  <span class="help-block" 
                    v-if="errors.name"
                  >{{ errors.name[0] }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label">Link</label>
                  <input type="text" class="form-control" placeholder="Enter link"
                    v-model="form.link"
                  >
                  <span class="help-block" 
                    v-if="errors.link"
                  >{{ errors.link[0] }}</span>
                </div>
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Create Link</button>
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
  name: 'CreateWorkshop',
  async asyncData({$axios, params}) {
    let categories = await $axios.get(`/categories`)
    let types = []
    categories.data.data.forEach(type => {
      types.push({
        text: type.name,
        value: type.id,
      })
    })
    return {
      types: types,
    }
  },
  data: () => ({
    form: {
      name: '',
      category_id: ''
    },
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      let user = await this.$axios.post(`/links`, this.form)
      this.$router.push(`/organizations/${this.organization.value}/links`);
    },
  }
}
</script> 