import { defineComponent, onMounted, ref } from "vue";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./services";
import { useRouter } from "vue-router";
import { checkToken } from "../../utils/checkToken";
export default defineComponent({
    name: "Main",
    setup() {
        const errorMessage = ref("");
        const isLoading = ref(false);
        const isModalAddActive = ref(false);
        const router = useRouter();
        const imageUrl = ref(null);
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
        const todos = ref([]);
        const previewImage = (event) => {
            const input = event.target;
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imageUrl.value = e.target?.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        };
        const populateForm = (title, location, date, imgSrc, description, id, public_id, user_id, img_url) => {
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
                        const data = response.data;
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
                    const urlObj = new URL(imageUrl.value); // Buat objek URL
                    const input = {
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
                        input.img_url_new = imageUrl.value;
                    }
                    const response = await updateTodo(input, form.value.id);
                    const data = response.data;
                    if (data.token) {
                        await checkToken(data.token);
                    }
                    const updatedTodoIndex = todos.value.findIndex((todo) => todo.id === form.value.id);
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
            }
            catch (error) {
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
            }
            catch (error) {
                isLoading.value = false;
                if (error?.response.data.status === "error_auth") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    localStorage.removeItem("name");
                    router.push("/login");
                }
            }
        };
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString(); // Format tanggal sesuai kebutuhan Anda
        };
        const formatDateForInput = (dateString) => {
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
            }
            catch (error) {
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
;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-custom relative h-[100vh]") }, });
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-gray-800 opacity-50 flex justify-center items-center z-50") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loader") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col justify-center py-11 md:py-24 w-full px-4 gap-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("pt-4 pb-2 md:pt-8 md:pb-4 text-center font-bold text-[24px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col md:flex-row gap-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded md:w-[500px] p-4 h-[100vh] overflow-y-auto hidden md:block") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-3 items-center mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-2xl text-right col-span-1") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-gray-500 text-2xl text-center col-span-1") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-2xl text-right col-span-1") }, });
    if (__VLS_ctx.form.title ||
        __VLS_ctx.form.description ||
        __VLS_ctx.form.date ||
        __VLS_ctx.form.id ||
        __VLS_ctx.form.img_url ||
        __VLS_ctx.form.location ||
        __VLS_ctx.form.public_id ||
        __VLS_ctx.form.user_id ||
        __VLS_ctx.imageUrl) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.form.title ||
                        __VLS_ctx.form.description ||
                        __VLS_ctx.form.date ||
                        __VLS_ctx.form.id ||
                        __VLS_ctx.form.img_url ||
                        __VLS_ctx.form.location ||
                        __VLS_ctx.form.public_id ||
                        __VLS_ctx.form.user_id ||
                        __VLS_ctx.imageUrl)))
                        return;
                    __VLS_ctx.resetForm();
                } }, ...{ class: ("cursor-pointer") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitForm) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative w-40 h-40 mx-auto mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 flex justify-center items-center bg-gray-200 border border-gray-300 rounded-md overflow-hidden") }, });
    if (__VLS_ctx.imageUrl) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imageUrl)), alt: ("Pratinjau Gambar"), ...{ class: ("w-full h-full object-cover") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-center") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.previewImage) }, type: ("file"), id: ("imageUpload"), accept: ("image/*"), ...{ class: ("absolute inset-0 w-full h-full opacity-0 cursor-pointer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("judul"), ...{ class: ("block text-gray-700 font-medium") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.form.title)), type: ("text"), placeholder: ("Judul"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("deskripsi"), ...{ class: ("block text-gray-700 font-medium") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.form.description)), id: ("deskripsi"), maxlength: ("75"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, placeholder: ("Masukkan deskripsi"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("tempat"), ...{ class: ("block text-gray-700 font-medium") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.form.location)), type: ("text"), placeholder: ("Tempat"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("tanggal"), ...{ class: ("block text-gray-700 font-medium") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
    (__VLS_ctx.form.date);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center flex gap-2 flex-row justify-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500") }, });
    if (__VLS_ctx.form.id !== '') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleDelete) }, type: ("button"), ...{ class: ("px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500") }, });
    }
    if (__VLS_ctx.errorMessage !== '') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.errorMessage !== '')))
                        return;
                    __VLS_ctx.removeErrorText();
                } }, ...{ class: ("text-center text-[12px] cursor-pointer text-white font-bold bg-red-500 rounded mt-2 px-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.errorMessage);
    }
    if (__VLS_ctx.todos.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleModal) }, ...{ class: ("bg-white text-gray-500 w-full flex justify-center items-center h-[100vh] overflow-y-auto p-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleModal) }, ...{ class: ("bg-white w-full grid sm:grid-cols-2 grid-cols-1 gap-2 h-[100vh] overflow-y-auto p-2") }, });
        for (const [todo] of __VLS_getVForSourceType((__VLS_ctx.todos))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.todos.length === 0))))
                            return;
                        __VLS_ctx.populateForm(todo.title, todo.place, todo.date, todo.img_url, todo.description, todo.id, todo.public_id, todo.user_id, todo.img_url);
                    } }, key: ((todo.id)), ...{ class: ("bg-slate-100 rounded shadow-md flex flex-col justify-between max-h-[300px]") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col md:flex-col") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ ...{ class: ("rounded w-full h-48 object-cover") }, src: ((todo.img_url)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-slate-400 p-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("font-bold") }, });
            (todo.title);
            (todo.place);
            (__VLS_ctx.formatDate(todo.date));
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (todo.description);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fab-container flex md:hidden fixed bottom-4 right-4 z-50") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleModal) }, ...{ class: ("fab bg-gray-500 backdrop-blur-md bg-opacity-70 p-4 rounded-full shadow-lg cursor-pointer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-white text-[24px]") }, });
    (__VLS_ctx.isModalAddActive ? "-" : "+");
    if (__VLS_ctx.isModalAddActive ||
        __VLS_ctx.form.title ||
        __VLS_ctx.form.description ||
        __VLS_ctx.form.date ||
        __VLS_ctx.form.id ||
        __VLS_ctx.form.img_url ||
        __VLS_ctx.form.location ||
        __VLS_ctx.form.public_id ||
        __VLS_ctx.form.user_id ||
        __VLS_ctx.imageUrl) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("md:modal md:hidden bg-gray-700 bg-opacity-70 absolute top-0 left-0 w-full h-full flex items-center justify-center z-40") }, });
        if (__VLS_ctx.isModalAddActive ||
            __VLS_ctx.form.title ||
            __VLS_ctx.form.description ||
            __VLS_ctx.form.date ||
            __VLS_ctx.form.id ||
            __VLS_ctx.form.img_url ||
            __VLS_ctx.form.location ||
            __VLS_ctx.form.public_id ||
            __VLS_ctx.form.user_id ||
            __VLS_ctx.imageUrl) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded md:w-[500px] p-4 h-[500px] overflow-y-auto block md:hidden") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-3 items-center mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-2xl text-right col-span-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-gray-500 text-2xl text-center col-span-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-2xl text-right col-span-1") }, });
            if (__VLS_ctx.form.title ||
                __VLS_ctx.form.description ||
                __VLS_ctx.form.date ||
                __VLS_ctx.form.id ||
                __VLS_ctx.form.img_url ||
                __VLS_ctx.form.location ||
                __VLS_ctx.form.public_id ||
                __VLS_ctx.form.user_id ||
                __VLS_ctx.imageUrl) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ onClick: (...[$event]) => {
                            if (!((__VLS_ctx.isModalAddActive ||
                                __VLS_ctx.form.title ||
                                __VLS_ctx.form.description ||
                                __VLS_ctx.form.date ||
                                __VLS_ctx.form.id ||
                                __VLS_ctx.form.img_url ||
                                __VLS_ctx.form.location ||
                                __VLS_ctx.form.public_id ||
                                __VLS_ctx.form.user_id ||
                                __VLS_ctx.imageUrl)))
                                return;
                            if (!((__VLS_ctx.isModalAddActive ||
                                __VLS_ctx.form.title ||
                                __VLS_ctx.form.description ||
                                __VLS_ctx.form.date ||
                                __VLS_ctx.form.id ||
                                __VLS_ctx.form.img_url ||
                                __VLS_ctx.form.location ||
                                __VLS_ctx.form.public_id ||
                                __VLS_ctx.form.user_id ||
                                __VLS_ctx.imageUrl)))
                                return;
                            if (!((__VLS_ctx.form.title ||
                                __VLS_ctx.form.description ||
                                __VLS_ctx.form.date ||
                                __VLS_ctx.form.id ||
                                __VLS_ctx.form.img_url ||
                                __VLS_ctx.form.location ||
                                __VLS_ctx.form.public_id ||
                                __VLS_ctx.form.user_id ||
                                __VLS_ctx.imageUrl)))
                                return;
                            __VLS_ctx.resetForm();
                        } }, ...{ class: ("cursor-pointer") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitForm) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative w-40 h-40 mx-auto mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 flex justify-center items-center bg-gray-200 border border-gray-300 rounded-md overflow-hidden") }, });
            if (__VLS_ctx.imageUrl) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.imageUrl)), alt: ("Pratinjau Gambar"), ...{ class: ("w-full h-full object-cover") }, });
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-500 text-center") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.previewImage) }, type: ("file"), id: ("imageUpload"), accept: ("image/*"), ...{ class: ("absolute inset-0 w-full h-full opacity-0 cursor-pointer") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("judul"), ...{ class: ("block text-gray-700 font-medium") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.form.title)), type: ("text"), placeholder: ("Judul"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("deskripsi"), ...{ class: ("block text-gray-700 font-medium") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.form.description)), id: ("deskripsi"), maxlength: ("75"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, placeholder: ("Masukkan deskripsi"), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("tempat"), ...{ class: ("block text-gray-700 font-medium") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.form.location)), type: ("text"), placeholder: ("Tempat"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("tanggal"), ...{ class: ("block text-gray-700 font-medium") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, });
            (__VLS_ctx.form.date);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center flex gap-2 flex-row justify-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500") }, });
            if (__VLS_ctx.form.id !== '') {
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleDelete) }, type: ("button"), ...{ class: ("px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center text-white font-bold bg-red-500 rounded") }, });
            (__VLS_ctx.errorMessage);
        }
    }
    __VLS_styleScopedClasses['bg-custom'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['h-[100vh]'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['loader'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['py-11'];
    __VLS_styleScopedClasses['md:py-24'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['pt-4'];
    __VLS_styleScopedClasses['pb-2'];
    __VLS_styleScopedClasses['md:pt-8'];
    __VLS_styleScopedClasses['md:pb-4'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['md:flex-row'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['md:w-[500px]'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['h-[100vh]'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['hidden'];
    __VLS_styleScopedClasses['md:block'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-3'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-right'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-right'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['w-40'];
    __VLS_styleScopedClasses['h-40'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['bg-gray-200'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['opacity-0'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-red-600'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-red-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-[12px]'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['h-[100vh]'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['sm:grid-cols-2'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['h-[100vh]'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['bg-slate-100'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['max-h-[300px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['md:flex-col'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-48'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['text-slate-400'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['fab-container'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['md:hidden'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['bottom-4'];
    __VLS_styleScopedClasses['right-4'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['fab'];
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['backdrop-blur-md'];
    __VLS_styleScopedClasses['bg-opacity-70'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['md:modal'];
    __VLS_styleScopedClasses['md:hidden'];
    __VLS_styleScopedClasses['bg-gray-700'];
    __VLS_styleScopedClasses['bg-opacity-70'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['z-40'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['md:w-[500px]'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['h-[500px]'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['md:hidden'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-3'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-right'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['text-right'];
    __VLS_styleScopedClasses['col-span-1'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['w-40'];
    __VLS_styleScopedClasses['h-40'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['bg-gray-200'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['opacity-0'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-gray-300'];
    __VLS_styleScopedClasses['focus:border-transparent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-blue-500'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['hover:bg-red-600'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-red-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['rounded'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
let __VLS_self;
