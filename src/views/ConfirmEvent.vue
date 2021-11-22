<template>
  <div class="container">
    <div class="confirm">
      <h1 class="confirm__title title">Шаг 2</h1>
      <div class="confirm__wrapper">
        <div class="warning">
          <span class="warning__icon"></span>
          <span class="warning__text">
            Проверьте ваше мероприятие на наличие ошибок,
            если все в порядке - отправляйте на модерацию.
          </span>
        </div>
        <!-- .warning -->
        <template v-if="isDataFill">
          <div class="confirm__content">
            <div class="confirm__content-left">
              <div class="confirm__content-header">
                <span class="confirm__content-header-icon">{{ getData.data.currentRating }}</span>
                <div
                  class="confirm__content-header-text"
                  :title="getData.data.name"
                >
                  {{ getData.data.name }}
                </div>
              </div>
              <div class="confirm__content-info">
                <ul class="confirm__content-location-list">
                  <li
                    class="
                      confirm__content-location-list-item
                      confirm__content-location-list-item--geo
                    "
                  >
                    г. {{ getData.data.city }}, {{ getData.data.address }}
                  </li>
                  <li
                    class="
                      confirm__content-location-list-item
                      confirm__content-location-list-item--calendar
                    "
                  >
                    <span
                      v-for="(date, index) in getData.data.dates"
                      :key="index"
                    >
                      <template v-if="getData.data.dates.length - 1 === index">
                        {{ convertedDate(date.startDate) }}
                      </template>
                      <template v-else>{{ convertedDate(date.startDate) }}, </template>
                    </span>
                  </li>
                  <li
                    class="
                      confirm__content-location-list-item
                      confirm__content-location-list-item--clock
                    "
                  >
                    <span
                      v-for="(date, index) in getData.data.dates"
                      :key="index"
                    >
                      <template v-if="getData.data.dates.length - 1 === index">
                        {{ date.startTime }}
                      </template>
                      <template v-else>{{ date.startTime }}, </template>
                    </span>
                  </li>
                </ul>
                <div class="confirm__content-contact">
                  <h3 class="confirm__content-contact-title">Контакты</h3>
                  <ul class="confirm__content-contact-list">
                    <li
                      class="
                        confirm__content-contact-list-item
                        confirm__content-contact-list-item--phone
                      "
                    >
                      {{ getData.data.phone }}
                    </li>
                    <li
                      class="
                        confirm__content-contact-list-item
                        confirm__content-contact-list-item--mail
                      "
                    >
                      {{ getData.data.email }}
                    </li>
                  </ul>
                </div>
                <div class="confirm__organizer">
              <span class="confirm__organizer-name">
                {{ getData.data.organizer }}
              </span>
                  <span class="confirm__organizer-label">
                Организатор мероприятия
              </span>
                </div>
              </div>
            </div>
            <!-- .confirm__content-left -->
            <div class="confirm__content-right">
              <img
                :src="getData.data.photo"
                alt="photo"
              >
            </div>
            <!-- .confirm__content-right -->
          </div>
          <!-- .confirm__content -->
          <div class="confirm__description">
            <p class="confirm__description-text">
              {{ getData.data.description }}
            </p>
          </div>
          <!-- .confirm__description -->
          <div class="action">
            <button
              @click="returnBack"
              class="btn"
            >
              Назад
            </button>
            <button
              @click="sendModeration"
              class="btn btn--fill"
            >
              Отправить на модерацию
            </button>
          </div>
          <!-- .action -->
        </template>
        <template v-else>
          Loading...
        </template>
      </div>
      <!-- .confirm__wrapper -->
    </div>
    <!-- .confirm -->
  </div>
  <!-- .container -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'confirm-event',
  data() {
    return {
      MAX_TITLE_LENGTH: 34,
    };
  },
  created() {
    window.onbeforeunload = function () {
      return 'Are you sure?';
    };

    if (!Object.keys(this.getData).length) {
      this.$router.push({ path: '/create-event' });
    }
  },
  computed: {
    ...mapGetters('form', [
      'getData',
    ]),
    isDataFill() {
      return Boolean(Object.keys(this.getData).length);
    },
  },
  methods: {
    returnBack() {
      this.$router.push({ path: '/create-event' });
    },
    sendModeration() {
      alert('Отправлено на модернизацию');
    },
    convertedDate(date) {
      const dateParts = date.split('/');
      const newDate = new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10),
      );

      const day = newDate.toLocaleString('ru-RU', { weekday: 'short' });
      const dt = newDate.getDate();
      const month = newDate.toLocaleString('ru-RU', { month: 'short' });
      const year = newDate.getFullYear();

      return `${dt} ${month} ${year} (${day})`;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/styles/variables';

