import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component{
    state={
        loading: true
    };
    unSubscribeFromSnapshot = null;
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            console.log("snapshot",snapshot);
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            console.log("collectionMap", collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }
    
    
    componentWillUnmount(){
        this.unSubscribeFromSnapshot();
    }
    render(){
        const {match} = this.props;
        const {loading} = this.state;
        console.log(match);
        return(
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props)=> <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
            <Route path={`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);