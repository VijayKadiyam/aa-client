<template>
  <section>
    <span class="title">Manage Supervisors</span>
    <v-btn
      small
      fab
      :to="`/organizations/${organization.value}/supervisors/create`"
      :color="baseColor"
      title="Add New Employee"
      :dark="darkStatus"
    >
      <v-icon>
        add
      </v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="supervisors"
      :loading="loading"
      class="elevation-1"
      hide-actions
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.index + 1 }}</td>
        <td>
          <v-avatar
            size="60px"
            v-if="props.item.image_path != ''"
          >
            <img
              :src="(mediaUrl + props.item.image_path)"
              alt="Profile Image"
            >
          </v-avatar>
        </td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.doj }}</td>
        <td>{{ props.item.dob }}</td>
        <td>{{ props.item.company_designation.name }}</td>
        <td>{{ props.item.company_state_branch ? props.item.company_state_branch.name : '-' }}</td>
        <td>{{ props.item.salary }}</td>
        <td class="text-xs-left">
          <nuxt-link :to="`/organizations/${organization.value}/supervisors/${props.item.id}`">
            <v-icon>edit</v-icon>
          </nuxt-link>
        </td>
      </template>
    </v-data-table>
  </section>
</template>

<script type="text/javascript">
export default {
  name: 'ManageEmployees',
  async asyncData({$axios, params}) { 
    let supervisors = await $axios.get(`/users?role_id=4`);
    return {
      supervisors: supervisors.data.data
    }
  },
  data:() =>  ({
    headers: [
      { text: 'Sr No', value: 'sr_no' },
      { text: 'Image', value: 'image_path' },
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'DOJ', value: 'doj' },
      { text: 'DOB', value: 'dob' },
      { text: 'Designation', value: 'designation' },
      { text: 'Branch', value: 'branch' },
      { text: 'Salary', value: 'salary' },
      { text: 'Action', value: '' }
    ],
    loading: true
  }),
  mounted() {
    this.loading = false
  }
}
</script>