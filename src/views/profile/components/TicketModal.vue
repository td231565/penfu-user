<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal__body">
      <div style="overflow-y: auto;">
        <div class="py-3 px-4">
          <h3 class="mt-0 mb-4 text-center">鵬福旅遊 PENGFU</h3>
          <div class="d-flex justify-content-between mb-2">
            <div>
              <p class="mt-0 mb-1">遊客</p>
              <p class="my-0 fw-bold">{{ userInfo.usernameChinese }}</p>
            </div>
            <div v-if="selectedOrder.productCategory === '票券'">
              <p class="mt-0 mb-1">日期</p>
              <p class="my-0 fw-bold">
                {{ selectedOrder.validTime.split('T')[0] }}
                <br />
                <span class="text-danger">{{ selectedOrder.validTime.split('T')[1].slice(0, -3) }}</span>
              </p>
            </div>
          </div>
          <p class="mt-0 mb-1">訂單狀態</p>
          <p class="mt-0 mb-4 fw-bold">{{ getOrderStatusText(selectedOrder.status) }}</p>
          <div class="d-flex">
            <div v-if="selectedOrder.productCategory === '票券'">
              <img src="@/assets/image/icon_ticket.png" alt="" class="modal__icon">
              <p class="text-center text-secondary my-0">遊艇門票</p>
            </div>
            <div v-else>
              <img src="@/assets/image/icon_souvenir.png" alt="" class="modal__icon">
              <p class="text-center text-secondary my-0">伴手禮</p>
            </div>
            <div class="ms-3">
              <!-- <p class="mt-0 mb-1">名稱</p> -->
              <p class="my-0 fw-bold text-blue">{{ selectedOrder.title }}</p>
            </div>
          </div>
        </div>
        <div class="py-3 px-4 text-center mt-3">
          <p v-if="[3, 4].includes(selectedOrder.status)" class="mt-0 mb-1 text-center text-danger fw-bold">{{ selectedOrder.status === 3 ? '已核銷' : '已取消' }}</p>
          <VueQrcode :value="selectedOrder.uuid" :options="qrOptions" />
          <p class="mt-1 mb-0 text-center text-break">{{ selectedOrder.uuid }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'TicketModal',
  components: { VueQrcode },
  props: {
    selectedOrder: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      qrOptions: { width: 150, margin: 0, scale: 6 }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    getOrderStatusText(status) {
      const list = {
        1: '付款成功',
        2: '現金付款',
        3: '核銷成功',
        4: '取消訂單',
        99: '錯誤'
      }
      return list[status]
    },
    closeModal() {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="scss" scoped>
$modal-ticket-radius: 20px;
.modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(#000, 0.6);
  &__body {
    width: 70%;
    height: 90%;
    margin-top: 10%;
    position: relative;
    background-color: #fff;
    // overflow-y: auto;
    &::before, &::after {
      content: '';
      display: block;
      width: $modal-ticket-radius;
      height: 100%;
      position: absolute;
      top: 0;
      left: -19px;
      background: radial-gradient(circle at 0 52.5%, transparent 0, transparent 18px, #fff 19px, #fff);
      border-radius: $modal-ticket-radius 0 0 $modal-ticket-radius;
    }
    &::after {
      left: 100%;
      background: radial-gradient(circle at 100% 52.5%, transparent 0, transparent 18px, #fff 19px, #fff);
      border-radius: 0 $modal-ticket-radius $modal-ticket-radius 0;
    }
  }
  &__icon {
    width: 50px;
    display: block;
    margin: 0 auto;
  }
}
</style>
