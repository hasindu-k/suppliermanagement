<template>
  <div class="order-update">
    <h2>Update Order</h2>
    <form @submit.prevent="submitForm">
      <label for="itemName">Item Name:</label>
      <input type="text" id="itemName" v-model="itemName" required>

      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" v-model="quantity" required>

      <label for="unitPrice">Unit Price:</label>
      <input type="number" id="unitPrice" v-model="unitPrice" required>

      <label for="orderState">Order State:</label>
      <input type="text" id="orderState" v-model="orderState" required>

      <!-- <label for="orderDate">Order Date:</label> -->
      <!-- <input type="date" id="orderDate" v-model="orderDate" required> -->

      <label for="supplierID">Supplier ID:</label>
      <input type="number" id="supplierID" v-model="supplierID" required>

      <button type="submit">Update Order</button><br><br>

      <!-- Navigation button to view details -->
      <button @click="navigateToView">View Details</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemName: '',
      quantity: 0,
      unitPrice: 0,
      orderState: '',
      // orderDate: '',
      supplierID: 0
    };
  },
  mounted() {
    this.orderID = this.$route.params.id;
    this.itemName = this.$route.query.itemName;
    this.quantity = this.$route.query.quantity;
    this.unitPrice = this.$route.query.unitPrice;
    this.orderState = this.$route.query.orderState;
    // this.orderDate = this.$route.query.orderDate;
    this.supplierID = this.$route.query.supplierID;
    this.retrieveOrder();
  },
  methods: {
    async retrieveOrder() {
      try {
        const orderID = this.$route.params.id;
        const response = await fetch(`http://localhost:5154/api/Order/${orderID}`);
        if (!response.ok) {
          throw new Error("Failed to retrieve order details");
        }
        const data = await response.json();
        this.itemName = data.itemName;
        this.quantity = data.quantity;
        this.unitPrice = data.unitPrice;
        this.orderState = data.orderState;
        // this.orderDate = data.orderDate;
        this.supplierID = data.supplierID;
      } catch (error) {
        console.error("Error retrieving order details:", error);
      }
    },
    async submitForm() {
      try {
        const formData = {
          itemName: this.itemName,
          quantity: this.quantity,
          unitPrice: this.unitPrice,
          orderState: this.orderState,
          // orderDate: this.orderDate,
          supplierID: this.supplierID
        };

        const response = await fetch(`http://localhost:5154/api/Order/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to update order");
        }

        alert("Order updated successfully!");

        this.$router.push({ name: 'OrderDetailsTable' });
      } catch (error) {
        console.error("Error updating order:", error);
        alert("Error updating order. Please try again.");
      }
    },
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: 'OrderDetailsTable' });
      } else {
        console.error("Router instance is undefined.");
      }
    }
  }
};
</script>

<style scoped>
.order-update {
  max-width: 400px;
  margin: auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
