<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Update Link</h3>
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
                    <option value="">Select category</option>
                    <option v-for="(type, i) in types" :key="`type${i}`" :value="type.value">{{ type.text }}</option>
                  </select>
                  <span class="help-block" 
                    v-if="errors.name"
                  >{{ errors.category_id[0] }}</span>
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
                <div class="form-group">
                  <label class="form-label">Image</label>
                  <input 
                    type="file" 
                    ref="file1"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                  >
                </div>
                <img v-if="form.image_path" width="100%" height="100" :src="`${mediaUrl}${form.image_path}`">
                <div class="form-footer">
                  <button class="btn btn-primary btn-block"
                    @click="store"
                  >Update Link</button>
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
  name: 'UpdateLink',
  async asyncData({$axios, params}) {
    let categories = await $axios.get(`categories`)
    let types = []
    categories.data.data.forEach(type => {
      types.push({
        text: type.name,
        value: type.id,
      })
    })
    let links = await $axios.get(`links/${params.id}`)
    return {
      types: types,
      form: links.data.data,
    }
  },
  components: {
    BackButton
  },
  methods: {
    async store() {
      let user = await this.$axios.patch(`/links/${this.form.id}`, this.form)
      await this.handleFileUpload();
      this.$router.push(`/organizations/${this.organization.value}/links`);
    },
    async handleFileUpload() {
      this.picture1 = this.$refs.file1 ? this.$refs.file1.files[0] : ''
      let formData = new FormData();
      formData.append('id', this.form.id);
      formData.append('image1', this.picture1);
      await this.$axios.post('upload_link_image', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(data => {
        // this.filePath = data.data
        console.log(data);
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
  }
}
</script> 