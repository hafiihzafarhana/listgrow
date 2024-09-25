import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
export default (await import('vue')).defineComponent({
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
        const handleClickOutside = (event) => {
            const target = event.target;
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
        watch(() => route.path, () => {
            isAuthenticated.value = !!localStorage.getItem("token");
        });
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
});
;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            Icon,
        },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("bg-gray-500 hidden md:flex backdrop-blur-md bg-opacity-70 fixed top-0 left-0 right-0 shadow-md z-50 items-center justify-between my-5 mx-10 p-4 px-8 rounded-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("h2-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("nav-menu flex items-center list-none gap-4 text-lg") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: (([
                'hover:text-gray-400 cursor-pointer',
                { 'text-gray-400': __VLS_ctx.isHome },
                { 'text-white': !__VLS_ctx.isHome },
            ])) }, to: ((__VLS_ctx.homeLink)), }));
    const __VLS_2 = __VLS_1({ ...{ class: (([
                'hover:text-gray-400 cursor-pointer',
                { 'text-gray-400': __VLS_ctx.isHome },
                { 'text-white': !__VLS_ctx.isHome },
            ])) }, to: ((__VLS_ctx.homeLink)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (__VLS_ctx.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("relative") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ ...{ onClick: (__VLS_ctx.toggleDropdown) }, xmlns: ("http://www.w3.org/2000/svg"), width: ("1.5em"), height: ("1.5em"), viewBox: ("0 0 24 24"), ...{ class: ("cursor-pointer") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ fill: ("none"), stroke: ("currentColor"), "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("1.5"), d: ("M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0"), });
        if (__VLS_ctx.isDropdownVisible) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md text-gray-500") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (__VLS_ctx.logout) }, ...{ class: ("p-2 hover:bg-gray-100 cursor-pointer hover:rounded-lg flex flex-row text-[14px] justify-between items-center") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.Icon;
            /** @type { [typeof __VLS_components.Icon, ] } */
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("text-[2em]") }, icon: ("solar:logout-bold-duotone"), }));
            const __VLS_8 = __VLS_7({ ...{ class: ("text-[2em]") }, icon: ("solar:logout-bold-duotone"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        }
    }
    if (!__VLS_ctx.isAuthenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: (([
                    'hover:text-gray-400 cursor-pointer',
                    { 'text-gray-400': __VLS_ctx.isLogin },
                    { 'text-white': !__VLS_ctx.isLogin },
                ])) }, to: ("/login"), }));
        const __VLS_14 = __VLS_13({ ...{ class: (([
                    'hover:text-gray-400 cursor-pointer',
                    { 'text-gray-400': __VLS_ctx.isLogin },
                    { 'text-white': !__VLS_ctx.isLogin },
                ])) }, to: ("/login"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_nonNullable(__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed top-0 left-0 right-0 md:hidden z-50 bg-gray-500 p-4 flex items-center justify-between backdrop-blur-md bg-opacity-70") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-white text-2xl font-bold") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleSidebar) }, ...{ class: ("text-white text-3xl focus:outline-none") }, });
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.Icon;
    /** @type { [typeof __VLS_components.Icon, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ icon: ("mdi:menu"), }));
    const __VLS_20 = __VLS_19({ icon: ("mdi:menu"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    if (__VLS_ctx.isSidebarVisible) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.toggleSidebar) }, ...{ class: ("fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: () => { } }, ...{ class: ("bg-white w-64 h-full p-4 shadow-lg z-50 mt-[64px]") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleSidebar) }, ...{ class: ("text-gray-500 text-2xl mb-6") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("list-none text-gray-500") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("mb-4") }, });
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, ...{ class: (([
                    'block hover:text-gray-400 cursor-pointer',
                    { 'text-gray-400': __VLS_ctx.isHome },
                    { 'text-black': !__VLS_ctx.isHome },
                ])) }, to: ((__VLS_ctx.homeLink)), }));
        const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, ...{ class: (([
                    'block hover:text-gray-400 cursor-pointer',
                    { 'text-gray-400': __VLS_ctx.isHome },
                    { 'text-black': !__VLS_ctx.isHome },
                ])) }, to: ((__VLS_ctx.homeLink)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_30;
        const __VLS_31 = {
            onClick: (__VLS_ctx.toggleSidebar)
        };
        let __VLS_27;
        let __VLS_28;
        __VLS_nonNullable(__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
        if (__VLS_ctx.isAuthenticated) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (__VLS_ctx.logout) }, ...{ class: ("cursor-pointer") }, });
        }
        if (!__VLS_ctx.isAuthenticated) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("mb-4") }, });
            const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ ...{ 'onClick': {} }, ...{ class: (([
                        'block hover:text-gray-400 cursor-pointer',
                        { 'text-gray-400': __VLS_ctx.isLogin },
                        { 'text-black': !__VLS_ctx.isLogin },
                    ])) }, to: ("/login"), }));
            const __VLS_34 = __VLS_33({ ...{ 'onClick': {} }, ...{ class: (([
                        'block hover:text-gray-400 cursor-pointer',
                        { 'text-gray-400': __VLS_ctx.isLogin },
                        { 'text-black': !__VLS_ctx.isLogin },
                    ])) }, to: ("/login"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            let __VLS_38;
            const __VLS_39 = {
                onClick: (__VLS_ctx.toggleSidebar)
            };
            let __VLS_35;
            let __VLS_36;
            __VLS_nonNullable(__VLS_37.slots).default;
            const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
        }
    }
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['hidden'];
    __VLS_styleScopedClasses['md:flex'];
    __VLS_styleScopedClasses['backdrop-blur-md'];
    __VLS_styleScopedClasses['bg-opacity-70'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['my-5'];
    __VLS_styleScopedClasses['mx-10'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['h2-title'];
    __VLS_styleScopedClasses['nav-menu'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['list-none'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['hover:text-gray-400'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['w-48'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['hover:rounded-lg'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-row'];
    __VLS_styleScopedClasses['text-[14px]'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-[2em]'];
    __VLS_styleScopedClasses['hover:text-gray-400'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['md:hidden'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['bg-gray-500'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['backdrop-blur-md'];
    __VLS_styleScopedClasses['bg-opacity-70'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-black'];
    __VLS_styleScopedClasses['bg-opacity-50'];
    __VLS_styleScopedClasses['z-40'];
    __VLS_styleScopedClasses['md:hidden'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['mt-[64px]'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['list-none'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['hover:text-gray-400'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-black'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['hover:text-gray-400'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-black'];
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
