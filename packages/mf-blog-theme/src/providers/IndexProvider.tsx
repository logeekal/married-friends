import React from 'react';
import {Post} from '../types/wp-graphql.types';

const SearchIndexContext = React.createContext<{[k:string]: Post}>(null);


export default SearchIndexContext;
