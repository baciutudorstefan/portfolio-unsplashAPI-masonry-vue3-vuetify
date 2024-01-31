<template>
  <v-row class="pl-3 header_row mb-15">
    <v-col cols="9">
      <v-row class="align-center">
        <img
          style="border-radius: 50px"
          src="https://images.unsplash.com/profile-1567275861860-86c622265a6bimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
          alt="logo"
          class="logo"
        />
        <div class="pl-5">
          <h3>TUDOR BACIU</h3>
          <a
            href="https://www.instagram.com/tbography/"
            target="_blank"
            style="text-decoration: none; color: black"
            >_photography</a
          >
        </div></v-row
      >
    </v-col>
    <v-col cols="3" class="align-self-center d-flex justify-end">
      <span>
        <a
          class="pr-9"
          target="blank"
          href="https://www.linkedin.com/in/tudor-%C5%9Ftefan-baciu/"
          ><v-icon color="black">mdi-linkedin</v-icon></a
        >
        <a
          class="pr-9"
          target="blank"
          href="https://www.instagram.com/tbography/"
        >
          <v-icon color="black">mdi-instagram</v-icon></a
        >
        <v-icon @click="redirectToEmail" color="black"
          >mdi-email-outline</v-icon
        >
      </span>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="7">
      <span class="text-h4 bold text-h3"> Hello I’m Tudor Baciu. </span><br />
      UI developer based in Iasi, Romania with a passion for photography. I’ve
      created this portfolio to better show off my photography skills.</v-col
    >
  </v-row>
</template>

<script>
export default {
  methods: {
    redirectToEmail() {
      // Replace 'your@email.com' with the actual email address
      window.location.href = 'mailto:hello@tudorbaciu.com'
    }
  }
}
</script>

<style>
.header_row {
  height: 70px;
}
.logo {
  height: 70px;
  width: 70px;
}
</style>
