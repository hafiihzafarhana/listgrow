<template>
  <!-- Main Navigation -->
  <nav
    class="bg-gray-500 hidden md:flex backdrop-blur-md bg-opacity-70 fixed top-0 left-0 right-0 shadow-md z-50 items-center justify-between my-5 mx-10 p-4 px-8 rounded-full"
  >
    <div class="flex justify-center items-center">
      <h2 class="h2-title">List Grow</h2>
    </div>
    <ul class="nav-menu flex items-center list-none gap-4 text-lg">
      <li>
        <router-link
          :class="[
            'hover:text-gray-400 cursor-pointer',
            { 'text-gray-400': isHome },
            { 'text-white': !isHome },
          ]"
          :to="homeLink"
          >Beranda</router-link
        >
      </li>

      <li v-if="isAuthenticated" class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
          @click="toggleDropdown"
          class="cursor-pointer"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0"
          />
        </svg>

        <!-- Dropdown muncul saat ikon diklik -->
        <div
          v-if="isDropdownVisible"
          class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md text-gray-500"
        >
          <ul>
            <li
              class="p-2 hover:bg-gray-100 cursor-pointer hover:rounded-lg flex flex-row text-[14px] justify-between items-center"
              @click="logout"
            >
              <span>Logout</span>
              <Icon class="text-[2em]" icon="solar:logout-bold-duotone" />
            </li>
          </ul>
        </div>
      </li>

      <!-- Tampilkan tombol Login jika tidak ada token -->
      <li v-if="!isAuthenticated">
        <router-link
          :class="[
            'hover:text-gray-400 cursor-pointer',
            { 'text-gray-400': isLogin },
            { 'text-white': !isLogin },
          ]"
          to="/login"
          >Login</router-link
        >
      </li>
    </ul>
  </nav>

  <!-- Sidebar for small screens -->
  <div
    class="fixed top-0 left-0 right-0 md:hidden z-50 bg-gray-500 p-4 flex items-center justify-between backdrop-blur-md bg-opacity-70"
  >
    <h2 class="text-white text-2xl font-bold">List Grow</h2>
    <button
      @click="toggleSidebar"
      class="text-white text-3xl focus:outline-none"
    >
      <Icon icon="mdi:menu" />
    </button>
  </div>

  <!-- Sidebar Drawer -->
  <div
    v-if="isSidebarVisible"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="toggleSidebar"
  >
    <div class="bg-white w-64 h-full p-4 shadow-lg z-50 mt-[64px]" @click.stop>
      <button class="text-gray-500 text-2xl mb-6" @click="toggleSidebar">
        &times;
      </button>
      <ul class="list-none text-gray-500">
        <li class="mb-4">
          <router-link
            :class="[
              'block hover:text-gray-400 cursor-pointer',
              { 'text-gray-400': isHome },
              { 'text-black': !isHome },
            ]"
            :to="homeLink"
            @click="toggleSidebar"
            >Beranda</router-link
          >
        </li>
        <li class="cursor-pointer" v-if="isAuthenticated" @click="logout">
          Logout
        </li>

        <li v-if="!isAuthenticated" class="mb-4">
          <router-link
            :class="[
              'block hover:text-gray-400 cursor-pointer',
              { 'text-gray-400': isLogin },
              { 'text-black': !isLogin },
            ]"
            to="/login"
            @click="toggleSidebar"
            >Login</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

export default {
  name: "Navbar",
  components: {
    Icon,
  },
  setup() {
    const isDropdownVisible = ref(false);
    const isSidebarVisible = ref(false); // New state for sidebar visibility
    const route = useRoute();
    const router = useRouter();

    const isAuthenticated = ref(!!localStorage.getItem("token"));

    const homeLink = computed(() => {
      return isAuthenticated.value ? "/main" : "/";
    });

    const isHome = computed(() => {
      return route.path === "/" || route.path === "/main";
    });

    const isLogin = computed(() => {
      return route.path === "/login";
    });

    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    const toggleSidebar = () => {
      isSidebarVisible.value = !isSidebarVisible.value;
    };

    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        isDropdownVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const logout = () => {
      localStorage.removeItem("token");
      isDropdownVisible.value = false;
      isAuthenticated.value = false;
      toggleSidebar();
      router.push("/login");
    };

    watch(
      () => route.path,
      () => {
        isAuthenticated.value = !!localStorage.getItem("token");
      }
    );

    return {
      isHome,
      isLogin,
      homeLink,
      isAuthenticated,
      isDropdownVisible,
      toggleDropdown,
      toggleSidebar,
      isSidebarVisible,
      logout,
    };
  },
};
</script>

<style scoped>
.h2-title {
  font-weight: 700;
  position: relative;
  font-size: 2em;
  color: #fff;
}
</style>
