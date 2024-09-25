<!-- Home.vue -->
<template>
  <div class="flex justify-center px-4 h-screen items-center bg-custom">
    <div
      class="md:w-[50%] w-full rounded flex flex-col p-4 gap-y-4 shadow-md shadow-gray-600"
    >
      <h1 class="text-center text-shadow font-bold text-[24px]">Login</h1>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-y-2">
        <div class="flex flex-col gap-y-2">
          <span class="font-bold text-shadow">Email</span>
          <input
            type="email"
            v-model="formData.email"
            placeholder="Masukkan email..."
            class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
            required
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <span class="font-bold text-shadow">Password</span>
          <input
            type="password"
            v-model="formData.password"
            placeholder="Masukkan password..."
            class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-gray-400 text-white p-2 rounded hover:text-white hover:bg-gray-500"
        >
          Login
        </button>
      </form>
      <p class="text-center font-bold text-shadow">
        Belum punya akun?
        <span class="text-blue-200"
          ><router-link to="/register">Belum</router-link></span
        >
      </p>
      <p class="text-center text-white font-bold bg-red-500 rounded">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import apiClient from "./../../api/index";
import { IApiResponse } from "../../interfaces/api";
import { IUserDocument } from "../../interfaces/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const formData = ref({
      email: "",
      password: "",
    });

    const errorMessage = ref<string>("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await apiClient.post("/users/sign-in", formData.value);

        const data: IApiResponse<IUserDocument> = response.data;

        if (data.result.email || data.result.name || data.token) {
          data.token;
          localStorage.setItem("email", data.result.email ?? "");
          localStorage.setItem("name", data.result.name ?? "");
          localStorage.setItem("token", data.token ?? "");
        }

        errorMessage.value = "";

        // Reset form after successful registration
        formData.value.email = "";
        formData.value.password = "";
        router.push("/main");
      } catch (error: any) {
        errorMessage.value = "E-mail Belum Terdaftar";
      }
    };

    return {
      formData,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.bg-custom {
  background-image: url("./../../assets/image/bg-nature.jpg");
  background-size: cover; /* Mengatur gambar agar menutupi seluruh area */
  background-position: center; /* Memusatkan gambar */
  height: 100vh;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* Atur sesuai kebutuhan */
}
</style>
