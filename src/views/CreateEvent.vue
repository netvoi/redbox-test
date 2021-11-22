<template>
  <div class="container">
    <div class="create">
      <h1 class="create__title title">Шаг 1</h1>
      <div class="create__wrapper">
        <div class="create__wrapper-item">
          <h2 class="create__wrapper-item-title subtitle">Информация об организаторе</h2>
          <div class="create__wrapper-item-form">
            <label for="organizer">Организатор</label>
            <input
              @blur="$v.data.organizer.$touch()"
              v-model.trim="data.organizer"
              :class="{ 'input-error': $v.data.organizer.$error }"
              id="organizer"
              placeholder="RedBox"
              type="text"
            >
            <span
              v-if="$v.data.organizer.$error && !$v.data.organizer.required"
              class="input-error-msg"
            >
                Поле не может быть пустым
              </span>
          </div>
        </div>
        <!-- .create__wrapper-item -->

        <div class="create__wrapper-item">
          <h2 class="create__wrapper-item-title subtitle">Контактные данные</h2>
          <div class="create__wrapper-item-forms">
            <div class="create__wrapper-item-form">
              <label for="phone">Телефон</label>
              <masked-input
                @blur="$v.data.phone.$touch()"
                v-model.trim="data.phone"
                type="text"
                name="phone"
                class="form-control"
                :class="{ 'input-error': $v.data.phone.$error }"
                :mask="mask.phone"
                :guide="false"
                placeholder="+7 (999) 555-33-22"
              ></masked-input>
              <span
                v-if="$v.data.phone.$error && !$v.data.phone.required"
                class="input-error-msg"
              >
                Поле не может быть пустым
              </span>
            </div>
            <div class="create__wrapper-item-form">
              <label for="mail">E-mail</label>
              <masked-input
                @blur="$v.data.email.$touch()"
                v-model.trim="data.email"
                type="text"
                name="email"
                class="form-control"
                :class="{ 'input-error': $v.data.email.$error }"
                :mask="mask.email"
                :guide="false"
                placeholder="ivanov@mail.ru"
              ></masked-input>
              <span
                v-if="$v.data.email.$error && !$v.data.email.required"
                class="input-error-msg"
              >
                Поле не может быть пустым
              </span>
              <span
                v-if="$v.data.email.$error && !$v.data.email.email"
                class="input-error-msg"
              >
                Field is email
              </span>
            </div>
            <div class="create__wrapper-item-form">
              <label for="city">Город организатора</label>
              <input
                @blur="$v.data.city.$touch()"
                v-model.trim="data.city"
                :class="{ 'input-error': $v.data.city.$error }"
                id="city"
                placeholder="Москва"
                type="text"
              >
              <span
                v-if="$v.data.city.$error && !$v.data.city.required"
                class="input-error-msg"
              >
                Поле не может быть пустым
              </span>
            </div>
          </div>
        </div>
        <!-- .create__wrapper-item -->

        <div class="create__wrapper-item">
          <h2 class="create__wrapper-item-title subtitle">Общая информация</h2>
          <div class="create__wrapper-item-form create__name">
            <label for="name">Название</label>
            <input
              @blur="$v.data.name.$touch()"
              v-model.trim="data.name"
              :class="{ 'input-error': $v.data.name.$error }"
              id="name"
              type="text"
            >
            <span
              v-if="$v.data.name.$error && !$v.data.name.required"
              class="input-error-msg"
            >
              Поле не может быть пустым
            </span>
          </div>

          <div class="create__wrapper-item-form create__photo">
            <label for="photo">Фотография</label>
            <div
              v-if="data.photo && data.photo.length"
              class="create__photo-wrapper"
            >
              <div class="create__photo-img">
                <img
                  :src="data.photo"
                  alt="photo"
                />
              </div>
              <button
                @click="resetPhoto"
                class="create__photo-btn-reset"
              ></button>
            </div>
            <template v-else>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                @change="uploadImage"
                ref="uploadPhoto"
                style="display: none;"
              >
              <button
                @click="$refs.uploadPhoto.click()"
                class="create__photo-btn"
                :class="{ 'input-error': $v.data.photo.$error }"
              />
            </template>
            <span
              v-if="$v.data.photo.$error"
              class="input-error-msg"
            >
              Выберите обложку мероприятия
            </span>
            <span class="create__photo-title">Главная фотография <br> (обложка мероприятия)</span>
          </div>

          <div class="create__wrapper-item-form create__description">
            <label for="description">Подробное описание</label>
            <textarea
              @blur="$v.data.description.$touch()"
              v-model.trim="data.description"
              :class="{ 'input-error': $v.data.description.$error }"
              name="description"
              id="description"
              rows="8"
            ></textarea>
            <span
              v-if="$v.data.description.$error && !$v.data.description.required"
              class="input-error-msg"
            >
              Поле не может быть пустым
            </span>
          </div>

          <div class="create__date">
            <ul
              v-if="data.dates.length"
              class="create__date-list"
            >
              <li
                v-for="(date, index) in data.dates"
                :key="index"
                class="create__date-list-item"
              >
                <div class="create__wrapper-item-forms">
                  <div class="create__wrapper-item-form">
                    <label for="startDate">Дата начала</label>
                    <div class="create_date-input-wrapper create_date-input-wrapper--calendar">
                      <input
                        v-model="date.startDate"
                        id="startDate"
                        readonly
                        type="text"
                      >
                    </div>
                  </div>
                  <div class="create__wrapper-item-form">
                    <label for="startTime">Время начала</label>
                    <div class="create_date-input-wrapper create_date-input-wrapper--clock">
                      <input
                        v-model="date.startTime"
                        id="startTime"
                        readonly
                        type="text"
                      >
                    </div>
                  </div>
                  <div class="dash"></div>
                  <div class="create__wrapper-item-form">
                    <label for="endDate">Дата окончания</label>
                    <div class="create_date-input-wrapper create_date-input-wrapper--calendar">
                      <input
                        v-model="date.endDate"
                        id="endDate"
                        readonly
                        type="text"
                      >
                    </div>
                  </div>
                  <div class="create__wrapper-item-form">
                    <label for="endTime">Время окончания</label>
                    <div class="create_date-input-wrapper create_date-input-wrapper--clock">
                      <input
                        v-model="date.endTime"
                        id="endTime"
                        readonly
                        type="text"
                      >
                    </div>
                  </div>
                </div>
                <button
                  @click="deleteDate(index)"
                  class="create__date-list-item-btn"
                ></button>
              </li>
            </ul>
            <div class="create__wrapper-item-forms">
              <div class="create__wrapper-item-form">
                <label for="startDate">Дата начала</label>
                <div class="create_date-input-wrapper create_date-input-wrapper--calendar">
                  <masked-input
                    v-model="eventDate.startDate"
                    :guide="false"
                    :mask="mask.date"
                    :pipe="pipe.date"
                    class="form-control"
                    :class="{
                      'input-error': $v.data.dates.$error || isError
                    }"
                    id="startDate"
                    name="startDate"
                    placeholder="01/01/2021"
                    type="text"
                  ></masked-input>
                </div>
              </div>
              <div class="create__wrapper-item-form">
                <label for="startTime">Время начала</label>
                <div class="create_date-input-wrapper create_date-input-wrapper--clock">
                  <masked-input
                    v-model="eventDate.startTime"
                    :guide="false"
                    :pipe="pipe.time"
                    :mask="mask.time"
                    class="form-control"
                    :class="{
                      'input-error': $v.data.dates.$error || isError
                    }"
                    id="startTime"
                    name="startTime"
                    placeholder="00:00"
                    type="text"
                  ></masked-input>
                </div>
              </div>
              <div class="dash"></div>
              <div class="create__wrapper-item-form">
                <label for="endDate">Дата окончания</label>
                <div class="create_date-input-wrapper create_date-input-wrapper--calendar">
                  <masked-input
                    v-model="eventDate.endDate"
                    :guide="false"
                    :mask="mask.date"
                    :pipe="pipe.date"
                    class="form-control"
                    :class="{
                      'input-error': $v.data.dates.$error || isError
                    }"
                    id="endDate"
                    name="endDate"
                    placeholder="01/01/2021"
                    type="text"
                  ></masked-input>
                </div>
              </div>
              <div class="create__wrapper-item-form">
                <label for="endTime">Время окончания</label>
                <div class="create_date-input-wrapper create_date-input-wrapper--clock">
                  <masked-input
                    v-model="eventDate.endTime"
                    :guide="false"
                    :mask="mask.time"
                    :pipe="pipe.time"
                    class="form-control"
                    :class="{
                      'input-error': $v.data.dates.$error || isError
                    }"
                    id="endTime"
                    name="endTime"
                    placeholder="00:00"
                    type="text"
                  ></masked-input>
                </div>
              </div>
            </div>
            <span
              v-if="$v.data.dates.$error"
              class="input-error-msg"
            >
              Должна быть заполенена, хотя бы одна дата мероприятия
            </span>
            <span
              v-else-if="!$v.data.dates.$error && errors.incorrectDate.visible"
              class="input-error-msg"
            >
              {{ errors.incorrectDate.message }}
            </span>
            <span
              v-else-if="!$v.data.dates.$error && errors.incorrectTime.visible"
              class="input-error-msg"
            >
              {{ errors.incorrectTime.message }}
            </span>
            <span
              v-else-if="!$v.data.dates.$error && errors.rangeDate.visible"
              class="input-error-msg"
            >
              {{ errors.rangeDate.message }}
            </span>
            <button
              @click="addDate"
              class="create__date-btn btn"
            >
              + Добавить дату
            </button>
          </div>
          <div class="create__wrapper-item-forms create__other">
            <div class="create__wrapper-item-form">
              <label for="rating">Рейтинг мероприятия</label>
              <div class="select">
                <select
                  @blur="$v.data.currentRating.$touch()"
                  v-model="data.currentRating"
                  :class="{ 'input-error': $v.data.currentRating.$error }"
                  name="rating"
                  id="rating"
                >
                  <option
                    v-for="rating in ratings"
                    :key="rating.id"
                    :value="rating.title"
                  >
                    {{ rating.title }}
                  </option>
                </select>
              </div>
              <span
                v-if="$v.data.currentRating.$error"
                class="input-error-msg"
              >
              Поле не может быть пустым
            </span>
            </div>
            <div class="create__wrapper-item-form">
              <label for="address">Адрес мероприятия</label>
              <input
                @blur="$v.data.address.$touch()"
                v-model.trim="data.address"
                :class="{ 'input-error': $v.data.address.$error }"
                id="address"
                type="text"
              >
              <span
                v-if="$v.data.address.$error && !$v.data.address.required"
                class="input-error-msg"
              >
              Поле не может быть пустым
            </span>
            </div>
          </div>
        </div>
        <!-- .create__wrapper-item -->

        <div class="action">
          <button
            @click="resetForm"
            class="btn"
          >
            Отменить
          </button>
          <button
            @click="nextStep"
            class="btn btn--fill"
          >
            Далее
          </button>
        </div>
        <!-- .action -->
      </div>
      <!-- .create__wrapper -->
    </div>
    <!-- .create -->
  </div>
  <!-- .container -->
