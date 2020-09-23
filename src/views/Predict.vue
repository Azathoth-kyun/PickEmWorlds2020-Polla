<template>
    <div>
        <navbar></navbar>
        <predictcomp></predictcomp>
    </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import predictcomp from "@/components/predict_comp.vue";

export default {
    name: 'predict',
    components:{
        navbar,
        predictcomp
    }
}
</script>