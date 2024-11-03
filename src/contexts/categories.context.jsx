import { createContext, useState, useEffect } from 'react';

// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
import { gql,useQuery } from '@apollo/client'; 

export const CategoriesContext = createContext({
  categoriesMap: {},
}); 
const COLLECTIONS = gql`
query{
collections{
   id
   title
   items{
      id
      name
      price
      imageUrl
   }
}
}`  
// ab jo query banaye ho usko use karna hoga inside the provider

export const CategoriesProvider = ({ children }) => {
  const {loading, error, data} = useQuery(COLLECTIONS) // it is hook it eturns response
  console.log("loading:", loading); 
  console.log(data);   // ab hume data mil rha hai ab isko hum use karenge 

  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     setCategoriesMap(categoryMap);
  //   };

  //   getCategoriesMap();
  // }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
