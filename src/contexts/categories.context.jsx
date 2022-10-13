import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import { gql, useQuery, useMutation} from '@apollo/client'

export const CategoriesContext = createContext({
  categoriesMap: {},
});

// const COLLECTIONS = gql`{
//   query {
//     collections
//       id
//       title
//       items {
//         id
//         name
//         price
//         imageUrl
//     }
//   }
// }
// `

const COLLECTIONS = gql`
  query GetCollections {
    collections {
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



export const CategoriesProvider = ({ children }) => {

  const {loading, error, data} = useQuery(COLLECTIONS);
  

  console.log('loading state ->1 ', loading)
  console.log('data fra gql--> ', data )
  console.log('loading state ->2 ', loading)
  const [categoriesMap, setCategoriesMap] = useState({});


useEffect(()=>{
  if(data){
    const {collections} = data;
    const collectionsMap = collections.reduce((acc, collection) => {
      const {title, items} = collection;
      acc[title.toLowerCase()] = items; // add the title on the accumulator
      return acc;
    }, {})

    setCategoriesMap(collectionsMap)
  }
  
}, [data])


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
