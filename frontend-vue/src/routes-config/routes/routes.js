import saveBook from '../../components/saveBook';
import allBooks from '../../components/allBooks/index.vue';
import notFound from '../../components/notFound/index.vue';


const routes = [
  {
    path: "/",
    component: allBooks,
  },
  {
    path: "/save-book/:id?",
    component: saveBook,
  },
  {
    path: '*',
    component: notFound,
  }
];

export default routes;
