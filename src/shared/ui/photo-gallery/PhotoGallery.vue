<script lang="tsx">
import { ICONS } from '@/assets/icons';
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'PhotoGallery',

  props: {
    images: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  setup(props) {
    const activePhoto = ref(0)
    const scrollRef = ref<HTMLElement | null>(null)

    const setActive = (value: number) => {
      activePhoto.value = value
    }

    const scrollNext = () => {
      if (!scrollRef.value) return

      scrollRef.value.scrollTo({
        top: scrollRef.value.scrollTop + 88,
        behavior: 'smooth',
      })
    }

    const scrollPrev = () => {
      if (!scrollRef.value) return

      scrollRef.value.scrollTo({
        top: scrollRef.value.scrollTop - 88,
        behavior: 'smooth',
      })
    }

    return () => (
      <div class="photo-gallery">
        <div class="photo-gallery__body">
          <div class="photo-gallery__mini">
            {props.images.length > 5 && <div class="photo-gallery__mini-control center">
              <button class="photo-gallery__mini-btn photo-gallery__mini-btn--top center icon-xl" onClick={scrollPrev}>{ICONS.arrowDown}</button>
            </div>}
            <div class="photo-gallery__mini-body" ref={scrollRef}>
              {props.images.map((image, index) => (
                <div
                  class={{
                    'photo-gallery__mini-item center': true,
                    'photo-gallery__mini-item--active': activePhoto.value === index,
                  }}
                  onClick={() => setActive(index)}
                >
                  <img
                    class="photo-gallery__mini-image"
                    src={image}
                    alt="Фото не загрузилось"
                  />
                </div>
              ))}
            </div>
            {props.images.length > 5 && <div class="photo-gallery__mini-control center">
              <button class="photo-gallery__mini-btn photo-gallery__mini--bottom icon-xl center" onClick={scrollNext}>{ICONS.arrowDown}</button>
            </div>}
          </div>

          <div class="photo-gallery__preview center">
            <div class="photo-gallery__preview-body">
              <img
                class="photo-gallery__preview-image"
                src={props.images[activePhoto.value]}
                alt="Фото не загрузилось"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
$mini-size: 80px;

.photo-gallery {
  &__body {
    display: flex;
    column-gap: 32px;
  }

  &__mini {
    width: calc($mini-size);

    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__mini-btn {
    width: 30px;
    height: 30px;

    border: 1px solid $primary;
    border-radius: 50%;

    &--top {
      transform: rotate(180deg);
    }
  }

  &__mini-body {
    max-height: calc(($mini-size + 8px) * 5);
    overflow: hidden;

    display: grid;
    gap: 8px;
  }

  &__mini-item {
    width: $mini-size;
    height: $mini-size;

    border: 1px solid $primary-lighten;
    overflow: hidden;

    border-radius: 4px;
    transition: .3s;
    cursor: pointer;

    &--active {
      border-color: $primary-darken;
      cursor: default;
    }
  }

  &__mini-image {
    object-fit: contain;
    object-position: center;

    width: calc($mini-size - 6px);
    height: calc($mini-size - 6px);
  }

  &__preview {
    flex: 1;
  }

  &__preview-body {
    overflow: hidden;
    height: calc(100vh - 300px);
    padding: 16px;

    box-shadow: $box-shadow-medium;
  }

  &__preview-image {
    height: calc(100vh - 300px);

    object-fit: contain;
    object-position: center;
  }
}
</style>