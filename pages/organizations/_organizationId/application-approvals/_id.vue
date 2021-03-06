<template>
  <v-container fluid fill-height>
    <back-button 
      title="Go Back To Designations"
      :link="`/organizations/${organization.value}/leave-applications`"
    ></back-button>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar :dark="darkStatus" :height="baseHeight" :color="baseColor">
            <v-toolbar-title>Edit Leave Application</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-select
                v-model="form.company_leave_id"
                :items="company_leaves"
                label="Select Leave Type"
              >
              </v-select>
              <v-menu
                ref="fromDateMenu"
                :close-on-content-click="false"
                v-model="fromDateMenu"
                :nudge-right="40"
                :return-value.sync="form.from_date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  :error-messages="errors.from_date"
                  slot="activator"
                  v-model="form.from_date"
                  label="From Date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="form.from_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="fromDateMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.fromDateMenu.save(form.from_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-menu
                ref="toDateMenu"
                :close-on-content-click="false"
                v-model="toDateMenu"
                :nudge-right="40"
                :return-value.sync="form.to_date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  :error-messages="errors.to_date"
                  slot="activator"
                  v-model="form.to_date"
                  label="To Date"
                  prepend-icon="date_range"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="form.to_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="toDateMenu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.toDateMenu.save(form.to_date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-textarea
                :error-messages="errors.description"
                name="description" 
                prepend-icon="description" 
                label="Description" 
                v-model="form.description"
                hint="Hint text"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :dark="darkStatus" @click="store" :color="baseColor">Update Leave Application</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
import BackButton from '@/components/back-button.vue'

export default {
  name: 'CreateLeaveApplication',
  async asyncData({$axios, params}) {
    let company = await $axios.get(`/companies/${params.organizationId}`)
    company = company.data.data
    let company_leaves = await $axios.get(`company_leaves`)
    let leave_pattern_id = ''
    company.leave_patterns.length ? leave_pattern_id = company.leave_patterns[0].id : ''
    company_leaves = company_leaves.data.data.filter(leave => leave.leave_pattern_id == leave_pattern_id)
    company_leaves = company_leaves.map(company_leave => ({
      'text': company_leave.name,
      'value': company_leave.id
    }))
    let leave_application = await $axios.get(`/user_applications/${params.id}`);
    leave_application.data.data.company_leave_id = parseInt(leave_application.data.data.company_leave_id)
    return {
      company: company,
      company_leaves: company_leaves,
      form: leave_application.data.data
    }
  },
  data: () => ({
    fromDateMenu: false,
    toDateMenu: false,
    company_leaves: []
  }),
  components: {
    BackButton
  },
  methods: {
    async store() {
      await this.$axios.patch(`/user_applications/${this.form.id}`, this.form)
      this.$router.push(`/organizations/${this.organization.value}/leave-applications`);
    }
  }
}
</script> 