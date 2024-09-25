<!-- Home.vue -->
<template>
  <div class="bg-custom relative h-[100vh]">
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-gray-800 opacity-50 flex justify-center items-center z-50"
    >
      <div class="loader"></div>
      <!-- Placeholder untuk animasi loader -->
    </div>

    <div class="flex flex-col justify-center py-11 md:py-24 w-full px-4 gap-2">
      <h1 class="pt-4 pb-2 md:pt-8 md:pb-4 text-center font-bold text-[24px]">
        To Do Kamu
      </h1>
      <div class="flex flex-col md:flex-row gap-4">
        <div
          class="bg-white rounded md:w-[500px] p-4 h-[100vh] overflow-y-auto hidden md:block"
        >
          <div class="grid grid-cols-3 items-center mb-4">
            <span class="text-gray-500 text-2xl text-right col-span-1"></span>
            <h1 class="text-gray-500 text-2xl text-center col-span-1">
              Form Isi
            </h1>
            <span class="text-gray-500 text-2xl text-right col-span-1">
              <span
                v-if="
                  form.title ||
                  form.description ||
                  form.date ||
                  form.id ||
                  form.img_url ||
                  form.location ||
                  form.public_id ||
                  form.user_id ||
                  imageUrl
                "
                @click="resetForm()"
                class="cursor-pointer"
                >&times;</span
              >
            </span>
          </div>

          <div>
            <form @submit.prevent="submitForm">
              <!-- File Upload dengan pratinjau -->
              <div class="relative w-40 h-40 mx-auto mb-4">
                <!-- Image Preview -->
                <div
                  class="absolute inset-0 flex justify-center items-center bg-gray-200 border border-gray-300 rounded-md overflow-hidden"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Pratinjau Gambar"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-gray-500 text-center"
                    >Klik untuk pilih gambar</span
                  >
                </div>
                <!-- File Input di atas Preview -->
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  @change="previewImage"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <!-- Judul -->
              <div class="mb-4">
                <label for="judul" class="block text-gray-700 font-medium"
                  >Judul</label
                >

                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Judul"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Deskripsi -->
              <div class="mb-4">
                <label for="deskripsi" class="block text-gray-700 font-medium"
                  >Deskripsi</label
                >
                <textarea
                  v-model="form.description"
                  id="deskripsi"
                  maxlength="75"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                  placeholder="Masukkan deskripsi"
                ></textarea>
              </div>

              <!-- Tempat -->
              <div class="mb-4">
                <label for="tempat" class="block text-gray-700 font-medium"
                  >Tempat</label
                >

                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Tempat"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Tanggal -->
              <div class="mb-4">
                <label for="tanggal" class="block text-gray-700 font-medium"
                  >Tanggal</label
                >

                <input
                  v-model="form.date"
                  type="date"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Tombol Submit -->
              <div class="text-center flex gap-2 flex-row justify-center">
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                <button
                  v-if="form.id !== ''"
                  type="button"
                  @click="handleDelete"
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Hapus
                </button>
              </div>
              <p
                v-if="errorMessage !== ''"
                @click="removeErrorText()"
                class="text-center text-[12px] cursor-pointer text-white font-bold bg-red-500 rounded mt-2 px-4"
              >
                <span>{{ errorMessage }} (Klik agar hilang)</span>
              </p>
            </form>
          </div>
        </div>

        <div
          v-if="todos.length === 0"
          class="bg-white text-gray-500 w-full flex justify-center items-center h-[100vh] overflow-y-auto p-2"
          @click="toggleModal"
        >
          <p>Data kosong...</p>
          <!-- Tampilkan pesan atau konten yang sesuai untuk data kosong -->
        </div>

        <div
          v-else
          class="bg-white w-full grid sm:grid-cols-2 grid-cols-1 gap-2 h-[100vh] overflow-y-auto p-2"
          @click="toggleModal"
        >
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="bg-slate-100 rounded shadow-md flex flex-col justify-between max-h-[300px]"
            @click="
              populateForm(
                todo.title,
                todo.place,
                todo.date,
                todo.img_url,
                todo.description,
                todo.id,
                todo.public_id,
                todo.user_id,
                todo.img_url
              )
            "
          >
            <div class="flex flex-col md:flex-col">
              <div class="rounded">
                <img
                  class="rounded w-full h-48 object-cover"
                  :src="todo.img_url"
                />
              </div>

              <div class="text-slate-400 p-2">
                <h1 class="font-bold">
                  {{ todo.title }} | {{ todo.place }} |
                  {{ formatDate(todo.date) }}
                </h1>
                <p>{{ todo.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>

      <!-- Plus Mobile -->
      <div class="fab-container flex md:hidden fixed bottom-4 right-4 z-50">
        <div
          class="fab bg-gray-500 backdrop-blur-md bg-opacity-70 p-4 rounded-full shadow-lg cursor-pointer"
          @click="toggleModal"
        >
          <span class="text-white text-[24px]">{{
            isModalAddActive ? "-" : "+"
          }}</span>
        </div>

        <!-- Modal Content - Only visible when the modal is active -->
      </div>

      <!-- modal content -->
      <div
        v-if="
          isModalAddActive ||
          form.title ||
          form.description ||
          form.date ||
          form.id ||
          form.img_url ||
          form.location ||
          form.public_id ||
          form.user_id ||
          imageUrl
        "
        class="md:modal md:hidden bg-gray-700 bg-opacity-70 absolute top-0 left-0 w-full h-full flex items-center justify-center z-40"
      >
        <!-- Add your modal content here -->
        <div
          v-if="
            isModalAddActive ||
            form.title ||
            form.description ||
            form.date ||
            form.id ||
            form.img_url ||
            form.location ||
            form.public_id ||
            form.user_id ||
            imageUrl
          "
          class="bg-white rounded md:w-[500px] p-4 h-[500px] overflow-y-auto block md:hidden"
        >
          <div class="grid grid-cols-3 items-center mb-4">
            <span class="text-gray-500 text-2xl text-right col-span-1"></span>
            <h1 class="text-gray-500 text-2xl text-center col-span-1">
              Form Isi
            </h1>
            <span class="text-gray-500 text-2xl text-right col-span-1">
              <span
                v-if="
                  form.title ||
                  form.description ||
                  form.date ||
                  form.id ||
                  form.img_url ||
                  form.location ||
                  form.public_id ||
                  form.user_id ||
                  imageUrl
                "
                @click="resetForm()"
                class="cursor-pointer"
                >&times;</span
              >
            </span>
          </div>

          <div>
            <form @submit.prevent="submitForm">
              <!-- File Upload dengan pratinjau -->
              <div class="relative w-40 h-40 mx-auto mb-4">
                <!-- Image Preview -->
                <div
                  class="absolute inset-0 flex justify-center items-center bg-gray-200 border border-gray-300 rounded-md overflow-hidden"
                >
                  <img
                    v-if="imageUrl"
                    :src="imageUrl"
                    alt="Pratinjau Gambar"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-gray-500 text-center"
                    >Klik untuk pilih gambar</span
                  >
                </div>
                <!-- File Input di atas Preview -->
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  @change="previewImage"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <!-- Judul -->
              <div class="mb-4">
                <label for="judul" class="block text-gray-700 font-medium"
                  >Judul</label
                >

                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Judul"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Deskripsi -->
              <div class="mb-4">
                <label for="deskripsi" class="block text-gray-700 font-medium"
                  >Deskripsi</label
                >
                <textarea
                  v-model="form.description"
                  id="deskripsi"
                  maxlength="75"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                  placeholder="Masukkan deskripsi"
                ></textarea>
              </div>

              <!-- Tempat -->
              <div class="mb-4">
                <label for="tempat" class="block text-gray-700 font-medium"
                  >Tempat</label
                >

                <input
                  v-model="form.location"
                  type="text"
                  placeholder="Tempat"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Tanggal -->
              <div class="mb-4">
                <label for="tanggal" class="block text-gray-700 font-medium"
                  >Tanggal</label
                >

                <input
                  v-model="form.date"
                  type="date"
                  class="border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md"
                />
              </div>

              <!-- Tombol Submit -->
              <div class="text-center flex gap-2 flex-row justify-center">
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                <button
                  v-if="form.id !== ''"
                  type="button"
                  @click="handleDelete"
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Hapus
                </button>
              </div>

              <p class="text-center text-white font-bold bg-red-500 rounded">
                {{ errorMessage }}
              </p>
            </form>
          </div>
        </div>
      </div>
      <!-- modal content -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./services";
import { useRouter } from "vue-router";
import { checkToken } from "../../utils/checkToken";
import { IApiResponse } from "../../interfaces/api";
import { IToDoDocument } from "../../interfaces/todo";

export default defineComponent({
  name: "Main",
  setup() {
    const errorMessage = ref<string>("");
    const isLoading = ref(false);
    const isModalAddActive = ref(false);
    const router = useRouter();
    const imageUrl = ref<string | null>(null);
    const form = ref({
      id: "",
      title: "",
      location: "",
      date: "",
      description: "",
      public_id: "",
      user_id: "",
      img_url: "",
    });

    const todos = ref<any[]>([]);

    const previewImage = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          imageUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    const populateForm = (
      title: string,
      location: string,
      date: string,
      imgSrc: string,
      description: string,
      id: string,
      public_id: string,
      user_id: string,
      img_url: string
    ) => {
      form.value.id = id;
      form.value.title = title;
      form.value.location = location;
      form.value.date = formatDateForInput(date);
      imageUrl.value = imgSrc;
      form.value.description = description;
      form.value.public_id = public_id;
      form.value.user_id = user_id;
      form.value.img_url = img_url;
    };

    const submitForm = async () => {
      isLoading.value = true;
      try {
        // jika tidak ada id (tambah data)
        if (form.value.id === "") {
          if (imageUrl.value !== null) {
            const response = await createTodo({
              date: form.value.date,
              description: form.value.description,
              img_url_new: imageUrl.value,
              place: form.value.location,
              title: form.value.title,
            });

            const data: IApiResponse<IToDoDocument> = response.data;

            if (data.token) {
              await checkToken(data.token);
            }

            todos.value.push({
              id: data.result.id, // Pastikan untuk mengambil ID yang dikembalikan oleh server
              title: form.value.title,
              place: form.value.location,
              date: form.value.date,
              img_url: data.result.img_url,
              description: form.value.description,
              public_id: data.result.public_id,
              user_id: data.result.user_id,
            });
          }
        }
        // Jika ada id
        else {
          // Mengambil hostname dari URL
          const urlObj = new URL(imageUrl.value as string); // Buat objek URL

          const input: IToDoDocument = {
            date: form.value.date,
            description: form.value.description,
            img_url: form.value.img_url,
            public_id: form.value.public_id,
            img_url_new: "",
            title: form.value.title,
            place: form.value.location,
            // user_id: form.value.user_id,
          };

          // image berubah
          if (urlObj.hostname !== "res.cloudinary.com") {
            input.img_url_new = imageUrl.value as string;
          }

          const response = await updateTodo(input, form.value.id);

          const data: IApiResponse<IToDoDocument> = response.data;

          if (data.token) {
            await checkToken(data.token);
          }

          const updatedTodoIndex = todos.value.findIndex(
            (todo) => todo.id === form.value.id
          );
          if (updatedTodoIndex !== -1) {
            todos.value[updatedTodoIndex] = {
              ...todos.value[updatedTodoIndex],
              ...input,
              img_url: data.result.img_url,
              public_id: data.result.public_id,
            };
          }
        }
        toggleModal();
        resetForm();
        isLoading.value = false;
      } catch (error: any) {
        isLoading.value = false;
        if (error?.response.data.status === "error_auth") {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          router.push("/login");
        }
        // errorMessage
        if (error?.response.data.status === "error") {
          errorMessage.value = error.response?.data?.message;
        }
      }
    };

    const fetchTodos = async () => {
      isLoading.value = true;
      try {
        const response = await getTodos();

        await checkToken(response.data.token);
        todos.value = response.data.result;
        isLoading.value = false;
      } catch (error: any) {
        isLoading.value = false;
        if (error?.response.data.status === "error_auth") {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          router.push("/login");
        }
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Format tanggal sesuai kebutuhan Anda
    };

    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Format menjadi YYYY-MM-DD
    };

    const resetForm = () => {
      form.value.id = "";
      form.value.title = "";
      form.value.location = "";
      form.value.date = "";
      form.value.description = "";
      form.value.public_id = "";
      form.value.img_url = "";
      form.value.user_id = "";
      imageUrl.value = null;
      toggleModal();
    };

    const toggleModal = () => {
      isModalAddActive.value = !isModalAddActive.value;
    };

    const handleDelete = async () => {
      isLoading.value = true;
      try {
        const response = await deleteTodo(form.value.id, form.value.public_id);

        await checkToken(response.data.token);

        todos.value = todos.value.filter((todo) => todo.id !== form.value.id);

        toggleModal();
        resetForm();
        isLoading.value = false;
      } catch (error: any) {
        isLoading.value = false;
        if (error?.response.data.status === "error_auth") {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          router.push("/login");
        }
      }
    };

    const removeErrorText = () => {
      errorMessage.value = "";
    };

    onMounted(() => {
      fetchTodos();
    });

    return {
      imageUrl,
      form,
      todos,
      isLoading,
      isModalAddActive,
      errorMessage,
      previewImage,
      populateForm,
      submitForm,
      formatDate,
      resetForm,
      toggleModal,
      handleDelete,
      removeErrorText,
    };
  },
});
</script>

<style scoped>
.bg-custom {
  background-image: url("./../../assets/image/bg-sea.jpg");
  background-size: cover; /* Mengatur gambar agar menutupi seluruh area */
  background-position: center; /* Memusatkan gambar */
  height: 100%;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* Atur sesuai kebutuhan */
}

input[type="file"] {
  cursor: pointer;
  opacity: 0;
}

.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Tombol Loading */
.loader-button {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  animation: spin-button 1s linear infinite;
}

@keyframes spin-button {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fab-container {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 999;
  cursor: pointer;
}

.fab {
  width: 60px;
  height: 60px;
  /* --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity)); */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
