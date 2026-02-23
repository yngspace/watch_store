<script lang="tsx">
import { ProductCatalog } from '@/modules/product'
import { PageHeader } from '@/shared/ui';
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'MainPage',

  setup() {
    // async function saveImage(imageUrl: string, fileName = 'image') {
    //     try {
    //         // Получаем изображение как blob
    //         const response = await fetch(imageUrl, {
    //             mode: 'cors', // Для кросс-доменных запросов
    //             cache: 'no-cache'
    //         });
            
    //         if (!response.ok) {
    //             throw new Error('Не удалось загрузить изображение');
    //         }
            
    //         const blob = await response.blob();
            
    //         // Определяем расширение из типа файла
    //         const extension = blob.type.split('/')[1] || 'jpg';
            
    //         // Создаем URL для blob
    //         const blobUrl = URL.createObjectURL(blob);
            
    //         // Создаем и кликаем по ссылке
    //         const link = document.createElement('a');
    //         link.href = blobUrl;
    //         link.download = `${fileName}.${extension}`;
    //         document.body.appendChild(link);
    //         link.click();
            
    //         // Очищаем
    //         document.body.removeChild(link);
    //         URL.revokeObjectURL(blobUrl);
            
    //     } catch (error) {
    //         console.error('Ошибка при скачивании:', error);
    //     }
    // }

    onMounted(async () => {
      // await Promise.all(
      //   items.value.map((item) => {
      //     return new Promise<void>(async (resolve) => {
      //       await Promise.all(
      //         item.images.map((image, index) => {
      //           return new Promise<void>((resolve) => {
      //             saveImage(image, `${item.id}_${index}`)
      //             resolve()
      //             // 
      //           })
      //         })
      //       )

      //       resolve()
      //     })
      //   })
      // )
    })

    return () => (
      <div class="main-page">
        <div class="container">
          <PageHeader
            name='Каталог'
          />

          <ProductCatalog />
        </div>
      </div>
    )
  }
})
</script>
