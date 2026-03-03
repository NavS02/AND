<template>

    <main>
        <div class="container">
    
          <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <br>
            <h2>La pagina che stai cercando non esiste.</h2>
            
            <router-link class="btn" :to="{name: 'home'}">Tornare a casa</router-link>
            <img src="/not-found.svg" class="img-fluid py-5" alt="Page Not Found">
            <div class="credits">
              Progettato da <a href="https://www.ambientinarratividigitali.it/" target="_blank">And Srl</a>
            </div>
          </section>
    
        </div>
      </main>
</template>

<script>

export default {
    setup () {

    }
}
</script>

<style scoped>

</style>