</template>

<script>
import MaskedInput from 'vue-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { email, required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'create-event',
  data() {
    return {
      data: {
        address: null,
        city: null,
        currentRating: null,
        dates: [],
        description: null,
        email: null,
        name: null,
        organizer: null,
        phone: null,
        photo: null,
      },
      errors: {
        rangeDate: {
          visible: false,
          message: 'Дата окончания мероприятие не может быть раньше даты начала',
        },
        incorrectDate: {
          visible: false,
          message: 'Неверный формат даты',
        },
        incorrectTime: {
          visible: false,
          message: 'Неверный формат времени',
        },
      },
      eventDate: {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
      },
      formData: null,
      ratings: [],
      mask: {
        email: [],
        date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
        phone: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
        time: [/\d/, /\d/, ':', /\d/, /\d/],
      },
      pipe: {
        date: null,
        time: null,
      },
    };
  },
  components: {
    MaskedInput,
  },
  validations: {
    data: {
      dates: {
        required,
      },
      currentRating: {
        required,
      },
      organizer: {
        required,
      },
      phone: {
        required,
      },
      email: {
        email,
        required,
      },
      city: {
        required,
      },
      name: {
        required,
      },
      photo: {
        required,
      },
      description: {
        required,
      },
      address: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters('form', [
      'getData',
    ]),
    isError() {
      let flag = false;

      for (let i = 0; i < Object.keys(this.errors).length; i += 1) {
        if (Object.values(this.errors)[i].visible) {
          flag = true;
          break;
        }
      }

      return flag;
    },
    isDataFill() {
      return Boolean(Object.keys(this.getData).length);
    },
  },
  async mounted() {
    await this.getRating();
    this.mask.email = emailMask;
    this.pipe.date = createAutoCorrectedDatePipe('dd/mm/yyyy');
    this.pipe.time = createAutoCorrectedDatePipe('HH:MM');

    if (this.isDataFill) {
      this.data = this.getData.data;
    }
  },
  methods: {
    async getRating() {
      try {
        const response = await fetch('http://testwork.rdbx24.ru/api/');
        const { result, code } = await response.json();
        this.ratings = result;

        if (code !== 200) {
          throw new Error('Unknown error!');
        }
      } catch (e) {
        console.error(e);
      }
    },
    addDate() {
      const dateRe = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
      const timeRe = /([01][0-9]|2[0-3]):[0-5][0-9]/g;

      this.errors.incorrectDate.visible = false;
      this.errors.incorrectTime.visible = false;
      this.errors.rangeDate.visible = false;

      if (
        !(this.eventDate.startDate.match(dateRe))
        || !(this.eventDate.endDate.match(dateRe))
      ) {
        this.errors.incorrectDate.visible = true;
        return;
      }

      if (
        !(this.eventDate.startTime.match(timeRe))
        || !(this.eventDate.endTime.match(timeRe))
      ) {
        this.errors.incorrectTime.visible = true;
        return;
      }

      const startDateParts = this.eventDate.startDate.split('/');
      const startTimeParts = this.eventDate.startTime.split(':');
      const startDate = new Date(
        parseInt(startDateParts[2], 10),
        parseInt(startDateParts[1], 10),
        parseInt(startDateParts[0], 10),
        parseInt(startTimeParts[0], 10),
        parseInt(startTimeParts[1], 10),
      );
      const endDateParts = this.eventDate.endDate.split('/');
      const endTimeParts = this.eventDate.endTime.split(':');
      const endDate = new Date(
        parseInt(endDateParts[2], 10),
        parseInt(endDateParts[1], 10),
        parseInt(endDateParts[0], 10),
        parseInt(endTimeParts[0], 10),
        parseInt(endTimeParts[1], 10),
      );

      if (startDate > endDate) {
        this.errors.rangeDate.visible = true;
        return;
      }

      this.data.dates.push({
        startDate: this.eventDate.startDate,
        endDate: this.eventDate.endDate,
        startTime: this.eventDate.startTime,
        endTime: this.eventDate.endTime,
      });

      this.eventDate = {
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
      };
    },
    deleteDate(id) {
      this.data.dates = this.data.dates.filter((date, index) => index !== id);
    },
    nextStep() {
      this.$v.data.$touch();
      if (this.$v.data.$error) {
        return;
      }

      this.$store.dispatch('form/setData', { data: this.data });
      this.$router.push({ path: '/confirm-event' });
    },
    // eslint-disable-next-line no-unused-vars
    uploadImage(e) {
      const $vue = this;
      const { files } = this.$refs.uploadPhoto;
      const formData = new FormData();
      const reader = new FileReader();

      formData.append('attachment', files[0]);
      this.formData = formData;
      // eslint-disable-next-line no-shadow
      reader.onload = function onload(e) {
        $vue.data.photo = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    resetForm() {
      this.data = {
        address: null,
        city: null,
        currentRating: null,
        dates: [],
        description: null,
        email: null,
        name: null,
        organizer: null,
        phone: null,
        photo: null,
      };
      this.eventDate = {
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
      };
      this.$v.data.$reset();
      this.$store.dispatch('form/resetData');
    },
    resetPhoto() {
      this.formData = null;
      this.data.photo = null;
    },
  },
};

</script>

<style lang="scss">
@import '../assets/styles/variables';

.create__date,
.create__description,
.create__name,
.create__other,
.create__photo {
  margin-bottom: 40px;
}

.create__photo-wrapper,
.create__photo-btn {
  position: relative;

  width: 126px;
  height: 126px;

  border-radius: 4px;
}

.create__photo-btn {
  border: 4px solid $purple;
  background-color: #F8F8FE;

  cursor: pointer;
  transition: border-color .2s linear;

  &:hover {
    border-color: $dark-purple;
  }

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    margin: auto;
    width: 47px;
    height: 41px;

    background-image: url('../assets/img/add-photo-icon.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 47px 41px;
  }
}

.create__date-list-item-btn,
.create__photo-btn-reset {
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 100;

  width: 30px;
  height: 30px;

  background-color: transparent;
  background-image: url('../assets/img/close-icon.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px;

  transition: transform .2s linear;

  &:hover {
    transform: rotate(90deg);
  }
}

.create__photo-img {
  width: 100%;
  height: 100%;

  position: relative;
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

.create__photo-title {
  margin-top: 10px;

  display: block;

  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
}

.create__title {
  margin-top: 100px;
  margin-bottom: 50px;
}

.create__wrapper {
  margin-bottom: 100px;
  padding: 40px 30px;
  border-radius: 4px;
  background-color: #fff;
}

.create__wrapper-item {
  margin-bottom: 40px;
}

.create__wrapper-item-title {
  margin-bottom: 30px;
}

.create__wrapper-item-forms {
  display: flex;
  justify-content: space-between;

  position: relative;

  .create__wrapper-item-form:not(.create__wrapper-item-form:first-child) {
    margin-left: 10px;
  }

  .create__wrapper-item-form:not(.create__wrapper-item-form:last-child) {
    margin-right: 10px;
  }
}

.create__wrapper-item-form {
  display: flex;
  flex-direction: column;

  min-width: 254px;
  width: 100%;

  label {
    margin-bottom: 10px;
    display: block;
  }
}

.create__date {
  .create__wrapper-item-forms {
    align-items: center;
  }
}

.create_date-input-wrapper {
  position: relative;
  width: 100%;

  &::after {
    content: '';

    margin: auto 0;

    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;

    width: 17px;
    height: 17px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }

  &--calendar {
    &::after {
      background-image: url('../assets/img/calendar-icon.svg');
    }
  }

  &--clock {
    &::after {
      background-image: url('../assets/img/clock-icon.svg');
    }
  }

  input {
    width: 100%;
  }
}

.create__date-list-item {
  margin-bottom: 25px;
  padding: 20px 25px;

  position: relative;

  background-color: $light-purple;
  border-radius: 4px;
}

.create__date-btn {
  margin-top: 35px;
  width: 182px;
}

.create__other {
  .select {
    position: relative;

    select {
      width: 100%;

      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
    }

    &::after {
      content: '';

      display: block;
      margin: auto 0;

      position: absolute;
      top: 0;
      bottom: 0;
      right: 15px;

      width: 15px;
      height: 7px;

      background-image: url('../assets/img/chevron-icon.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
  }
}

.create__description {
  textarea {
    line-height: 24px;
  }
}

.dash {
  padding: 0 5px;

  position: relative;
  top: 15px;

  width: 100%;
  height: 2px;

  border-radius: 5px;
  background-color: $purple;
}

.input-error {
  border-color: $error;
}

.input-error-msg {
  margin-top: 5px;
  display: block;

  color: $error;
  font-weight: 400;
}
</style>
