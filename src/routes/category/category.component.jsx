import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

// import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';

import Spinner from '../../components/spinner/spinner.component';

import { useQuery, gql, useMutation } from '@apollo/client';

// signature
const GET_CATEGORY = gql`
query($title: String!) {
  getCollectionsByTitle(title: $title) {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  }
}
`;

// mutation category
// const SET_CATEGORY = gql `
// mutation($category: category!) {
//    addCategory(category: $category){
//     id
//     title
//     items {
//       id
//       name
//       price
//       imageUrl
//     }

//    }
//   }
// }
// `
const Category = () => {
  const { category } = useParams();

  //initilize 
  const{loading, error, data} = useQuery(GET_CATEGORY,{
    // configuration object parameter isme 2 parametes pass hote hai isliye 
    variables: { title: category },
  });

  // mutation
  // const [addCategory,{loading, error, data}] = useMutation(SET_CATEGORY)

  // addCategory({variables: {category:categoryObject}}) // that recive an object pass variables and matching the category, yah generate karega mutation, mutetion backend me generate karta hai uske liye backend banna padega,

console.log("category.component",loading);
console.log("category.component",data);
console.log("category.component",error);

useEffect(() => {
  if(data){
    const {
      getCollectionsByTitle: { items },
    } = data;
    setProducts(items);
  }
    
  }, [category,data]);


  // const { categoriesMap , loading} = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <Fragment>

     {loading? <Spinner/>: (
      
        <Fragment>
            <Title>{category.toUpperCase()}</Title><CategoryContainer>
                {products &&
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </CategoryContainer>
        </Fragment>)}
    </Fragment>
  );
};

export default Category;
