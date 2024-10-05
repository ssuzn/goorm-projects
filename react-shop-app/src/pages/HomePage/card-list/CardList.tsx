import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchProducts } from '../../../store/products/products.slice';
import CardSkeleton from '../card-skeleton/CardSkeleton';
import CardItem from './card-item/CardItem';
import styles from './CardList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
const CardList = () => {

    const dispatch = useAppDispatch();
    // 이부분은 redux store에 있는 products 값을 가져오는 부분 
    const { products, isLoading } = useAppSelector(state => state.products);
    const category = useAppSelector(state => state.categories);
    
    useEffect(() => {
        dispatch(fetchProducts(category?.toLowerCase()));
    }, [category])


    if (isLoading) return <CardSkeleton />;

    return (
        <ul className={styles.card_list}>
            {products.map(product => <CardItem key={product.id} item={product} />)}
        </ul>
    )
}

export default CardList