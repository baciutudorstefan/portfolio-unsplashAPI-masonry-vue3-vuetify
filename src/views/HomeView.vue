<template>
  <v-container class="masonry pt-15" ref="masonryContainer">
    <div v-for="photo in photos" :key="photo.id" class="masonry-item">
      <img
        @click="openDialog(photo)"
        :src="photo.urls.small_s3"
        :alt="photo.alt_description"
        class="masonry-img"
      />
      <div>
        <div>
          <span class="d-flex flex-row justify-space-between pl-4 pr-4 pt-2">
            <span class="d-flex flex-column">
              <v-tooltip :text="photo.alt_description" location="bottom">
                <template v-slot:activator="{ props }">
                  <div class="truncated-text" v-bind="props">
                    {{ photo.alt_description }}
                  </div>
                </template>
              </v-tooltip>

              <v-card-subtitle class="pl-0">
                <span> {{ photo.user.location }} </span>
              </v-card-subtitle>
              <a
                class="pt-2"
                :href="photo.links.html"
                target="_blank"
                style="color: #189dfe"
                >view on Unsplash</a
              >
            </span>
            <span class="d-flex flex-column align-center">
              <v-icon color="red">mdi-heart-outline</v-icon>
              <p style="color: red">{{ photo.likes }}</p></span
            >
          </span>
        </div>
      </div>

      <span>
        <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
        </v-btn>
      </span>
    </div>
    <div class="fixed-footer pl-1">
      <v-col
        cols="9"
        style="background: #f8f8f8"
        class="footer d-flex flex-row align-center"
      >
        <v-col cols="10">
          <span class="text-h7"
            >Copyright © 2020. <br />Developed and maintained by Tudor
            Baciu</span
          >
        </v-col>
        <v-col cols="2" class="text-h7"
          ><a href="www.tudorbaciu.com">dev portfolio</a></v-col
        >
      </v-col>
    </div>
  </v-container>

  <v-dialog v-model="dialog" max-width="500" elevation="20">
    <v-img
      :src="selectedPhoto.urls.regular"
      :alt="selectedPhoto.alt_description"
      contain
    ></v-img>
  </v-dialog>

  <div v-if="error">
    <p>Error fetching data from Unsplash: {{ error }}</p>
  </div>
</template>

<style scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999; /* Set a higher z-index to ensure it appears above other elements */
}

.masonry {
  margin: 0; /* Reset margin to eliminate extra spaces */
}

.masonry-item {
  width: 222px;
}

.masonry-img {
  width: 100%;
  display: block;
  border-radius: 32px; /* Add border-radius for rounded corners */
}
.truncated-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
}
</style>

<script>
import axios from 'axios'
import Masonry from 'masonry-layout' // Import Masonry library

export default {
  components: {
    Masonry
  },
  data() {
    return {
      photos: [],
      error: null,
      dialog: false,
      selectedPhoto: null,
      page: 1,
      perPage: 15,
      masonryInstance: null
    }
  },
  mounted() {
    const unsplashUsername = 'baciutudor'
    this.fetchUserPhotos(unsplashUsername)
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    // Your existing beforeDestroy lifecycle hook
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    async fetchUserPhotos(username) {
      const accessKey = '4Mau2S04EAdvwDiuJhgjd8rQzCYP1ol5GvPZR5x0RGo'
      const apiUrl = `https://api.unsplash.com/users/${username}/photos`

      try {
        const response = await axios.get(apiUrl, {
          params: {
            client_id: accessKey,
            per_page: this.perPage,
            page: this.page
          }
        })

        this.photos = [...this.photos, ...response.data]
        console.log(this.photos)
        // Check if the masonryContainer is available before initializing Masonry
        if (this.$refs.masonryContainer) {
          this.$nextTick(this.initializeMasonry)
        }
      } catch (error) {
        this.error = error.message
      }
    },

    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.offsetHeight

      if (scrollPosition >= documentHeight - 100) {
        this.page++
        this.fetchUserPhotos('baciutudor')
      }
    },
    openDialog(photo) {
      this.selectedPhoto = photo
      this.dialog = true
    },
    initializeMasonry() {
      const masonryContainerProxy = this.$refs.masonryContainer
      const masonryContainer =
        masonryContainerProxy instanceof Element
          ? masonryContainerProxy
          : masonryContainerProxy.$el

      if (masonryContainer && typeof Masonry !== 'undefined') {
        this.masonryInstance = new Masonry(masonryContainer, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-item',
          gutter: 14 // Adjust the gap between items
        })

        // Now, explicitly trigger the layout after creating the instance
        this.$nextTick(() => {
          this.masonryInstance.layout()
        })
      }
    }
  }
}
</script>
