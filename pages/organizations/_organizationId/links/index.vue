<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manage Links</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/links/create`">
              Add New
            </nuxt-link>
          </div>
          <div v-if="loading">
            Loading...
          </div>
          <div class="card-body" v-else>
            <div class="table-responsive">
              <div
                v-for="(category, c) in categories"
                :key="`cat${c}`"
              >
                <b>{{ category.name }}</b>
                <table class="table card-table table-striped table-vcenter">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Image Path</th>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(link, i) in category.links"
                    :key="`link${i}`"
                  >
                    <td>{{ i + 1 }}</td> 
                    <td>
                      <img v-if="link.image_path" width="100" height="100" :src="`${mediaUrl}${link.image_path}`">
                    </td>
                    <td>{{ link.name }}</td>
                    <td>{{ link.link }}</td>
                    <td class="w-1">
                      <nuxt-link class="icon" :to="`/organizations/${organization.value}/links/${link.id}`">
                        <i class="fe fe-edit"></i>
                      </nuxt-link>
                      &nbsp;&nbsp;
                      <span class="icon" @click="deleteLink(link.id)"><i class="fe fe-delete"></i></span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br>
              <br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ManageLinks',
  data:() =>  ({
    headers: [
      { text: 'Sr No', value: 'sr_no' },
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Email/Phone', value: 'phone' },
      { text: 'Address', value: 'address' },
      { text: 'Status', value: 'active' },
      { text: 'Action', value: '' }
    ],
    loading: true,
    dialogDelete: false,
    checkDeleted: null,
    categories: [],
  }),
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      this.loading = true
      let categories = await this.$axios.get(`/categories`);
      this.categories = categories.data.data
      this.loading = false
    },
    async deleteLink(linkId) {
      var r = confirm("Are you sure you want to delete the link!");
      if (r == true) {
        await this.$axios.delete(`/links/${linkId}`)
      }
      this.getCategories()
    }
  }
}
</script>