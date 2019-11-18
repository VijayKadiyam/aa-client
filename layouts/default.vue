<template>
  <section>
    <div class="page">
      <div class="page-main">
        <div class="header py-4" v-if="authenticated">
          <div class="container">
            <div class="d-flex">
              <nuxt-link class="header-brand" to="/">
                <img src="/brand/logo.png" class="header-brand-img" alt="tabler logo">
              </nuxt-link>
              <div class="d-flex order-lg-2 ml-auto">
                <div class="nav-item d-none d-md-flex">
                  <nuxt-link class="btn btn-sm btn-outline-primary" to="/">
                    {{ organization.text }}
                  </nuxt-link>
                </div>
                <div class="dropdown">
                  <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                    <span class="avatar" style="background-image: url(./demo/faces/female/25.jpg)"></span>
                    <span class="ml-2 d-none d-lg-block">
                      <span class="text-default">{{ user.name }}</span>
                      <small class="text-muted d-block mt-1">{{ user.roles[0].name }}</small>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <nuxt-link class="dropdown-item" to="/profile">
                      <i class="dropdown-icon fe fe-user"></i> Profile
                    </nuxt-link>
                    <nuxt-link class="dropdown-item" to="/settings">
                      <i class="dropdown-icon fe fe-settings"></i> Settings
                    </nuxt-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      <i class="dropdown-icon fe fe-help-circle"></i> Need help?
                    </a>
                    <a class="dropdown-item" href="javascript:void(0)" @click="logout">
                      <i class="dropdown-icon fe fe-log-out"></i> Sign out
                    </a>
                  </div>
                </div>
              </div>
              <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                <span class="header-toggler-icon"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="header collapse d-lg-flex p-0" id="headerMenuCollapse" v-if="authenticated">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg order-lg-first">
                <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                  <li class="nav-item">
                    <nuxt-link class="nav-link" to="/">
                      <i class="fe fe-home"></i> Home
                    </nuxt-link>
                  </li>
                  <li class="nav-item dropdown">
                    <nuxt-link class="nav-link" to="/organizations">
                      <i class="fe fe-check-square"></i> Organizations
                    </nuxt-link>
                  </li>
                  <li class="nav-item dropdown">
                    <nuxt-link class="nav-link" to="/profile">
                      <i class="dropdown-icon fe fe-user"></i> Profile
                    </nuxt-link>
                  </li>
                  <li class="nav-item dropdown">
                    <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown">
                      <i class="fe fe-users"></i> Users</a>
                    <div class="dropdown-menu dropdown-menu-arrow">
                      <nuxt-link class="dropdown-item" :to="`/organizations/${this.organizationId}/users`">
                        List of Users
                      </nuxt-link>
                    </div>
                  </li>
                  <li class="nav-item dropdown">
                    <nuxt-link class="nav-link" :to="`/organizations/${this.organizationId}/categories`">
                      <i class="dropdown-icon fe fe-calendar"></i> Categories
                    </nuxt-link>
                  </li>
                  <li class="nav-item dropdown">
                    <nuxt-link class="nav-link" :to="`/organizations/${this.organizationId}/links`">
                      <i class="dropdown-icon fa fa-cab"></i> Link
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br>
        <nuxt></nuxt>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Root',
  data() {
    return {
      clipped: true,
      fixed: false
    }
  },
  computed: {
    drawer() {
      return this.authenticated
    },
    title() {
      return this.$auth.$state.user ? 
        (this.$auth.$state.user.companies.length ? 
          this.$auth.$state.user.companies[0].name + ' [' +this.$auth.$state.user.roles[0].name + ']' 
          : this.$store.getters['settings/organization'].text + ' [By Super Admin]') 
        : ''
    },
    organizationId() {
      return this.$auth.$state.user ? 
        (this.$auth.$state.user.companies.length ? 
          this.$auth.$state.user.companies[0].id
          : this.$store.getters['settings/organization'].value)
        : ''
    },
    role() {
      return this.user ? this.user.roles[0].name : '';
    },
    permissions() {
      return this.user ? this.user.roles[0].permissions.map(p => p.id) : ''
    },
    items() {
      let items = [];
      if(this.permissions.indexOf(5)!= -1)
        items.push({ icon: 'public', title: 'Organizations', to: '/organizations' })
      if(this.permissions.indexOf(4)!= -1)
        items.push({ icon: 'account_circle', title: 'Profile', to: '/profile' })
      // Master
      if(this.permissions.indexOf(1)!= -1)
        items.push({ icon: 'brightness_7', title: 'Settings', to: '/settings'})
      if(this.permissions.indexOf(14)!= -1)
        items.push({ icon: 'security', title: "Reset Password", to: '/auth/reset-password'})
      if(this.permissions.indexOf(9)!= -1)
        items.push({ icon: 'person', title: 'Master', to: `/organizations/${this.organizationId}/users`})
      items.push({ icon: 'timeline', title: 'Request Tree', to: `/organizations/${this.organizationId}/request-tree`})
      return items;
    },
    dropdownItems() {
      let dropdownItems = [];
      let length = 0;

      return dropdownItems;
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style>
  .help-block {
    color: red !important;
  }
  .ck-editor__editable {
    min-height: 500px;
  }
</style>