import { defineComponent, ref } from "vue";
import apiClient from "./../../api/index";
import { useRouter } from "vue-router";
export default defineComponent({
    name: "Login",
    setup() {
        const formData = ref({
            email: "",
            password: "",
        });
        const errorMessage = ref("");
        const router = useRouter();
        const handleLogin = async () => {
            try {
                const response = await apiClient.post("/users/sign-in", formData.value);
                const data = response.data;
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
            }
            catch (error) {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center px-4 h-screen items-center bg-custom") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("md:w-[50%] w-full rounded flex flex-col p-4 gap-y-4 shadow-md shadow-gray-600") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-center text-shadow font-bold text-[24px]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleLogin) }, ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-bold text-shadow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("email"), placeholder: ("Masukkan email..."), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, required: (true), });
    (__VLS_ctx.formData.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-bold text-shadow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("password"), placeholder: ("Masukkan password..."), ...{ class: ("border text-gray-500 bg-white border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 shadow-md") }, required: (true), });
    (__VLS_ctx.formData.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("bg-gray-400 text-white p-2 rounded hover:text-white hover:bg-gray-500") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center font-bold text-shadow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-blue-200") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/register"), }));
    const __VLS_2 = __VLS_1({ to: ("/register"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-center text-white font-bold bg-red-500 rounded") }, });
    (__VLS_ctx.errorMessage);
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['bg-custom'];
    __VLS_styleScopedClasses['md:w-[50%]'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['gap-y-4'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['shadow-gray-600'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-shadow'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-[24px]'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-shadow'];
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
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-y-2'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-shadow'];
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
    __VLS_styleScopedClasses['bg-gray-400'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['hover:text-white'];
    __VLS_styleScopedClasses['hover:bg-gray-500'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-shadow'];
    __VLS_styleScopedClasses['text-blue-200'];
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
