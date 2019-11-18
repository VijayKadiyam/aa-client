<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manage Organizations</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" to="/organizations/create">
              Add New
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table card-table table-striped table-vcenter">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Organization</th>
                    <th>Admin Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(org, i) in items"
                    :key="`org{i}`"
                  >
                    <td>{{ org.id }}</td>
                    <td>
                      {{ org.name }}<br>
                      {{ org.address }}
                    </td>
                    <td v-if="org.users.length == 0">
                      <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${org.organizationId}/admins/create`">
                        Add Admin Details
                      </nuxt-link>
                    </td>
                    <td v-else>
                      <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${org.organizationId}/admins/${org.users[0].id}`">
                        Edit Admin Details
                      </nuxt-link>
                      <br>
                      Name: {{ org.users[0].name }} <br>
                      Email: {{ org.users[0].email }} <br>
                      Phone: {{ org.users[0].phone }} <br>
                    </td>
                    <td class="w-1">
                      <nuxt-link class="icon" :to="`/organizations/${org.organizationId}`">
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
  name: 'ManageOrganizations',
  async asyncData({$axios}) { 
    let organizations = await $axios.get('/companies');
    return {
      organizations: organizations.data.data
    }
  },
  data:() =>  ({
    headers: [
      { text: 'Sr No', value: 'sr_no' },
      {
        text: 'Organization Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Admin Details', value: 'admin_details' },
      { text: 'Action', value: '' }
    ],
    items: [],
    loading: true
  }),
  mounted() {
    this.organizations.forEach((org, i) => {
      org.users = org.users.filter(u => u.roles[0].name == 'Admin');
      this.items.push({
        id: i+1,
        organizationId: org.id,
        name: org.name,
        users: org.users,
        address: org.address
      })
    })
    this.loading = false
  }
}
</script>