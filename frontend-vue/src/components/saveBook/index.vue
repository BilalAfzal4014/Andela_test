<template>
  <div class="outer-content-div">
    <div class="inner-content-div">
      <h3>Create Book</h3>
      <form>
        <div>
          <label>*</label>
          <input placeholder="name" v-model="book.name">
          <span style="color: red">{{bookErrorMessages.name}}</span>
        </div>
        <div>
          <button type="button" v-on:click="saveBook">{{$route.params.id ? 'Update': 'Add'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../../api-operations";
import configurations from "../../../dev-env-configurations";

export default {
  name: "Save Book",
  data() {
    return {
      validationLocked: true,
      bookErrorMessages: {
        name: ""
      },
      book: {
        name: ""
      }
    };
  },
  mounted(){
    this.getBook();
  },
  methods:{
    getBook(){
      if(this.$route.params.id){
        api("get", `${configurations.BASE_URL}/books/id/${this.$route.params.id}`)
          .then((book) => {
            this.book = book;
          });
      }
    },
    saveBook(){
      this.validationLocked = false;

      if(!this.validate()){
        return;
      }

      api("post", `${configurations.BASE_URL}/books`, this.book)
        .then(() => {
          alert("Book saved successfully");
          this.$router.push({path: '/'});
        });
    },
    validate(){
      return this.performValidations();
    },
    performValidations(){
      let isOkay = true;
      if(this.book.name === ""){
        isOkay = false;
        this.bookErrorMessages.name = "Name is required";
      } else{
        this.bookErrorMessages.name = "";
      }
      return isOkay;
    },
  },
  watch:{
    'book':{
      handler(currVal, oldVal) {
        if (!this.validationLocked) {
          this.validate();
        }
      },
      deep: true
    }
  }
}
</script>
