<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manage Categories</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/categories/create`">
              Add New
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table card-table table-striped table-vcenter">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(service, i) in services"
                    :key="`service{i}`"
                  >
                    <td>{{ i + 1 }}</td> 
                    <td>{{ service.name }}</td> 
                    <td class="w-1">
                      <nuxt-link class="icon" :to="`/organizations/${organization.value}/categories/${service.id}`">
                        <i class="fe fe-edit"></i>
                      </nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ManageCategories',
  async asyncData({$axios, params}) { 
    let services = await $axios.get(`/categories`);
    services = services.data.data
    return {
      services: services,
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
      { text: 'Action', value: '' }
    ],
    loading: true,
  }),
  mounted() {
    this.loading = false
  },
  methods: {
    
  }
}
</script>