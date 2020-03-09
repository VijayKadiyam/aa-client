<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manage Versions</h3>
            &nbsp;&nbsp;&nbsp;
            <nuxt-link class="btn btn-primary btn-sm" :to="`/versions/create`">
              Add New
            </nuxt-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table card-table table-striped table-vcenter">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(emp, i) in versions"
                    :key="`emp${i}`"
                  >
                    <td>{{ i + 1 }}</td>
                    <td>{{ emp.version }}</td>
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
  name: 'versions',
  auth: false,
  data: () => ({
    versions: [],
    loading: false,
  }),
  async mounted() {
    this.loading = true
    let versions = await this.$axios.get('versions')
    this.versions = versions.data.data
    this.loading = false
  },

}
</script>