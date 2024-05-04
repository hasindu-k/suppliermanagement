<template>
  <div class="order-table">
    <h2>Order Details</h2>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search by item name or order state">
    </div>
    <table class="table table-striped order-table" v-if="List">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Order State</th>
          <th>Order Date</th>
          <th>Supplier ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="index">
          <td>{{ order.orderID }}</td>
          <td>{{ order.itemName }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.unitPrice }}</td>
          <td>{{ order.orderState }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.supplierID }}</td>
          <td>
            <button @click="editOrder(order)" class="btn btn-warning">Edit</button>
            <button @click="deleteOrder(order)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <router-link to="/order-details-form" class="back-button">Back to Form</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: true,
      orders: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredOrders() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.orders.filter(order =>
        order.itemName.toLowerCase().includes(query) ||
        order.orderState.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await fetch("http://localhost:5154/api/Order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        this.orders = data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    editOrder(order) {
      const router = this.$router;
      if (router) {
        router.push({ name: 'OrderDetailsUpdate', params: { id: order.orderID }, query: order });
      } else {
        console.error("Router instance is undefined.");
      }
    },
    async deleteOrder(order) {
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) {
        return;  
      }
      
      try {
        const response = await fetch(`http://localhost:5154/api/Order/${order.orderID}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        
        this.orders = this.orders.filter(o => o.orderID !== order.orderID);
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error deleting order. Please try again.");
      }
    }
  }
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-container input[type=text] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.search-container input[type=text]:focus {
  outline: none;
}

.order-table {
  max-width: 800px;
  margin: auto;
}

.order-table th,
.order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: #128441;
  color: white;
}

.order-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.order-table tbody tr:hover {
  background-color: #e0f2f1;
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #388e3c;
}

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 14px;
}

.btn-danger {
  background-color: #f44336;
  border-color: #fb0008;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-warning {
  background-color: #0f73f5;
  border-color: #ff9800;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
</style>
