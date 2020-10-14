import React from 'react';
import {connect} from 'react-redux'; 
import {createStructuredSelector} from 'reselect'

import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors';

import './collection-overview.style.scss';

const CollectionsOveriew = ({collections}) => (
	<div className='collections-overview'>
		{collections.map(({id, ...otherSectionProps}) =>
            <CollectionPreview key={id} {...otherSectionProps}/>
        )}
	</div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionsOveriew);