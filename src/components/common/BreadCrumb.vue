
<template>
  <section class="wrapper">
    <nav class="container">
      <ul class="bread-crumbs">
        <li>
          <router-link to="/"> Asosiy </router-link>
        </li>
        <li v-for="(item, index) in navs" :key="index">
          <span v-if="index + 1 === navs.length"> {{ item.title }}</span>
          <router-link v-else :to="item.url">
            {{ item.title }}
          </router-link>
          <span v-if="index != navs.length - 1"></span>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    routers: Array,
    default: () => [],
  },
  data() {
    return {
      navs: [],
      filterParams: [],
    };
  },
  watch: {
    navs() {
      this.updateBreadcrumb();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    this.updateBreadcrumb();
  },
  methods: {
    updateBreadcrumb() {
      this.navs = [];
      this.filterParams = [];
      let title;
      const route = this.$route;
      if (route.params.slug !== undefined)
        this.filterParams.push(route.params.slug);
      if (route.params.id !== undefined)
        this.filterParams.push(route.params.id);
      const Fullpath = route.fullPath
        .replace("/uz/", "")
        .replace("/ru/", "")
        .replace("/en/", "")
        .replace(/([?]).*$/i, "")
        .split("/");
      for (let i = 0; i < Fullpath.length; i++) {
        if (this.filterParams && this.filterParams.length) {
          for (let j = 0; j < this.filterParams.length; j++) {
            if (Fullpath[i] === this.filterParams[j]) {
              title = Fullpath[i];
            } else {
              title = Fullpath[i];
            }
          }
        } else {
          title = Fullpath[i];
        }
        const filtered = Fullpath.slice(0, i + 1);
        const url = filtered.join("/").toLowerCase();
        const nav = {
          title,
          url,
        };
        if (nav.title !== "") {
          this.navs.push(nav);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_vereables";
.wrapper {
  background-color: $sky-500;
  padding: 12px 0;
}
.bread-crumbs {
  display: flex;
  align-items: center;
  gap: 16px;
  li {
    a {
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      color: #fff;
      transition: color 0.2s ease-in-out;
      position: relative;
      margin-right: 16px;
      &:hover {
        color: #305ab6;
      }
      &::after {
        content: "•";
        display: inline-block;
        color: $sky-800;
        font-size: 1rem;
        position: absolute;
        right: -15px;
        top: 60%;
        transform: translate(-50%, -50%);
      }
    }
    span {
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;
      color: #5b729380;
    }
  }
}
</style>