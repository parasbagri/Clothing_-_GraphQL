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
  const [categoriesMap, setCategoriesMap] = useState({});

  // transform the data using useEffact
  useEffect(() =>{
     if(data){
       const {collections} = data; 
      //  fatch the collection values from the data 
      // const categoryMap = data.collections
      const collectionsyMap = collections.reduce((acc, collection) => {
         const{title, items} = collection;
         acc[title.toLowerCase()] = items;
         return acc;
      }, {});

      setCategoriesMap(collectionsyMap)
     }
  },[data])
  console.log("loading:", loading); 
  console.log(data);   // ab hume data mil rha hai ab isko hum use karenge 


  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     setCategoriesMap(categoryMap);
  //   };

  //   getCategoriesMap();
  // }, []);

  const value = { categoriesMap, loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
