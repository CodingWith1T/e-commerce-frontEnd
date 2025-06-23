import ProductDetailsDailog from '@/components/shopping-view/product-details';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItem } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/products-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const SearchProducts = () => {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDailog, setOpenDetailsDailog] = useState(false);

    const dispatch = useDispatch();
    const { searchResults } = useSelector(state => state.shopSearch);
    const { user } = useSelector(state => state.auth);
    const { productDetails } = useSelector(state => state.shopProducuts);

    function handleProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddtoCart(getCurrentProductId) {
        dispatch(addToCart(
            { userId: user?.id, productId: getCurrentProductId, quantity: 1 })
        ).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchCartItem(user?.id));
                toast("Product is added to cart")
            }
        });
    }


    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000)
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults(keyword));
        }
    }, [keyword])


    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDailog(true)
    }, [productDetails])

    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className="flex justify-center mb-8">
                <div className="w-full flex-items-center">
                    <Input value={keyword} name="keyword" onChange={(event) => setKeyword(event.target.value)} className="py-6" placeholder="Search Products..." />
                </div>
            </div>
            {
                !searchResults.length ?
                    <h1 className='text-5xl font-bold'>No Result found !!!</h1>
                    : null
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResults.map((item) => (
                        <ShoppingProductTile 
                        product={item} 
                        handleAddtoCart={handleAddtoCart} 
                        handleProductDetails={handleProductDetails}
                        />
                    ))}
            </div>
            <ProductDetailsDailog open={openDetailsDailog} setOpen={setOpenDetailsDailog} productDetails={productDetails} />
        </div>
    )
}

export default SearchProducts