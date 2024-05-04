<template>
  <div class="page-container">
    <div class="header">
      <PageHeader/>
    </div>

    <div class="content-container">
      <div class="form-container">
        <div class="order-form">
          <br>
          <br>
          <h2>Place Order <i class="fas fa-cart-plus"></i></h2><br>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="supplierID">Supplier ID <i class="fas fa-id-badge"></i>:</label>
              <input type="number" id="supplierID" v-model="supplierID" required>
            </div>
            <div class="form-group">
              <label for="itemName">Item Name <i class="fas fa-tag"></i>:</label>
              <input type="text" id="itemName" v-model="itemName" required>
            </div>
            <div class="form-group">
              <label for="quantity">Quantity <i class="fas fa-boxes"></i>:</label>
              <input type="number" id="quantity" v-model="quantity" required>
            </div>
            <div class="form-group">
              <label for="unitPrice">Unit Price <i class="fas fa-dollar-sign"></i>:</label>
              <input type="number" id="unitPrice" v-model="unitPrice" required>
            </div>
            <div class="form-group">
              <label for="orderState">Order State <i class="fas fa-info-circle"></i>:</label>
              <select id="orderState" v-model="orderState" required>
                <option value="">Select order state</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div class="form-group">
              <label for="orderDate">Order Date <i class="fas fa-calendar-alt"></i>:</label>
              <input type="date" id="orderDate" v-model="orderDate" required>
            </div>
            <!-- <div class="form-group">
              <label for="supplierID">Supplier ID <i class="fas fa-id-badge"></i>:</label>
              <input type="number" id="supplierID" v-model="supplierID" required>
            </div> -->
            <!-- Add more form fields as needed -->
            <button type="submit">Submit <i class="fas fa-check"></i></button><br><br>
            <button type="submit">Place Order <i class="fas fa-check"></i></button>
          </form>
        </div>
      </div>
      <div class="image-container"></div>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      itemName: '',
      quantity: null,
      unitPrice: null,
      orderState: '',
      orderDate: '',
      supplierID: null
    };
  },
  methods: {
    submitForm() {
      // Form submission logic
      this.submitOrder();
    },
    async submitOrder() {
      try {
        const orderData = {
          itemName: this.itemName,
          quantity: this.quantity,
          unitPrice: this.unitPrice,
          orderState: this.orderState,
          orderDate: this.orderDate,
          supplierID: this.supplierID
        };

        const response = await fetch("http://localhost:5154/api/Order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          throw new Error(`Failed to place order. Status: ${response.status}`);
        }

        alert("Order placed successfully!");

        // Reset form fields after successful submission
        this.resetFormFields();
      } catch (error) {
        console.error("Error placing order:", error);

        alert("Error placing order. Please try again.");
      }
    },
    resetFormFields() {
      // Reset all form fields to default values
      this.itemName = '';
      this.quantity = null;
      this.unitPrice = null;
      this.orderState = '';
      this.orderDate = '';
      this.supplierID = null;
    }
  }
};
</script>

<style scoped>
body {
  overflow: hidden; /* Hide scrollbar */
  margin: 0; /* Remove default margin */
}

.page-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure header stays above other content */
}

.content-container {
  display: flex;
  flex: 1; /* Take up remaining space */
}

.form-container {
  flex: 0.65; /* Take up half of the remaining space */
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px; /* Add border radius for rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow for depth */
}

.order-form {
  width: 100%;
  background-color: rgb(206, 232, 221);
  border-radius: 10px;
  margin: auto;
  margin-top: 60px; /* Adjust margin-top to create space between header and form */
  padding-bottom: 30px;
}

.image-container {
  flex: 1; /* Take up half of the remaining space */
  background-image: url('/src/assets/1.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px; /* Add border radius for rounded corners */
  overflow: hidden; /* Hide overflowing content */
}

.order-form .form-group {
  margin-bottom: 20px;
}

.order-form label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.order-form input[type="text"],
.order-form input[type="number"],
.order-form select,
.order-form textarea {
  width: calc(100% - 22px); /* Adjust for padding */
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.order-form textarea {
  height: 100px; /* Adjust as needed */
}

.order-form .error-message {
  color: red;
}

.order-form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* width: 100%; */
  transition: background-color 0.3s; /* Add transition for smoother hover effect */
}

.order-form button:hover {
  background-color: #45a049;
}
</style>
