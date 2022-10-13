import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';

import { gql, useQuery, useMutation } from '@apollo/client'

import Spinner from '../../components/spinner/spinner.component'


/* A GraphQL query. */

const GET_CATEGORY = gql`
query($title: String!) {
  getCollectionsByTitle(title: $title){
    id
    title
    items{
      name
      id
      price
      imageUrl
    
    }
}
}  
`

const SET_CATEGORY = gql`
  mutation($category: Category!){
    addCategory(category: $category){
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
  }

`
/** */

const Category = () => {
  const { category } = useParams();


  // const { categoriesMap, loading} = useContext(CategoriesContext);
  // const [products, setProducts] = useState(categoriesMap[category]);

 
/**
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category
    }
  });

  */
  const [addCategory, {loading, error, data}] = useMutation(SET_CATEGORY)
  // const  [addCategory, {loading, error, data}] = useMutation(SET_CATEGORY)

  addCategory({
    variables: {
      // category: categoryObject
    }
  })
  useEffect(() => {
    if(data){
      const {getCollectionsByTitle: {items}} = data;
      setProducts(items);
    }
    
  }, [category, data])

  console.log ('gql query category data -> ', data)
  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);
  const [products, setProducts] = useState([]);

  return (
    <Fragment>
      {
        loading ? <Spinner /> : (
          <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
              {products &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>

          </Fragment>

        )
      }
      
    </Fragment>
  );
};

export default Category;
