import React from 'react';

import {HomePageContainer} from './homepage.style';

import Directory from '../../components/directory/directory.component.jsx';

export const HomePage = ({history})=>(
    <HomePageContainer>
       <Directory history={history}/>
    </HomePageContainer>
)

export default HomePage;