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
          <div class="card-body">
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
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(link, i) in category.links"
                    :key="`link${i}`"
                  >
                    <td>{{ i + 1 }}</td> 
                    <td>{{ link.link }}</td>
                    <td class="w-1">
                      <nuxt-link class="icon" :to="`/organizations/${organization.value}/links/${link.id}`">
                        <i class="fe fe-edit"></i>
                      </nuxt-link>
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
  async asyncData({$axios, params}) { 
    let categories = await $axios.get(`/categories`);
    categories = categories.data.data
    return {
      categories: categories,
    }
  },
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
    checkDeleted: null
  }),
  mounted() {
    this.loading = false
  },
  methods: {
    
  }
}
</script>