<template>
  <div class="container">
    <div class="sidebar">
      <h1 class="title">Filter Results</h1>
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Enter the name of your favourite game"
        />
      </div>
      <div>
        <label for="score">Minimum Score</label>
        <input
          type="number"
          v-model="score"
          min="1"
          max="10"
          placeholder="Allowed range: 1 - 10"
        />
      </div>
      <div class="order-box">
        <label for="order">Order By</label>
        <div>
          <div class="icon-box" v-if="up" @click="toggleOrder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              />
            </svg>
          </div>
          <div class="icon-box" v-else @click="toggleOrder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
              />
            </svg>
          </div>
          <select v-model="order" class="text-gray">
            <option v-for="order in orders" :key="order" :value="order.val">
              {{ order.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="button-clear-box">
        <button @click="clear" class="clear">Clear</button>
      </div>
    </div>
    <div>
      <template v-if="filteredGames.length">
        <div v-for="(game, index) in filteredGames" :key="index" class="card">
          <div class="body">
            <h1 class="title">{{ game.title }}</h1>
            <p class="text-gray">{{ game.date }}</p>
            <p class="text-gray">{{ game.detail }}</p>
          </div>
          <div class="score-box">
            <div class="score">
              {{ game.score }}
            </div>
          </div>
        </div>
      </template>
      <div v-else-if="isLoading" class="loading-box">
        <p>Loading your favourite games, please wait...</p>
        <progress></progress>
      </div>
      <div v-else class="no-game-box">
        <p>No games to load or check your connection!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import api from "../api/games";

export default {
  setup() {
    const games = ref([]);
    const isLoading = ref(false);
    const name = ref("");
    const score = ref(0);
    const order = ref("date");
    const up = ref(false);
    const orders = ref([
      {
        text: "Date",
        val: "date",
      },
      {
        text: "Score",
        val: "score",
      },
      {
        text: "Name",
        val: "name",
      },
    ]);

    onMounted(async () => {
      isLoading.value = true;

      getGames
        .then((data) => {
          games.value = data;
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err.message);
        });

      // getGames();
    });

    watch(order, () => {
      flowDown();

      up.value = false;
    });

    watch(up, () => {
      if (up.value) {
        flowDown();
      } else {
        flowUp();
      }
    });

    const filteredGames = computed(() =>
      games.value.filter((game) =>
        name.value.length
          ? game.title
              .toString()
              .toLowerCase()
              .includes(name.value.toString().toLowerCase())
          : score.value
          ? game.score
              .toString()
              .toLowerCase()
              .includes(score.value.toString().toLowerCase())
          : games.value
      )
    );

    const getGames = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api);
      }, 3000);
    });

    /*
      Note: The end-point "https://shorturl.at/ghlpK" was not accessible,
    */
    /*Test case 1*/
    // const getGames = () =>
    //   fetch("https://shorturl.at/ghlpK", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       games.value = data;
    //       isLoading.value = false;
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });

    /*Test case 2*/
    // const getGames = () => {
    //   axios
    //     .get("https://shorturl.at/ghlpK")
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err.message));
    // };

    const flowDown = () => {
      if (order.value === "name") {
        games.value.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
      }

      if (order.value === "score") {
        games.value.sort((a, b) =>
          a.score > b.score ? 1 : b.score > a.score ? -1 : 0
        );
      }

      if (order.value === "date") {
        games.value.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        );
      }
    };

    const flowUp = () => {
      if (order.value === "name") {
        games.value.sort((a, b) =>
          a.title < b.title ? 1 : b.title < a.title ? -1 : 0
        );
      }

      if (order.value === "score") {
        games.value.sort((a, b) =>
          a.score < b.score ? 1 : b.score < a.score ? -1 : 0
        );
      }

      if (order.value === "date") {
        games.value.sort((a, b) =>
          a.date < b.date ? 1 : b.date < a.date ? -1 : 0
        );
      }
    };

    const clear = () => {
      order.value = "date";
      name.value = "";
      score.value = 0;
    };

    const toggleOrder = () => {
      up.value = !up.value;
    };

    return {
      filteredGames,
      isLoading,
      name,
      score,
      order,
      orders,
      up,
      clear,
      toggleOrder,
    };
  },
};
</script>
