<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manage Users</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/organizations/${organization.value}/users/create`">
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
                    <th>Email/Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(emp, i) in employees"
                    :key="`emp${i}`"
                  >
                    <td>{{ i + 1 }}</td>
                    <td>{{ emp.name }}</td>
                    <td>{{ emp.email }}<br>{{ emp.phone }}</td>
                    <td>{{ emp.active == 1 ? 'ACTIVE' : 'IN ACTIVE' }}</td>
                    <td class="w-1">
                      <nuxt-link class="icon" :to="`/organizations/${organization.value}/users/${emp.id}`">
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
  name: 'ManageUsers',
  async asyncData({$axios, params}) { 
    let employees = await $axios.get(`/users?role_id=3`);
    employees = employees.data.data
    employees = employees.filter(employee => employee.active == 1)
    let emp = [];
    employees.forEach(employee => {
      employee.dialogDelete = false
      emp.push(employee)
    })
    return {
      employees: emp,
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
    async deleteUser(userId) {
      let employee = await this.$axios.get(`users/${userId}`)
      employee = employee.data.data
      employee.active = "0"
      employee = await this.$axios.patch(`/users/${userId}`, employee)
      this.dialogDelete = false
      this.updateList()
    },
    async updateList(){
      this.loading = true
      if(this.checkDeleted == "checkedDeleted") {
        let employees = await this.$axios.get(`/users?role_id=3`);
        this.employees = employees.data.data
      } else {
        let employees = await this.$axios.get(`/users?role_id=3`);
        employees = employees.data.data
        this.employees = employees.filter(employee => employee.active == 1)
      }
      this.loading = false
    }
  }
}
</script>