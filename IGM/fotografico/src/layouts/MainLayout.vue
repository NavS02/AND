<template>

    <main>
    <section class="layout" >
            
            <router-view />
        </section>
        </main>
   
</template>

<script>
</script>

<style scoped>
section {
    /* display: grid; */
    grid-template-rows: max-content auto;
    grid-template-columns: auto auto;
}

</style>