.confirm__title {
  margin-top: 100px;
  margin-bottom: 50px;
}

.confirm__wrapper {
  margin-bottom: 100px;
  padding: 30px;
  border-radius: 4px;
  background-color: #fff;
}

.confirm__content {
  margin-bottom: 30px;
  display: flex;
}

.confirm__content-left {
  width: 45%;
}

.confirm__content-right {
  width: 55%;
}

.confirm__content-header {
  display: flex;
  margin-bottom: 30px;
}

.confirm__content-header-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 48px;
  max-height: 48px;
  width: 48px;
  height: 48px;

  font-size: 18px;
  color: #fff;

  background-color: #351767;
}

.confirm__content-header-text {
  padding-left: 16px;
  padding-right: 25px;

  max-height: 115px;
  overflow: hidden;

  font-size: 32px;
  font-weight: 800;
  word-break: break-word;

  color: #351768;
}

.confirm__content-info {
  padding-left: 64px;
  padding-right: 25px;
}

.confirm__content-location-list,
.confirm__content-contact {
  margin-bottom: 25px;
}

.confirm__content-location-list-item,
.confirm__content-contact-list-item {
  padding-left: 30px;
  position: relative;

  font-weight: 400;

  & + & {
    margin-top: 15px;
  }

  &::before {
    content: '';

    margin: auto 0;
    width: 16px;
    height: 16px;

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
}

.confirm__content-location-list-item {
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  font-size: 18px;

  &--geo {
    &::before {
      height: 20px;
      background-image: url('../assets/img/geo-icon.svg');
    }
  }

  &--calendar {
    &::before {
      background-image: url('../assets/img/calendar-icon.svg');
    }
  }

  &--clock {
    &::before {
      background-image: url('../assets/img/clock-icon.svg');
    }
  }
}

.confirm__content-contact-title {
  margin-bottom: 13px;

  font-size: 16px;
  font-weight: 600;
}

.confirm__content-contact-list-item {
  font-size: 14px;

  &--phone {
    &::before {
      background-image: url('../assets/img/phone-icon.svg');
    }
  }

  &--mail {
    &::before {
      background-image: url('../assets/img/mail-icon.svg');
    }
  }
}

.confirm__organizer {
  display: flex;
  flex-direction: column;
}

.confirm__organizer-name {
  font-size: 16px;
  font-weight: 400;
  color: #211536;
}

.confirm__organizer-label {
  font-size: 10px;
  font-weight: 500;
  color: $dark-purple;
}

.confirm__content-right {
  position: relative;

  height: 420px;

  border-radius: 4px;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100%;
    height: 100%;

    transform: translate(-50%, -50%);
    object-fit: cover;
  }
}

.confirm__description {
  margin-bottom: 50px;
}

.confirm__description-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.warning {
  display: flex;
  align-items: center;

  margin: 30px 0 60px 0;
  padding: 20px 25px;

  border-radius: 4px;
  box-shadow: 0px 8px 25px rgba(155, 99, 248, 0.15);
}

.warning__icon {
  margin-right: 20px;

  width: 45px;
  height: 45px;

  background-image: url('../assets/img/warning-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.warning__text {
  font-size: 18px;
}
</style>
