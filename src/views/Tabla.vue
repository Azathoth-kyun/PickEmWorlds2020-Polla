<template>
    <div>
        <navbar></navbar>
        <tablapos></tablapos>
    </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import tablapos from "@/components/tabla_pos.vue";

export default {
    name: 'tabla',
    components: {
        navbar,
        tablapos
    }
};
</script>