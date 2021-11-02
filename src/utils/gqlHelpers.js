import { gql } from 'apollo-boost';

const getAllProducts = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
        brand
      }
    }
  }
`;
const getCurrencies = gql`
  {
    currencies
  }
`;

const combinedQueries=gql`{
  categories {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
currencies
}
`

export {getAllProducts,getCurrencies,combinedQueries}