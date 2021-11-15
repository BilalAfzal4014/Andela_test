<template>
  <div class="outer-content-div">
    <div class="inner-content-div">
      <h1>Andela Test</h1>
      <router-link to="/save-book">Create book</router-link>
    </div>

    <div class="inner-content-div">
      <h3>All Books</h3>
      <div>
        <label>Get book by name</label>
        <select v-model="selectedBook">
          <option v-for="uniqueBook in uniqueBooks">{{uniqueBook}}</option>
        </select>
      </div>
      <table style="margin: auto;">
        <thead>
          <tr>
            <td>#</td>
            <td>name</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books">
            <td>{{index + 1}}</td>
            <td>{{book.name}}</td>
            <td><button v-on:click="editBook(book.id)">get book by id and edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import api from "../../api-operations";
import configurations from "../../../dev-env-configurations";

export default {
  name: "AllBooks",
  data() {
    return {
      selectedBook: "All",
      books: [],
      uniqueBooks: ["All"]
    };
  },
  mounted(){
    this.fetchDateFromServer();
  },
  methods:{
    fetchDateFromServer(){
      this.getAllBooks();
    },
    getAllBooks(getUniqueBooks = true){
      api("get", `${configurations.BASE_URL}/books`)
      .then((books) => {
        this.books = books;

        if(getUniqueBooks)
          this.uniqueBooks = this.getUniqueBooks();
      });
    },
    getBooksByName(){
      api("get", `${configurations.BASE_URL}/books/name/${this.selectedBook}`)
      .then((books) => {
        this.books = books;
      });
    },
    getUniqueBooks(){
      let hash = {};
      let uniqueBooks = ["All"];
      for(let book of this.books){
        hash[book.name] = true;
      }

      for(let key in hash){
        uniqueBooks.push(key);
      }
      return uniqueBooks;
    },
    editBook(bookId){
      this.$router.push({path: `/save-book/${bookId}`});
    }
  },
  watch: {
    selectedBook(currVal, oldVal){
      switch (currVal){
        case "All":
          this.getAllBooks(false);
          break;
        default:
          this.getBooksByName();
      }
    }
  }
}
</script>
