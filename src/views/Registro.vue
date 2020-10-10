<template>
    <div>
        <navbar></navbar>
        <Jogadas></Jogadas>
    </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import Jogadas from "@/components/registro_jugadas.vue";

export default {
    name: 'registro',
    components:{
        navbar,
        Jogadas
    }
}
</script>