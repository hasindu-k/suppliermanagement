<template>
  <div class="supplier-table">
    <h2>Supplier Details</h2>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search by name or phone number">
    </div>
    <table class="table table-striped tea-table"  v-if="List">
      <thead>
        <tr>
          <th>Supplier ID</th>
          <th>Supplier Name</th>
          <th>Company Name</th>
          <th>Join Date</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supplier, index) in filteredSuppliers" :key="index">
          <!-- <td
             @click="ShowSupplierProfile(supplier.supplierID)">
             <router-link :to="{ name: 'SupplierProfile', query: supplier }">{{ supplier.supplierID }}</router-link>
          </td> -->
          <td>{{ supplier.supplierID }}</td>
          <td>{{ supplier.supplierName }}</td>
          <td>{{ supplier.companyName }}</td>
          <td>{{ supplier.joinDate }}</td>
          <td>{{ supplier.contactNumber }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.address }}</td>
          <td>
            <button @click="deleteSupplier(supplier.supplierID)" class="btn btn-danger">Delete</button><br><br>
            <!-- <button @click="updateSupplier(supplier)" class="btn btn-warning">Update</button> -->
            
              <router-link :to="{ name: 'SupplierUpdate', params: { id: supplier.supplierID }, query: supplier }">
              <button @click="updateSupplier(supplier)" class="btn btn-warning">Update</button>
              </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <router-link to="/supplier-form" class="back-button">Back to Form</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List:true,
      suppliers: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredSuppliers() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.suppliers.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(query) ||
        supplier.contactNumber.includes(query)
      );
    }
  },
  mounted() {
    this.retrieveSuppliers();
  },
  methods: {
    async retrieveSuppliers() {
      try {
        const response = await fetch("http://localhost:5154/api/Supplier");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        this.suppliers = data;
      } catch (error) {
        console.error("Error retrieving suppliers:", error);
      }
    },
    async deleteSupplier(supplierID) {
      const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
      if (!confirmDelete) {
        return;  
      }
      
      try {
        const response = await fetch(`http://localhost:5154/api/Supplier/${supplierID}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete supplier");
        }
        
        this.suppliers = this.suppliers.filter(supplier => supplier.supplierID !== supplierID);
        alert("Supplier deleted successfully!");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Error deleting supplier. Please try again.");
      }
    },
    updateSupplier(supplier) {
      this.List = false; 
      console.log("Update button clicked for supplier:", supplier);
      const router = this.$router;
      if (router) {
        router.push({ name: 'SupplierUpdate', params: { id: supplier.supplierID } ,
        query : supplier
      
      });
      } else {
        console.error("Router instance is undefined.");
      }
    },

    // ShowSupplierProfile(supplierID) {
    //   const router = this.$router;
    //   if (router) {
    //     router.push({ name: "SupplierProfile", params: { id: supplierID } });
    //     this.showProfile = true; // Show the floating profile
    //   } else {
    //     console.error("Router instance is undefined.");
    //   }
    // },
  },
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

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 12px;
}

.supplier-table {
  /* max-width: 800px; */
  margin: auto;
}

.tea-table {
  border-collapse: collapse;
  width: 100%;
}

.tea-table th,
.tea-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tea-table th {
  background-color: #128441;
  color: white;
}

.tea-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tea-table tbody tr:hover {
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
